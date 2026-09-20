import React, { Suspense } from "react";
import CategoryRentalView from "@/components/category/CategoryRentalView";

export const metadata = {
  title: "Flats & Apartments for Rent | RENTED.IN",
  description: "Verified 1 BHK, 2 BHK, 3 BHK flats and high-rise apartments available for rent across prime Indian cities.",
};

export default function FlatsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-red-400 font-bold">Loading Flat Listings...</div>}>
      <CategoryRentalView
        category="Flat"
        title="Flats & Apartments"
        badge="Gated Societies & High-Rise Floors"
        description="Explore 1 BHK, 2 BHK, and 3 BHK rental apartments in secure gated societies with round-the-clock security, parking, and clubhouse amenities."
      />
    </Suspense>
  );
}
