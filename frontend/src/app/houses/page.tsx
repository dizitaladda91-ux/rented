import React, { Suspense } from "react";
import CategoryRentalView from "@/components/category/CategoryRentalView";

export const metadata = {
  title: "Independent Houses & Floors for Rent | RENTED.IN",
  description: "Verified independent houses, builder floors, and private duplex homes available for rent with zero brokerage.",
};

export default function HousesPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-red-400 font-bold">Loading House Listings...</div>}>
      <CategoryRentalView
        category="House"
        title="Independent Houses & Floors"
        badge="Independent Living & Builder Floors"
        description="Spacious builder floors, independent houses, and private residences with personal terrace, dedicated parking, and full autonomy."
      />
    </Suspense>
  );
}
