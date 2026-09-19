import React from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export const metadata = {
  title: "Admin Portal | Farmhouse & Luxury Real Estate Marketplace",
  description: "Platform governance and title verification suite",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]} portalName="Admin Governance Portal">
      {children}
    </ProtectedRoute>
  );
}
