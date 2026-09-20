"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { ShieldAlert, Lock, ArrowRight, Home, LayoutDashboard, LogIn, Sparkles } from "lucide-react";
import Link from "next/link";
import Card3D from "@/components/ui/Card3D";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("ADMIN" | "SELLER" | "BUYER")[];
  portalName?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  portalName = "Protected Portal",
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginRoute = pathname === "/admin/login" || pathname.startsWith("/.admin");

  useEffect(() => {
    if (isLoginRoute) return;

    if (!loading && !isAuthenticated) {
      const returnUrl = encodeURIComponent(pathname);
      const isForAdmin = allowedRoles?.includes("ADMIN") || pathname.startsWith("/admin");
      if (isForAdmin) {
        router.replace(`/.admin?redirect=${returnUrl}`);
      } else {
        router.replace(`/login?redirect=${returnUrl}`);
      }
    }
  }, [loading, isAuthenticated, pathname, router, allowedRoles, isLoginRoute]);

  // If this is the login page, render children directly without clearance check
  if (isLoginRoute) {
    return <>{children}</>;
  }

  // 1. Loading state while checking JWT token in localStorage / API
  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 p-0.5 animate-spin">
          <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
            <Lock className="w-6 h-6 text-red-400" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>Verifying Security Clearance</span>
          </div>
          <p className="text-sm text-slate-500">Checking cryptographic permissions for {portalName}...</p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated state (while redirecting)
  if (!isAuthenticated) {
    const isForAdmin = allowedRoles?.includes("ADMIN") || pathname.startsWith("/admin");
    const loginTarget = isForAdmin ? `/.admin?redirect=${encodeURIComponent(pathname)}` : `/login?redirect=${encodeURIComponent(pathname)}`;

    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 text-red-400 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-xl font-bold text-slate-900">Authentication Required</h2>
          <p className="text-xs text-slate-600">
            You must be authenticated to access the <span className="font-semibold text-slate-900">{portalName}</span>.
            Redirecting to security portal...
          </p>
          <div className="pt-2">
            <Link
              href={loginTarget}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-400 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider shadow-md"
            >
              <span>Go to {isForAdmin ? "Admin Gateway" : "Login"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated, but role does NOT match allowedRoles (e.g. BUYER trying to access /admin)
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <Card3D intensity={6} depth={15}>
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full space-y-6">
            
            {/* Warning Shield */}
            <div className="w-16 h-16 rounded-2xl bg-red-50 border-2 border-red-200 text-red-400 mx-auto flex items-center justify-center shadow-md">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700 uppercase tracking-widest">
                <span>Security Clearance Level Insufficient</span>
              </div>
              <h2 className="font-heading text-2xl font-extrabold text-slate-900">
                Access Restricted: {portalName}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                This administrative section is strictly reserved for accounts with{" "}
                <span className="font-bold text-slate-900">{allowedRoles.join(" or ")}</span> privileges.
                Your current account is authenticated as <span className="font-mono font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">{user.role}</span>.
              </p>
            </div>

            {/* Role comparison card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] text-slate-500 uppercase block">Active Account</span>
                <span className="font-bold text-slate-900">{user.full_name || user.email}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase block">Permission Status</span>
                <span className="font-bold text-red-400">Unauthorized Role</span>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Home className="w-4 h-4 text-slate-600" />
                <span>Return to Home</span>
              </Link>

              {user.role === "SELLER" && (
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <LayoutDashboard className="w-4 h-4 text-white" />
                  <span>Landlord Dashboard</span>
                </Link>
              )}

              <Link
                href={`/.admin?redirect=${encodeURIComponent(pathname)}`}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-400 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 flex items-center justify-center gap-2 transition-all"
              >
                <LogIn className="w-4 h-4 text-white" />
                <span>Switch to Admin ID</span>
              </Link>
            </div>

          </div>
        </Card3D>
      </div>
    );
  }

  // 4. Authorized -> Render protected page content
  return <>{children}</>;
}
