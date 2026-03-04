import { useQuery } from "@tanstack/react-query";

const API_URL =
  "https://script.google.com/macros/s/AKfycbw1QmWv9POS8BpkeEg3SL72IzXoZkDliqbt0qOPauHWPg2wJiP6Yg0eoiRxqJ30rKjn5g/exec";

export interface ApiProperty {
  id: string;
  title: string;
  titleEn: string;
  location: string;
  locationEn: string;
  price: number;
  estRepayment: number;
  beds: number;
  baths: number;
  area: number;
  image: string;
  images: string[];
  floorPlan: string;
  description: string;
  descriptionEn: string;
  propertyType: string;
  developer: string;
  tenure: string;
  completionYear: number;
  totalUnits: number;
  status: string;
  orientation: string;
  parking: number;
  yearBuilt: number;
  features: string[];
  facilities: string[];
  highlights: string[];
}

const convertGoogleDriveUrl = (url: string): string => {
  const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  return url;
};

const fetchProperties = async (): Promise<ApiProperty[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch properties");
  const data = await res.json();
  return data.map((p: any) => {
    const mainImage = convertGoogleDriveUrl(p.image || "");
    // Parse images field: comma-separated URLs from Google Sheet
    const rawImages = typeof p.images === "string" && p.images.trim()
      ? p.images.split(",").map((url: string) => convertGoogleDriveUrl(url.trim()))
      : [];
    // Ensure main image is first, deduplicate
    const allImages = [mainImage, ...rawImages.filter((img: string) => img !== mainImage)].filter(Boolean);
    const floorPlan = p.floorPlan ? convertGoogleDriveUrl(p.floorPlan) : "";
    return { ...p, image: mainImage, images: allImages, floorPlan };
  });
};

export const useProperties = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
    staleTime: 5 * 60 * 1000, // 5 min cache
  });
};

export const formatPrice = (price: number): string => {
  if (price >= 10000) return `RM ${(price / 1000).toFixed(0)}K`;
  return `RM ${price.toLocaleString()}`;
};
