"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Property } from "@/types";
import { fetchApi } from "@/lib/api";
import { MOCK_PROPERTIES } from "@/lib/mockData";
import { formatRentPrice, formatLandArea } from "@/lib/utils";
import {
  ShieldCheck, Heart, Share2, MapPin, Bed, Bath, Maximize2, Building2,
  Calendar, Phone, Mail, CheckCircle2, Video, Eye, Compass, Sparkles,
  ChevronLeft, FileText, ArrowRight, UserCheck, Key, Clock, Check
} from "lucide-react";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params?.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"photos" | "360tour" | "video">("photos");
  const [isSaved, setIsSaved] = useState(false);

  // Lead / Visit Form Modal state
  const [inquiryType, setInquiryType] = useState<"callback" | "visit">("callback");
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadMessage, setLeadMessage] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("11:00 AM");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadProperty() {
      try {
        const data = await fetchApi<Property>(`/properties/${propertyId}`);
        if (data && data.id) {
          setProperty(data);
        } else {
          const fallback = MOCK_PROPERTIES.find(p => p.id === propertyId || p.slug === propertyId) || MOCK_PROPERTIES[0];
          setProperty(fallback);
        }
      } catch (err) {
        console.error("Failed to load property details", err);
        const fallback = MOCK_PROPERTIES.find(p => p.id === propertyId || p.slug === propertyId) || MOCK_PROPERTIES[0];
        setProperty(fallback);
      } finally {
        setLoading(false);
      }
    }
    if (propertyId) loadProperty();
  }, [propertyId]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (inquiryType === "visit") {
        await fetchApi("/site-visits", {
          method: "POST",
          body: JSON.stringify({
            property_id: propertyId,
            preferred_date: visitDate || "2026-09-20",
            preferred_time: visitTime,
            visitor_count: 2,
            message: leadMessage
          })
        });
      } else {
        await fetchApi("/leads", {
          method: "POST",
          body: JSON.stringify({
            property_id: propertyId,
            name: leadName,
            phone: leadPhone,
            email: leadEmail,
            message: leadMessage,
            interest_type: "Request Callback / Rent Inquiry"
          })
        });
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit inquiry", err);
      // Still show success to user in fallback demo mode
      setSubmitted(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-red-600 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs uppercase font-bold tracking-widest text-red-600">Loading Rental Listing...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center font-sans">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Rental Property Not Found</h2>
          <button onClick={() => router.push("/properties")} className="text-sm font-semibold text-red-600 hover:underline">
            Back to All Rentals
          </button>
        </div>
      </div>
    );
  }

  const mediaList = property.media || [];
  const activeMedia = mediaList[activeMediaIndex] || {
    url: "/images/farmhouse-hero.jpg"
  };

  const isPG = property.property_type?.toUpperCase() === "PG";
  const isShop = property.property_type?.toUpperCase() === "SHOP";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* Breadcrumb & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.back()}
            className="text-xs font-semibold text-gray-600 hover:text-red-600 flex items-center gap-1.5 transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to All Rentals
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-semibold ${
                isSaved ? "bg-red-50 text-red-600 border-red-200" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? "fill-red-600 text-red-600" : ""}`} />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: property.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Rental listing URL copied to clipboard!");
                }
              }}
              className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-all text-xs font-semibold flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-red-600 text-white">
                FOR RENT
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200">
                {property.property_type === "PG" ? "PG / Co-Living" : property.property_type}
              </span>
              {property.verification_status === "VERIFIED" && (
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-red-600" />
                  Verified Landlord
                </span>
              )}
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
                Zero Brokerage
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-medium">
              <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>
                {property.location ? `${property.location.address || ""}, ${property.location.locality}, ${property.location.city}, ${property.location.state}` : "India"}
              </span>
            </div>
          </div>

          {/* Price Box */}
          <div className="lg:text-right border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-100 flex-shrink-0">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider block mb-1">
              Monthly Rent
            </span>
            <div className="text-3xl sm:text-4xl font-black text-red-600 tracking-tight">
              {formatRentPrice(property.price)}
            </div>
            <div className="flex items-center gap-3 mt-1.5 lg:justify-end text-xs text-gray-500">
              <span className="font-medium text-gray-700">Deposit: ₹{(property.price * 2).toLocaleString("en-IN")}</span>
              <span>•</span>
              <span className="text-red-600 font-semibold">Ready to Move</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Media Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          
          {/* Media View Mode Tabs */}
          <div className="flex items-center space-x-2 mb-4 bg-gray-100 p-1.5 rounded-xl w-fit text-xs font-bold">
            <button
              onClick={() => setActiveTab("photos")}
              className={`px-4 py-2 rounded-lg font-bold uppercase tracking-wider transition-all ${
                activeTab === "photos" ? "bg-red-600 text-white shadow-md shadow-red-600/20" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Rental Photos ({mediaList.length})
            </button>
            <button
              onClick={() => setActiveTab("360tour")}
              className={`px-4 py-2 rounded-lg font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                activeTab === "360tour" ? "bg-red-600 text-white shadow-md shadow-red-600/20" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Compass className="w-4 h-4" />
              360° Virtual Tour
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`px-4 py-2 rounded-lg font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                activeTab === "video" ? "bg-red-600 text-white shadow-md shadow-red-600/20" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Video className="w-4 h-4" />
              Video Tour
            </button>
          </div>

          {/* Media Player Viewport */}
          <div className="relative h-[380px] sm:h-[500px] w-full rounded-xl overflow-hidden bg-gray-900">
            {activeTab === "photos" && (
              <Image
                src={activeMedia.url}
                alt={property.title}
                fill
                className="object-cover"
                priority
              />
            )}

            {activeTab === "360tour" && (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center">
                <Compass className="w-16 h-16 text-red-500 animate-spin mb-4" />
                <h3 className="text-2xl font-bold mb-2">Interactive 360° Panoramic View</h3>
                <p className="text-xs text-gray-300 max-w-md">
                  Inspect the complete living spaces, rooms, kitchen, and bathroom in ultra-clear 360° virtual preview.
                </p>
              </div>
            )}

            {activeTab === "video" && (
              <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white p-6 text-center">
                <Video className="w-16 h-16 text-red-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2">HD Property Walkthrough Video</h3>
                <p className="text-xs text-gray-300 max-w-md">
                  Full walk-around video showcasing room dimensions, natural lighting, and neighborhood surroundings.
                </p>
              </div>
            )}
          </div>

          {/* Media Thumbnails Slider */}
          {activeTab === "photos" && mediaList.length > 1 && (
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
              {mediaList.map((m, idx) => (
                <button
                  key={m.id || idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeMediaIndex === idx ? "border-red-600 ring-2 ring-red-600/30 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={m.url} alt="Thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Main Content & Booking Form Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: Property Information */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Specs Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
                <Building2 className="w-6 h-6 text-red-600 mx-auto mb-1.5" />
                <span className="text-[11px] text-gray-500 uppercase font-semibold block">Property Type</span>
                <span className="text-sm font-bold text-gray-900">
                  {property.property_type}
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
                <Maximize2 className="w-6 h-6 text-red-600 mx-auto mb-1.5" />
                <span className="text-[11px] text-gray-500 uppercase font-semibold block">Carpet Area</span>
                <span className="text-sm font-bold text-gray-900">
                  {property.built_up_area_sqft ? `${property.built_up_area_sqft.toLocaleString()} sqft` : "Spacious"}
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
                <Bed className="w-6 h-6 text-red-600 mx-auto mb-1.5" />
                <span className="text-[11px] text-gray-500 uppercase font-semibold block">
                  {isPG ? "Room Sharing" : isShop ? "Units / Floor" : "Bedrooms"}
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {isPG ? "Single / Double" : isShop ? "Ground Floor" : property.bedrooms ? `${property.bedrooms} BHK` : "1 BHK"}
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
                <Bath className="w-6 h-6 text-red-600 mx-auto mb-1.5" />
                <span className="text-[11px] text-gray-500 uppercase font-semibold block">Bathrooms</span>
                <span className="text-sm font-bold text-gray-900">
                  {property.bathrooms ? `${property.bathrooms} Attached` : "1 Attached"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-600" />
                About This Rental
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed font-normal whitespace-pre-line">
                {property.description}
              </p>

              {/* Highlights */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-gray-100">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-700">
                  <Key className="w-4 h-4 text-red-600" />
                  <span>Immediate Move-in Available</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-700">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span>Flexible 6 - 11 Month Lease Agreement</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-red-600" />
                  <span>Verified Landlord & Safe Locality</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-700">
                  <Check className="w-4 h-4 text-red-600" />
                  <span>Zero Hidden Brokerage Commission</span>
                </div>
              </div>
            </div>

            {/* Visual Amenities Cards */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-600" />
                Included Amenities & Facilities
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities && property.amenities.length > 0 ? (
                  property.amenities.map((am) => (
                    <div key={am.id} className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="text-xs font-semibold text-gray-800">{am.name}</span>
                    </div>
                  ))
                ) : (
                  [
                    "High-Speed Wi-Fi",
                    "Power Backup 24x7",
                    "24x7 Security & CCTV",
                    "RO Drinking Water",
                    "Daily Housekeeping",
                    "Covered Parking"
                  ].map((name, i) => (
                    <div key={i} className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="text-xs font-semibold text-gray-800">{name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Verified Rental Assurance Block */}
            <div className="bg-red-50 rounded-2xl border border-red-200 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-red-950">RENTED Verified Protection</h3>
                  <p className="text-xs text-red-700">100% genuine listing with verified landlord ownership documentation.</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pt-2">
                Every PG, House, Flat, and Shop listed on RENTED is physically verified. We ensure transparent security deposit return policies, zero broker harassment, and free digital rent agreements.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Contact Landlord & Book Visit Sticky Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border-2 border-red-600 shadow-xl shadow-red-50 space-y-5 sticky top-28">
              
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs uppercase font-bold tracking-wider text-red-600 block mb-1">
                  Direct Contact
                </span>
                <h3 className="text-xl font-extrabold text-gray-900">
                  {inquiryType === "visit" ? "Book Free Property Visit" : "Connect with Landlord"}
                </h3>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-red-50 border border-red-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-red-600 mx-auto" />
                  <h4 className="text-base font-bold text-red-950">Request Submitted!</h4>
                  <p className="text-xs text-red-800">
                    The property manager and landlord have received your inquiry. You will be contacted shortly on your mobile number.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-red-600 hover:underline pt-2 block mx-auto"
                  >
                    Submit another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-4 font-sans text-xs">
                  
                  {/* Mode Selector */}
                  <div className="flex rounded-lg bg-gray-100 p-1 border border-gray-200">
                    <button
                      type="button"
                      onClick={() => setInquiryType("callback")}
                      className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
                        inquiryType === "callback" ? "bg-red-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Instant Callback
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryType("visit")}
                      className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
                        inquiryType === "visit" ? "bg-red-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Book Visit
                    </button>
                  </div>

                  <div>
                    <label className="text-gray-700 font-bold block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="e.g. Aman Sharma"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 font-bold block mb-1">Mobile Number (WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 font-bold block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="aman@example.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  {inquiryType === "visit" && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-gray-700 font-bold block mb-1">Visit Date</label>
                        <input
                          type="date"
                          required
                          value={visitDate}
                          onChange={(e) => setVisitDate(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-gray-900 focus:outline-none focus:border-red-600 focus:bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 font-bold block mb-1">Preferred Time</label>
                        <select
                          value={visitTime}
                          onChange={(e) => setVisitTime(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-gray-900 focus:outline-none focus:border-red-600 focus:bg-white text-xs"
                        >
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="03:00 PM">03:00 PM</option>
                          <option value="05:00 PM">05:00 PM</option>
                          <option value="07:00 PM">07:00 PM</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-gray-700 font-bold block mb-1">Note for Landlord</label>
                    <textarea
                      rows={2}
                      value={leadMessage}
                      onChange={(e) => setLeadMessage(e.target.value)}
                      placeholder="e.g. Looking to shift by next month, need single room..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>{inquiryType === "visit" ? "Book Free Site Visit" : "Get Landlord Contact"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-gray-500 text-center">
                    🔒 By clicking submit, you agree to our direct rental terms. Zero broker commission.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
