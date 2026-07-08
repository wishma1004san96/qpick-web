export type TourItineraryItem = {
  title: string;
  description?: string;
};

export type TourInclusions = {
  included: string[];
  notIncluded: string[];
};

export interface Tour {
  title: string;
  location: string;
  duration: string;
  shortDescription: string;
  image: string;
  highlights: string[];
  itinerary?: TourItineraryItem[];
  inclusions?: TourInclusions;
  /** Destination slugs that map to /destinations/[slug] */
  destinations?: string[];
}

export const tours: Tour[] = [
  {
    "title": "Knuckles Waterfall / Corbet's Gap Trek",
    "location": "Knuckles Mountain Range",
    "duration": "1 Day (5-6 Hours)",
    "shortDescription": "Experience the breathtaking waterfall trek in Knuckles Mountain Range with views of Corbet's Gap. Walking distance of 12 km through lush forests and scenic landscapes.",
    "image": "/assets/images/knuckles_waterfall.jpg",
    "highlights": [
      "Walking Distance: 12 km (5-6 Hours)",
      "Elevation: Start Point - 1000 M SL, High Place - 1550 M SL",
      "Nice View Points",
      "Leaf Nose Lizard (Only in Knuckles)",
      "Can Swimming at Waterfall",
      "Includes: Entrance tickets and lunch",
      "From Kandy to Starting Point: 45km (1 hour 30 min)"
    ],
    itinerary: [
      { title: 'Meet & briefing', description: 'Meet your guide and begin the journey to the starting point.' },
      { title: 'Trek to viewpoints', description: 'Hike through forest trails to scenic viewpoints in the Knuckles range.' },
      { title: 'Waterfall stop', description: 'Relax at the waterfall (swimming possible depending on conditions).' },
      { title: 'Return', description: 'Walk back and wrap up the trek.' },
    ],
    inclusions: {
      included: ['Entrance tickets', 'Lunch'],
      notIncluded: ['Personal expenses', 'Tips (optional)'],
    },
    destinations: ['kandy'],
  },
  {
    "title": "Knuckles Peak Trek",
    "location": "Knuckles Mountain Range",
    "duration": "1 Day (8-9 Hours)",
    "shortDescription": "Conquer the challenging Knuckles Peak with this full-day trek offering spectacular panoramic views above the clouds. Traverse 18-20 km of scenic mountain trails.",
    "image": "/assets/images/knuckles_peak.jpg",
    "highlights": [
      "Walking Distance: 18-20 km (8-9 Hours)",
      "Elevation: Start Point - 1000 M SL, High Place - 1846 M SL",
      "Nice View Points",
      "Leaf Nose Lizard (Only in Knuckles)",
      "Can Swimming at Waterfall",
      "Includes: Entrance tickets and lunch",
      "From Kandy to Starting Point: 45km (1 hour 30 min)"
    ],
    itinerary: [
      {
        title: 'Meet & departure',
        description: 'Meet your trek guide, safety briefing, and transfer to the trailhead.'
      },
      {
        title: 'Trailhead start',
        description: 'Begin the hike through forest paths and tea-country edges as the landscape opens up.'
      },
      {
        title: 'Ridgeline & viewpoints',
        description: 'Climb steadily with scenic stops for photos, birdlife spotting, and water breaks.'
      },
      {
        title: 'Summit push',
        description: 'Reach the higher elevations for panoramic views above the clouds (weather permitting).'
      },
      {
        title: 'Lunch break',
        description: 'Enjoy a packed/local lunch in a shaded spot with mountain views.'
      },
      {
        title: 'Optional waterfall stop',
        description: 'Cool down at a waterfall or stream crossing (swimming depends on conditions).'
      },
      {
        title: 'Descent & return',
        description: 'Descend to the starting point and wrap up the trek.'
      },
    ],
    inclusions: {
      included: [
        'Entrance tickets (where applicable)',
        'Trek guide',
        'Lunch',
        'Basic first aid support',
      ],
      notIncluded: ['Personal expenses', 'Tips (optional)', 'Travel insurance'],
    },
    destinations: ['kandy'],
  },
  {
    "title": "Heeloya Village Trek",
    "location": "Heeloya Village",
    "duration": "Half Day to Full Day (1-4 Hours)",
    "shortDescription": "Explore the authentic rural life of Sri Lanka with two trek options in Heeloya Village - a gentle 'Soft Walk' (2-6 km) or more challenging 'Hard Walk' (12-14 km).",
    "image": "/assets/images/heeloya_village.jpg",
    "highlights": [
      "Soft Walk: 2-6 km (1-4 Hours)",
      "Hard Walk: 12-14 km (4-5 Hours)",
      "Terrace Rice Fields",
      "Birds Watching",
      "Village Life Experience",
      "From Kandy to Starting Point: 30km (1 hour 15 min)",
      "Includes entrance fees"
    ],
    itinerary: [
      {
        title: 'Meet & transfer',
        description: 'Meet your guide and travel to Heeloya village. Quick briefing on the route and local etiquette.'
      },
      {
        title: 'Village welcome',
        description: 'Start the experience with an introduction to the village lifestyle and today\'s walking option.'
      },
      {
        title: 'Soft Walk (2–6 km) option',
        description: 'A relaxed walk through paddy terraces, small streams, and quiet footpaths—ideal for families and first-time hikers.'
      },
      {
        title: 'Hard Walk (12–14 km) option',
        description: 'A longer trek through forest and rural tracks with more elevation and deeper village exploration.'
      },
      {
        title: 'Nature & birdwatching stops',
        description: 'Photo breaks and wildlife spotting (birds, butterflies, and endemic flora) along the way.'
      },
      {
        title: 'Village life experience',
        description: 'See day-to-day rural life—cultivation, traditional homes, and seasonal farming activities (as available).'
      },
      {
        title: 'Wrap-up & return',
        description: 'Finish the walk, freshen up, and return to the drop-off point.'
      },
    ],
    inclusions: {
      included: [
        'Entrance fees',
        'Local trek guide',
        'Bottled water',
        'Basic first aid support',
      ],
      notIncluded: ['Meals (unless arranged)', 'Personal expenses', 'Tips (optional)', 'Travel insurance'],
    },
    destinations: ['kandy'],
  },
  {
    "title": "Luxury Sri Lanka Experience",
    "location": "Colombo – Sigiriya – Kandy – Nuwara Eliya – Yala – Galle – Bentota",
    "duration": "10 Days / 9 Nights",
    "shortDescription": "Indulge in the ultimate luxury getaway across Sri Lanka, featuring five-star accommodations, private safaris, and exclusive experiences. From a breathtaking helicopter ride to Sigiriya to a relaxing yacht cruise in Galle, this tour offers an unparalleled blend of adventure and relaxation.",
    "image": "/assets/images/wda12.jpeg",
    "highlights": [
      "5-star resorts & private villas",
      "Helicopter ride to Sigiriya",
      "Private safaris at Yala",
      "Spa & wellness experiences",
      "Luxury yacht cruise in Galle"
    ],
    itinerary: [
      {
        title: 'Day 1 — Arrival in Colombo',
        description: 'VIP airport pick-up, private transfer to your luxury hotel, and a relaxed evening to unwind.'
      },
      {
        title: 'Day 2 — Colombo highlights & city vibes',
        description: 'Curated city tour (markets, colonial heritage, and waterfront), followed by sunset drinks and fine dining.'
      },
      {
        title: 'Day 3 — Helicopter to Sigiriya',
        description: 'Scenic helicopter transfer and an exclusive Cultural Triangle experience with leisure time at your resort.'
      },
      {
        title: 'Day 4 — Sigiriya experience day',
        description: 'Choose a signature excursion (rock fortress / Pidurangala / village-style experiences) and enjoy a spa evening.'
      },
      {
        title: 'Day 5 — Kandy: culture & heritage',
        description: 'Private transfer to Kandy, visit key cultural sites, and enjoy an elegant evening overlooking the hills.'
      },
      {
        title: 'Day 6 — Nuwara Eliya: tea country luxury',
        description: 'Travel into the highlands for tea estates, misty viewpoints, and a colonial-style stay with wellness time.'
      },
      {
        title: 'Day 7 — Yala: exclusive safari',
        description: 'Transfer south to Yala and enjoy a private jeep safari for leopard and elephant spotting.'
      },
      {
        title: 'Day 8 — Galle: coastal elegance',
        description: 'Head to Galle, explore the fort at golden hour, then enjoy an upscale evening by the ocean.'
      },
      {
        title: 'Day 9 — Galle yacht cruise & Bentota beach',
        description: 'Luxury yacht cruise (weather permitting), then continue to Bentota for beach relaxation and spa time.'
      },
      {
        title: 'Day 10 — Departure',
        description: 'Private transfer to the airport (or extend your stay on request).'
      },
    ],
    inclusions: {
      included: [
        'Luxury accommodation (9 nights)',
        'Private air-conditioned transport',
        'Professional chauffeur/guide',
        'Daily breakfast (hotel plan dependent)',
        'Helicopter transfer to Sigiriya (as per itinerary)',
        'Private jeep safari at Yala',
        'Luxury yacht cruise in Galle (weather permitting)',
        'Selected entrance tickets (as per itinerary)',
      ],
      notIncluded: [
        'International flights & visa fees',
        'Travel insurance',
        'Personal expenses (laundry, minibar, etc.)',
        'Meals not mentioned in inclusions',
        'Tips and gratuities (optional)',
      ],
    },
    destinations: ['colombo', 'sigiriya', 'kandy', 'nuwara-eliya', 'yala', 'galle', 'bentota'],
  },
  {
    title: "Budget-Friendly Sri Lanka Tour",
    location: "Colombo - Kandy - Ella - Mirissa",
    duration: "5 Days / 4 Nights",
    shortDescription: "Experience the best of Sri Lanka on a budget with this carefully crafted tour that combines cultural highlights, scenic train journeys, and beach relaxation.",
    image: "/assets/images/wda13.jpeg",
    highlights: [
      "Kandy city tour & botanical garden",
      "Scenic train ride to Ella",
      "Affordable beach stays in Mirissa",
      "Street food and cultural markets in Colombo"
    ],
    itinerary: [
      {
        title: 'Day 1 — Colombo: arrival + street food',
        description:
          'Pick-up and check-in at a budget-friendly hotel. Explore local markets, cultural spots, and enjoy an easy street-food evening.'
      },
      {
        title: 'Day 2 — Colombo → Kandy',
        description:
          'Travel to Kandy and enjoy a simple city tour (lake walk, viewpoints, and cultural highlights). Optional cultural show in the evening.'
      },
      {
        title: 'Day 3 — Kandy → Ella (scenic train ride)',
        description:
          'Take Sri Lanka\'s iconic hill-country train journey to Ella. Check-in and enjoy a relaxed evening in the cool mountain air.'
      },
      {
        title: 'Day 4 — Ella: viewpoints & nature',
        description:
          'Explore Ella\'s famous viewpoints (Little Adam\'s Peak / Nine Arches Bridge area) and enjoy free time for cafes or a short hike.'
      },
      {
        title: 'Day 5 — Ella → Mirissa: beach time + departure',
        description:
          'Transfer to Mirissa for beach relaxation. Optional whale watching (seasonal). Drop-off can be arranged to Colombo or the airport.'
      },
    ],
    inclusions: {
      included: [
        'Budget-friendly accommodation (4 nights)',
        'Private/shared transport between cities (based on package)',
        'Kandy city orientation tour',
        'Scenic train ride tickets (Kandy → Ella, subject to availability)',
      ],
      notIncluded: [
        'International flights & visa fees',
        'Travel insurance',
        'Meals & drinks (unless specified)',
        'Entrance fees (unless specified)',
        'Optional activities (e.g., whale watching)',
        'Tips and gratuities (optional)',
      ],
    },
    destinations: ['colombo', 'kandy', 'ella', 'mirissa'],
  },
  {
    title: "Honeymoon & Romantic Getaway",
    location: "Bentota - Ella - Nuwara Eliya - Galle",
    duration: "6 Days / 5 Nights",
    shortDescription: "Experience the perfect romantic escape with your loved one, featuring luxurious stays, intimate dining experiences, and breathtaking adventures across Sri Lanka's most romantic destinations.",
    image: "/assets/images/ella.jpeg",
    highlights: [
      "Beachside candlelight dinner in Bentota",
      "Scenic waterfalls & tea estates in Nuwara Eliya",
      "Private hot air balloon ride over Ella",
      "Romantic catamaran cruise in Galle"
    ],
    itinerary: [
      {
        title: 'Day 1 — Bentota: arrival + beachside sunset',
        description:
          'Private pick-up and transfer to Bentota. Check-in, relax by the beach, and enjoy a sunset stroll together.'
      },
      {
        title: 'Day 2 — Bentota: romance & relaxation',
        description:
          'Slow morning by the ocean, optional water activities, and a beachside candlelight dinner in the evening.'
      },
      {
        title: 'Day 3 — Bentota → Ella (hill-country romance)',
        description:
          'Travel to Ella for cooler mountain air and scenic viewpoints. Evening at leisure with cozy cafés and stunning sunsets.'
      },
      {
        title: 'Day 4 — Ella: signature experiences',
        description:
          'Explore Ella\'s iconic spots (Nine Arches Bridge / Little Adam\'s Peak area). Optional private hot air balloon ride (subject to weather & availability).'
      },
      {
        title: 'Day 5 — Nuwara Eliya: tea estates & misty views',
        description:
          'Head to Nuwara Eliya for tea country charm—tea plantations, viewpoints, and a colonial-style romantic evening.'
      },
      {
        title: 'Day 6 — Galle: fort vibes + departure',
        description:
          'Continue to Galle, enjoy a romantic walk inside the fort, and end with a catamaran/sunset cruise option before drop-off.'
      },
    ],
    inclusions: {
      included: [
        'Accommodation (5 nights) (package level dependent)',
        'Private transport between destinations',
        'Beachside candlelight dinner in Bentota',
        'Galle romantic cruise / catamaran experience (weather permitting)',
      ],
      notIncluded: [
        'International flights & visa fees',
        'Travel insurance',
        'Meals & drinks not mentioned in inclusions',
        'Entrance fees (unless specified)',
        'Optional hot air balloon ride (subject to availability)',
        'Tips and gratuities (optional)',
      ],
    },
    destinations: ['bentota', 'ella', 'nuwara-eliya', 'galle'],
  },
  {
    "title": "Sri Lanka Ayurveda & Wellness Retreat",
    "location": "Negombo – Kandy – Dambulla – Nuwara Eliya – Bentota",
    "duration": "10 Days / 9 Nights",
    "shortDescription": "Rejuvenate your body and mind with holistic Ayurvedic treatments amidst serene natural landscapes. This retreat offers daily spa sessions, meditation, and detox meal plans for ultimate relaxation.",
    "image": "/assets/images/wda15.jpeg",
    "highlights": [
      "Daily Ayurvedic spa & wellness treatments",
      "Guided meditation & yoga sessions",
      "Herbal & detox meal plans",
      "Visits to spice gardens & meditation caves",
      "Beachside relaxation in Bentota"
    ],
    itinerary: [
      {
        title: 'Day 1 — Arrival in Negombo (reset & relax)',
        description:
          'Airport pick-up, check-in near the coast, gentle evening walk, and an early night to settle into retreat mode.'
      },
      {
        title: 'Day 2 — Negombo: consultation + Ayurveda start',
        description:
          'Initial Ayurveda consultation, set your wellness plan, then begin treatments and guided breathing/meditation.'
      },
      {
        title: 'Day 3 — Negombo → Kandy: mindful transfer',
        description:
          'Travel to Kandy with a calm pace, light wellness activities, and evening relaxation (optional temple visit depending on schedule).'
      },
      {
        title: 'Day 4 — Kandy: culture + wellness balance',
        description:
          'Morning yoga/meditation, a short cultural outing, and a focused therapy session (massage/steam/herbal baths depending on plan).'
      },
      {
        title: 'Day 5 — Dambulla: caves + grounding practices',
        description:
          'Transfer to Dambulla for a mindful cultural visit. Evening Ayurveda session and a calming detox dinner.'
      },
      {
        title: 'Day 6 — Dambulla: nature & detox day',
        description:
          'A slower day: gentle movement, meditation, and treatments designed for detox and deep rest.'
      },
      {
        title: 'Day 7 — Nuwara Eliya: tea country wellness',
        description:
          'Head to the cool highlands for fresh air and quiet. Light walks, herbal tea experiences, and evening therapy.'
      },
      {
        title: 'Day 8 — Nuwara Eliya: yoga + mindfulness immersion',
        description:
          'Longer yoga/meditation session, optional visits to scenic viewpoints/tea estates, and restorative treatments.'
      },
      {
        title: 'Day 9 — Bentota: ocean calm + recovery',
        description:
          'Travel to Bentota for beachside relaxation. Sunset meditation, gentle spa session, and an easy evening.'
      },
      {
        title: 'Day 10 — Bentota: closing session + departure',
        description:
          'Final consultation and take-home wellness guidance. Private transfer to the airport (or extension on request).'
      },
    ],
    inclusions: {
      included: [
        'Accommodation (9 nights) (package level dependent)',
        'Private transport between destinations',
        'Ayurveda consultation and wellness plan (at participating centers)',
        'Daily yoga/meditation sessions (schedule dependent)',
        'Selected Ayurvedic treatments (as per plan)',
        'Detox / herbal meal plan (where provided by the property)',
      ],
      notIncluded: [
        'International flights & visa fees',
        'Travel insurance',
        'Additional treatments outside the agreed plan',
        'Entrance fees (unless specified)',
        'Personal expenses (laundry, minibar, etc.)',
        'Tips and gratuities (optional)',
      ],
    },
    destinations: ['negombo', 'kandy', 'dambulla', 'nuwara-eliya', 'bentota'],
  },
  {
    "title": "Colombo City Tour",
    "location": "Colombo (Half-Day or Full-Day Tour)",
    "duration": "1 Day / Half-Day Options Available",
    "shortDescription": "Experience the vibrant capital of Sri Lanka with a guided city tour, exploring cultural landmarks, bustling markets, and scenic coastal spots.",
    "image": "/assets/images/wda16.jpeg",
    "highlights": [
      "Gangaramaya Temple – One of Colombo's most famous Buddhist temples",
      "Independence Square – A historic landmark of Sri Lanka's independence",
      "Galle Face Green – Coastal promenade for stunning sunset views",
      "Pettah Market – Bustling local market for street food & shopping",
      "Lotus Tower – Sri Lanka's tallest structure with panoramic city views",
      "Old Dutch Hospital – A colonial-era shopping & dining complex",
      "National Museum of Colombo – Showcasing Sri Lanka's rich history",
      "Seema Malaka Temple – A picturesque Buddhist temple on Beira Lake",
      "Casino Night Experience (Optional) – Enjoy nightlife at top casinos like Bally's Colombo",
      "Half-Day Tour option (4 hours)",
      "Full-Day Tour option (8 hours) (including lunch)"
    ],
    itinerary: [
      {
        title: 'Pick-up & orientation',
        description:
          'Hotel pick-up in Colombo. Quick briefing and route plan (Half-Day ~4h or Full-Day ~8h).'
      },
      {
        title: 'Temples & lakeside calm',
        description: 'Visit Gangaramaya Temple and Seema Malaka Temple (Beira Lake).'
      },
      {
        title: 'Heritage & independence landmarks',
        description: 'Independence Square and (time permitting) the National Museum / colonial-era architecture stops.'
      },
      {
        title: 'Pettah Market experience',
        description:
          'Walk through Pettah Market for street food, shopping, and local life (customizable to your interests).'
      },
      {
        title: 'Galle Face Green + coastal views',
        description: 'Relax by the oceanfront promenade for photos and snacks.'
      },
      {
        title: 'Optional add-ons (Full-Day)',
        description:
          'Lotus Tower visit and lunch stop. Optional evening casino experience can be arranged separately.'
      },
      {
        title: 'Drop-off',
        description: 'Return to your hotel (or preferred drop-off point in Colombo).'
      },
    ],
    inclusions: {
      included: [
        'Hotel pick-up & drop-off (Colombo)',
        'Private vehicle (A/C) (package dependent)',
        'English-speaking driver/guide',
        'Bottled water',
        'Lunch (Full-Day option only, where specified)',
      ],
      notIncluded: [
        'Entrance tickets (unless specified)',
        'Meals & drinks not mentioned in inclusions',
        'Personal expenses',
        'Optional activities (e.g., casino)',
        'Tips and gratuities (optional)',
      ],
    },
    destinations: ['colombo'],
  },
  {
    title: "Ramayana Trail Tour",
    location: "Negombo - Chilaw - Sigiriya - Kandy - Nuwara Eliya - Ella - Kataragama - Colombo",
    duration: "8 Days / 7 Nights",
    shortDescription: "Explore the sacred sites of Sri Lanka linked to the Ramayana epic, following the footsteps of Lord Rama, Seetha Devi, and the legendary King Ravana.",
    image: "/assets/images/seetha.jpg",
    highlights: [
      "Munneswaram & Manavari Temples (where Lord Rama prayed)",
      "Seetha Amman Temple & Hakgala Botanical Gardens (linked to Seetha Devi)",
      "Ravana Cave & Ella Falls (associated with King Ravana)",
      "Divurumpola Temple (believed to be the site of Seetha Devi's Agni Pariksha)",
      "Kataragama Temple (dedicated to Lord Skanda)",
      "Kelaniya Temple (where Vibheeshana was crowned king)"
    ],
    itinerary: [
      {
        title: 'Day 1 — Arrival in Negombo (settle in by the coast)',
        description:
          'Airport pick-up and transfer to Negombo. Time at leisure to relax after your flight and prepare for the journey.'
      },
      {
        title: 'Day 2 — Chilaw area temples: Munneswaram & Manavari',
        description:
          'Travel north along the coast to visit Munneswaram Temple and Manavari Temple—important Ramayana-linked shrines where Lord Rama is believed to have prayed. Return to your hotel and rest.'
      },
      {
        title: 'Day 3 — Sigiriya: Cultural Triangle experience',
        description:
          'Drive inland to Sigiriya. Visit the Sigiriya area sites (rock fortress / nearby heritage spots as time allows) and enjoy a relaxed evening in the cultural heartland.'
      },
      {
        title: 'Day 4 — Kandy: sacred city & cultural stops',
        description:
          'Continue to Kandy. Visit key spiritual and cultural landmarks (Temple of the Tooth area, lake walk, viewpoints) and enjoy a calm evening in the hill capital.'
      },
      {
        title: 'Day 5 — Nuwara Eliya: Seetha Amman Temple & Hakgala',
        description:
          'Travel to the misty highlands. Visit Seetha Amman Temple and explore Hakgala Botanical Gardens—sites associated with Seetha Devi in the Ramayana trail.'
      },
      {
        title: 'Day 6 — Ella: Ravana sites & scenic waterfalls',
        description:
          'Drive to Ella. Explore Ravana Cave and visit Ravana Falls / Ella Falls area (seasonal flow), plus time for viewpoints and a relaxed hill-country evening.'
      },
      {
        title: 'Day 7 — Kataragama region: Divurumpola + Kataragama Temple (via south)',
        description:
          'Head south with key Ramayana-linked stops including Divurumpola Temple (believed to be the site of Seetha Devi\'s Agni Pariksha). Continue to the Kataragama region for evening temple atmosphere and rituals.'
      },
      {
        title: 'Day 8 — Colombo: Kelaniya Temple + departure',
        description:
          'Return to Colombo. Visit Kelaniya Temple (where Vibheeshana was crowned king, according to lore) and proceed to your airport/hotel drop-off based on your flight time.'
      },
    ],
    inclusions: {
      included: [
        'Accommodation (7 nights) (package level dependent)',
        'Private air-conditioned transport for the full tour',
        'English-speaking driver/guide',
        'Airport pick-up & drop-off',
        'Daily breakfast (hotel plan dependent)',
        'Bottled water during transfers',
        'Selected entrance tickets (as per itinerary, where specified)',
      ],
      notIncluded: [
        'International flights & visa fees',
        'Travel insurance',
        'Lunch & dinner (unless specified)',
        'Temple offerings / pooja donations',
        'Any entrance tickets not listed as included',
        'Personal expenses (laundry, minibar, etc.)',
        'Tips and gratuities (optional)',
      ],
    },
    destinations: ['negombo', 'sigiriya', 'kandy', 'nuwara-eliya', 'ella', 'yala', 'colombo'],
  },
  {
    title: "Cultural & Heritage Tour",
    location: "Anuradhapura - Polonnaruwa - Sigiriya - Dambulla - Kandy",
    duration: "8 Days / 7 Nights",
    shortDescription: "Immerse yourself in Sri Lanka's rich cultural heritage as you explore ancient cities, sacred temples, and traditional performances.",
    image: "/assets/images/wda17.jpeg",
    highlights: [
      "Ancient city of Anuradhapura",
      "Polonnaruwa UNESCO ruins",
      "Sigiriya Rock Fortress",
      "Dambulla Cave Temple",
      "Traditional Kandyan dance performance"
    ],
    itinerary: [
      {
        title: 'Day 1 — Arrival + transfer to Anuradhapura',
        description:
          'Pick-up from Colombo/airport and travel to Anuradhapura. Evening at leisure with a gentle introduction to the Sacred City atmosphere.'
      },
      {
        title: 'Day 2 — Anuradhapura: Sacred City highlights',
        description:
          'Explore key cultural and religious sites such as the Sri Maha Bodhi area, ancient stupas, and historic reservoirs. Pace is customizable based on interests and weather.'
      },
      {
        title: 'Day 3 — Polonnaruwa: UNESCO ancient capital',
        description:
          'Transfer to Polonnaruwa for a guided heritage exploration of ruins, statues, and royal structures (cycling option available depending on preference).'
      },
      {
        title: 'Day 4 — Sigiriya: Rock Fortress & viewpoints',
        description:
          'Drive to Sigiriya. Visit Sigiriya Rock Fortress (or choose Pidurangala for sunrise/sunset views) and enjoy the Cultural Triangle surroundings.'
      },
      {
        title: 'Day 5 — Dambulla: Cave Temple + local culture',
        description:
          'Visit the Dambulla Cave Temple and explore nearby cultural spots such as markets, spice gardens, or village-style experiences (based on preference).'
      },
      {
        title: 'Day 6 — Kandy: Temple city & lakeside charm',
        description:
          'Travel to Kandy. Visit cultural landmarks and enjoy a relaxed evening around Kandy Lake with optional viewpoints.'
      },
      {
        title: 'Day 7 — Kandy: heritage, crafts & Kandyan dance',
        description:
          'A deeper Kandy day: temples, craft and gem workshops (optional), and a traditional Kandyan dance performance in the evening.'
      },
      {
        title: 'Day 8 — Departure',
        description:
          'Transfer to Colombo/airport for departure (or extend your stay on request).'
      },
    ],
    inclusions: {
      included: [
        'Accommodation (7 nights) (package level dependent)',
        'Private air-conditioned transport for the full tour',
        'English-speaking driver/guide',
        'Airport/Colombo pick-up & drop-off',
        'Daily breakfast (hotel plan dependent)',
        'Kandyan dance performance tickets (where specified)',
      ],
      notIncluded: [
        'International flights & visa fees',
        'Travel insurance',
        'Lunch & dinner (unless specified)',
        'Entrance tickets (unless specified)',
        'Personal expenses (laundry, minibar, etc.)',
        'Tips and gratuities (optional)',
      ],
    },
    destinations: ['anuradhapura', 'polonnaruwa', 'sigiriya', 'dambulla', 'kandy'],
  },
  {
    title: "Sri Lanka Wildlife & Adventure Tour",
    location: "Wilpattu - Sigiriya - Minneriya - Kandy - Ella - Yala - Mirissa",
    duration: "10 Days / 9 Nights",
    shortDescription: "An epic adventure combining wildlife safaris, cultural experiences, and thrilling activities across Sri Lanka's most spectacular locations.",
    image: "/assets/images/wda18.jpeg",
    highlights: [
      "Jeep safari at Wilpattu & Yala National Parks",
      "Elephant spotting at Minneriya",
      "Hot air balloon ride over Sigiriya",
      "Trekking in Ella & Little Adam's Peak",
      "Whale watching in Mirissa"
    ],
    itinerary: [
      {
        title: 'Day 1 — Arrival + transfer to the Cultural Triangle (Sigiriya area)',
        description:
          'Pick-up from Colombo/airport and transfer to the Sigiriya area to position you close to the first adventure activities. Evening at leisure.'
      },
      {
        title: 'Day 2 — Sigiriya: sunrise + optional hot air balloon',
        description:
          'Early start for a sunrise viewpoint. Optional hot air balloon ride (seasonal and weather-dependent). Later, explore Sigiriya area highlights and relax at your hotel.'
      },
      {
        title: 'Day 3 — Minneriya elephant safari (based from Sigiriya)',
        description:
          'Afternoon jeep safari to spot elephants (seasonal gathering periods vary). Morning free time for pool/rest or an easy village-style experience.'
      },
      {
        title: 'Day 4 — Wilpattu-style wildlife day (best available park option)',
        description:
          'Full-day wildlife experience arranged as per logistics and seasonality. If Wilpattu is chosen, expect an early departure and a long but rewarding safari day. Alternative parks/routes may be used to optimize sightings and driving time.'
      },
      {
        title: 'Day 5 — Kandy: culture + lake walk',
        description:
          'Travel to Kandy. Visit cultural landmarks, enjoy the lakeside atmosphere, and settle in for a cooler hill-country evening.'
      },
      {
        title: 'Day 6 — Kandy → Ella: scenic transfer + viewpoints',
        description:
          'Transfer to Ella (option to include a scenic train segment depending on timing/availability). Evening at leisure with cafés and viewpoints.'
      },
      {
        title: 'Day 7 — Ella trekking day',
        description:
          'Hike Little Adam\'s Peak and explore the Nine Arches Bridge area. Optional add-ons can include short waterfall walks or zipline/adventure activities (where available).'
      },
      {
        title: 'Day 8 — Yala: safari experience',
        description:
          'Travel south to Yala and enjoy a jeep safari (best scheduled early morning or late afternoon). Look out for leopard, elephants, birds, and crocodiles.'
      },
      {
        title: 'Day 9 — Mirissa: beach relaxation + whale watching (seasonal)',
        description:
          'Transfer to Mirissa for beach time. Optional whale watching trip (seasonal, ocean conditions apply). Sunset on the coast to close the trip.'
      },
      {
        title: 'Day 10 — Departure / drop-off',
        description:
          'Drop-off to Colombo or the airport based on your flight time (or extend your stay on request).'
      },
    ],
    inclusions: {
      included: [
        'Accommodation (9 nights) (package level dependent)',
        'Private air-conditioned transport for the full tour',
        'English-speaking driver/guide',
        'Airport/Colombo pick-up & drop-off',
        'Daily breakfast (hotel plan dependent)',
        'Jeep safari at Yala (where specified)',
        'Jeep safari for elephant spotting (Minneriya area, where specified)',
      ],
      notIncluded: [
        'International flights & visa fees',
        'Travel insurance',
        'Lunch & dinner (unless specified)',
        'Park entrance tickets (unless specified)',
        'Optional hot air balloon ride (subject to weather & availability)',
        'Optional whale watching (seasonal; unless specified)',
        'Personal expenses (laundry, minibar, etc.)',
        'Tips and gratuities (optional)',
      ],
    },
    destinations: ['sigiriya', 'kandy', 'ella', 'yala', 'mirissa'],
  },
  {
    title: "Classic Sri Lanka Tour",
    location: "Colombo - Sigiriya - Kandy - Nuwara Eliya - Ella - Galle - Bentota",
    duration: "7 Days / 6 Nights",
    shortDescription: "Experience the best of Sri Lanka with our signature tour covering ancient cities, cultural heritage, scenic train rides, and beach relaxation.",
    image: "/assets/images/wda19.jpeg",
    highlights: [
      "Sigiriya Rock Fortress",
      "Temple of the Tooth Relic, Kandy",
      "Scenic train ride from Nuwara Eliya to Ella",
      "Tea plantations and waterfalls",
      "Galle Fort & Bentota beach relaxation"
    ],
    itinerary: [
      {
        title: 'Day 1 — Arrival in Colombo',
        description:
          'Airport pick-up, check-in, and an easy Colombo orientation (markets/heritage/waterfront depending on arrival time).'
      },
      {
        title: 'Day 2 — Colombo → Sigiriya (Cultural Triangle)',
        description:
          'Travel to Sigiriya. Enjoy a relaxed afternoon and optional sunset viewpoint. Ideal day to rest after the transfer.'
      },
      {
        title: 'Day 3 — Sigiriya: Rock Fortress + cultural highlights',
        description:
          'Visit Sigiriya Rock Fortress (or Pidurangala as an alternative viewpoint). Optional village-style experiences based on your pace.'
      },
      {
        title: 'Day 4 — Sigiriya → Kandy',
        description:
          'Transfer to Kandy. Visit key cultural landmarks and end the day with a lakeside walk and a calm hill-city evening.'
      },
      {
        title: 'Day 5 — Kandy → Nuwara Eliya (tea country)',
        description:
          'Head into the cool highlands. Visit tea plantations/factories, waterfalls en route, and enjoy colonial-era charm in Nuwara Eliya.'
      },
      {
        title: 'Day 6 — Nuwara Eliya → Ella (scenic train ride)',
        description:
          'Take the iconic hill-country train journey (subject to availability) for misty valleys and tea estates. Arrive in Ella for viewpoints and a relaxed evening.'
      },
      {
        title: 'Day 7 — Ella → Galle → Bentota (coast + fort + beach)',
        description:
          'Travel to the south coast, explore Galle Fort, then continue to Bentota for beach time. Drop-off to Colombo/airport can be arranged as an extension if needed.'
      },
    ],
    inclusions: {
      included: [
        'Accommodation (6 nights) (package level dependent)',
        'Private air-conditioned transport for the full tour',
        'English-speaking driver/guide',
        'Airport/Colombo pick-up',
        'Daily breakfast (hotel plan dependent)',
        'Scenic train ride tickets (Nuwara Eliya area → Ella, subject to availability)',
      ],
      notIncluded: [
        'International flights & visa fees',
        'Travel insurance',
        'Lunch & dinner (unless specified)',
        'Entrance tickets (unless specified)',
        'Personal expenses (laundry, minibar, etc.)',
        'Tips and gratuities (optional)',
      ],
    },
    destinations: ['colombo', 'sigiriya', 'kandy', 'nuwara-eliya', 'ella', 'galle', 'bentota'],
  }
];
