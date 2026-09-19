import { Property } from "@/types";

export const MOCK_PROPERTIES: Property[] = [
  // 1. PG - Delhi (North Campus)
  {
    id: "pg-delhi-kamlanagar-1",
    title: "Zolo Stanza Luxury Student & Professional PG",
    slug: "zolo-stanza-luxury-student-pg-kamla-nagar",
    description: "Premium air-conditioned PG for students and working professionals near Delhi University North Campus. Includes 3-times hygienic buffet meals, high-speed 300 Mbps Wi-Fi, daily housekeeping, biometric security, and attached washrooms.",
    property_type: "PG",
    price: 11500,
    land_area_value: 350,
    land_area_unit: "sqft",
    land_area_sqft_normalized: 350,
    built_up_area_sqft: 280,
    bedrooms: 1,
    bathrooms: 1,
    furnishing: "Fully Furnished",
    status: "AVAILABLE",
    verification_status: "VERIFIED",
    is_featured: true,
    owner_id: "seller-pg-1",
    location_id: "loc-pg-1",
    location: {
      id: "loc-pg-1",
      state: "Delhi",
      city: "Delhi",
      locality: "Kamla Nagar, North Campus",
      address: "B-Block, Near Hansraj College Gate, Kamla Nagar",
      pincode: "110007",
    },
    media: [
      { id: "m1", property_id: "pg-delhi-kamlanagar-1", media_type: "IMAGE", url: "/images/bedroom.jpg", is_primary: true, display_order: 0 },
      { id: "m2", property_id: "pg-delhi-kamlanagar-1", media_type: "IMAGE", url: "/images/farmhouse-hero.jpg", is_primary: false, display_order: 1 }
    ],
    amenities: [
      { id: "a1", name: "High-Speed Wi-Fi" },
      { id: "a2", name: "3 Meals Included" },
      { id: "a3", name: "AC & Geyser" },
      { id: "a4", name: "Daily Housekeeping" }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // 2. Flat - Gurgaon (Golf Course Road)
  {
    id: "flat-gurgaon-dlf-2",
    title: "DLF The Crest 3 BHK Luxury Gated Flat",
    slug: "dlf-the-crest-3bhk-luxury-flat-gurgaon",
    description: "Ultra-spacious 3 BHK apartment in DLF Phase 5 on Golf Course Road. Features Italian marble flooring, modular kitchen with chimney & dishwasher, panoramic balcony facing Aravalli hills, and access to an Olympic pool and clubhouse.",
    property_type: "Flat",
    price: 48000,
    land_area_value: 1850,
    land_area_unit: "sqft",
    land_area_sqft_normalized: 1850,
    built_up_area_sqft: 1850,
    bedrooms: 3,
    bathrooms: 3,
    furnishing: "Semi Furnished",
    status: "AVAILABLE",
    verification_status: "VERIFIED",
    is_featured: true,
    owner_id: "seller-flat-2",
    location_id: "loc-flat-2",
    location: {
      id: "loc-flat-2",
      state: "Haryana",
      city: "Gurgaon",
      locality: "Golf Course Road, DLF Phase 5",
      address: "Tower 4, DLF The Crest, Sector 54",
      pincode: "122002",
    },
    media: [
      { id: "m3", property_id: "flat-gurgaon-dlf-2", media_type: "IMAGE", url: "/images/estate.jpg", is_primary: true, display_order: 0 },
      { id: "m4", property_id: "flat-gurgaon-dlf-2", media_type: "IMAGE", url: "/images/bedroom.jpg", is_primary: false, display_order: 1 }
    ],
    amenities: [
      { id: "a5", name: "24/7 Gated Security" },
      { id: "a6", name: "Clubhouse & Gym" },
      { id: "a7", name: "Reserved Car Parking" },
      { id: "a8", name: "100% Power Backup" }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // 3. House - South Delhi (Greater Kailash)
  {
    id: "house-delhi-gk-3",
    title: "Independent 4 BHK Luxury Builder House Floor",
    slug: "independent-4bhk-builder-house-gk-delhi",
    description: "Independent first-floor residence with private terrace and elevator access in GK-1. Spacious living lounge, modular German kitchen, 4 en-suite bedrooms, private driveway with 2 covered car parks, and zero society disturbance.",
    property_type: "House",
    price: 65000,
    land_area_value: 300,
    land_area_unit: "sqyd",
    land_area_sqft_normalized: 2700,
    built_up_area_sqft: 2400,
    bedrooms: 4,
    bathrooms: 4,
    furnishing: "Fully Furnished",
    status: "AVAILABLE",
    verification_status: "VERIFIED",
    is_featured: true,
    owner_id: "seller-house-3",
    location_id: "loc-house-3",
    location: {
      id: "loc-house-3",
      state: "Delhi",
      city: "Delhi",
      locality: "Greater Kailash 1",
      address: "M-Block, Near M-Block Market, GK-1",
      pincode: "110048",
    },
    media: [
      { id: "m5", property_id: "house-delhi-gk-3", media_type: "IMAGE", url: "/images/bungalow.jpg", is_primary: true, display_order: 0 },
      { id: "m6", property_id: "house-delhi-gk-3", media_type: "IMAGE", url: "/images/bedroom.jpg", is_primary: false, display_order: 1 }
    ],
    amenities: [
      { id: "a9", name: "Private Lift Access" },
      { id: "a10", name: "Private Terrace Garden" },
      { id: "a11", name: "2 Dedicated Parking" },
      { id: "a12", name: "CCTV Surveillance" }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // 4. Shop - Noida (Sector 18 Commercial Hub)
  {
    id: "shop-noida-sec18-4",
    title: "Corner High-Footfall Commercial Retail Shop",
    slug: "corner-high-footfall-commercial-shop-noida-sec18",
    description: "Front-facing ground floor commercial retail shop in Noida Sector 18 main market, directly opposite the metro station. Ideal for fashion boutique, electronics store, quick-service restaurant (QSR), medical clinic, or mobile showroom.",
    property_type: "Shop",
    price: 35000,
    land_area_value: 650,
    land_area_unit: "sqft",
    land_area_sqft_normalized: 650,
    built_up_area_sqft: 650,
    bedrooms: 0,
    bathrooms: 1,
    furnishing: "Unfurnished",
    status: "AVAILABLE",
    verification_status: "VERIFIED",
    is_featured: true,
    owner_id: "seller-shop-4",
    location_id: "loc-shop-4",
    location: {
      id: "loc-shop-4",
      state: "Uttar Pradesh",
      city: "Noida",
      locality: "Sector 18 Market",
      address: "Shop No. G-12, Block J, Sector 18",
      pincode: "201301",
    },
    media: [
      { id: "m7", property_id: "shop-noida-sec18-4", media_type: "IMAGE", url: "/images/hills.jpg", is_primary: true, display_order: 0 },
      { id: "m8", property_id: "shop-noida-sec18-4", media_type: "IMAGE", url: "/images/estate.jpg", is_primary: false, display_order: 1 }
    ],
    amenities: [
      { id: "a13", name: "Main Road Frontage" },
      { id: "a14", name: "High Footfall Zone" },
      { id: "a15", name: "3-Phase Commercial Power" },
      { id: "a16", name: "Visitor Parking" }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // 5. Flat - Bangalore (Koramangala 2 BHK)
  {
    id: "flat-bangalore-kora-5",
    title: "Modern 2 BHK Furnished Flat with Balcony",
    slug: "modern-2bhk-furnished-flat-koramangala-bangalore",
    description: "Bright and airy 2 BHK apartment in 4th Block Koramangala. 5 minutes walk from Sony World signal, tech parks, and trendy cafes. Fully furnished with modular kitchen, smart TV, sofa set, and workstation desks.",
    property_type: "Flat",
    price: 28000,
    land_area_value: 1200,
    land_area_unit: "sqft",
    land_area_sqft_normalized: 1200,
    built_up_area_sqft: 1150,
    bedrooms: 2,
    bathrooms: 2,
    furnishing: "Fully Furnished",
    status: "AVAILABLE",
    verification_status: "VERIFIED",
    is_featured: true,
    owner_id: "seller-flat-5",
    location_id: "loc-flat-5",
    location: {
      id: "loc-flat-5",
      state: "Karnataka",
      city: "Bangalore",
      locality: "Koramangala 4th Block",
      address: "12th Cross, Near Sony World Junction",
      pincode: "560034",
    },
    media: [
      { id: "m9", property_id: "flat-bangalore-kora-5", media_type: "IMAGE", url: "/images/bedroom.jpg", is_primary: true, display_order: 0 },
      { id: "m10", property_id: "flat-bangalore-kora-5", media_type: "IMAGE", url: "/images/villa.jpg", is_primary: false, display_order: 1 }
    ],
    amenities: [
      { id: "a17", name: "High Speed Fiber" },
      { id: "a18", name: "Security & Intercom" },
      { id: "a19", name: "Covered Bike/Car Parking" }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // 6. PG - Bangalore (HSR Layout)
  {
    id: "pg-bangalore-hsr-6",
    title: "Executive Co-Living Single & Double Sharing PG",
    slug: "executive-coliving-sharing-pg-hsr-layout",
    description: "Top-rated co-living residency in HSR Sector 2. Walking distance to BDA complex and startup offices. Includes delicious North & South Indian meals, laundry services, gaming zone, and high-speed Wi-Fi.",
    property_type: "PG",
    price: 9500,
    land_area_value: 280,
    land_area_unit: "sqft",
    land_area_sqft_normalized: 280,
    built_up_area_sqft: 220,
    bedrooms: 1,
    bathrooms: 1,
    furnishing: "Fully Furnished",
    status: "AVAILABLE",
    verification_status: "VERIFIED",
    is_featured: true,
    owner_id: "seller-pg-6",
    location_id: "loc-pg-6",
    location: {
      id: "loc-pg-6",
      state: "Karnataka",
      city: "Bangalore",
      locality: "HSR Layout Sector 2",
      address: "27th Main, Sector 2, HSR Layout",
      pincode: "560102",
    },
    media: [
      { id: "m11", property_id: "pg-bangalore-hsr-6", media_type: "IMAGE", url: "/images/bedroom.jpg", is_primary: true, display_order: 0 },
      { id: "m12", property_id: "pg-bangalore-hsr-6", media_type: "IMAGE", url: "/images/estate.jpg", is_primary: false, display_order: 1 }
    ],
    amenities: [
      { id: "a20", name: "Food Included" },
      { id: "a21", name: "Wi-Fi & Power Backup" },
      { id: "a22", name: "Washing Machine" }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // 7. House - Pune (Koregaon Park)
  {
    id: "house-pune-kp-7",
    title: "Independent 3 BHK Garden House for Family",
    slug: "independent-3bhk-garden-house-koregaon-park",
    description: "Quiet, tree-lined residential independent house with landscaped lawn in Koregaon Park Lane 7. Pet-friendly, quiet neighborhood, modern fittings, water heater, modular kitchen, and garage.",
    property_type: "House",
    price: 42000,
    land_area_value: 2200,
    land_area_unit: "sqft",
    land_area_sqft_normalized: 2200,
    built_up_area_sqft: 1950,
    bedrooms: 3,
    bathrooms: 3,
    furnishing: "Semi Furnished",
    status: "AVAILABLE",
    verification_status: "VERIFIED",
    is_featured: false,
    owner_id: "seller-house-7",
    location_id: "loc-house-7",
    location: {
      id: "loc-house-7",
      state: "Maharashtra",
      city: "Pune",
      locality: "Koregaon Park",
      address: "Lane 7, Near South Main Road",
      pincode: "411001",
    },
    media: [
      { id: "m13", property_id: "house-pune-kp-7", media_type: "IMAGE", url: "/images/villa.jpg", is_primary: true, display_order: 0 },
      { id: "m14", property_id: "house-pune-kp-7", media_type: "IMAGE", url: "/images/bedroom.jpg", is_primary: false, display_order: 1 }
    ],
    amenities: [
      { id: "a23", name: "Private Garden" },
      { id: "a24", name: "Pet Friendly" },
      { id: "a25", name: "Covered Garage" }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // 8. Shop - Mumbai (Bandra West Commercial Showroom)
  {
    id: "shop-mumbai-bandra-8",
    title: "Prime Commercial Boutique Showroom Shop",
    slug: "prime-commercial-boutique-showroom-bandra-west",
    description: "Prime street-facing commercial shop on Linking Road, Bandra West. Massive glass facade, heavy pedestrian footfall, ideal for luxury apparel, lifestyle brand, coffee lounge, or eyewear outlet.",
    property_type: "Shop",
    price: 85000,
    land_area_value: 800,
    land_area_unit: "sqft",
    land_area_sqft_normalized: 800,
    built_up_area_sqft: 800,
    bedrooms: 0,
    bathrooms: 1,
    furnishing: "Unfurnished",
    status: "AVAILABLE",
    verification_status: "VERIFIED",
    is_featured: true,
    owner_id: "seller-shop-8",
    location_id: "loc-shop-8",
    location: {
      id: "loc-shop-8",
      state: "Maharashtra",
      city: "Mumbai",
      locality: "Bandra West",
      address: "Linking Road, Near Khar Telephone Exchange",
      pincode: "400050",
    },
    media: [
      { id: "m15", property_id: "shop-mumbai-bandra-8", media_type: "IMAGE", url: "/images/bungalow.jpg", is_primary: true, display_order: 0 },
      { id: "m16", property_id: "shop-mumbai-bandra-8", media_type: "IMAGE", url: "/images/hills.jpg", is_primary: false, display_order: 1 }
    ],
    amenities: [
      { id: "a26", name: "Glass Display Frontage" },
      { id: "a27", name: "Linking Road Facing" },
      { id: "a28", name: "Heavy Footfall" }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];
