import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatIndianPrice(amount: number, isRent: boolean = true): string {
  if (!amount || amount === 0) return "Rent on Request";
  const suffix = isRent ? " / mo" : "";
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹ ${cr.toFixed(2).replace(/\.00$/, "")} Cr${suffix}`;
  } else if (amount >= 100000) {
    const lakh = amount / 100000;
    return `₹ ${lakh.toFixed(2).replace(/\.00$/, "")} Lakh${suffix}`;
  } else {
    return `₹ ${amount.toLocaleString("en-IN")}${suffix}`;
  }
}

export function formatRentPrice(amount: number): string {
  return formatIndianPrice(amount, true);
}

export function formatLandArea(value: number, unit: string): string {
  const unitLabels: Record<string, string> = {
    sqft: "Sq.Ft.",
    sqyd: "Sq.Yd.",
    acre: "Acres",
    bigha: "Bigha",
  };
  const label = unitLabels[unit?.toLowerCase()] || unit;
  return `${value} ${label}`;
}
