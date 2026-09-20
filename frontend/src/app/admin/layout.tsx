import React from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export const metadata = {
  title: "Admin Portal | RENTED.IN Platform Governance",
  description: "Platform governance, listing approvals, and rental moderation suite",
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
