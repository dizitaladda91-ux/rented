"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import PropertyCard from "@/components/property/PropertyCard";
import { Property } from "@/types";
import { fetchApi } from "@/lib/api";
import { MOCK_PROPERTIES } from "@/lib/mockData";
import { filterPropertyList } from "@/lib/propertyFilters";
import {
  SlidersHorizontal, MapPin, Filter, RotateCcw, X, Sparkles, Building2, Home
} from "lucide-react";

interface CategoryRentalViewProps {
  category: "PG" | "Flat" | "House" | "Shop";
  title: string;
  badge: string;
  description: string;
}

const topCitiesList = [
  { name: "All Cities", value: "" },
  { name: "Delhi", value: "Delhi" },
  { name: "Gurgaon", value: "Gurgaon" },
  { name: "Noida", value: "Noida" },
  { name: "Bangalore", value: "Bangalore" },
  { name: "Mumbai", value: "Mumbai" },
  { name: "Pune", value: "Pune" },
];

export default function CategoryRentalView({
  category,
  title,
  badge,
  description,
}: CategoryRentalViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || searchParams.get("location") || "");
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max_price") || "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "");
  const [sortBy, setSortBy] = useState("relevance");

  useEffect(() => {
    loadCategoryProperties();
  }, [selectedCity, query, maxPrice, bedrooms, sortBy, category]);

  async function loadCategoryProperties() {
    setLoading(true);
    try {
      let apiLoaded = false;
      try {
        const params = new URLSearchParams();
        params.append("property_type", category);
        if (selectedCity) params.append("city", selectedCity);
        if (query) params.append("search", query);
        if (maxPrice) params.append("max_price", maxPrice);
        if (bedrooms) params.append("bedrooms", bedrooms);

        const data = await fetchApi<{ items: Property[]; total: number }>(`/properties?${params.toString()}`);
        if (data && Array.isArray(data.items)) {
          setProperties(data.items);
          setTotal(data.total || data.items.length);
          apiLoaded = true;
        }
      } catch {
        // Fallback to mock data
      }

      if (!apiLoaded) {
        const filtered = filterPropertyList(MOCK_PROPERTIES, {
          property_type: category,
          location: selectedCity,
          city: selectedCity,
          query,
          max_price: maxPrice,
          bedrooms,
          sort_by: sortBy,
        });
        setProperties(filtered);
        setTotal(filtered.length);
      }
    } finally {
      setLoading(false);
    }
  }

  const resetFilters = () => {
    setSelectedCity("");
    setQuery("");
    setMaxPrice("");
    setBedrooms("");
    setSortBy("relevance");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />

      {/* HEADER BANNER - Pure White & Medium Red theme, NO gradients */}
      <div className="bg-white border-b border-slate-200 py-12 px-4 shadow-sm text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-500 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>{badge}</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Verified <span className="text-red-400">{title}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 space-y-6 w-full">
        
        {/* City Filter Pills */}
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider shrink-0">
            <MapPin className="w-4 h-4 text-red-400" />
            <span>Filter City:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full pb-1">
            {topCitiesList.map((ct) => {
              const isActive = selectedCity.toLowerCase() === ct.value.toLowerCase() || (!selectedCity && ct.value === "");
              return (
                <button
                  key={ct.name}
                  onClick={() => setSelectedCity(ct.value)}
                  className={`px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-red-400 text-white shadow-sm font-extrabold"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {ct.name}
                </button>
              );
            })}
          </div>
        </section>

        {/* Search & Sort Controls */}
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Quick Search */}
          <div className="relative w-full md:w-96">
            <MapPin className="w-4 h-4 text-red-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search locality or area in ${title}...`}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-400 font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Counts & Clear */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4 text-xs">
            <span className="text-slate-600 font-medium">
              Showing <span className="font-bold text-slate-900">{total}</span> verified options
            </span>

            {(selectedCity || query || maxPrice || bedrooms) && (
              <button
                onClick={resetFilters}
                className="text-red-400 hover:underline font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </section>

        {/* Listings Grid */}
        <section>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-96 rounded-2xl bg-white animate-pulse border border-slate-200" />
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 my-8 shadow-sm">
              <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
                No {title} Found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
                No active listings match your selection {selectedCity ? `in "${selectedCity}"` : ""}. Try selecting another city or reset filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-xl bg-red-400 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}
