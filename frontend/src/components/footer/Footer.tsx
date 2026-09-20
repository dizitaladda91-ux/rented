import React from "react";
import Link from "next/link";
import { Building2, ShieldCheck, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-red-100 text-slate-900 text-sm font-sans pt-14 pb-10 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 p-0.5 flex items-center justify-center shadow-sm">
                <Building2 className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <span className="font-heading text-2xl font-black text-black tracking-wide block">
                  RENTED<span className="text-red-400">.IN</span>
                </span>
                <span className="text-[10px] text-red-500 font-extrabold uppercase tracking-wider block">
                  PG • Flat • House • Shop
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-black/80 font-normal">
              India&apos;s trusted rental portal for finding verified PG accommodations, 1/2/3 BHK flats, independent houses, and commercial shops with zero hassle.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-xs font-bold text-red-500">
              <ShieldCheck className="w-4 h-4 text-red-400" />
              <span>100% Verified Rental Listings</span>
            </div>
          </div>

          {/* Col 2: Rental Categories */}
          <div>
            <h4 className="font-heading text-black font-black text-base mb-4 tracking-wider uppercase border-b-2 border-red-400 pb-1.5 inline-block">
              Rental Categories
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              {[
                { label: "PG & Co-Living Hostels", href: "/properties?property_type=PG" },
                { label: "Flats & Apartments for Rent", href: "/properties?property_type=Flat" },
                { label: "Independent Houses & Floors", href: "/properties?property_type=House" },
                { label: "Commercial Retail Shops", href: "/properties?property_type=Shop" },
                { label: "Furnished Studio Apartments", href: "/properties?property_type=Flat&furnishing=Fully+Furnished" }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="text-slate-800 hover:text-red-400 transition-colors flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-red-400 group-hover:translate-x-0.5 transition-transform" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Cities */}
          <div>
            <h4 className="font-heading text-black font-black text-base mb-4 tracking-wider uppercase border-b-2 border-red-400 pb-1.5 inline-block">
              Popular Rental Hubs
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              {[
                { label: "Delhi NCR (North & South Campus)", href: "/properties?location=Delhi" },
                { label: "Gurgaon (DLF & Golf Course Rd)", href: "/properties?location=Gurgaon" },
                { label: "Noida (Sector 18 & Electronic City)", href: "/properties?location=Noida" },
                { label: "Bangalore (Koramangala & HSR)", href: "/properties?location=Bangalore" },
                { label: "Mumbai (Bandra & Andheri)", href: "/properties?location=Mumbai" },
                { label: "Pune (Koregaon Park & Viman Nagar)", href: "/properties?location=Pune" }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="text-slate-800 hover:text-red-400 transition-colors flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-red-400 group-hover:translate-x-0.5 transition-transform" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Support & Contact */}
          <div>
            <h4 className="font-heading text-black font-black text-base mb-4 tracking-wider uppercase border-b-2 border-red-400 pb-1.5 inline-block">
              Rental Helpdesk
            </h4>
            <p className="text-sm text-slate-700 mb-4 font-medium leading-relaxed">
              Have questions about renting a flat, PG, house, or commercial shop? Our support team is here to assist.
            </p>
            <div className="space-y-2.5 text-sm font-semibold">
              <a href="tel:+919876543210" className="flex items-center gap-2.5 text-black hover:text-red-400 transition-colors">
                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center text-red-400 border border-red-200 shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:support@rented.in" className="flex items-center gap-2.5 text-black hover:text-red-400 transition-colors">
                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center text-red-400 border border-red-200 shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>support@rented.in</span>
              </a>
              <div className="flex items-start gap-2.5 text-slate-700 pt-1">
                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center text-red-400 border border-red-200 shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium">NCR Corporate Office, Connaught Place & Sector 18 Noida</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-slate-600 gap-4">
          <p>
            © 2026 <strong className="text-black font-extrabold">RENTED</strong>. All rights reserved. Dealing in <span className="text-red-500 font-bold">PG, House, Flat & Shop</span>.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="text-black hover:text-red-400 transition-colors font-medium">Privacy Policy</Link>
            <Link href="/terms" className="text-black hover:text-red-400 transition-colors font-medium">Terms of Service</Link>
            <Link href="/.admin" className="text-red-500 hover:text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-md font-bold transition-all shadow-sm">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
