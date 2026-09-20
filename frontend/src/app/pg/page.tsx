import React, { Suspense } from "react";
import CategoryRentalView from "@/components/category/CategoryRentalView";

export const metadata = {
  title: "PG & Co-Living Hostels for Rent | RENTED.IN",
  description: "Verified Paying Guest (PG) accommodation and co-living hostels across India. Single and sharing rooms with meals.",
};

export default function PGPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-red-400 font-bold">Loading PG Listings...</div>}>
      <CategoryRentalView
        category="PG"
        title="PG & Co-Living Hostels"
        badge="Single & Sharing Rooms"
        description="Verified Paying Guest accommodations and modern co-living hostels with high-speed WiFi, daily meals, laundry, and zero brokerage options."
      />
    </Suspense>
  );
}
