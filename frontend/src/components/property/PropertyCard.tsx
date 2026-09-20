"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types";
import { formatIndianPrice, formatLandArea } from "@/lib/utils";
import { ShieldCheck, Heart, Bed, Bath, Maximize2, MapPin, ArrowRight, UserCheck } from "lucide-react";
import Card3D from "@/components/ui/Card3D";

interface PropertyCardProps {
  property: Property;
  onFavoriteToggle?: (id: string) => void;
  isFavorite?: boolean;
}

export default function PropertyCard({ property, onFavoriteToggle, isFavorite = false }: PropertyCardProps) {
  const getFallbackImage = (type?: string) => {
    if (type === "PG") return "/images/bedroom.jpg";
    if (type === "Flat") return "/images/estate.jpg";
    if (type === "House") return "/images/bungalow.jpg";
    if (type === "Shop") return "/images/hills.jpg";
    return "/images/farmhouse-hero.jpg";
  };

  const defaultImg = getFallbackImage(property.property_type);
  const primaryMedia = property.media?.find((m) => m.is_primary) || property.media?.[0];
  const [imgSrc, setImgSrc] = useState(
    primaryMedia?.url && !primaryMedia.url.includes("unsplash.com")
      ? primaryMedia.url
      : defaultImg
  );
  const [fav, setFav] = useState(isFavorite);

  useEffect(() => {
    const freshDefault = getFallbackImage(property.property_type);
    const freshMedia = property.media?.find((m) => m.is_primary) || property.media?.[0];
    setImgSrc(
      freshMedia?.url && !freshMedia.url.includes("unsplash.com")
        ? freshMedia.url
        : freshDefault
    );
  }, [property]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFav(!fav);
    if (onFavoriteToggle) {
      onFavoriteToggle(property.id);
    }
  };

  return (
    <Card3D intensity={8} depth={15} className="h-full">
      <div className="group relative bosa-card rounded-2xl overflow-hidden flex flex-col h-full bg-white shadow-md border border-slate-200 hover:border-red-400 hover:shadow-xl transition-all duration-300">
        
        {/* 1. Image Container */}
        <div className="relative h-64 w-full overflow-hidden bg-slate-900">
          <Image
            src={imgSrc}
            alt={property.title}
            fill
            onError={() => setImgSrc(defaultImg)}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

          {/* Top Header Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md text-[11px] font-heading font-bold uppercase tracking-wider bg-red-400 text-white shadow-md">
                FOR RENT
              </span>
              {property.verification_status === "VERIFIED" && (
                <span className="px-2.5 py-1 rounded-md text-[10px] font-sans font-medium bg-red-950/90 text-red-200 border border-red-400/40 backdrop-blur-md flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-300" />
                  Verified
                </span>
              )}
            </div>

            <button
              onClick={handleFavoriteClick}
              className="w-9 h-9 rounded-full bg-white/90 border border-slate-200 hover:border-red-400 flex items-center justify-center backdrop-blur-md text-slate-700 hover:text-red-400 transition-colors shadow-sm"
            >
              <Heart className={`w-4 h-4 ${fav ? "fill-red-400 text-red-400" : ""}`} />
            </button>
          </div>

          {/* Bottom Property Type Tag */}
          <div className="absolute bottom-3 left-3.5 z-10">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-slate-900/90 text-white border border-slate-700 backdrop-blur-md">
              {property.property_type}
            </span>
          </div>
        </div>

        {/* 2. Content Details Section */}
        <div className="p-6 flex flex-col flex-grow justify-between font-sans">
          <div>
            {/* Price Header */}
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-heading text-2xl font-extrabold text-red-400">
                {formatIndianPrice(property.price, true)}
              </span>
              {property.furnishing && (
                <span className="text-[11px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded">
                  {property.furnishing}
                </span>
              )}
            </div>

            {/* Title */}
            <Link href={`/properties/${property.id}`} className="block">
              <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                {property.title}
              </h3>
            </Link>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-2">
              <MapPin className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span className="truncate">
                {property.location ? `${property.location.locality}, ${property.location.city}` : "India"}
              </span>
            </div>
          </div>

          {/* 3. Specs Bar */}
          <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs text-slate-700 bg-slate-50 rounded-xl p-3 border border-slate-200">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-slate-900 font-semibold font-heading">
                <Maximize2 className="w-3.5 h-3.5 text-red-400" />
                <span>{property.built_up_area_sqft || property.land_area_sqft_normalized || 500} sqft</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5">Carpet Area</span>
            </div>

            {property.property_type === "Shop" ? (
              <div className="flex flex-col items-center border-x border-slate-200">
                <span className="text-slate-900 font-semibold font-heading">Commercial</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Retail Shop</span>
              </div>
            ) : property.bedrooms !== undefined && property.bedrooms > 0 ? (
              <div className="flex flex-col items-center border-x border-slate-200">
                <div className="flex items-center gap-1 text-slate-900 font-semibold font-heading">
                  <Bed className="w-3.5 h-3.5 text-red-400" />
                  <span>{property.bedrooms} {property.property_type === "PG" ? "Bed" : "BHK"}</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5">{property.property_type === "PG" ? "Sharing" : "Bedrooms"}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center border-x border-slate-200">
                <span className="text-slate-900 font-semibold font-heading">{property.property_type}</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Type</span>
              </div>
            )}

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-slate-900 font-semibold font-heading">
                <Bath className="w-3.5 h-3.5 text-red-400" />
                <span>{property.bathrooms || 1} Bath</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5">Washroom</span>
            </div>
          </div>

          {/* 4. Seller Info Footer & Action Link */}
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-400">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] text-slate-600 font-medium truncate max-w-[120px]">
                {property.owner_name || "Verified Landlord"}
              </span>
            </div>

            <Link
              href={`/properties/${property.id}`}
              className="px-3.5 py-1.5 rounded-lg bg-red-400 hover:bg-red-500 text-white font-heading font-semibold text-xs flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </Card3D>
  );
}

