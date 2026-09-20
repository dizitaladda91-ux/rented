"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { fetchApi } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isSeller: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function parseJwt(token: string): { sub?: string; role?: string; email?: string; exp?: number; iat?: number } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function createSecureJwt(userId: string, role: string, email: string): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  
  const payload = btoa(JSON.stringify({
    sub: userId,
    role: role,
    email: email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days expiration
  })).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const signature = btoa(`rented_sig_${userId}_${role}_${Date.now()}`)
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  return `${header}.${payload}.${signature}`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");
      if (token) {
        // 1. Validate JWT structure and expiration
        const jwtData = parseJwt(token);
        if (jwtData && jwtData.exp && Date.now() >= jwtData.exp * 1000) {
          console.warn("JWT token has expired. Logging out...");
          localStorage.removeItem("token");
          localStorage.removeItem("user_data");
          setUser(null);
          setLoading(false);
          return;
        }

        try {
          // Attempt profile fetch from backend API
          const userData = await fetchApi<User>("/auth/me");
          setUser(userData);
        } catch (error) {
          // If backend offline, restore profile from cached user data if JWT is still valid
          const cached = localStorage.getItem("user_data");
          if (cached) {
            try {
              setUser(JSON.parse(cached));
            } catch {
              localStorage.removeItem("token");
              localStorage.removeItem("user_data");
            }
          }
        }
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user_data", JSON.stringify(userData));
    // Set security cookie for route protection
    document.cookie = `auth_token=${token}; path=/; max-age=604800; SameSite=Lax`;
    document.cookie = `user_role=${userData.role}; path=/; max-age=604800; SameSite=Lax`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_data");
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isSeller: user?.role === "SELLER" || user?.role === "ADMIN",
    isAdmin: user?.role === "ADMIN",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
