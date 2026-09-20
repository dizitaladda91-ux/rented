import React, { Suspense } from "react";
import CategoryRentalView from "@/components/category/CategoryRentalView";

export const metadata = {
  title: "Commercial Retail Shops & Showrooms for Rent | RENTED.IN",
  description: "Verified commercial retail shops, high footfall market spaces, and office retail units for rent across India.",
};

export default function ShopsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-red-400 font-bold">Loading Shop Listings...</div>}>
      <CategoryRentalView
        category="Shop"
        title="Commercial Retail Shops"
        badge="High Footfall Market Locations"
        description="Premium commercial shops, market retail units, and road-facing spaces with verified landlord agreements and prime consumer footfall."
      />
    </Suspense>
  );
}
