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
      
      {/* 1. Top Announcement Header Bar (Clean Crimson Red & Crisp White) */}
      <div className="bg-red-600 py-2.5 px-4 text-xs text-white font-sans hidden md:block border-b border-red-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a href="tel:+919876543210" className="hover:text-red-100 flex items-center gap-1.5 transition-colors font-medium">
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>+91 98765 43210</span>
            </a>
            <span className="text-red-300">|</span>
            <a href="mailto:support@rented.in" className="hover:text-red-100 flex items-center gap-1.5 transition-colors font-medium">
              <Mail className="w-3.5 h-3.5 text-white" />
              <span>support@rented.in</span>
            </a>
            <span className="text-red-300">|</span>
            <span className="flex items-center gap-1.5 text-red-100">
              <Clock className="w-3.5 h-3.5 text-white" />
              <span>24/7 Verified Rental Support</span>
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-white font-medium bg-red-700/60 px-2 py-0.5 rounded">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>100% Verified Owners & Zero Brokerage Options</span>
            </span>
            <span className="text-red-300">|</span>
            <div className="flex items-center gap-2 text-white font-semibold">
              <MapPin className="w-3.5 h-3.5 text-red-200" />
              <span>Delhi NCR • Gurgaon • Noida • Bangalore • Mumbai • Pune</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Crisp White Navbar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-red-700 p-0.5 shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-red-600 rounded-[10px] flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <span className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 block leading-none">
                  RENTED<span className="text-red-600">.</span>
                </span>
                <span className="text-[10px] tracking-widest text-red-600 uppercase font-sans font-bold block mt-1">
                  PG • House • Flat • Shop
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8 font-heading text-sm font-bold tracking-wide">
              <Link href="/" className="text-red-600 hover:text-red-700 transition-colors">
                Home
              </Link>

              <Link href="/properties" className="text-slate-800 hover:text-red-600 transition-colors flex items-center gap-1">
                <span>All Rentals</span>
              </Link>

              <Link href="/properties?property_type=PG" className="text-slate-800 hover:text-red-600 transition-colors">
                PG / Hostels
              </Link>

              <Link href="/properties?property_type=Flat" className="text-slate-800 hover:text-red-600 transition-colors">
                Flats
              </Link>

              <Link href="/properties?property_type=House" className="text-slate-800 hover:text-red-600 transition-colors">
                Houses
              </Link>

              <Link href="/properties?property_type=Shop" className="text-slate-800 hover:text-red-600 transition-colors">
                Shops
              </Link>

              <Link href="/favorites" className="text-slate-800 hover:text-red-600 transition-colors flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-red-600" />
                <span>Saved</span>
              </Link>
            </nav>

            {/* Right Action CTAs */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/sell"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
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
                    <UserIcon className="w-4 h-4 text-red-600" />
                    <span>{user?.full_name?.split(" ")[0]} ({user?.role})</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-xs text-slate-500 hover:text-red-600 transition-colors font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-heading font-semibold text-xs uppercase tracking-wider hover:bg-slate-800 transition-all"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-red-600"
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
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-red-600 font-bold">
            Home
          </Link>
          <Link href="/properties" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">
            All Rentals
          </Link>
          <Link href="/properties?property_type=PG" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">
            PG / Hostels
          </Link>
          <Link href="/properties?property_type=Flat" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">
            Flats & Apartments
          </Link>
          <Link href="/properties?property_type=House" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">
            Independent Houses
          </Link>
          <Link href="/properties?property_type=Shop" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">
            Commercial Shops
          </Link>
          <Link href="/favorites" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-medium">
            Saved Properties
          </Link>
          <Link href="/sell" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-red-600 font-bold">
            + Post Rental
          </Link>
          {isAuthenticated ? (
            <div className="pt-4 border-t border-slate-200 space-y-2 font-sans">
              <Link href={isAdmin ? "/admin" : "/dashboard"} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-900 font-medium">
                Dashboard ({user?.full_name})
              </Link>
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block py-2 text-red-600 font-medium">
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-3 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider mt-4">
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
