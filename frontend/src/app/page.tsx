"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import HeroBosa from "@/components/hero/HeroBosa";
import PropertyCard from "@/components/property/PropertyCard";
import Card3D from "@/components/ui/Card3D";
import { Property } from "@/types";
import { fetchApi } from "@/lib/api";
import {
  ShieldCheck, MapPin, Sparkles, Building2, CheckCircle2,
  ArrowRight, TreePine, Key, PhoneCall, Award, Users, TrendingUp
} from "lucide-react";

import { MOCK_PROPERTIES } from "@/lib/mockData";

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string>("ALL");

  useEffect(() => {
    async function loadProperties() {
      try {
        const res = await fetchApi<{ items: Property[] }>("/properties?limit=6");
        if (res.items && res.items.length > 0) {
          setProperties(res.items);
        } else {
          setProperties(MOCK_PROPERTIES);
        }
      } catch (err) {
        console.error("Failed to load featured properties", err);
        setProperties(MOCK_PROPERTIES);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);

  const filteredProperties = properties.filter((p) => {
    if (selectedTab === "ALL") return true;
    if (selectedTab === "PG") return p.property_type === "PG";
    if (selectedTab === "FLAT") return p.property_type === "Flat";
    if (selectedTab === "HOUSE") return p.property_type === "House";
    if (selectedTab === "SHOP") return p.property_type === "Shop";
    return true;
  });

  const categories = [
    {
      title: "PG & Co-Living Hostels",
      count: "50+ Listings",
      desc: "Furnished single & sharing AC rooms with daily meals, Wi-Fi & housekeeping.",
      image: "/images/bedroom.jpg",
      type: "PG",
      href: "/pg",
    },
    {
      title: "Flats & Apartments",
      count: "85+ Listings",
      desc: "1, 2, 3 BHK high-rise and gated society apartments with modern lifestyle amenities.",
      image: "/images/estate.jpg",
      type: "Flat",
      href: "/flats",
    },
    {
      title: "Independent Houses",
      count: "40+ Listings",
      desc: "Private builder floors and spacious independent houses for comfortable family living.",
      image: "/images/bungalow.jpg",
      type: "House",
      href: "/houses",
    },
    {
      title: "Commercial Shops",
      count: "30+ Listings",
      desc: "High footfall retail shops, market showrooms & commercial boutique spaces for lease.",
      image: "/images/hills.jpg",
      type: "Shop",
      href: "/shops",
    },
  ];

  const destinations = [
    { name: "Kamla Nagar & North Campus", location: "Delhi NCR", count: "35 Rentals", image: "/images/bedroom.jpg", query: "Delhi" },
    { name: "DLF Phase 5 & Golf Course", location: "Gurgaon", count: "42 Rentals", image: "/images/estate.jpg", query: "Gurgaon" },
    { name: "Sector 18 Commercial Market", location: "Noida", count: "28 Rentals", image: "/images/hills.jpg", query: "Noida" },
    { name: "Koramangala & HSR Layout", location: "Bangalore", count: "55 Rentals", image: "/images/villa.jpg", query: "Bangalore" },
    { name: "Bandra West & Linking Road", location: "Mumbai", count: "30 Rentals", image: "/images/bungalow.jpg", query: "Mumbai" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />

      {/* Hero with Floating Multi-Tab Search Bar */}
      <div className="relative z-40">
        <HeroBosa />
      </div>

      {/* SECTION 1: Counter Stats Impact Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-20">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="font-heading text-3xl sm:text-4xl font-extrabold text-red-400 block">5,000+</span>
            <span className="text-xs text-slate-600 uppercase tracking-wider font-bold mt-1 block">Active Rentals</span>
          </div>
          <div>
            <span className="font-heading text-3xl sm:text-4xl font-extrabold text-red-400 block">Zero</span>
            <span className="text-xs text-slate-600 uppercase tracking-wider font-bold mt-1 block">Brokerage Options</span>
          </div>
          <div>
            <span className="font-heading text-3xl sm:text-4xl font-extrabold text-red-400 block">100%</span>
            <span className="text-xs text-slate-600 uppercase tracking-wider font-bold mt-1 block">Verified Landlords</span>
          </div>
          <div>
            <span className="font-heading text-3xl sm:text-4xl font-extrabold text-red-400 block">24-Hr</span>
            <span className="text-xs text-slate-600 uppercase tracking-wider font-bold mt-1 block">Fast Move-In</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: Explore Rental Types (Category Cards Grid with 3D Tilt) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-red-400">
            Curated Dealing Categories
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            Explore <span className="text-red-400">Rental Properties</span>
          </h2>
          <p className="text-xs text-slate-600 mt-2">
            Browse through our verified selections for PGs, residential flats, family houses, and commercial retail shops.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Card3D key={idx} intensity={10} depth={20} className="h-80">
              <Link
                href={cat.href}
                className="bosa-card rounded-2xl overflow-hidden p-5 flex flex-col justify-between group h-full relative shadow-md hover:border-red-400 block"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white text-slate-900 border border-slate-200 font-bold shadow-sm">
                    {cat.count}
                  </span>
                </div>

                <div className="relative z-10 space-y-1">
                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {cat.desc}
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-xs font-bold text-red-400 group-hover:translate-x-1 transition-transform">
                    <span>Browse Listings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </Card3D>
          ))}
        </div>
      </section>

      {/* SECTION 3: Featured Rentals Portfolio (With Tabs) */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-red-400 block mb-1">
                Handpicked Portfolios
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">
                Featured <span className="text-red-400">Properties for Rent</span>
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="mt-6 md:mt-0 flex items-center space-x-2 overflow-x-auto pb-1">
              {[
                { label: "All Rentals", key: "ALL" },
                { label: "PG / Hostels", key: "PG" },
                { label: "Flats & Apartments", key: "FLAT" },
                { label: "Houses", key: "HOUSE" },
                { label: "Shops", key: "SHOP" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    selectedTab === tab.key
                      ? "bg-red-400 text-white shadow-md"
                      : "bg-white text-slate-700 hover:text-red-400 border border-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-96 rounded-2xl bg-white animate-pulse border border-slate-200" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-red-400 hover:bg-red-500 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:opacity-95 transition-all"
            >
              <span>Explore All {properties.length} Rentals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 4: About Us / Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Image Composition */}
          <div className="relative">
            <Card3D intensity={6} depth={15}>
              <div className="relative h-[480px] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-2xl">
                <Image
                  src="/images/bedroom.jpg"
                  alt="About Rented Portal"
                  fill
                  className="object-cover"
                />
              </div>
            </Card3D>
            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-6 rounded-2xl border border-red-200 shadow-2xl text-center z-20">
              <span className="font-heading text-4xl font-extrabold text-red-400 block">50,000+</span>
              <span className="text-xs text-slate-700 font-bold uppercase tracking-wider mt-1 block">
                Happy Tenants & Owners
              </span>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-600 uppercase tracking-wider">
              <Award className="w-4 h-4 text-red-400" />
              <span>Why Choose Rented</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              India’s Most Trusted <span className="text-red-400">Rental Portal</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              RENTED is a dedicated portal built specifically for renting verified PGs, student & professional hostels, residential flats, family houses, and commercial retail shops across India.
            </p>

            <div className="space-y-3 pt-2">
              {[
                "100% Owner Identity & Property Physical Verification",
                "Transparent Security Deposit & Direct Landlord Rent Negotiation",
                "Wide Options: Single Room PGs, 1/2/3 BHK Flats & Commercial Shops",
                "Instant Schedule Visit & Contact Landlord Directly",
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-400 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-sm">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm text-slate-800 font-semibold">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/sell"
                className="px-6 py-3 rounded-xl bg-red-400 hover:bg-red-500 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                Post Rental Listing
              </Link>
              <a
                href="tel:+919876543210"
                className="px-6 py-3 rounded-xl bg-slate-900 text-white font-heading font-semibold text-xs uppercase tracking-wider hover:bg-slate-800 transition-all"
              >
                Call Rental Support
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: Prime Rental Destinations (3D Tilt Grid) */}
      <section className="bg-slate-100/70 border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-red-400">
              Prime Destinations
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Explore by <span className="text-red-400">Popular Rental Hub</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {destinations.map((loc, idx) => (
              <Card3D key={idx} intensity={10} depth={20} className="h-80">
                <Link
                  href={`/properties?location=${encodeURIComponent(loc.query)}`}
                  className="bosa-card rounded-2xl overflow-hidden h-full relative flex flex-col justify-end p-5 group shadow-md hover:border-red-400 block"
                >
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="relative z-10">
                    <span className="text-[10px] text-red-300 font-mono uppercase tracking-wider block">
                      {loc.location} • {loc.count}
                    </span>
                    <h3 className="font-heading text-base font-bold text-white group-hover:text-red-400 transition-colors mt-0.5">
                      {loc.name}
                    </h3>
                  </div>
                </Link>
              </Card3D>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6: Call To Action Banner */}
      <section className="bg-white border-t border-b border-slate-200 py-20 text-slate-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-red-400">
            Looking to Rent or Post a Property?
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 mt-3 max-w-3xl mx-auto leading-tight">
            Find Your Ideal PG, Flat, House or Commercial Shop
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto mt-3 font-normal leading-relaxed">
            Connect directly with verified landlords and tenants. Zero brokerage options and verified listings guaranteed.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/sell"
              className="px-8 py-3.5 rounded-xl bg-red-400 hover:bg-red-500 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Post Rental Listing</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
            <a
              href="tel:+919876543210"
              className="px-8 py-3.5 rounded-xl bg-slate-900 text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-slate-800 inline-flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-red-400" />
              <span>Call Rental Helpline</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

