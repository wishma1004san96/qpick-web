export interface Blog {
  id: number;
  title: string;
  subtitle?: string;
  heroImage: string;
  image?: string;
  imageCredit?: string;
  readTime: string;
  author: string;
  date: string;
  location?: string;
  introduction?: string;
  content?: {
    highlights?: {
      title: string;
      description: string;
      image: string;
    }[];
    activities?: string[];
    bestTimeToVisit?: Record<string, unknown>;
    visitorInfo?: {
      type: string;
      description: string;
    }[];
    travelTips?: string[];
    accommodation?: {
      type: string;
      description: string;
    }[];
    dining?: {
      name: string;
      specialty: string;
    }[];
    localExperience?: Record<string, unknown>;
  };
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: "Nallur Kandaswamy Kovil: A Sacred Gem in Jaffna",
    subtitle: "Exploring the spiritual and architectural magnificence of Sri Lanka's most revered Hindu temple",
    heroImage: '/assets/images/blog/blog2.jpeg',
    imageCredit: "Photo by Tom Wilson on Unsplash",
    readTime: "15 min read",
    author: "Dr. Rajesh Kumar",
    date: "March 15, 2024",
    location: "Jaffna, Sri Lanka",
    introduction: `In the heart of Jaffna, the Nallur Kandaswamy Kovil stands as a testament to centuries of devotion, architectural brilliance, and cultural heritage. This sacred Hindu temple, dedicated to Lord Murugan, continues to be a spiritual beacon for devotees and a marvel for visitors from around the world.`,
    content: {
      highlights: [
        {
          title: "The Majestic Gopuram",
          description: "The temple's main entrance features a towering gopuram adorned with intricate sculptures and vibrant colors, showcasing the finest examples of Dravidian architecture. Each level tells stories from Hindu mythology through detailed carvings.",
          image: "https://images.unsplash.com/photo-1725773682183-f0c885081ce5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          title: "Sacred Sanctum Sanctorum",
          description: "The heart of the temple houses the principal deity, Lord Murugan, in a serene and spiritually charged atmosphere. The sanctum is known for its peaceful ambiance and traditional architectural elements.",
          image: "https://images.unsplash.com/photo-1720944519204-27a7d0a7f29b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          title: "Annual Festival Grandeur",
          description: "The 25-day annual festival attracts thousands of devotees, featuring elaborate processions, traditional music, and religious ceremonies. The chariot festival is particularly spectacular, drawing participants from around the world.",
          image: "https://images.unsplash.com/photo-1621355310264-03958a95f6d1?q=80&w=1544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          title: "Architectural Heritage",
          description: "The temple complex showcases stunning Dravidian architecture with its courtyards, shrines, and ceremonial spaces. The design reflects centuries of artistic and cultural evolution in South Asian temple architecture.",
          image: "https://images.unsplash.com/photo-1513092907274-a337201e3210?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      ],
      activities: [
        "Morning prayer ceremonies (Puja)",
        "Guided temple tours",
        "Cultural performances during festivals",
        "Traditional music recitals",
        "Religious ceremonies and rituals",
        "Photography (exterior only)",
        "Meditation sessions",
        "Cultural workshops"
      ],
      bestTimeToVisit: {
        season: "December to March (Peak Season)",
        morningHours: "5:00 AM - 12:30 PM",
        eveningHours: "4:00 PM - 9:00 PM",
        festival: "August/September (Annual Festival)",
        weather: {
          dry: "Perfect for outdoor ceremonies and visits",
          monsoon: "May to October (fewer crowds, spiritual atmosphere)"
        }
      },
      visitorInfo: [
        {
          type: "Dress Code",
          description: "Traditional modest dress required; men must remove shirts, women should wear conservative attire"
        },
        {
          type: "Photography",
          description: "Permitted in outer areas; prohibited inside main shrine"
        },
        {
          type: "Footwear",
          description: "Must be removed before entering temple premises"
        }
      ],
      travelTips: [
        "Visit early morning for peaceful atmosphere",
        "Respect local customs and traditions",
        "Maintain silence in prayer areas",
        "Bring offerings of flowers or fruits",
        "Join guided tours for historical context",
        "Plan around festival dates for special experiences",
        "Book accommodation in Jaffna city center",
        "Learn basic Tamil greetings"
      ]
    }
  },
  {
    id: 2,
    title: "Mirissa Beach: Paradise for Beach Lovers and Marine Enthusiasts",
    subtitle: "A comprehensive guide to Sri Lanka's most enchanting coastal destination",
    heroImage: '/assets/images/blog/blog3.jpeg',

    imageCredit: "Photo by Youhana Nassif on Unsplash",
    readTime: "10 min read",
    author: "Sarah Thompson",
    date: "March 10, 2024",
    location: "Mirissa, Sri Lanka",
    introduction: `Nestled along Sri Lanka's stunning southern coastline, Mirissa Beach emerges as a tropical paradise where golden sands meet crystal-clear waters. This crescent-shaped beach has become a haven for both relaxation seekers and adventure enthusiasts, offering a perfect blend of serene beach life and exciting marine experiences.`,
    content: {
      highlights: [
        {
          title: "Whale Watching Adventures",
          description: "Mirissa is renowned as one of the world's best locations for whale watching. From November to April, visitors can witness magnificent blue whales, sperm whales, and various dolphin species in their natural habitat. Early morning tours offer the best sighting opportunities.",
          image: "https://images.unsplash.com/photo-1576124344805-c47cea66b0db?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          title: "Snorkeling and Diving Paradise",
          description: "The vibrant coral reefs off Mirissa's coast provide excellent opportunities for snorkeling and diving. With warm, clear waters and rich marine life, including sea turtles and tropical fish, it's a perfect spot for underwater exploration.",
          image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2940&auto=format&fit=crop"
        },
        {
          title: "Surfing Haven",
          description: "Perfect for both beginners and experienced surfers, Mirissa's waves offer excellent surfing conditions. The surf season peaks from November to April, with several surf schools and rental shops available along the beach.",
          image: "https://images.unsplash.com/photo-1459745930869-b3d0d72c3cbb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          title: "Secret Beach Escape",
          description: "A short walk from the main beach leads to the secluded 'Secret Beach', a hidden gem perfect for those seeking more privacy and tranquility. Surrounded by rocky outcrops, it's ideal for peaceful sunbathing and swimming.",
          image: "https://images.unsplash.com/photo-1704797390501-37d39f2f6921?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      ],
      activities: [
        "Early morning whale watching excursions",
        "Guided snorkeling tours to coral reefs",
        "Surfing lessons for all skill levels",
        "Sunset yoga sessions on the beach",
        "Fresh seafood dining experiences",
        "Visit to the bustling Mirissa Harbour",
        "Secret Beach exploration",
        "Evening beach parties and live music"
      ],
      localExperience: {
        title: "The Local Vibe",
        description: "Mirissa offers more than just beach activities; it's a vibrant community with warm hospitality and rich local culture. The town comes alive at night with beachfront restaurants and bars, offering an authentic Sri Lankan experience.",
        highlights: [
          "Traditional Sri Lankan cuisine",
          "Fresh coconut water from local vendors",
          "Friendly locals and laid-back atmosphere",
          "Vibrant nightlife with beach bars",
          "Cultural performances and events"
        ]
      }
    }
  },
  {
    id: 3,
    title: "The Gal Vihara: A Masterpiece of Ancient Buddhist Art",
    subtitle: "Exploring the magnificent rock-cut Buddha statues of Polonnaruwa",
    heroImage: '/assets/images/blog/blog4.jpeg',

    imageCredit: "Photo by Tom Wilson on Unsplash",
    readTime: "15 min read",
    author: "Dr. Ananda Silva",
    date: "March 5, 2024",
    location: "Polonnaruwa, Sri Lanka",
    introduction: `In the heart of ancient Polonnaruwa lies the Gal Vihara, a testament to the artistic brilliance and spiritual devotion of 12th-century Sri Lanka. These magnificent Buddha statues, carved from a single granite rock face, continue to inspire awe and reverence among visitors from around the world.`,
    content: {
      highlights: [
        {
          title: "The Majestic Reclining Buddha",
          description: "The crown jewel of Gal Vihara, this 14-meter-long masterpiece depicts the Buddha entering Nirvana. The statue's serene expression and intricate details showcase the remarkable skill of ancient sculptors.",
          image: "https://images.unsplash.com/photo-1550617595-4ea5dbe09f23?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          title: "The Towering Standing Buddha",
          description: "Standing 7 meters tall, this statue portrays the Buddha in a unique position with crossed arms, a rare example of Polonnaruwa period artistry. The statue's surface treatment and proportions are considered perfect by art historians.",
          image: "https://images.unsplash.com/photo-1651509596589-a6bfbc855347?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          title: "The Meditative Seated Buddha",
          description: "This statue shows the Buddha in deep meditation, carved with exceptional detail in the dhyana mudra position. The peaceful expression and perfect proportions make it a favorite among photographers.",
          image: "https://images.unsplash.com/photo-1656339953897-e5d10d261ff1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          title: "Ancient Inscriptions",
          description: "The site contains valuable inscriptions that provide insights into the history and construction of these magnificent statues during King Parakramabahu I's reign.",
          image: "https://images.unsplash.com/photo-1656497106972-d056a38ac8ce?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      ],
      activities: [
        "Guided archaeological tours",
        "Buddhist meditation sessions",
        "Historical photography walks",
        "Cultural heritage lectures",
        "Sunrise and sunset visits",
        "Ancient inscription studies",
        "Traditional offering ceremonies",
        "Archaeological workshops"
      ],
      bestTimeToVisit: {
        season: "December to March (Peak Season)",
        morningHours: "6:00 AM - 10:00 AM",
        eveningHours: "3:00 PM - 6:00 PM",
        weather: {
          dry: "Perfect for outdoor exploration",
          monsoon: "May to October (fewer crowds, atmospheric views)"
        }
      },
      visitorInfo: [
        {
          type: "Entrance Fees",
          description: "Cultural Triangle pass or separate admission ticket required"
        },
        {
          type: "Dress Code",
          description: "Modest dress required; shoulders and knees must be covered"
        },
        {
          type: "Photography",
          description: "Allowed with respect to sacred spaces; no flash photography"
        }
      ],
      travelTips: [
        "Visit early morning or late afternoon to avoid peak heat",
        "Hire a knowledgeable guide for historical context",
        "Bring water and wear comfortable walking shoes",
        "Allow at least 2-3 hours for a thorough visit",
        "Respect the sacred nature of the site",
        "Consider combining with other Polonnaruwa attractions",
        "Book accommodation in Polonnaruwa for sunrise visits",
        "Carry a hat and sunscreen for sun protection"
      ]
    }
  },
  {
    id: 4,
    title: "Sigiriya: The Lion's Rock of Sri Lanka",
    subtitle: "Exploring the ancient fortress palace and its remarkable architectural wonders",
    heroImage: '/assets/images/blog/blog5.jpeg',
    imageCredit: "Photo by David Mitchell on Unsplash",
    readTime: "15 min read",
    author: "Prof. Michael Chen",
    date: "February 28, 2024",
    location: "Sigiriya, Sri Lanka",
    introduction: `Rising dramatically from the central plains of Sri Lanka, Sigiriya stands as an awe-inspiring testament to ancient Sri Lankan ingenuity and architectural brilliance. This UNESCO World Heritage site, built in the 5th century CE, combines natural beauty, engineering marvel, and artistic mastery to create one of the world's most remarkable archaeological wonders.`,
    content: {
      highlights: [
        {
          title: "The Ancient Sky Palace",
          description: "Perched atop a 200-meter high rock, the palace complex showcases sophisticated urban planning, advanced hydraulic technology, and stunning architectural features that were centuries ahead of their time.",
          image: "https://images.unsplash.com/photo-1580794749460-76f97b7180d8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          title: "World-Famous Frescoes",
          description: "The western wall of Sigiriya features ancient frescoes of celestial nymphs, painted with natural pigments that have retained their vibrant colors for over 1,500 years. These masterpieces provide unique insights into ancient Sri Lankan art.",
          image: "https://images.unsplash.com/photo-1594391045445-64ea3c6ff16b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          title: "Mirror Wall and Lion Gate",
          description: "The highly polished wall that once served as a mirror still bears ancient graffiti, while the massive lion paws guard the final ascent to the summit, remnants of what was once a colossal lion statue.",
          image: "https://images.unsplash.com/photo-1582103518262-254caeef04fb?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          title: "Water Gardens",
          description: "The symmetrical water gardens at the base demonstrate advanced hydraulic engineering, featuring fountains that still function during the rainy season, showcasing the sophisticated water management systems of ancient Sri Lanka.",
          image: "https://images.unsplash.com/photo-1652875009065-7f775b114750?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      ],
      activities: [
        "Early morning climb to the summit",
        "Guided archaeological tours",
        "Photography sessions",
        "Exploration of water gardens",
        "Visit to the Sigiriya Museum",
        "Sunset viewing from nearby Pidurangala",
        "Bird watching in the surrounding forests",
        "Cultural village experiences"
      ],
      bestTimeToVisit: {
        season: "January to March (Dry Season)",
        morningHours: "7:00 AM - 10:00 AM",
        eveningHours: "2:00 PM - 5:00 PM",
        weather: {
          dry: "Best for climbing and photography",
          monsoon: "May to September (challenging climb, but lush landscapes)"
        }
      },
      visitorInfo: [
        {
          type: "Entrance Fees",
          description: "Cultural Triangle pass or separate admission ticket required (USD 30 for foreigners)"
        },
        {
          type: "Climbing Time",
          description: "1-2 hours for the ascent, depending on fitness level and crowds"
        },
        {
          type: "Photography",
          description: "Allowed throughout the site; tripods may require special permission"
        }
      ],
      travelTips: [
        "Start the climb early to avoid heat and crowds",
        "Wear comfortable walking shoes with good grip",
        "Bring plenty of water and sun protection",
        "Allow 3-4 hours for the complete experience",
        "Hire a licensed guide for historical insights",
        "Respect the ancient artwork and structures",
        "Consider visiting Pidurangala Rock for sunset",
        "Book accommodations in advance during peak season"
      ]
    }
  },
  {
    id: 5,
    title: "Kandy: The Cultural Heart of Sri Lanka",
    subtitle: "Exploring the last royal capital of ancient Sri Lanka",
    heroImage: '/assets/images/blog/blog6.jpeg',
    imageCredit: "Photo by Sarah Wilson on Unsplash",
    readTime: "15 min read",
    author: "Dr. Lakshmi Perera",
    date: "February 25, 2024",
    location: "Kandy, Sri Lanka",
    introduction: `Nestled amidst the picturesque hills of central Sri Lanka, Kandy stands as a testament to the island's rich cultural heritage and royal history. As the last capital of the ancient Sri Lankan kings, this UNESCO World Heritage site seamlessly blends historical grandeur with natural beauty, creating an enchanting destination that captures the essence of Sri Lankan culture.`,
    content: {
      highlights: [
        {
          title: "Temple of the Sacred Tooth Relic",
          description: "The Sri Dalada Maligawa, housing Buddha's sacred tooth relic, stands as the crown jewel of Kandy's cultural heritage. This revered temple complex showcases stunning architecture and serves as a living testament to Sri Lanka's Buddhist traditions.",
          image: "https://images.unsplash.com/photo-1737008233483-20585f5fbc62?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          title: "Royal Botanical Gardens",
          description: "The magnificent Peradeniya Botanical Gardens, spanning 147 acres, features diverse flora, including rare and endemic species. The garden's collection of orchids, spices, and giant Javan fig trees creates a paradise for nature lovers.",
          image: "https://plus.unsplash.com/premium_photo-1739452119298-af5032608eb9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          title: "Kandy Lake",
          description: "Created in 1807 by the last king of Sri Lanka, this artificial lake serves as a serene centerpiece of the city. The lake's walking path offers stunning views of the surrounding hills and the Temple of the Tooth.",
          image: "https://images.unsplash.com/photo-1626091022888-485eb96c494a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          title: "Esala Perahera Festival",
          description: "Experience one of Asia's most spectacular festivals, featuring elaborately decorated elephants, traditional dancers, drummers, and fire performers in a grand procession honoring the Sacred Tooth Relic.",
          image: "https://images.unsplash.com/photo-1566766188646-5d0310191714?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      ],
      activities: [
        "Visit the Temple of the Sacred Tooth Relic",
        "Explore the Royal Botanical Gardens",
        "Watch traditional Kandyan dance performances",
        "Take a stroll around Kandy Lake",
        "Visit the Udawattakele Forest Reserve",
        "Shop at the Kandy City Center",
        "Experience the Esala Perahera Festival (July/August)",
        "Visit the Ceylon Tea Museum"
      ],
      bestTimeToVisit: {
        season: "December to April (Dry Season)",
        morningHours: "6:00 AM - 10:00 AM",
        eveningHours: "3:00 PM - 6:00 PM",
        festival: "July/August (Esala Perahera)",
        weather: {
          dry: "Perfect for sightseeing and outdoor activities",
          monsoon: "May to September (occasional rain, fewer crowds)"
        }
      },
      visitorInfo: [
        {
          type: "Temple Etiquette",
          description: "Modest dress required; shoulders and knees must be covered. Remove shoes before entering temples."
        },
        {
          type: "Photography",
          description: "Permitted in most areas; some restrictions inside the Temple of the Tooth"
        },
        {
          type: "Transportation",
          description: "Tuk-tuks and taxis readily available; walking is pleasant in the city center"
        }
      ],
      travelTips: [
        "Start early to avoid crowds at popular sites",
        "Purchase a Cultural Triangle pass for multiple site access",
        "Book accommodation in advance during Esala Perahera",
        "Try local specialties like Kandyan sweets",
        "Take the scenic train journey to or from Colombo",
        "Visit the Temple of the Tooth during morning or evening prayers",
        "Hire a knowledgeable guide for historical context",
        "Allow at least 2-3 days to explore the city properly"
      ]
    }
  }
];
