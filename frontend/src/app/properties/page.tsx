"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import PropertyCard from "@/components/property/PropertyCard";
import Card3D from "@/components/ui/Card3D";
import { Property } from "@/types";
import { fetchApi } from "@/lib/api";
import { MOCK_PROPERTIES } from "@/lib/mockData";
import { filterPropertyList } from "@/lib/propertyFilters";
import { useAuth } from "@/lib/auth";
import {
  SlidersHorizontal, MapPin, Filter, ArrowUpDown, ShieldCheck, Map as MapIcon, Grid,
  Sparkles, TreePine, Waves, Home, Building2, ChevronRight, RotateCcw, X, Bed, IndianRupee, Compass
} from "lucide-react";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState(false);

  // Filters State (initialized from searchParams)
  const [query, setQuery] = useState(searchParams.get("smart_query") || searchParams.get("query") || "");
  const [selectedState, setSelectedState] = useState(searchParams.get("state") || "");
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || searchParams.get("location") || "");
  const [selectedPincode, setSelectedPincode] = useState(searchParams.get("pincode") || "");
  const [propertyType, setPropertyType] = useState(searchParams.get("property_type") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("min_price") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max_price") || "");
  const [landAreaUnit, setLandAreaUnit] = useState<"sqft" | "sqyd" | "acre" | "bigha">("sqft");
  const [minLandArea, setMinLandArea] = useState("");
  const [maxLandArea, setMaxLandArea] = useState("");
  const [bedrooms, setBedrooms] = useState<string>(searchParams.get("bedrooms") || "");
  const [verificationStatus, setVerificationStatus] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [page, setPage] = useState(1);

  // Keep state synced whenever URL search params change
  useEffect(() => {
    const q = searchParams.get("smart_query") || searchParams.get("query");
    const loc = searchParams.get("city") || searchParams.get("location");
    const pType = searchParams.get("property_type");
    const maxP = searchParams.get("max_price");
    const minP = searchParams.get("min_price");
    const beds = searchParams.get("bedrooms");
    const st = searchParams.get("state");
    const pin = searchParams.get("pincode");

    if (q !== null) setQuery(q);
    if (loc !== null) setSelectedCity(loc);
    if (pType !== null) setPropertyType(pType);
    if (maxP !== null) setMaxPrice(maxP);
    if (minP !== null) setMinPrice(minP);
    if (beds !== null) setBedrooms(beds);
    if (st !== null) setSelectedState(st);
    if (pin !== null) setSelectedPincode(pin);
  }, [searchParams]);

  // Available Data Categories
  const categoriesList = [
    { id: "PG", name: "PG & Co-Living Hostels", icon: Home, desc: "Single & Sharing Rooms with Meals", count: "50+ Available" },
    { id: "Flat", name: "Flats & Apartments", icon: Building2, desc: "1, 2, 3 BHK Gated Society Homes", count: "85+ Available" },
    { id: "House", name: "Independent Houses", icon: Home, desc: "Private Floors & Independent Houses", count: "40+ Available" },
    { id: "Shop", name: "Commercial Retail Shops", icon: SlidersHorizontal, desc: "High Footfall Market Spaces", count: "30+ Available" },
  ];

  const topStatesList = [
    { name: "All States", value: "" },
    { name: "Delhi NCR", value: "Delhi" },
    { name: "Haryana", value: "Haryana" },
    { name: "Uttar Pradesh", value: "Uttar Pradesh" },
    { name: "Karnataka", value: "Karnataka" },
    { name: "Maharashtra", value: "Maharashtra" },
  ];

  const topCitiesList = [
    { name: "All Cities", value: "" },
    { name: "Delhi (North & South)", value: "Delhi" },
    { name: "Gurgaon (DLF & Golf Course)", value: "Gurgaon" },
    { name: "Noida (Sector 18)", value: "Noida" },
    { name: "Bangalore (Koramangala & HSR)", value: "Bangalore" },
    { name: "Mumbai (Bandra West)", value: "Mumbai" },
    { name: "Pune (Koregaon Park)", value: "Pune" },
  ];

  useEffect(() => {
    loadFilteredProperties();
  }, [query, selectedState, selectedCity, selectedPincode, propertyType, minPrice, maxPrice, landAreaUnit, minLandArea, maxLandArea, bedrooms, verificationStatus, sortBy, page]);

  async function loadFilteredProperties() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.append("query", query);
      if (selectedState) params.append("state", selectedState);
      if (selectedCity) params.append("location", selectedCity);
      if (selectedPincode) params.append("pincode", selectedPincode);
      if (propertyType) params.append("property_type", propertyType);
      if (minPrice) params.append("min_price", minPrice);
      if (maxPrice) params.append("max_price", maxPrice);
      if (landAreaUnit) params.append("land_area_unit", landAreaUnit);
      if (minLandArea) params.append("min_land_area", minLandArea);
      if (maxLandArea) params.append("max_land_area", maxLandArea);
      if (bedrooms) params.append("bedrooms", bedrooms);
      if (verificationStatus) params.append("verification_status", verificationStatus);
      if (sortBy) params.append("sort_by", sortBy);
      params.append("page", page.toString());
      params.append("limit", "12");

      let apiLoaded = false;
      try {
        const data = await fetchApi<{ items: Property[]; total: number }>(`/properties?${params.toString()}`);
        if (data && Array.isArray(data.items) && data.items.length > 0) {
          // Double filter client-side to enforce strict exactness
          const filtered = filterPropertyList(data.items, {
            query,
            location: selectedCity,
            city: selectedCity,
            state: selectedState,
            pincode: selectedPincode,
            property_type: propertyType,
            min_price: minPrice,
            max_price: maxPrice,
            bedrooms,
            verification_status: verificationStatus,
            sort_by: sortBy,
          });
          setProperties(filtered);
          setTotal(filtered.length);
          apiLoaded = true;
        }
      } catch (err) {
        // Backend offline or error -> fallback to rich mock data
      }

      if (!apiLoaded) {
        const filtered = filterPropertyList(MOCK_PROPERTIES, {
          query,
          location: selectedCity,
          city: selectedCity,
          state: selectedState,
          pincode: selectedPincode,
          property_type: propertyType,
          min_price: minPrice,
          max_price: maxPrice,
          bedrooms,
          verification_status: verificationStatus,
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
    setQuery("");
    setSelectedState("");
    setSelectedCity("");
    setSelectedPincode("");
    setPropertyType("");
    setMinPrice("");
    setMaxPrice("");
    setMinLandArea("");
    setMaxLandArea("");
    setBedrooms("");
    setVerificationStatus("");
    setSortBy("relevance");
    setPage(1);
    router.push("/properties");
  };

  // Check active filter count
  const hasActiveFilters = Boolean(
    query || selectedCity || selectedPincode || selectedState || propertyType || minPrice || maxPrice || bedrooms || verificationStatus
  );

  const formatBudgetDisplay = (val: string) => {
    const num = Number(val);
    if (!num) return "";
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)} Lakh/mo`;
    return `₹${num.toLocaleString("en-IN")}/mo`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      
      {/* HEADER BANNER */}
      <div className="bg-white border-b border-slate-200 py-12 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-500 uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span>Verified Rental Discovery</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Explore Verified <span className="text-red-400">Rental Properties</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-normal">
            Showing {total} verified PG, flats, independent houses, and commercial shops available for rent across India.
          </p>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-8 w-full">
        
        {/* BUYER PERSONALIZED LOCATION BANNER */}
        {user && user.city && (
          <div className="bg-red-50 text-slate-900 p-5 rounded-3xl shadow-sm border border-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-red-400 flex items-center justify-center shrink-0 shadow-sm">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-red-500">
                    Showing Nearby Listings
                  </span>
                  <span className="text-[10px] bg-red-400 text-white font-extrabold px-2 py-0.5 rounded-full uppercase">
                    Your Profile City
                  </span>
                </div>
                <h3 className="font-heading text-lg font-black tracking-wide mt-0.5 text-slate-900">
                  Rentals in {user.city} {user.pincode ? `(${user.pincode})` : ""}
                </h3>
                <p className="text-xs text-slate-600 font-normal">
                  Direct verified owners, PGs, flats and shops matching your locality preference.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  setSelectedCity(user.city || "");
                  setSelectedPincode(user.pincode || "");
                }}
                className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all whitespace-nowrap shadow-sm ${
                  selectedCity.toLowerCase() === (user.city || "").toLowerCase()
                    ? "bg-red-400 text-white shadow-md font-extrabold"
                    : "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                Focus On My City
              </button>
              {selectedCity && (
                <button
                  onClick={() => {
                    setSelectedCity("");
                    setSelectedPincode("");
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 transition-all whitespace-nowrap"
                >
                  View All India
                </button>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 1. TOP CATEGORIES WE RENT */}
        {/* ==================================================================== */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-red-400">
                Property Categories
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                Choose Rental Category
              </h2>
            </div>

            {propertyType && (
              <button
                onClick={() => setPropertyType("")}
                className="text-xs text-red-400 hover:underline font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Show All Categories</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesList.map((cat) => {
              const IconComp = cat.icon;
              const isActive = propertyType === cat.id;

              return (
                <Card3D key={cat.id} intensity={8} depth={15}>
                  <div
                    onClick={() => {
                      setPropertyType(isActive ? "" : cat.id);
                      setPage(1);
                    }}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-4 ${
                      isActive
                        ? "bg-red-400 text-white shadow-xl border-red-500"
                        : "bg-white border-slate-200 hover:border-red-300 text-slate-900"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? "bg-white/20 text-white" : "bg-red-50 text-red-400"
                    }`}>
                      <IconComp className="w-6 h-6" />
                    </div>

                    <div>
                      <span className={`text-[10px] font-mono uppercase tracking-widest block font-bold ${
                        isActive ? "text-red-100" : "text-red-400"
                      }`}>
                        {cat.count}
                      </span>
                      <h3 className="font-heading text-lg font-bold leading-tight">
                        {cat.name}
                      </h3>
                      <p className={`text-xs mt-0.5 ${isActive ? "text-red-100" : "text-slate-500"}`}>
                        {cat.desc}
                      </p>
                    </div>
                  </div>
                </Card3D>
              );
            })}
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 2. TOP CITIES & ENCLAVES */}
        {/* ==================================================================== */}
        {/* 2. TOP CITIES & ENCLAVES */}
        {/* ==================================================================== */}
        <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-red-400">
                2. Prime City Enclaves
              </span>
              <h2 className="font-heading text-xl font-bold text-slate-900 mt-0.5">
                Filter by Top Cities & Destinations
              </h2>
            </div>
            {selectedCity && (
              <button
                onClick={() => setSelectedCity("")}
                className="text-xs text-red-400 hover:underline font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>All Cities</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {topCitiesList.map((ct) => {
              const isActive = selectedCity.toLowerCase() === ct.value.toLowerCase() || (!selectedCity && ct.value === "");
              return (
                <button
                  key={ct.name}
                  onClick={() => {
                    setSelectedCity(ct.value);
                    setPage(1);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? "bg-red-400 text-white shadow-md border border-red-500"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-red-400"}`} />
                  <span>{ct.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 3. FILTER CONTROL DOCK & SORTING BAR */}
        {/* ==================================================================== */}
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Left: Quick Search Input */}
            <div className="relative w-full md:w-96">
              <MapPin className="w-4 h-4 text-red-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search city (e.g. Delhi), area, or keyword..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-red-400 font-medium"
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

            {/* Right Controls */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end flex-wrap sm:flex-nowrap">
              <button
                onClick={() => setExpandedFilter(!expandedFilter)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                  expandedFilter || maxPrice || bedrooms || minPrice
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4 text-red-400" />
                <span>{expandedFilter ? "Hide Budget & Beds" : "Budget & Bedroom Filters"}</span>
                {(maxPrice || bedrooms) && (
                  <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                )}
              </button>

              <button
                onClick={() => setShowMap(!showMap)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-all"
              >
                {showMap ? <Grid className="w-4 h-4 text-red-400" /> : <MapIcon className="w-4 h-4 text-red-400" />}
                <span>{showMap ? "Grid Only" : "Map View"}</span>
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800">
                <ArrowUpDown className="w-3.5 h-3.5 text-red-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent focus:outline-none cursor-pointer font-bold text-slate-900"
                >
                  <option value="relevance">Sort: Relevance</option>
                  <option value="newest">Sort: Newest First</option>
                  <option value="price_asc">Rent: Low to High</option>
                  <option value="price_desc">Rent: High to Low</option>
                </select>
              </div>
            </div>

          </div>

          {/* EXPANDABLE ADVANCED FILTERS PANEL */}
          {expandedFilter && (
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-5 gap-4 text-xs">
              
              {/* Max Rent */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">Max Monthly Rent (₹)</label>
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-red-400"
                >
                  <option value="">Any Monthly Rent</option>
                  <option value="10000">Up to ₹10,000 / mo</option>
                  <option value="20000">Up to ₹20,000 / mo</option>
                  <option value="35000">Up to ₹35,000 / mo</option>
                  <option value="50000">Up to ₹50,000 / mo</option>
                  <option value="100000">Up to ₹1,00,000+ / mo</option>
                </select>
              </div>

              {/* Bedrooms / Sharing */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">Rooms / Bedrooms</label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-red-400"
                >
                  <option value="">Any Configuration</option>
                  <option value="1">1 Room / 1 BHK</option>
                  <option value="2">2 BHK Flat</option>
                  <option value="3">3 BHK Flat / House</option>
                  <option value="4">4+ BHK House</option>
                </select>
              </div>

              {/* State */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">State / Region</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:border-red-400"
                >
                  <option value="">All States</option>
                  <option value="Delhi">Delhi NCR</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Goa">Goa</option>
                </select>
              </div>

              {/* PIN Code Filter */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">Postal PIN Code</label>
                <input
                  type="text"
                  maxLength={6}
                  value={selectedPincode}
                  onChange={(e) => setSelectedPincode(e.target.value)}
                  placeholder="e.g. 110074"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold focus:outline-none focus:border-red-400"
                />
              </div>

              {/* Verification & Reset */}
              <div className="flex flex-col justify-end gap-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={verificationStatus === "VERIFIED"}
                    onChange={(e) => setVerificationStatus(e.target.checked ? "VERIFIED" : "")}
                    className="w-4 h-4 text-red-500 rounded accent-red-500"
                  />
                  <span>100% Verified Only</span>
                </label>

                <button
                  onClick={resetFilters}
                  className="text-left text-xs text-red-400 hover:underline font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}

          {/* ACTIVE FILTER BADGES ROW */}
          {hasActiveFilters && (
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
              <span className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider">Active Filters:</span>
              
              {selectedCity && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-900 border border-red-200 font-semibold">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>City: {selectedCity}</span>
                  <button onClick={() => setSelectedCity("")} className="hover:text-red-700 ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedPincode && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-900 border border-red-200 font-semibold font-mono">
                  <span>PIN: {selectedPincode}</span>
                  <button onClick={() => setSelectedPincode("")} className="hover:text-red-700 ml-0.5 font-sans">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {propertyType && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-900 border border-red-200 font-semibold">
                  <span>Type: {propertyType}</span>
                  <button onClick={() => setPropertyType("")} className="hover:text-red-700 ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {maxPrice && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-900 border border-red-200 font-semibold">
                  <IndianRupee className="w-3 h-3 text-red-400" />
                  <span>Max: {formatBudgetDisplay(maxPrice)}</span>
                  <button onClick={() => setMaxPrice("")} className="hover:text-red-700 ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {bedrooms && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-900 border border-red-200 font-semibold">
                  <Bed className="w-3 h-3 text-red-400" />
                  <span>Bedrooms: {bedrooms}+ BHK</span>
                  <button onClick={() => setBedrooms("")} className="hover:text-red-700 ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {query && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-300 font-semibold">
                  <span>&quot;{query}&quot;</span>
                  <button onClick={() => setQuery("")} className="hover:text-red-700 ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-xs text-slate-500 hover:text-slate-800 underline ml-2 font-medium"
              >
                Clear all
              </button>
            </div>
          )}

        </section>

        {/* ==================================================================== */}
        {/* 4. ALL PROPERTIES GRID / MAP DISPLAY */}
        {/* ==================================================================== */}
        <section className="space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-heading text-xl font-bold text-slate-900">
              Matching Properties ({properties.length})
            </h3>
            
            <div className="flex items-center gap-2 text-xs text-red-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-red-400" />
              <span>Verified Direct Landlord Listings</span>
            </div>
          </div>

          {showMap && (
            <div className="h-80 rounded-2xl bg-slate-900 text-white p-6 flex items-center justify-center text-center">
              <div className="space-y-2">
                <MapIcon className="w-10 h-10 text-red-400 mx-auto" />
                <h3 className="font-heading text-lg font-bold">Interactive Rental Map View</h3>
                <p className="text-xs text-slate-400 max-w-md">
                  Displaying rental properties across Delhi NCR, Gurgaon, Bangalore, Mumbai & Pune.
                </p>
              </div>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-96 rounded-2xl bg-white animate-pulse border border-slate-200" />
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 my-8 shadow-sm">
              <Filter className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
                No Listed Properties Found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
                No properties match your current filters {selectedCity ? `in "${selectedCity}"` : ""} {propertyType ? `for "${propertyType}"` : ""} {maxPrice ? `under ${formatBudgetDisplay(maxPrice)}` : ""}. Try adjusting the filters or click reset below.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-xl bg-red-400 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
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

export default function SearchResultsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <Suspense fallback={
        <div className="py-20 text-center text-xs text-red-400 font-bold">
          Loading Rented Marketplace...
        </div>
      }>
        <SearchResultsContent />
      </Suspense>
    </div>
  );
}
