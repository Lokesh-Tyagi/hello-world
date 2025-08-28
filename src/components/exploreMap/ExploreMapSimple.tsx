'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { TextField, Button, Typography, Paper, Autocomplete } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import PlaceIcon from '@mui/icons-material/Place';
import { GOOGLE_MAPS_CONFIG } from '@/config/maps';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { MarkerClusterer, GridAlgorithm } from '@googlemaps/markerclusterer';
import { fetchBusinessesInBox } from '../../services/businessService';
import { Business } from '../../types/Business';
import MarkerPopup from '../markerPopup';
import './ExploreMap.scss';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// Rating Display Component
const RatingDisplay = ({ rating, reviewCount }: { rating: number; reviewCount?: number }) => {
  if (!rating || rating < 0 || rating > 5) {
    return <span>N/A</span>;
  }

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push('★');
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    stars.push('☆');
  }
  
  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push('☆');
  }

  return (
    <span className="rating-display">
     
      <span className="rating-fraction">{rating.toFixed(1)}</span>
      <span className="rating-stars">{stars.join('')}</span>
      {reviewCount !== undefined && reviewCount > 0 && (
        <span className="review-count"> ({reviewCount})</span>
      )}
      
    </span>
  );
};

interface FilterOption {
  value: string;
  label: string;
}

interface Venue {
  id: string;
  name: string;
  type: string;
  rating: number;
  price: string;
  lat: number;
  lng: number;
  address: string;
  services: string[];
  otherOptions: string;
  country: string;
}

// Country-specific center coordinates
const countryCenters = {
  'germany': { lat: 51.1657, lng: 10.4515 }, // Germany center
  'france': { lat: 46.2276, lng: 2.2137 }, // France center
  'italy': { lat: 41.8719, lng: 12.5674 }, // Italy center
  'spain': { lat: 40.4637, lng: -3.7492 }, // Spain center
  'uk': { lat: 55.3781, lng: -3.4360 }, // UK center
  'United States of America': { lat: 40.7128, lng: -74.0060 }, // New York center
  'canada': { lat: 56.1304, lng: -106.3468 }, // Canada center
  'australia': { lat: -25.2744, lng: 133.7751 }, // Australia center
  'japan': { lat: 36.2048, lng: 138.2529 }, // Japan center
  'brazil': { lat: -14.2350, lng: -51.9253 }, // Brazil center
};

const countryOptions: FilterOption[] = [
  { value: 'germany', label: 'Germany' },
  { value: 'france', label: 'France' },
  { value: 'italy', label: 'Italy' },
  { value: 'spain', label: 'Spain' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'United States of America', label: 'United States' },
  { value: 'canada', label: 'Canada' },
  { value: 'australia', label: 'Australia' },
  { value: 'japan', label: 'Japan' },
  { value: 'brazil', label: 'Brazil' },
];

// Default place type options
const defaultPlaceTypeOptions: FilterOption[] = [
  { value: 'Smoke shop', label: 'Smoke shop' },
  { value: 'restaurants', label: 'Restaurant' },
  { value: 'cafe', label: 'Cafe' },
  { value: 'bar', label: 'Bar' },
  { value: 'Night club', label: 'Nightclub' },
  { value: 'lounge', label: 'Lounge' },
  { value: 'Hookah store', label: 'Hookah Store' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'entertainment', label: 'Entertainment' },
];

// German-specific place type options
const germanPlaceTypeOptions: FilterOption[] = [
  { value: 'Kiosk', label: 'Kiosk' },
  { value: 'Food and drink', label: 'Food and drink' },
  { value: 'Shisha-Bar', label: 'Shisha Bar' },
  { value: 'Bar', label: 'Bar' },
  // { value: 'Bowling alley', label: 'Bowling alley' },
  // { value: 'Gift shop', label: 'Gift shop' },
  // { value: 'Beverage distributor', label: 'Beverage distributor' },
  // { value: 'Tobacco shop', label: 'Tobacco shop' },
  // { value: 'Sushi restaurant', label: 'Sushi restaurant' },
  // { value: 'Arabisches Restaurant', label: 'Arabisches Restaurant' },
  // { value: 'Tobacco supplier', label: 'Tobacco supplier' },
  // { value: 'Nargile Mağazası', label: 'Nargile Mağazası' },
  // { value: 'Bilgisayar Tamir Servisi', label: 'Bilgisayar Tamir Servisi' },
  // { value: 'Spirituosengeschäft', label: 'Spirituosengeschäft' },
  // { value: 'Cigar shop', label: 'Cigar shop' },
  { value: 'Restaurant', label: 'Restaurant' },
  // { value: 'Produce market', label: 'Produce market' },
  // { value: 'Internetcafé', label: 'Internetcafé' },
  // { value: 'Nachtclub', label: 'Nachtclub' },
  // { value: 'Gay night club', label: 'Gay night club' },
  // { value: 'Sporting goods store', label: 'Sporting goods store' },
  { value: 'hotels', label: 'Hotels' },
];

// Function to get place type options based on selected country
const getPlaceTypeOptions = (country: string): FilterOption[] => {
  if (country === 'germany') {
    return germanPlaceTypeOptions;
  }
  return defaultPlaceTypeOptions;
};

const servicesOptions: FilterOption[] = [
  { value: 'delivery', label: 'Delivery' },
  { value: 'takeout', label: 'Takeout' },
  { value: 'reservations', label: 'Reservations' },
  { value: 'parking', label: 'Parking' },
  { value: 'wifi', label: 'WiFi' },
  { value: 'live-music', label: 'Live Music' },
  { value: 'outdoor-seating', label: 'Outdoor Seating' },
  { value: 'private-rooms', label: 'Private Rooms' },
];

const otherOptions: FilterOption[] = [
  { value: 'OPERATIONAL', label: 'Operational' },
  { value: 'CLOSED_TEMPORARILY', label: 'Closed Temporarily' },
  { value: 'CLOSED_PERMANENTLY', label: 'Closed Permanently' },
  
];

const ratingOptions: FilterOption[] = [
  // { value: 'any', label: 'Any Rating' },
  { value: '4.5', label: '4.5+ ' },
  { value: '4.0', label: '4.0+ ' },
  { value: '3.5', label: '3.5+ ' },
  { value: '3.0', label: '3.0+ ' },
  {value: '2.5', label: '2.5+ '},
  {value: '2.0', label: '2.0+ '},
  {value: '1.5', label: '1.5+ '},
  {value: '1.0', label: '1.0+ '},
  
];

// Sample venue data with country information
const sampleVenues: Venue[] = [
  // Germany venues (Berlin area)
  {
    id: '1',
    name: 'Shisha Sky Lounge',
    type: 'hookah',
    rating: 4.8,
    price: '$$',
    lat: 52.5200,
    lng: 13.4050,
    address: 'Unter den Linden 1, Berlin',
    services: ['live-music', 'outdoor-seating', 'private-rooms'],
    otherOptions: 'OPERATIONAL',
    country: 'germany'
  },
  {
    id: '2',
    name: 'Arabian Nights Hookah',
    type: 'hookah',
    rating: 4.5,
    price: '$$',
    lat: 52.5150,
    lng: 13.4100,
    address: 'Friedrichstraße 123, Berlin',
    services: ['delivery', 'reservations', 'wifi'],
    otherOptions: 'OPERATIONAL',
    country: 'germany'
  },
  {
    id: '3',
    name: 'Berlin Shisha Palace',
    type: 'hookah',
    rating: 4.2,
    price: '$',
    lat: 52.5250,
    lng: 13.4000,
    address: 'Alexanderplatz 5, Berlin',
    services: ['takeout', 'parking'],
    otherOptions: 'OPERATIONAL',
    country: 'germany'
  },
  {
    id: '4',
    name: 'Mystic Lounge',
    type: 'lounge',
    rating: 4.7,
    price: '$$$',
    lat: 52.5300,
    lng: 13.4150,
    address: 'Potsdamer Platz 10, Berlin',
    services: ['live-music', 'private-rooms', 'wifi'],
    otherOptions: 'OPERATIONAL',
    country: 'germany'
  },
  {
    id: '5',
    name: 'Orient Express Hookah',
    type: 'hookah',
    rating: 4.3,
    price: '$$',
    lat: 52.5100,
    lng: 13.4200,
    address: 'Kurfürstendamm 45, Berlin',
    services: ['outdoor-seating', 'reservations'],
    otherOptions: 'OPERATIONAL',
    country: 'germany'
  },
  // New York venues
  {
    id: '6',
    name: 'Manhattan Shisha Lounge',
    type: 'hookah',
    rating: 4.6,
    price: '$$$',
    lat: 40.7589,
    lng: -73.9851,
    address: 'Times Square, New York, NY',
    services: ['live-music', 'private-rooms', 'wifi'],
    otherOptions: 'OPERATIONAL',
    country: 'United States of America'
  },
  {
    id: '7',
    name: 'Brooklyn Hookah Bar',
    type: 'hookah',
    rating: 4.4,
    price: '$$',
    lat: 40.7182,
    lng: -73.9584,
    address: 'Williamsburg, Brooklyn, NY',
    services: ['outdoor-seating', 'delivery'],
    otherOptions: 'OPERATIONAL',
    country: 'United States of America'
  },
  {
    id: '8',
    name: 'Queens Shisha Palace',
    type: 'hookah',
    rating: 4.1,
    price: '$',
    lat: 40.7505,
    lng: -73.9934,
    address: 'Astoria, Queens, NY',
    services: ['takeout', 'parking'],
    otherOptions: 'OPERATIONAL',
    country: 'United States of America'
  },
  {
    id: '9',
    name: 'NYC Cloud Nine',
    type: 'lounge',
    rating: 4.8,
    price: '$$$$',
    lat: 40.7614,
    lng: -73.9776,
    address: 'Midtown Manhattan, NY',
    services: ['live-music', 'private-rooms', 'reservations'],
    otherOptions: 'OPERATIONAL',
    country: 'United States of America'
  },
  {
    id: '10',
    name: 'Bronx Hookah Spot',
    type: 'hookah',
    rating: 4.0,
    price: '$',
    lat: 40.8448,
    lng: -73.8648,
    address: 'Fordham, Bronx, NY',
    services: ['delivery', 'takeout'],
    otherOptions: 'CLOSED_TEMPORARILY',
    country: 'United States of America'
  },
  // France venues (Paris area)
  {
    id: '11',
    name: 'Paris Shisha Lounge',
    type: 'hookah',
    rating: 4.5,
    price: '$$$',
    lat: 48.8566,
    lng: 2.3522,
    address: 'Champs-Élysées, Paris',
    services: ['live-music', 'outdoor-seating'],
    otherOptions: 'OPERATIONAL',
    country: 'france'
  },
  {
    id: '12',
    name: 'Eiffel Hookah Bar',
    type: 'hookah',
    rating: 4.3,
    price: '$$',
    lat: 48.8584,
    lng: 2.2945,
    address: 'Near Eiffel Tower, Paris',
    services: ['reservations', 'wifi'],
    otherOptions: 'OPERATIONAL',
    country: 'france'
  },
  // UK venues (London area)
  {
    id: '13',
    name: 'London Shisha Club',
    type: 'hookah',
    rating: 4.4,
    price: '$$$',
    lat: 51.5074,
    lng: -0.1278,
    address: 'Soho, London',
    services: ['live-music', 'private-rooms'],
    otherOptions: 'OPERATIONAL',
    country: 'uk'
  },
  {
    id: '14',
    name: 'Big Ben Hookah',
    type: 'hookah',
    rating: 4.2,
    price: '$$',
    lat: 51.4994,
    lng: -0.1245,
    address: 'Westminster, London',
    services: ['outdoor-seating', 'wifi'],
    otherOptions: 'OPERATIONAL',
    country: 'uk'
  }
];

export default function ExploreMapSimple() {
  const searchParams = useSearchParams();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const { isLoaded: mapsLoaded, isLoading: mapsLoading, error: mapsError } = useGoogleMaps();

  // Function to convert Google Photos URL to displayable format (same as MarkerPopup)
  const getDisplayablePhotoUrl = (photoUrl: string): string => {
    if (!photoUrl) return '';
    
    // Clean the URL by removing any extra characters and quotes
    let cleanUrl = photoUrl.toString().trim();
    
    // Remove any surrounding quotes or brackets
    cleanUrl = cleanUrl.replace(/^['"\[\]]+|['"\[\]]+$/g, '');
    
    // If it's a Google Photos URL, convert it to displayable format
    if (cleanUrl.includes('googleusercontent.com')) {
      // Remove any existing size parameters and add standard size
      const baseUrl = cleanUrl.split('=')[0];
      return `${baseUrl}=w800-h600-c`;
    }
    
    // If it's a Google Street View URL, ensure it's displayable
    if (cleanUrl.includes('maps.googleapis.com') || cleanUrl.includes('streetviewpixels')) {
      // Ensure the URL has proper parameters for display
      if (!cleanUrl.includes('size=') && !cleanUrl.includes('=')) {
        return `${cleanUrl}?size=800x600`;
      }
    }
    
    // For other URLs, ensure they have proper protocol
    if (cleanUrl.startsWith('//')) {
      return `https://${cleanUrl}`;
    }
    
    // If URL doesn't start with http/https, assume it's relative and add base
    if (!cleanUrl.startsWith('http://') && !cleanUrl.includes('https://')) {
      return `https://${cleanUrl}`;
    }
    
    return cleanUrl;
  };
  
  const [filters, setFilters] = useState({
    keyword: '',
    country: '',
    placeType: '',
    services: '',
    otherOptions: '',
    rating: 'any'
  });

  // Separate state for location input (not part of filters)
  const [locationInput, setLocationInput] = useState('');

  // State to track image loading errors
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Check if filters should be enabled (only when location/country is detected)
  const isFiltersEnabled = filters.country !== '';

  const [results, setResults] = useState(0);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [allVenues, setAllVenues] = useState<Venue[]>(sampleVenues);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>(sampleVenues);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [radiusMultiplier, setRadiusMultiplier] = useState(6.0); // Set to 6x radius for maximum coverage
  const [pendingFilters, setPendingFilters] = useState<typeof filters | null>(null); // Store filters to apply after businesses load

  // Function to expand bounding box by a multiplier
  const expandBoundingBox = (bounds: any, multiplier: number = 1.5) => {
    const latCenter = (bounds.minLat + bounds.maxLat) / 2;
    const lngCenter = (bounds.minLon + bounds.maxLon) / 2;
    
    const latRange = (bounds.maxLat - bounds.minLat) * multiplier;
    const lngRange = (bounds.maxLon - bounds.minLon) * multiplier;
    
    return {
      minLat: latCenter - latRange / 2,
      maxLat: latCenter + latRange / 2,
      minLon: lngCenter - lngRange / 2,
      maxLon: lngCenter + lngRange / 2
    };
  };

  // Utility function to parse photo URLs from database format
  const parsePhotoUrls = (photoField: any): string[] => {
    if (!photoField) return [];
    
    try {
      if (photoField === "NA") return [];
      if (Array.isArray(photoField)) {
        if (photoField.length > 0 && Array.isArray(photoField[0])) {
          const firstArray = photoField[0];
          if (firstArray.length > 0 && firstArray[0] && firstArray[0] !== "") {
            return [firstArray[0]];
          }
        } else if (photoField.length > 0 && photoField[0] && photoField[0] !== "") {
          return [photoField[0]];
        }
      }
      
      // Handle string case - parse the string representation of array
      if (typeof photoField === 'string') {
        if (photoField === "NA") return [];
        const cleanString = photoField.replace(/^\[|\]$/g, '');
        const urls = cleanString.split(',').map(url => {
          return url.replace(/['"]/g, '').trim();
        }).filter(url => url.length > 0 && url !== 'NA' && url !== 'null' && url !== '');
        
        return urls.length > 0 ? [urls[0]] : []; 
      }
      
      return [];
    } catch (error) {
      console.error('Error parsing photo URLs:', error);
      return [];
    }
  };

  // Utility function to sort businesses: images first, then by rating
  const sortBusinessesByImageAndRating = (businesses: Business[], country?: string): Business[] => { 
    const currentCountry = country || filters.country;
    
    const sorted = businesses.sort((a, b) => {
      // First priority: businesses with valid images
      const aUrls = parsePhotoUrls(a.photo);
      const bUrls = parsePhotoUrls(b.photo);
      
      const aHasImage = aUrls.length > 0;
      const bHasImage = bUrls.length > 0;
      
      if (aHasImage && !bHasImage) return -1;
      if (!aHasImage && bHasImage) return 1;
      
      // If both have images or both don't have images, apply Hürrem priority for Germany
      if (currentCountry && (currentCountry.toLowerCase() === 'germany' || currentCountry.toLowerCase() === 'de')) {
        const aIsHurem = a.name.toLowerCase().includes('hürrem') || a.name.toLowerCase().includes('hurem');
        const bIsHurem = b.name.toLowerCase().includes('hürrem') || b.name.toLowerCase().includes('hurem');
        
        if (aIsHurem && !bIsHurem) {
          return -1;
        }
        if (!aIsHurem && bIsHurem) {
          return 1;
        }
      }
      
      // Second priority: rating (highest first)
      const aRating = a.rating || 0;
      const bRating = b.rating || 0;
      return bRating - aRating;
    });
    
    return sorted;
  };

  // Country-specific bounding boxes for fetching businesses
  const countryBoundingBoxes = {
    'germany': {
      minLat: 47.2701, maxLat: 55.0584, minLon: 5.8663, maxLon: 15.0419
    },
    'france': {
      minLat: 41.0, maxLat: 51.0, minLon: -5.0, maxLon: 10.0
    },
    'italy': {
      minLat: 35.0, maxLat: 47.0, minLon: 6.0, maxLon: 18.0
    },
    'spain': {
      minLat: 36.0, maxLat: 44.0, minLon: -10.0, maxLon: 5.0
    },
    'uk': {
      minLat: 49.0, maxLat: 61.0, minLon: -8.0, maxLon: 2.0
    },
    'United States of America': {
      minLat: 35.0, maxLat: 45.0, minLon: -80.0, maxLon: -65.0 // Expanded Northeast US area
    },
    'canada': {
      minLat: 41.0, maxLat: 84.0, minLon: -141.0, maxLon: -52.0
    },
    'australia': {
      minLat: -44.0, maxLat: -10.0, minLon: 113.0, maxLon: 154.0
    },
    'japan': {
      minLat: 30.0, maxLat: 46.0, minLon: 129.0, maxLon: 146.0
    },
    'brazil': {
      minLat: -34.0, maxLat: 6.0, minLon: -74.0, maxLon: -34.0
    }
  };

  const fetchBusinessesForCountry = async (country: string, radiusMultiplier: number = 1.0, city?: string): Promise<Business[]> => {
    if (!country || !countryBoundingBoxes[country as keyof typeof countryBoundingBoxes]) {
      setBusinesses([]);
      setFilteredBusinesses([]);
      setResults(0);
      return [];
    }

    setIsLoading(true);
    try {
      let bounds = countryBoundingBoxes[country as keyof typeof countryBoundingBoxes];
      
      // Expand bounds if radiusMultiplier > 1.0
      if (radiusMultiplier > 1.0) {
        bounds = expandBoundingBox(bounds, radiusMultiplier);
      }
      
      // Build query parameters - include city if provided
      const queryParams: any = { ...bounds };
      if (city && city.trim() !== '') {
        queryParams.city = city.trim();
      }
      
      const fetchedBusinesses = await fetchBusinessesInBox(queryParams);
      
      // Filter businesses by country if the API doesn't filter by country
      const countryFilteredBusinesses = fetchedBusinesses.filter(business => 
        business.country?.toLowerCase() === country.toLowerCase() ||
        business.country_code?.toLowerCase() === country.toLowerCase()
      );
      
      // Sort businesses: those with images first, then by rating (highest first)
      const sortedBusinesses = sortBusinessesByImageAndRating(countryFilteredBusinesses, country);
      
      setBusinesses(sortedBusinesses);
      // Don't set filteredBusinesses here if we have pending filters - let the filter effect handle it
      setFilteredBusinesses(sortedBusinesses);
      setResults(sortedBusinesses.length);
      
      return sortedBusinesses;
    } catch (error) {
      console.error('Error fetching businesses:', error);
      setBusinesses([]);
      setFilteredBusinesses([]);
      setResults(0);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Function to extract country and city from location string (smart matching)
  const extractLocationInfo = (location: string): { country: string; city?: string } => {
    if (!location) return { country: '' };
    
    const locationLower = location.toLowerCase().trim();
    
    // Specific city matches (Berlin, New York)
    const cityMappings: Record<string, { country: string; city: string }> = {
      'berlin': { country: 'germany', city: 'Berlin' },
      'new york': { country: 'United States of America', city: 'New York' },
      'newyork': { country: 'United States of America', city: 'New York' },
      'nyc': { country: 'United States of America', city: 'New York' },
      'manhattan': { country: 'United States of America', city: 'New York' },
      'brooklyn': { country: 'United States of America', city: 'New York' },
    };
    
    // Check for city matches first
    for (const [key, value] of Object.entries(cityMappings)) {
      if (locationLower.includes(key)) {
        return value;
      }
    }
    
    // Direct country matches (only specific supported countries)
    const countryMappings: Record<string, string> = {
      'germany': 'germany',
      'deutschland': 'germany',
      'france': 'france',
      'italy': 'italy',
      'spain': 'spain',
      'uk': 'uk',
      'united kingdom': 'uk',
      'england': 'uk',
      'usa': 'United States of America',
      'united states': 'United States of America',
      'america': 'United States of America',
      'us': 'United States of America',
      'canada': 'canada',
      'australia': 'australia',
      'japan': 'japan',
      'brazil': 'brazil',
    };
    
    // Check for direct country matches
    if (countryMappings[locationLower]) {
      return { country: countryMappings[locationLower] };
    }
    
    // Check if location contains a country name
    for (const [key, value] of Object.entries(countryMappings)) {
      if (locationLower.includes(key)) {
        return { country: value };
      }
    }
    
    // If location has comma, try the last part as country
    if (location.includes(',')) {
      const parts = location.split(',');
      const lastPart = parts[parts.length - 1]?.trim().toLowerCase();
      if (lastPart && countryMappings[lastPart]) {
        return { country: countryMappings[lastPart] };
      }
    }
    
    return { country: '' };
  };

  // Function to map SearchHero filters to ExploreMap filters
  const mapSearchHeroFiltersToExploreFilters = (searchHeroFilters: string[]): Partial<typeof filters> => {
    const mappedFilters: Partial<typeof filters> = {};
    
    searchHeroFilters.forEach(filter => {
      const filterLower = filter.toLowerCase();
      
      // Map place types
      if (['kiosk', 'food and drink', 'shisha bar', 'bar', 'restaurant', 'hotels'].includes(filterLower)) {
        mappedFilters.placeType = filter;
      }
      
      // Map services to the services filter (we'll search in business description)
      else if (['delivery', 'takeout', 'reservations', 'parking', 'wifi', 'live music', 'outdoor seating', 'private rooms', 'rooftop', 'live dj', 'hookah bar'].includes(filterLower)) {
        // For services, we'll add them to the keyword search since they're searched in the 'about' field
        if (!mappedFilters.keyword) {
          mappedFilters.keyword = filter;
        } else {
          mappedFilters.keyword += ` ${filter}`;
        }
      }
    });
    
    return mappedFilters;
  };

  // Load search parameters from URL on component mount
  useEffect(() => {
    if (!searchParams) return;
    
    const keyword = searchParams.get('q') || '';
    const location = searchParams.get('location') || '';
    const filtersParam = searchParams.get('filters') || '';    
    const locationInfo = extractLocationInfo(location);
    
    // Parse filters from URL
    const searchHeroFilters = filtersParam ? filtersParam.split(',').map(f => f.trim()).filter(f => f.length > 0) : [];
    
    // Map SearchHero filters to ExploreMap filters
    let mappedPlaceType = '';
    let mappedServices = '';
    
    searchHeroFilters.forEach(filter => {
      const filterLower = filter.toLowerCase();
      
      // Map place types
      if (['kiosk', 'food and drink', 'shisha bar', 'bar', 'restaurant', 'hotels'].includes(filterLower)) {
        mappedPlaceType = filter;
      }
      
      // Map services
      else if (['delivery', 'takeout', 'reservations', 'parking', 'wifi', 'live music', 'outdoor seating', 'private rooms', 'rooftop', 'live dj', 'hookah bar'].includes(filterLower)) {
        mappedServices = filter;
      }
    });
    
    const newFilters = {
      keyword: keyword,
      country: locationInfo.country,
      placeType: mappedPlaceType,
      services: mappedServices,
      otherOptions: '',
      rating: 'any'
    };
    
    // Set location input separately
    setLocationInput(location);
    
    // Debug logging
    console.log('🔍 Search Parameters Applied:', {
      keyword,
      location,
      locationInfo,
      originalFilters: searchHeroFilters,
      mappedPlaceType,
      mappedServices,
      finalFilters: newFilters
    });
    
    setFilters(newFilters);
    
    // If we have a valid location, fetch businesses with city parameter if available
    if (locationInfo.country) {
      fetchBusinessesForCountry(locationInfo.country, radiusMultiplier, locationInfo.city);
    }
  }, [searchParams, radiusMultiplier]);

  // Apply filters when businesses are loaded and we have search parameters
  useEffect(() => {
    if (businesses.length > 0 && (
      (filters.keyword && filters.keyword.trim() !== '') ||
      (filters.placeType && filters.placeType.trim() !== '') ||
      (filters.services && filters.services.trim() !== '')
    )) {
      console.log('🔄 Applying filters:', {
        keyword: filters.keyword || 'none',
        placeType: filters.placeType || 'none', 
        services: filters.services || 'none'
      }, 'to', businesses.length, 'businesses');
      // Small delay to ensure businesses state is fully updated
      setTimeout(() => {
        filterBusinesses(filters);
      }, 100);
    }
  }, [businesses, filters.keyword, filters.placeType, filters.services]);



  // Initialize Google Maps
  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

             // Check if Google Maps is loaded via the hook
       if (mapsLoaded && window.google && window.google.maps) {
         loadMarkerClusterer();
       } else if (!mapsLoading && !mapsError) {
         // Maps hook is still loading, wait for it
         console.log('⏳ Waiting for Google Maps to load via hook...');
       }
     };

          const loadMarkerClusterer = () => {
       // No need to load library since we're using npm package
       
       createMap();
     };

    const createMap = () => {
      if (!mapRef.current || !window.google) return;

      // Get center based on selected country/city or use default
      let center;
      
      // Check if user searched specifically for Berlin
      if (locationInput.toLowerCase().includes('berlin')) {
        // Use Berlin-specific coordinates
        center = { lat: 52.5200, lng: 13.4050 }; // Berlin city center
        console.log('🏛️ Centering map on Berlin specifically');
      } else if (filters.country && countryCenters[filters.country as keyof typeof countryCenters]) {
        // Use country center
        center = countryCenters[filters.country as keyof typeof countryCenters];
        console.log('🌍 Centering map on country:', filters.country);
      } else {
        // Use default center
        center = GOOGLE_MAPS_CONFIG.DEFAULT_CENTER;
        console.log('📍 Using default map center');
      }

      // Mobile-specific map options
      const isMobile = window.innerWidth <= 768;
      const mobileMapOptions = {
        ...GOOGLE_MAPS_CONFIG.MAP_OPTIONS,
        gestureHandling: isMobile ? 'cooperative' : 'auto',
        zoomControl: true,
        mapTypeControl: false, // Disable map/satellite buttons
        streetViewControl: !isMobile,
        fullscreenControl: !isMobile,
        disableDefaultUI: isMobile
      };

      // Set zoom level based on location type
      let zoomLevel = GOOGLE_MAPS_CONFIG.DEFAULT_ZOOM;
      if (locationInput.toLowerCase().includes('berlin')) {
        zoomLevel = 12; // Closer zoom for city view
        console.log('🔍 Using city zoom level for Berlin:', zoomLevel);
      }

      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoomLevel,
        ...mobileMapOptions
      });

      mapInstanceRef.current = map;

      // Trigger resize event to ensure proper rendering on mobile
      setTimeout(() => {
        window.google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
      }, 100);

      // Clear existing markers first
      if (markersRef.current.length > 0) {
       
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
      }

      // Use filteredBusinesses if available, otherwise fall back to businesses
      let businessesToShow = filteredBusinesses.length > 0 ? filteredBusinesses : businesses;
      
      // Only show markers if user has searched for a location
      if (!filters.country) {
        console.log('🗺️ No location searched yet - showing empty map');
        return; // Don't create any markers
      }
      
      // Debug: Log API key and businesses data
      console.log('🔑 API Key available:', !!GOOGLE_MAPS_API_KEY);
      console.log('🏢 Businesses to show:', businessesToShow.length);
      console.log('📍 Filters country:', filters.country);
      
      // Create markers for businesses to show
      const markers = businessesToShow
        .filter(business => business.latitude && business.longitude) // Only businesses with coordinates
        .map((business: Business) => createMarkerWithFallback(business, map));

      // Store markers for cleanup
      markersRef.current = markers;

      //        // Create marker clusterer using npm package
      
   
       
      //  // Debug: Check for markers with identical coordinates
      //  const positions = markers.map(m => m.getPosition()?.toJSON());
      //  const positionCounts = new Map<string, number>();
       
      //  positions.forEach(pos => {
      //    if (pos) {
      //      const key = `${pos.lat}_${pos.lng}`;
      //      positionCounts.set(key, (positionCounts.get(key) || 0) + 1);
      //    }
      //  });

       
      //  // Log each marker's details
      //  markers.forEach((marker, index) => {
      //    const position = marker.getPosition()?.toJSON();

      //  });
       
      //           try {
      //      const clusterer = new MarkerClusterer({
      //        map,
      //        markers,
      //        algorithm: new GridAlgorithm({
      //          gridSize: 50, // Larger grid to catch more markers
      //          maxZoom: 15   // Higher max zoom to allow clustering at more zoom levels
      //        }),
      //        renderer: {
      //          render: ({ count, position }) => {
               
      //            const marker = new window.google.maps.Marker({
      //              position,
      //              icon: {
      //                url: `data:image/svg+xml;base64,${btoa(`
      //                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      //                    <circle cx="20" cy="20" r="20" fill="black"/>
      //                    <circle cx="20" cy="20" r="16" fill="black"/>
      //                    <text x="20" y="26" font-family="Arial" font-size="14" font-weight="bold" fill="white" text-anchor="middle">${count}</text>
      //                  </svg>
      //                `)}`,
      //                scaledSize: new window.google.maps.Size(40, 40),
      //                anchor: new window.google.maps.Point(20, 20)
      //              }
      //            });
      //            return marker;
      //          }
      //        }
      //      });
         

         
      //    // Store clusterer for cleanup
      //    markersRef.current = markers;
      //    return clusterer;
      //  } catch (error) {
      //    console.error('❌ Error creating marker clusterer:', error);
      //    // Fallback: add markers directly to map
      //    markers.forEach(marker => marker.setMap(map));
      //    markersRef.current = markers;
      //  }
       
      //  // Additional check: If no clusters are visible after 2 seconds, create manual clusters
      //  setTimeout(() => {
      //    const clusterElements = document.querySelectorAll('img[src*="data:image/svg+xml"]');
         
         
      //    if (clusterElements.length === 0) {
          
      //      // Create manual clusters for markers with identical coordinates
      //      const markerGroups = new Map<string, google.maps.Marker[]>();
           
      //      markers.forEach(marker => {
      //        const position = marker.getPosition();
      //        if (position) {
      //          const key = `${position.lat()}_${position.lng()}`;
      //          if (!markerGroups.has(key)) {
      //            markerGroups.set(key, []);
      //          }
      //          markerGroups.get(key)!.push(marker);
      //        }
      //      });
           
      //      markerGroups.forEach((group, key) => {
      //        if (group.length > 1) {
             
      //          // Hide individual markers
      //          group.forEach(marker => marker.setMap(null));
               
      //          // Create cluster marker
      //          const firstMarker = group[0];
      //          const position = firstMarker.getPosition();
      //          if (position) {
      //            const clusterMarker = new window.google.maps.Marker({
      //              position: position,
      //              map: map,
      //              icon: {
      //                url: `data:image/svg+xml;base64,${btoa(`
      //                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      //                    <circle cx="20" cy="20" r="20" fill="White"/>
      //                    <circle cx="20" cy="20" r="16" fill="black"/>
      //                    <text x="20" y="26" font-family="Arial" font-size="14" font-weight="bold" fill="white" text-anchor="middle">${group.length}</text>
      //                  </svg>
      //                `)}`,
      //                scaledSize: new window.google.maps.Size(40, 40),
      //                anchor: new window.google.maps.Point(20, 20)
      //              }
      //            });
                 
      //            // Add click listener to expand cluster
      //            clusterMarker.addListener('click', () => {
      //              clusterMarker.setMap(null);
      //              group.forEach(marker => marker.setMap(map));
      //            });
      //          }
      //        }
      //      });
      //    }
      //  }, 2000);

      // Remove clustering - add markers directly to map
      markers.forEach(marker => marker.setMap(map));
      markersRef.current = markers;
    };

    initMap();

    // Add resize listener for mobile orientation changes
    const handleResize = () => {
      if (mapInstanceRef.current && window.google) {
        setTimeout(() => {
          window.google.maps.event.trigger(mapInstanceRef.current!, 'resize');
          
          // Use same centering logic as createMap
          let center;
          if (locationInput.toLowerCase().includes('berlin')) {
            center = { lat: 52.5200, lng: 13.4050 }; // Berlin city center
          } else if (filters.country && countryCenters[filters.country as keyof typeof countryCenters]) {
            center = countryCenters[filters.country as keyof typeof countryCenters];
          } else {
            center = GOOGLE_MAPS_CONFIG.DEFAULT_CENTER;
          }
          
          mapInstanceRef.current?.setCenter(center);
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      // Cleanup markers
      markersRef.current.forEach((marker) => marker.setMap(null));
      // Remove event listeners
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [filteredBusinesses, filters.country, businesses.length]); // Re-run when filtered businesses, country, or businesses array length changes

  /**
   * Returns the custom marker icon path
   * If this marker fails to load, the createMarkerWithFallback function will automatically
   * fall back to the default Google Maps marker to ensure visibility
   */
  const getMarkerIcon = (): string => {
    // Use the hookah marker image for all venue types
    return '/Assets/logo/shisha-Marker.png';
  };



  /**
   * Creates a marker with fallback to default Google marker if custom marker fails to load
   * This ensures markers are always visible even if the custom marker image is not accessible on the server
   */
  const createMarkerWithFallback = (business: Business, map: google.maps.Map) => {
    const markerIcon = getMarkerIcon();
    
    // Create marker with custom icon
    const marker = new window.google.maps.Marker({
      position: { lat: business.latitude!, lng: business.longitude! },
      title: business.name,
      icon: {
        url: markerIcon,
        scaledSize: new window.google.maps.Size(28, 28),
        anchor: new window.google.maps.Point(8, 8)
      }
    });

    // Add error handling for custom marker icon
    const img = new window.Image();
    img.onload = () => {
      // Custom marker loaded successfully
      console.log(`✅ Custom marker loaded for ${business.name}`);
    };
    img.onerror = () => {
      // Custom marker failed, fall back to default
      console.warn(`⚠️ Custom marker failed for ${business.name}, using default marker`);
      marker.setIcon(null); // This will use the default Google Maps marker
    };
    img.src = markerIcon;

    // Add click listener
    marker.addListener('click', () => {
      setSelectedBusiness(business);
      setShowPopup(true);
    });

    return marker;
  };

  const handleFilterChange = (field: string, value: string) => {
    let newFilters = { ...filters, [field]: value };

    // If location changed, use smart matching and only call API for specific matches
    if (field === 'location') {
      setLocationInput(value);
      const locationInfo = extractLocationInfo(value);
      
      if (locationInfo.country) {
        console.log('🎯 Location matched:', locationInfo);
        // Update filters with the detected country
        newFilters.country = locationInfo.country;
        // Call API with city parameter if available
        fetchBusinessesForCountry(locationInfo.country, radiusMultiplier, locationInfo.city);
      } else {
        // No valid location detected - don't change anything, just log
        console.log('❌ No valid location detected for:', value, '- keeping current state');
        // Don't update filters.country, don't clear businesses, don't trigger re-renders
        // Just return early without changing any state
        return;
      }
    } else if (field === 'country') {
      if (value === '') {
        // If country is cleared, reset all filters
        newFilters = {
          keyword: '',
          country: '',
          placeType: '',
          services: '',
          otherOptions: '',
          rating: 'any'
        };
        setLocationInput('');
        setBusinesses([]);
        setFilteredBusinesses([]);
        setResults(0);
      } else {
        // If country is selected, clear other filters but keep the new country
        newFilters = {
          keyword: '',
          country: value,
          placeType: '',
          services: '',
          otherOptions: '',
          rating: 'any'
        };
        fetchBusinessesForCountry(value, radiusMultiplier);
      }
    } else {
      // For other filter changes, filter existing businesses
      filterBusinesses(newFilters);
    }

    setFilters(newFilters);
  };

  const filterBusinesses = (newFilters: typeof filters) => {
    console.log('🔍 Starting to filter', businesses.length, 'businesses with filters:', newFilters);
    let filteredBusinesses = businesses;

    // Filter by keyword - search in business name, address, category, and about field
    if (newFilters.keyword && typeof newFilters.keyword === 'string' && newFilters.keyword.trim() !== '') {
      const searchTerms = newFilters.keyword.toLowerCase().trim().split(' ').filter(term => term.length > 0);
      
      filteredBusinesses = filteredBusinesses.filter(business => {
        // For each search term, check if it matches any field
        return searchTerms.some(searchTerm => {
          const nameMatch = business.name.toLowerCase().includes(searchTerm);
          const addressMatch = business.full_address.toLowerCase().includes(searchTerm);
          const categoryMatch = business.category?.toLowerCase().includes(searchTerm);
          const typeMatch = business.type?.toLowerCase().includes(searchTerm);
          const aboutMatch = business.about?.toLowerCase().includes(searchTerm);
          
          return nameMatch || addressMatch || categoryMatch || typeMatch || aboutMatch;
        });
      });
    }

    // Filter by place type using category field from fetchBusinessesInBox data
    if (newFilters.placeType) {
      filteredBusinesses = filteredBusinesses.filter(business => {
        const businessCategory = business.category?.toLowerCase();
        const selectedPlaceType = newFilters.placeType.toLowerCase();
        
        // Exact match
        if (businessCategory === selectedPlaceType) {
          return true;
        }
        
        // Partial match for German categories
        if (businessCategory && businessCategory.includes(selectedPlaceType)) {
          return true;
        }
        
        // Reverse partial match (selected type contains business category)
        if (selectedPlaceType.includes(businessCategory || '')) {
          return true;
        }
        
        return false;
      });
    }

    // Filter by services using about field from fetchBusinessesInBox data
    if (newFilters.services) {
      filteredBusinesses = filteredBusinesses.filter(business =>
        business.about?.toLowerCase().includes(newFilters.services.toLowerCase())
      );
    }

    // Sort filtered businesses: those with images first, then by rating (highest first)
    const sortedFilteredBusinesses = sortBusinessesByImageAndRating(filteredBusinesses);
    
    console.log('✅ Filtering complete:', sortedFilteredBusinesses.length, 'results found');
    
    setFilteredBusinesses(sortedFilteredBusinesses);
    setResults(sortedFilteredBusinesses.length);
  };

  const handleFullscreen = () => {
    const mapSection = document.querySelector('.explore-map__map-section');
    if (mapSection) {
      if (document.fullscreenElement) {
        // Exit fullscreen
        document.exitFullscreen();
      } else {
        // Enter fullscreen
        mapSection.requestFullscreen();
      }
    }
  };

  return (
    <div className="explore-map">
      {/* Map Section - Left Side */}
      <div className="explore-map__map-section">
        <div className="map-container">
          <div 
            ref={mapRef} 
            className="google-map"
          />
          {/* Fullscreen Button */}
          <Button
            onClick={handleFullscreen}
            className="map-fullscreen-button"
            variant="contained"
          >
            <FullscreenIcon />
          </Button>
        </div>
      </div>

      {/* Marker Popup */}
      {showPopup && selectedBusiness && (
        <div className="marker-popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="marker-popup-container" onClick={(e) => e.stopPropagation()}>
            <MarkerPopup 
              business={selectedBusiness} 
              onClose={() => setShowPopup(false)}
            />
          </div>
        </div>
      )}

              {/* Search/Filter Panel - Right Side */}
        <div className="explore-map__filter-panel">
          {/* <div className="filter-panel-header">
            <Typography variant="h6" className="panel-title" style={{ textAlign: 'center', width: '100%' }}>
              Search & Filter
            </Typography>
          </div> */}

          <div className="filter-form">
            {/* Helper message when no location is entered */}
            {!isFiltersEnabled && (
              <div style={{ 
                backgroundColor: '#f3f4f6', 
                padding: '12px', 
                borderRadius: '8px', 
                marginBottom: '16px',
                border: '1px solid #d1d5db'
              }}>
                <Typography variant="body2" style={{ color: '#6b7280', textAlign: 'center' }}>
                Please enter a location to search and filter businesses
                </Typography>
              </div>
            )}
            
            {/* Keyword and Location in same row */}
            <div className="filter-row">
              <TextField
                id="keyword-search"
                label="Venues"
                variant="outlined"
                value={filters.keyword}
                onChange={(e) => handleFilterChange('keyword', e.target.value)}
                disabled={!isFiltersEnabled}
                placeholder={!isFiltersEnabled ? "Select country first" : "Search for venues"}
                className="filter-field"
              />
              <TextField
                id="location-search"
                label="Location"
                variant="outlined"
                value={locationInput}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                placeholder=""
                className="filter-field"
              />
            </div>

            {/* Radius Control - Commented out, using maximum radius (6.0x) by default */}
            {/* {isFiltersEnabled && (
              <div className="filter-row">
                <div className="radius-control">
                  <Typography variant="body2" style={{ marginBottom: '8px', color: '#374151' }}>
                    Search Radius: {radiusMultiplier.toFixed(1)}x
                  </Typography>
                  <input
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.1"
                    value={radiusMultiplier}
                    onChange={(e) => {
                      const newRadius = parseFloat(e.target.value);
                      setRadiusMultiplier(newRadius);
                      // Refetch businesses with new radius
                      if (filters.country) {
                        fetchBusinessesForCountry(filters.country, newRadius);
                      }
                    }}
                    style={{
                      width: '100%',
                      height: '6px',
                      borderRadius: '3px',
                      background: '#e5e7eb',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                    <span>0.5x</span>
                    <span>1.0x</span>
                    <span>2.0x</span>
                    <span>3.0x</span>
                  </div>
                </div>
              </div>
            )} */}

                                 {/* Place Type and Services in same row */}
            <div className="filter-row">
              <Autocomplete
                key={`place-type-${filters.country}`}
                options={getPlaceTypeOptions(filters.country)}
                getOptionLabel={(option: FilterOption) => option.label}
                value={getPlaceTypeOptions(filters.country).find(option => option.value === filters.placeType) || null}
                onChange={(event, newValue) => handleFilterChange('placeType', newValue?.value || '')}
                disabled={!isFiltersEnabled}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Place Type" 
                    variant="outlined"
                    disabled={!isFiltersEnabled}
                    placeholder={!isFiltersEnabled ? "Enter location first" : "Select place type..."}
                    // placeholder="Select place type..."
                  />
                )}
                className="filter-field"
              />
              <Autocomplete
                options={servicesOptions}
                getOptionLabel={(option) => option.label}
                value={servicesOptions.find(option => option.value === filters.services) || null}
                onChange={(event, newValue) => handleFilterChange('services', newValue?.value || '')}
                disabled={!isFiltersEnabled}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Services" 
                    variant="outlined"
                    disabled={!isFiltersEnabled}
                    placeholder={!isFiltersEnabled ? "Enter location first" : "Search in business description..."}
                    // placeholder="Search in business description..."
                  />
                )}
                className="filter-field"
              />
            </div>

            {/* Results Section */}
            <div className="results-section">
              <Typography variant="body1" className="results-count">
                {isLoading ? 'Loading...' : `${results} results`}
              </Typography>
              {/* Debug info */}
            </div>
            <div className="section-divider"></div>
            
                         {/* Business Cards - Show when results > 0 and country is selected */}
             {results > 0 && isFiltersEnabled && (
               <div className="venue-cards-container">
                 {filteredBusinesses.map((business: Business) => (
                   <Paper 
                     key={business._id} 
                     className="venue-card"
                     onClick={() => {
                       setSelectedBusiness(business);
                       setShowPopup(true);
                     }}
                     style={{ cursor: 'pointer' }}
                   >
                     <div className="venue-card-content">
                       {/* Left side - Business image */}
                       <div className="venue-image">
                         {(() => {
                           // First parse the photo field to get URLs
                           const urls = parsePhotoUrls(business.photo);
                           // Then get the displayable URL from the first valid URL
                           const photoUrl = urls.length > 0 ? getDisplayablePhotoUrl(urls[0]) : '';
                           
                           if (photoUrl && !imageErrors.has(business._id)) {
                             return (
                               <Image 
                                 src={photoUrl}
                                 alt={business.name}
                                 className="venue-img"
                                 width={80}
                                 height={80}
                                 style={{ objectFit: 'cover' }}
                                 onError={() => {
                                   setImageErrors(prev => new Set(prev).add(business._id));
                                 }}
                               />
                             );
                           } else {
                             return (
                               <div className="venue-img-placeholder">
                                 Image not available
                               </div>
                             );
                           }
                         })()}
                       </div>
                       
                       {/* Right side - Business details */}
                       <div className="venue-details">
                         <Typography variant="h6" className="venue-name">
                           {business.name}
                         </Typography>
                         <div className="venue-address">
                           <PlaceIcon className="address-icon" fontSize="small" />
                           <Typography variant="body2" className="address-text">
                             {business.full_address}
                           </Typography>
                         </div>
                         <div className="venue-meta">
                           {/* <Typography variant="body2" className="venue-price">
                             {business.range || 'N/A'}
                           </Typography> */}
                           <RatingDisplay rating={business.rating || 0} reviewCount={business.reviews} />
                         </div>
                       </div>
                     </div>
                   </Paper>
                 ))}
               </div>
             )}
            
          {/* No Results Message */}
          {results === 0 && isFiltersEnabled && (
            <Paper className="no-results-message">
              <span className="no-results-text">
                No businesses found matching your criteria.
              </span>
            </Paper>
          )}
        </div>
      </div>
    </div>
  );
} 