import type { Metadata } from "next";
import "@/app/globals.css";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: "RENTED | PG, House, Flat & Shop Rental Marketplace India",
  description: "Find and rent verified PGs, Hostels, Flats, Independent Houses, and Commercial Shops across Delhi NCR, Bangalore, Mumbai, Pune & Hyderabad. Direct landlord connect, zero brokerage.",
  keywords: ["PG for rent", "Flat for rent", "House for rent", "Shop for rent", "Co-living PG", "RENTED", "Zero Brokerage Rentals"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans antialiased selection:bg-red-600 selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
