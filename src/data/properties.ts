import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

export interface Property {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  description: string;
  features: string[];
  yearBuilt: string;
  parking: string;
  orientation: string;
}

export const properties: Property[] = [
  {
    id: "city-skyline-apartment",
    image: property1,
    title: "城市天际公寓",
    location: "市中心金融区",
    price: "¥680万",
    beds: 3,
    baths: 2,
    area: "168㎡",
    description:
      "坐落于城市核心金融区，尽享繁华都市天际线景观。精装修交付，高品质建材，智能家居系统全覆盖。小区配备24小时安保、恒温泳池、空中花园等高端配套，是都市精英的理想居所。",
    features: ["智能家居系统", "恒温泳池", "空中花园", "24小时安保", "地下车库", "精装交付"],
    yearBuilt: "2023年",
    parking: "2个车位",
    orientation: "南北通透",
  },
  {
    id: "ocean-view-penthouse",
    image: property2,
    title: "海景顶层豪宅",
    location: "滨海新区",
    price: "¥1,280万",
    beds: 4,
    baths: 3,
    area: "320㎡",
    description:
      "滨海新区稀缺顶层豪宅，270°无遮挡海景视野。超大露台可举办私人派对，主卧配备独立衣帽间及豪华浴室。社区自带私家沙滩、游艇码头，尽享顶级滨海生活。",
    features: ["270°海景", "超大露台", "私家沙滩", "游艇码头", "独立衣帽间", "豪华主卧浴室"],
    yearBuilt: "2024年",
    parking: "3个车位",
    orientation: "全南户型",
  },
  {
    id: "garden-villa",
    image: property3,
    title: "花园独栋别墅",
    location: "城北生态区",
    price: "¥520万",
    beds: 5,
    baths: 3,
    area: "260㎡",
    description:
      "城北生态区低密度独栋别墅，私家花园面积超200㎡。周边自然资源丰富，紧邻森林公园与湖泊。双车库设计，地下室可改造为影音室或健身房，是家庭居住的不二之选。",
    features: ["200㎡私家花园", "双车库", "地下室", "森林公园旁", "湖景资源", "低密度社区"],
    yearBuilt: "2022年",
    parking: "双车库",
    orientation: "南北通透",
  },
];

export const getPropertyById = (id: string) => properties.find((p) => p.id === id);
