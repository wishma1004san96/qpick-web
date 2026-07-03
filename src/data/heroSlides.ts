export type HeroSlide = {
  id: string;
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  image: string;
  imageAlt: string;
  accent: string;
  route: string;
  positionClass: string;
  badge: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "sigiriya",
    title: "Sigiriya",
    description:
      "Rise above the island with a premium transfer to Sri Lanka's most iconic heritage landmark.",
    primaryCta: { label: "Book Transfer", href: "#contact" },
    secondaryCta: { label: "Explore Tours", href: "#tours" },
    image: "/images/hero/sigiriya.webp",
    imageAlt: "Sigiriya rock fortress in Sri Lanka",
    accent: "Heritage Journey",
    route: "Colombo to Sigiriya",
    positionClass: "object-center",
    badge: "UNESCO landmark",
  },
  {
    id: "ella",
    title: "Ella",
    description:
      "Enjoy a calm, curated ride through Sri Lanka's misty highlands and tea-country escapes.",
    primaryCta: { label: "Plan Ride", href: "#contact" },
    secondaryCta: { label: "View Destinations", href: "#tours" },
    image: "/images/hero/ella-nine-arch-bridge.webp",
    imageAlt: "Nine Arch Bridge in Ella, Sri Lanka",
    accent: "Highland Escape",
    route: "Kandy to Ella",
    positionClass: "object-[center_58%]",
    badge: "Tea country views",
  },
  {
    id: "kandy",
    title: "Kandy",
    description:
      "Travel with confidence to the cultural capital for temple visits, lake views, and city tours.",
    primaryCta: { label: "Reserve Vehicle", href: "#contact" },
    secondaryCta: { label: "See Fleet", href: "#fleet" },
    image: "/images/hero/dalanda-maligawa.webp",
    imageAlt: "Temple of the Sacred Tooth Relic in Kandy",
    accent: "Cultural Route",
    route: "Airport to Kandy",
    positionClass: "object-center",
    badge: "Temple city",
  },
  {
    id: "yala",
    title: "Yala",
    description:
      "Start early, travel comfortably, and reach Sri Lanka's wildlife regions with a premium ride.",
    primaryCta: { label: "Start Journey", href: "#contact" },
    secondaryCta: { label: "Browse Tours", href: "#tours" },
    image: "/images/hero/tissamaharama-sri-lanka.webp",
    imageAlt: "Tissamaharama route scenery for Yala travel",
    accent: "Wildlife Route",
    route: "Southern safari transfer",
    positionClass: "object-[center_38%]",
    badge: "Safari access",
  },
  {
    id: "galle",
    title: "Galle",
    description:
      "Move between the coast and the city with a seamless premium transfer to Sri Lanka's south.",
    primaryCta: { label: "Book Now", href: "#contact" },
    secondaryCta: { label: "Learn More", href: "#about" },
    image: "/images/hero/mirissa-sri-lanka.webp",
    imageAlt: "Southern coast scenery for a Galle travel route",
    accent: "Coastal Ride",
    route: "Colombo to Galle",
    positionClass: "object-[center_54%]",
    badge: "Fort city",
  },
];
