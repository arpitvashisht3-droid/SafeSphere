/**
 * SafeSphere Places Dataset
 *
 * Contains 10 realistic urban locations with safety metrics, AI summaries,
 * and verified user reviews. Helper service functions simulate async data
 * access so pages can be wired up to a real API with minimal changes.
 */

/** Simulated network latency (ms) used by all async helpers. */
const MOCK_DELAY_MS = 100;

/** Shorter delay for single-record lookups. */
const MOCK_LOOKUP_DELAY_MS = 80;

/** Longer delay for write operations. */
const MOCK_WRITE_DELAY_MS = 200;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const MOCK_PLACES = [
  {
    id: '1',
    name: 'ABC Girls PG',
    category: 'PG & Hostels',
    address: 'Plot 42, Knowledge Park III, Near Metro Gate 2',
    location: 'Greater Noida, Delhi NCR',
    safetyScore: 94,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    aiSummary:
      'Secured female residence with 24/7 CCTV surveillance, biometric entrance, female warden, and brightly lit main road access.',
    reviews: [
      {
        review:
          'Staying here for 8 months. Extremely safe environment with biometric entry locks and a strict 10 PM entry log. The street outside has bright LED lights all night.',
        anonymous: false,
        rating: 5,
      },
      {
        review:
          'The female warden is very vigilant. Parents get SMS updates on entry/exit times. Felt completely secure during late-night study sessions.',
        anonymous: true,
        rating: 5,
      },
      {
        review:
          'Good security overall. The cab drop-off area is right at the main gate which is well illuminated.',
        anonymous: false,
        rating: 4,
      },
    ],
  },
  {
    id: '2',
    name: "XYZ Women's Hostel",
    category: 'PG & Hostels',
    address: 'B-18, South Extension Part II, Ring Road',
    location: 'South Delhi, Delhi NCR',
    safetyScore: 91,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    aiSummary:
      "Popular women's accommodation featuring gated security guards, emergency call buttons on every floor, and curfew check-ins.",
    reviews: [
      {
        review:
          'Located in a very active market area so even coming back at 9 PM feels safe. Two security guards are stationed at the main gate 24 hours.',
        anonymous: false,
        rating: 5,
      },
      {
        review:
          'Clean premises with good CCTV coverage in hallways and common areas. Highly recommended for working women.',
        anonymous: true,
        rating: 4,
      },
    ],
  },
  {
    id: '3',
    name: 'Rajiv Chowk Metro Station',
    category: 'Transit & Metro',
    address: 'Connaught Place Concourse Level, Central Hub',
    location: 'Central Delhi, Delhi NCR',
    safetyScore: 89,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    aiSummary:
      'High-traffic major transit hub with continuous CISF security patrols, full CCTV coverage, and women-only coach enforcement.',
    reviews: [
      {
        review:
          'Heavy security presence at all gates and concourses. CISF officers actively patrol platform areas and enforce women\'s coach rules.',
        anonymous: false,
        rating: 5,
      },
      {
        review:
          'Very bright and crowded at almost all hours. Easy to find help points or station staff if needed.',
        anonymous: false,
        rating: 4,
      },
      {
        review: 'Felt safe transferring lines late in the evening. Lots of commuters around.',
        anonymous: true,
        rating: 5,
      },
    ],
  },
  {
    id: '4',
    name: 'Blue Mug Cafe',
    category: 'Cafes & Dining',
    address: 'Shop 12, Hauz Khas Village Main Promenade',
    location: 'South Delhi, Delhi NCR',
    safetyScore: 86,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    aiSummary:
      'Cozy student-friendly cafe situated on a well-lit street with valet parking assistance and late-night female staff presence.',
    reviews: [
      {
        review:
          'Great cafe for solo working or hanging out with friends. The street leading to the cafe is well lit and has steady foot traffic until 11 PM.',
        anonymous: false,
        rating: 4,
      },
      {
        review:
          'Friendly staff and clean environment. They can arrange verified auto cabs for solo women customers upon request.',
        anonymous: true,
        rating: 5,
      },
    ],
  },
  {
    id: '5',
    name: 'Delhi Public Library',
    category: 'Libraries & Study',
    address: 'Opposite Old Delhi Railway Station, Chandni Chowk',
    location: 'Central Delhi, Delhi NCR',
    safetyScore: 88,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    aiSummary:
      'Quiet public library with dedicated reading zones for women, security desk at entrance, and bright street lighting.',
    reviews: [
      {
        review:
          'Very respectful study environment. Guard checks visitor ID at the entrance and female seating areas are well maintained.',
        anonymous: false,
        rating: 5,
      },
      {
        review:
          'Spacious reading rooms with good lighting. Staff is helpful and safety protocols are strictly followed.',
        anonymous: true,
        rating: 4,
      },
    ],
  },
  {
    id: '6',
    name: 'SafeRide Cab Service Depot',
    category: 'Transport & Services',
    address: 'Terminal 3 Arrival Zone, IGI Airport',
    location: 'New Delhi, Delhi NCR',
    safetyScore: 96,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    aiSummary:
      'Government-verified female driver cab service with live GPS tracking, panic buttons, and 24/7 central dispatch monitoring.',
    reviews: [
      {
        review:
          'Used this service for a 2 AM airport trip. The driver was professional, ride was live tracked by central dispatch, and panic button was clearly visible.',
        anonymous: false,
        rating: 5,
      },
      {
        review:
          'Best cab service for solo female travelers in the city. Reliable and completely stress-free experience.',
        anonymous: false,
        rating: 5,
      },
    ],
  },
  {
    id: '7',
    name: 'City Park Promenade',
    category: 'Parks & Recreation',
    address: 'Sector 23 Avenue, Near District Sports Complex',
    location: 'Gurgaon, Delhi NCR',
    safetyScore: 82,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    aiSummary:
      'Well-maintained urban park with solar lighting along running tracks and park ranger patrols until 9 PM.',
    reviews: [
      {
        review:
          'Great park for morning and evening walks. Solar lighting along the main running tracks remains on until late evening.',
        anonymous: true,
        rating: 4,
      },
      {
        review:
          'Good crowds of families and joggers until 8:30 PM. Park rangers are present near the main entry gates.',
        anonymous: false,
        rating: 4,
      },
    ],
  },
  {
    id: '8',
    name: 'Apex Coaching Institute',
    category: 'Education & Coaching',
    address: '4th Floor, Pusa Road, Karol Bagh',
    location: 'West Delhi, Delhi NCR',
    safetyScore: 87,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    aiSummary:
      'Prominent coaching center with biometric student entry, dedicated female security personnel, and main road location.',
    reviews: [
      {
        review:
          'Situated right on Pusa Road main arterial road with metro access nearby. Elevator and lobby have CCTV cameras.',
        anonymous: false,
        rating: 4,
      },
      {
        review:
          'Biometric attendance keeps track of student entry and exit times. Staff ensures students leave safely after evening batches.',
        anonymous: true,
        rating: 5,
      },
    ],
  },
  {
    id: '9',
    name: 'Metro Mall & Shopping Arcade',
    category: 'Shopping & Retail',
    address: 'MG Road, Near IFFCO Chowk Metro Station',
    location: 'Gurgaon, Delhi NCR',
    safetyScore: 93,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80',
    aiSummary:
      'Modern shopping mall equipped with multi-tier metal detectors, private security guards, covered parking, and lit taxi stands.',
    reviews: [
      {
        review:
          'Excellent security checks at every entrance. Brightly lit underground parking with active security guards directing traffic.',
        anonymous: false,
        rating: 5,
      },
      {
        review:
          'Official app cab pick-up zone is right under security oversight. Very safe for late evening movie shows.',
        anonymous: false,
        rating: 5,
      },
    ],
  },
  {
    id: '10',
    name: 'Green Garden Hostel',
    category: 'PG & Hostels',
    address: 'Lane 4, Vijay Nagar, Near DU North Campus',
    location: 'North Delhi, Delhi NCR',
    safetyScore: 90,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    aiSummary:
      'Student hostel located in a lively University campus area with active police patrolling and illuminated street corners.',
    reviews: [
      {
        review:
          'Perfect location for DU students. The area is filled with students so it stays lively and safe throughout the evening.',
        anonymous: true,
        rating: 5,
      },
      {
        review:
          'Night PCR police vans patrol Vijay Nagar lane frequently. Hostel gate requires keycard access.',
        anonymous: false,
        rating: 4,
      },
    ],
  },
];

// Available categories for dropdown filtering
export const PLACE_CATEGORIES = [
  'All Categories',
  'PG & Hostels',
  'Transit & Metro',
  'Cafes & Dining',
  'Libraries & Study',
  'Transport & Services',
  'Parks & Recreation',
  'Education & Coaching',
  'Shopping & Retail',
];

// Safety level options for filtering
export const SAFETY_LEVELS = [
  'All Safety Levels',
  'High Safety',
  'Moderate Safety',
  'Caution Advised',
];

/**
 * Data Access Helper Functions
 */

/**
 * Fetch places with optional filter parameters.
 *
 * @param {{ query?: string, category?: string, safetyLevel?: string }} filters
 * @returns {Promise<typeof MOCK_PLACES>}
 */
export async function getPlaces(filters = {}) {
  const { query = '', category = '', safetyLevel = '' } = filters;

  await delay(MOCK_DELAY_MS);

  return MOCK_PLACES.filter((place) => {
    const lowerQuery = query.toLowerCase();

    const matchesQuery =
      !query ||
      place.name.toLowerCase().includes(lowerQuery) ||
      place.address.toLowerCase().includes(lowerQuery) ||
      place.location.toLowerCase().includes(lowerQuery) ||
      (place.aiSummary && place.aiSummary.toLowerCase().includes(lowerQuery));

    const matchesCategory =
      !category || category === 'All Categories' || place.category === category;

    const matchesSafety =
      !safetyLevel ||
      safetyLevel === 'All Safety Levels' ||
      (safetyLevel === 'High Safety' && place.safetyScore >= 85) ||
      (safetyLevel === 'Moderate Safety' && place.safetyScore >= 70 && place.safetyScore < 85) ||
      (safetyLevel === 'Caution Advised' && place.safetyScore < 70);

    return matchesQuery && matchesCategory && matchesSafety;
  });
}

/**
 * Fetch a single place by its ID.
 *
 * @param {string | number} id
 * @returns {Promise<(typeof MOCK_PLACES)[number] | null>}
 */
export async function getPlaceById(id) {
  await delay(MOCK_LOOKUP_DELAY_MS);
  return MOCK_PLACES.find((place) => String(place.id) === String(id)) ?? null;
}

/**
 * Submit a new review for a place (mutates in-memory data only).
 *
 * @param {string | number} placeId
 * @param {{ comment?: string, review?: string, anonymous?: boolean, rating?: number }} reviewData
 * @returns {Promise<{ review: string, anonymous: boolean, rating: number }>}
 */
export async function submitPlaceReview(placeId, reviewData) {
  await delay(MOCK_WRITE_DELAY_MS);

  const place = MOCK_PLACES.find((p) => String(p.id) === String(placeId));
  if (!place) throw new Error('Place not found');

  const newReview = {
    review: reviewData.comment || reviewData.review || 'Safety observation report.',
    anonymous: Boolean(reviewData.anonymous),
    rating: Number(reviewData.rating) || 5,
  };

  place.reviews.unshift(newReview);
  return newReview;
}
