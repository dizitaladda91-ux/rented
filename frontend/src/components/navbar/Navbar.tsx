"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import {
  Compass, Heart, PlusCircle, User as UserIcon, Menu, X, ShieldCheck,
  Phone, Mail, Clock, MapPin, Building2
} from "lucide-react";

export default function Navbar() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      
      {/* 1. Top Announcement Header Bar (Medium Red Signature Header) */}
      <div className="bg-red-400 py-2.5 px-4 text-xs text-white font-sans hidden md:block border-b border-red-500/40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a href="tel:+919876543210" className="text-white hover:text-red-100 flex items-center gap-1.5 transition-colors font-medium">
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>+91 98765 43210</span>
            </a>
            <span className="text-red-200/70">|</span>
            <a href="mailto:support@rented.in" className="text-white hover:text-red-100 flex items-center gap-1.5 transition-colors font-medium">
              <Mail className="w-3.5 h-3.5 text-white" />
              <span>support@rented.in</span>
            </a>
            <span className="text-red-200/70">|</span>
            <span className="flex items-center gap-1.5 text-red-50">
              <Clock className="w-3.5 h-3.5 text-white" />
              <span>24/7 Verified Rental Support</span>
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-white font-semibold bg-red-500/50 border border-white/25 px-2.5 py-0.5 rounded-md shadow-sm">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>100% Verified Owners & Zero Brokerage Options</span>
            </span>
            <span className="text-red-200/70">|</span>
            <div className="flex items-center gap-2 text-white font-semibold">
              <MapPin className="w-3.5 h-3.5 text-red-100" />
              <span>Delhi NCR • Gurgaon • Noida • Bangalore • Mumbai • Pune</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Crisp White Navbar */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 rounded-xl bg-red-400 shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-heading text-2xl font-bold tracking-tight text-slate-900 block leading-none">
                  RENTED<span className="text-red-400">.</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-600 uppercase font-sans font-medium block mt-1">
                  PG • House • Flat • Shop
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 font-heading text-sm font-semibold tracking-normal">
              <Link href="/" className="text-red-400 hover:text-red-500 transition-colors">
                Home
              </Link>

              <Link href="/properties" className="text-slate-700 hover:text-red-400 transition-colors flex items-center gap-1">
                <span>All Rentals</span>
              </Link>

              <Link href="/pg" className="text-slate-700 hover:text-red-400 transition-colors">
                PG / Hostels
              </Link>

              <Link href="/flats" className="text-slate-700 hover:text-red-400 transition-colors">
                Flats
              </Link>

              <Link href="/houses" className="text-slate-700 hover:text-red-400 transition-colors">
                Houses
              </Link>

              <Link href="/shops" className="text-slate-700 hover:text-red-400 transition-colors">
                Shops
              </Link>

              <Link href="/favorites" className="text-slate-700 hover:text-red-400 transition-colors flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Saved</span>
              </Link>
            </nav>

            {/* Right Action CTAs */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/sell"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-400 hover:bg-red-500 text-white font-heading font-semibold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Rental</span>
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center space-x-3 font-sans">
                  <Link
                    href={isAdmin ? "/admin" : "/dashboard"}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 hover:bg-slate-200 transition-all text-xs font-semibold"
                  >
                    <UserIcon className="w-4 h-4 text-slate-700" />
                    <span>{isAdmin ? "Platform (ADMIN)" : user?.full_name?.split(" ")[0] || "My Account"}</span>
                  </Link>

                  <button
                    onClick={logout}
                    className="text-xs text-slate-500 hover:text-red-400 font-semibold transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3 font-sans">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-xs font-bold text-slate-800 hover:text-red-400 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/login?mode=signup"
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-slate-900"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 pt-4 pb-8 space-y-4 font-heading shadow-xl">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-red-400 font-bold">
            Home
          </Link>
          <Link href="/properties" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">
            All Rentals
          </Link>
          <Link href="/pg" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">
            PG / Hostels
          </Link>
          <Link href="/flats" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">
            Flats & Apartments
          </Link>
          <Link href="/houses" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">
            Independent Houses
          </Link>
          <Link href="/shops" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">
            Commercial Shops
          </Link>
          <Link href="/favorites" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">
            Saved Properties
          </Link>
          <Link href="/sell" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-red-400 font-bold">
            + Post Rental
          </Link>
          {isAuthenticated ? (
            <div className="pt-4 border-t border-slate-200 space-y-2 font-sans">
              <Link href={isAdmin ? "/admin" : "/dashboard"} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-900 font-medium">
                Dashboard ({user?.full_name})
              </Link>
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block py-2 text-red-400 font-medium">
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-3 rounded-xl bg-red-400 text-white font-bold text-xs uppercase tracking-wider mt-4">
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
