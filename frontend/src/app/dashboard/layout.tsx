import React from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export const metadata = {
  title: "Seller Dashboard | Farmhouse & Luxury Real Estate Marketplace",
  description: "Seller management, leads, and site visit scheduling suite",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["SELLER", "ADMIN"]} portalName="Seller Advisory Suite">
      {children}
    </ProtectedRoute>
  );
}
