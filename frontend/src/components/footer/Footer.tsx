import React from "react";
import Link from "next/link";
import { Building2, ShieldCheck, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t-4 border-red-600 text-slate-100 text-sm font-sans pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 p-0.5 flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-red-500" />
                </div>
              </div>
              <div>
                <span className="font-heading text-xl font-bold text-white tracking-wide block">
                  RENTED<span className="text-red-500">.IN</span>
                </span>
                <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block">
                  PG • Flat • House • Shop
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-300 font-normal">
              India&apos;s trusted rental portal for finding verified PG accommodations, 1/2/3 BHK flats, independent houses, and commercial shops with zero hassle.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-600/40 text-xs font-semibold text-red-300">
              <ShieldCheck className="w-4 h-4 text-red-400" />
              <span>100% Verified Rental Listings</span>
            </div>
          </div>

          {/* Col 2: Rental Categories */}
          <div>
            <h4 className="font-heading text-white font-bold text-base mb-4 tracking-wider uppercase border-b border-red-600/40 pb-2 inline-block">
              Rental Categories
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {[
                { label: "PG & Co-Living Hostels", href: "/properties?property_type=PG" },
                { label: "Flats & Apartments for Rent", href: "/properties?property_type=Flat" },
                { label: "Independent Houses & Floors", href: "/properties?property_type=House" },
                { label: "Commercial Retail Shops", href: "/properties?property_type=Shop" },
                { label: "Furnished Studio Apartments", href: "/properties?property_type=Flat&furnishing=Fully+Furnished" }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="text-slate-300 hover:text-red-400 transition-colors flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-0.5 transition-transform" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Cities */}
          <div>
            <h4 className="font-heading text-white font-bold text-base mb-4 tracking-wider uppercase border-b border-red-600/40 pb-2 inline-block">
              Popular Rental Hubs
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {[
                { label: "Delhi NCR (North & South Campus)", href: "/properties?location=Delhi" },
                { label: "Gurgaon (DLF & Golf Course Rd)", href: "/properties?location=Gurgaon" },
                { label: "Noida (Sector 18 & Electronic City)", href: "/properties?location=Noida" },
                { label: "Bangalore (Koramangala & HSR)", href: "/properties?location=Bangalore" },
                { label: "Mumbai (Bandra & Andheri)", href: "/properties?location=Mumbai" },
                { label: "Pune (Koregaon Park & Viman Nagar)", href: "/properties?location=Pune" }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="text-slate-300 hover:text-red-400 transition-colors flex items-center gap-1.5 group">
                    <ChevronRight className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-0.5 transition-transform" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Support & Contact */}
          <div>
            <h4 className="font-heading text-white font-bold text-base mb-4 tracking-wider uppercase border-b border-red-600/40 pb-2 inline-block">
              Rental Helpdesk
            </h4>
            <p className="text-sm text-slate-300 mb-4 font-normal leading-relaxed">
              Have questions about renting a flat, PG, house, or commercial shop? Our support team is here to assist.
            </p>
            <div className="space-y-2.5 text-sm font-medium text-slate-200">
              <a href="tel:+919876543210" className="flex items-center gap-2.5 text-slate-200 hover:text-red-400 transition-colors">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:support@rented.in" className="flex items-center gap-2.5 text-slate-200 hover:text-red-400 transition-colors">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <span>support@rented.in</span>
              </a>
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="text-xs">NCR Corporate Office, Connaught Place & Sector 18 Noida</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-medium text-slate-400 gap-4">
          <p>© 2026 RENTED Portal. All rights reserved. Dealing in PG, House, Flat & Shop.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-red-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-red-400 transition-colors">Terms of Service</Link>
            <Link href="/admin" className="text-red-400 hover:underline font-semibold">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


