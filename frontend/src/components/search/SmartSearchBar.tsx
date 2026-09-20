"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, MapPin, Home, IndianRupee, SlidersHorizontal, ArrowRight, Compass } from "lucide-react";

export default function SmartSearchBar() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"smart" | "structured">("smart");
  const [naturalQuery, setNaturalQuery] = useState("");
  
  // Structured state
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleNaturalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!naturalQuery.trim()) return;
    router.push(`/properties?smart_query=${encodeURIComponent(naturalQuery.trim())}`);
  };

  const handleStructuredSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (propertyType) params.append("property_type", propertyType);
    if (maxPrice) params.append("max_price", maxPrice);
    router.push(`/properties?${params.toString()}`);
  };

  const quickPills = [
    "Single Room AC PG in Kamla Nagar",
    "2 BHK Flat in Gurgaon under 35k",
    "Independent House in South Delhi",
    "Commercial Retail Shop in Noida Sec 18",
  ];

  return (
    <div className="w-full max-w-5xl mx-auto -mt-16 relative z-30 px-4 font-sans">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-200">
        
        {/* Search Mode Switcher Tabs */}
        <div className="flex items-center justify-between mb-5 border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab("smart")}
              className={`px-5 py-2 rounded-lg font-heading text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all ${
                activeTab === "smart"
                  ? "bg-red-400 text-white shadow-md"
                  : "text-slate-600 hover:text-red-400 bg-slate-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rental AI Natural Search</span>
            </button>
            <button
              onClick={() => setActiveTab("structured")}
              className={`px-5 py-2 rounded-lg font-heading text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all ${
                activeTab === "structured"
                  ? "bg-red-400 text-white shadow-md"
                  : "text-slate-600 hover:text-red-400 bg-slate-100"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Structured Filter</span>
            </button>
          </div>
          <span className="hidden sm:inline-block text-[11px] text-red-400 font-heading font-medium">
            {activeTab === "smart" ? "Type rental query in natural words" : "Filter by exact location, type & rent"}
          </span>
        </div>

        {/* Tab 1: AI Natural Language Search */}
        {activeTab === "smart" ? (
          <div className="space-y-4">
            <form onSubmit={handleNaturalSearch} className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full">
                <Search className="w-5 h-5 text-red-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={naturalQuery}
                  onChange={(e) => setNaturalQuery(e.target.value)}
                  placeholder="e.g. '2 BHK Flat in Gurgaon under 30000 with balcony' or 'Single AC PG in Delhi under 10000'"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-red-400 rounded-xl pl-12 pr-4 py-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-9 py-4 bg-red-400 hover:bg-red-500 text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap transition-all"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Sample Search Tags */}
            <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
              <span className="text-slate-500 font-medium text-xs">Popular Searches:</span>
              {quickPills.map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setNaturalQuery(pill);
                    router.push(`/properties?smart_query=${encodeURIComponent(pill)}`);
                  }}
                  className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:text-red-400 hover:border-red-300 transition-all text-[11px] font-medium"
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Tab 2: Structured Filter Bar */
          <form onSubmit={handleStructuredSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            
            {/* Location Select */}
            <div className="relative">
              <MapPin className="w-4 h-4 text-red-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City / Locality (e.g. Kamla Nagar)"
                className="w-full bg-slate-50 border border-slate-200 focus:border-red-400 rounded-xl pl-10 pr-3 py-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Property Type Dropdown */}
            <div className="relative">
              <Home className="w-4 h-4 text-red-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-red-400 rounded-xl pl-10 pr-3 py-3.5 text-xs text-slate-900 focus:outline-none appearance-none"
              >
                <option value="">All Rental Types</option>
                <option value="PG">PG / Co-Living Hostel</option>
                <option value="Flat">Flat / Apartment</option>
                <option value="House">Independent House</option>
                <option value="Shop">Commercial Retail Shop</option>
              </select>
            </div>

            {/* Budget Max Price */}
            <div className="relative">
              <IndianRupee className="w-4 h-4 text-red-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-red-400 rounded-xl pl-10 pr-3 py-3.5 text-xs text-slate-900 focus:outline-none appearance-none"
              >
                <option value="">Max Monthly Rent</option>
                <option value="10000">Up to ₹10,000 / mo</option>
                <option value="20000">Up to ₹20,000 / mo</option>
                <option value="35000">Up to ₹35,000 / mo</option>
                <option value="50000">Up to ₹50,000 / mo</option>
                <option value="100000">Up to ₹1,00,000+ / mo</option>
              </select>
            </div>

            {/* Search Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-red-400 hover:bg-red-500 text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Find Rentals</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
