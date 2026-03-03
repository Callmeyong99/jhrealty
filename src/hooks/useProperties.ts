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
  const data: ApiProperty[] = await res.json();
  return data.map((p) => ({ ...p, image: convertGoogleDriveUrl(p.image) }));
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
