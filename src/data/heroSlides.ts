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
    title: "Sigiriya Rock Fortress",
    description:
      "Rise above the island with a premium transfer to Sri Lanka's most iconic heritage landmark.",
    primaryCta: { label: "Book Transfer", href: "#contact" },
    secondaryCta: { label: "Explore Tours", href: "#tours" },
    image: "/images/destinations/sigiriya/sigiriya-rock-fortress.avif",
    imageAlt: "Sigiriya rock fortress in Sri Lanka",
    accent: "Heritage Journey",
    route: "Colombo to Sigiriya",
    positionClass: "object-center",
    badge: "UNESCO landmark",
  },
  {
    id: "kandy",
    title: "Temple of the Tooth",
    description:
      "Travel in comfort to Sri Lanka's most revered cultural and spiritual landmark in Kandy.",
    primaryCta: { label: "Book Transfer", href: "#contact" },
    secondaryCta: { label: "Explore Tours", href: "#tours" },
    image: "/images/destinations/kandy/temple-of-the-tooth-kandy.avif",
    imageAlt: "Temple of the Tooth in Kandy, Sri Lanka",
    accent: "Cultural Journey",
    route: "Colombo to Kandy",
    positionClass: "object-center",
    badge: "Sacred city",
  },
  {
    id: "ella",
    title: "Nine Arches Bridge",
    description:
      "Enjoy a premium journey through the highlands to one of Sri Lanka's most photographed rail landmarks.",
    primaryCta: { label: "Plan Ride", href: "#contact" },
    secondaryCta: { label: "View Destinations", href: "#tours" },
    image: "/images/destinations/ella/nine-arch-bridge-ella.avif",
    imageAlt: "Nine Arch Bridge in Ella, Sri Lanka",
    accent: "Highland Escape",
    route: "Kandy to Ella",
    positionClass: "object-[center_58%]",
    badge: "Tea country views",
  },
  {
    id: "yala",
    title: "Yala Leopard Safari",
    description:
      "Start early, travel comfortably, and reach Sri Lanka's wildlife frontier for a refined safari adventure.",
    primaryCta: { label: "Start Journey", href: "#contact" },
    secondaryCta: { label: "Browse Tours", href: "#tours" },
    image: "/images/destinations/yala/yala-sri-lanka.avif",
    imageAlt: "Yala National Park in Sri Lanka",
    accent: "Wildlife Route",
    route: "Southern safari transfer",
    positionClass: "object-center",
    badge: "Safari access",
  },
  {
    id: "mirissa",
    title: "Mirissa Coconut Tree Hill",
    description:
      "Discover a relaxed south-coast escape with private transfers to one of Mirissa's most iconic viewpoints.",
    primaryCta: { label: "Book Now", href: "#contact" },
    secondaryCta: { label: "Learn More", href: "#about" },
    image: "/images/destinations/mirissa/mirissa-sri-lanka.avif",
    imageAlt: "Mirissa beach in Sri Lanka",
    accent: "Coastal Ride",
    route: "Colombo to Mirissa",
    positionClass: "object-center",
    badge: "South coast",
  },
  {
    id: "bentota",
    title: "Bentota Beach",
    description:
      "Move between the coast and the city with a seamless premium transfer to Sri Lanka's golden shoreline.",
    primaryCta: { label: "Book Now", href: "#contact" },
    secondaryCta: { label: "Learn More", href: "#about" },
    image: "/images/destinations/bentota/bentota-sri-lanka.avif",
    imageAlt: "Bentota beach in Sri Lanka",
    accent: "Coastal Ride",
    route: "Colombo to Bentota",
    positionClass: "object-center",
    badge: "Beach escape",
  },
  {
    id: "nuwara-eliya",
    title: "Nuwara Eliya Tea Plantations",
    description:
      "Travel into the highlands for lush plantations, cool climate retreats, and refined countryside stays.",
    primaryCta: { label: "Plan Ride", href: "#contact" },
    secondaryCta: { label: "View Destinations", href: "#tours" },
    image: "/images/destinations/nuwara-eliya/tea-plantations-nuwara-eliya.avif",
    imageAlt: "Tea plantations in Nuwara Eliya, Sri Lanka",
    accent: "Tea Country",
    route: "Kandy to Nuwara Eliya",
    positionClass: "object-center",
    badge: "Highland calm",
  },
  {
    id: "galle",
    title: "Galle Fort Lighthouse",
    description:
      "Move between the coast and the city with a seamless premium transfer to Sri Lanka's south.",
    primaryCta: { label: "Book Now", href: "#contact" },
    secondaryCta: { label: "Learn More", href: "#about" },
    image: "/images/destinations/galle/lighthouse-on-utrecht-bastion-galle.avif",
    imageAlt: "Lighthouse on Utrecht Bastion in Galle Fort",
    accent: "Coastal Ride",
    route: "Colombo to Galle",
    positionClass: "object-center",
    badge: "Fort city",
  },
  {
    id: "colombo",
    title: "Colombo Lotus Tower",
    description:
      "End the journey in the capital with a premium arrival to Sri Lanka's most modern city landmark.",
    primaryCta: { label: "Book Now", href: "#contact" },
    secondaryCta: { label: "Learn More", href: "#about" },
    image: "/images/destinations/colombo/colombo-sri-lanka.avif",
    imageAlt: "Colombo city skyline in Sri Lanka",
    accent: "City Arrival",
    route: "Airport to Colombo",
    positionClass: "object-center",
    badge: "Capital skyline",
  },
];
