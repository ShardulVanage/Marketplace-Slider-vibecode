export interface Slide {
  id: number;
  title: string;
  titleStyle?: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  image: string;
  productLabel: string;
  description: string;
  price: string;
  details: string[];
  badge?: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    title: "specter_dsgn",
    titleStyle: "italic font-black text-9xl",
    subtitle: "Black FM Fire STRAIGHT!",
    bgColor: "#DE3333",
    textColor: "#FFFF00",
    accentColor: "#FFFF00",
    image: "/images/model3.png",
    productLabel: "Cotton Shirt",
    description: "Standard hoodie with brushed back design, hidden pocket, oversized fit with art ply hood print label",
    price: "420.00 EUR",
    details: ["Custom fit cotton hoodie with doubled sleeves", "and a partially hidden right sleeve print", "Standard fit", "€ 25"],
    badge: "©"
  },
  {
    id: 2,
    title: "specter_dsgn",
    titleStyle: "italic font-black text-9xl",
    subtitle: "Fresh Vibes",
    bgColor: "#E8B4C5",
    textColor: "#FFFF00",
    accentColor: "#FFFF00",
    image: "/images/model2.jpg",
    productLabel: "Casual Sando",
    description: "Premium sleeveless collection with contemporary style and comfort",
    price: "320.00 EUR",
    details: ["Premium cotton blend", "Sleeveless design", "Limited edition", "€ 18"],
    badge: "©"
  },
{
    id: 3,
    title: "specter_dsgn",
    titleStyle: "italic font-black text-9xl",
    subtitle: "Black FM Fire STRAIGHT!",
    bgColor: "#ffffff",
    textColor: "#B602FF",
    accentColor: "#FFFF00",
    image: "/images/model1.jpg",
    productLabel: "Cotton Tshirt",
    description: "Standard hoodie with brushed back design, hidden pocket, oversized fit with art ply hood print label",
    price: "420.00 EUR",
    details: ["Custom fit cotton hoodie with doubled sleeves", "and a partially hidden right sleeve print", "Standard fit", "€ 25"],
    badge: "©"
  },
];
