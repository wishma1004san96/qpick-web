export interface VehicleItem {
  type: string;
  models: string;
  bestFor: string;
  image: string;
  imagePosition?: 'bottom center';
  inclusions: string[];
}

export const vehicles: VehicleItem[] = [
  {
    type: 'Sedan',
    models: '2-3 Passengers',
    bestFor: 'Couples, solo travelers, and compact city transfers',
    image: '/assets/images/vhicle/vhicle2.jpeg',
    inclusions: [
      'Air-conditioned vehicle',
      'English-speaking driver',
      'Fuel and toll charges (within the limit of 150 km/day)',
      'If Drop or Pickup only, 400 km per trip',
      'Insurance',
      'Free water bottle',
    ],
  },
  {
    type: 'SUV',
    models: '3-4 Passengers',
    bestFor: 'Small families, extra luggage space, and comfortable long drives',
    image: '/assets/images/vhicle/vhicle5.jpeg',
    inclusions: [
      'Air-conditioned vehicle',
      'English-speaking driver',
      'Fuel and toll charges (within the limit of 150 km/day)',
      'If Drop or Pickup only, 400 km per trip',
      'Insurance',
      'Free water bottle',
    ],
  },
  {
    type: 'KDH (Front-Row Seating)',
    models: '6 Passengers',
    bestFor: 'Families and small groups needing extra comfort and legroom',
    image: '/assets/images/vhicle/vehicle8.jpg',
    inclusions: [
      'Air-conditioned minivan',
      'English-speaking driver',
      'Fuel and toll charges (within the limit of 150 km/day)',
      'If Drop or Pickup only, 400 km per trip',
      'Insurance',
      'Free water bottle',
    ],
  },
  {
    type: 'KDH (High-Roof)',
    models: '8-10 Passengers',
    bestFor: 'Extended families, airport runs, and medium group tours',
    image: '/assets/images/vhicle/vhicle9.jpg',
    inclusions: [
      'Air-conditioned high-roof van',
      'English-speaking driver',
      'Fuel and toll charges (within the limit of 150 km/day)',
      'If Drop or Pickup only, 400 km per trip',
      'Insurance',
      'Free water bottle',
    ],
  },
  {
    type: 'Coaster Bus',
    models: '15 Passengers',
    bestFor: 'Corporate outings, family reunions, and group transfers',
    image: '/assets/images/vhicle/vhicle6.jpg',
    inclusions: [
      'Air-conditioned coaster bus',
      'Professional English-speaking driver',
      'Fuel and toll charges (within the limit of 200 km/day)',
      'If Drop or Pickup only, 400 km per trip',
      'Insurance',
      'Free water bottle',
    ],
  },
  {
    type: 'Mid-Size / Long Bus',
    models: '20 Passengers',
    bestFor: 'Tour groups, events, and multi-day route plans',
    image: '/assets/images/vhicle/vhicle10.jpg',
    imagePosition: 'bottom center',
    inclusions: [
      'Air-conditioned bus',
      'Professional English-speaking driver',
      'Fuel and toll charges (within the limit of 200 km/day)',
      'If Drop or Pickup only, 400 km per trip',
      'Insurance',
      'Free water bottle',
    ],
  },
  {
    type: 'Long Bus',
    models: '38 Passengers',
    bestFor: 'Large tour groups, conferences, and full-capacity travel',
    image: '/assets/images/vhicle/vhicle3.jpeg',
    inclusions: [
      'Air-conditioned long bus',
      'Professional English-speaking driver and assistant',
      'Fuel and toll charges (within the limit of 200 km/day)',
      'If Drop or Pickup only, 400 km per trip',
      'Insurance',
      'Free water bottle',
    ],
  },
];
