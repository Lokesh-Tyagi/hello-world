import axios from 'axios';
import type { Business } from '../types/Business';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface BoxedQueryParams {
  minLat: number;
  maxLat: number;
  minLon: number;
  maxLon: number;
  city?: string; // Optional city parameter for Berlin, New York, etc.
}

// Mock data for development when API is not available
const mockBusinesses: Business[] = [
  {
    _id: '1',
    name: 'Shisha Sky Lounge',
    full_address: 'Unter den Linden 1, Berlin, Germany',
    latitude: 52.5200,
    longitude: 13.4050,
    rating: 4.8,
    reviews: 127,
    category: 'Shisha-Bar',
    type: 'lounge',
    about: 'Premium rooftop shisha lounge with live music and outdoor seating',
    business_status: 'OPERATIONAL',
    country: 'germany',
    country_code: 'DE',
    photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop&crop=center',
    cmsProfile: {}
  },
  {
    _id: '2',
    name: 'Arabian Nights Hookah',
    full_address: 'Friedrichstraße 123, Berlin, Germany',
    latitude: 52.5150,
    longitude: 13.4100,
    rating: 4.5,
    reviews: 89,
    category: 'Shisha-Bar',
    type: 'hookah',
    about: 'Authentic Middle Eastern hookah experience with traditional flavors',
    business_status: 'OPERATIONAL',
    country: 'germany',
    country_code: 'DE',
    photo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop&crop=center',
    cmsProfile: {}
  },
  {
    _id: '3',
    name: 'Berlin Shisha Palace',
    full_address: 'Alexanderplatz 5, Berlin, Germany',
    latitude: 52.5250,
    longitude: 13.4000,
    rating: 4.2,
    reviews: 156,
    category: 'Shisha-Bar',
    type: 'hookah',
    about: 'Historic venue offering premium shisha and traditional German hospitality',
    business_status: 'OPERATIONAL',
    country: 'germany',
    country_code: 'DE',
    photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop&crop=center',
    cmsProfile: {}
  },
  {
    _id: '4',
    name: 'Manhattan Shisha Lounge',
    full_address: 'Times Square, New York, NY, USA',
    latitude: 40.7589,
    longitude: -73.9851,
    rating: 4.6,
    reviews: 203,
    category: 'lounge',
    type: 'lounge',
    about: 'Luxury shisha lounge in the heart of Manhattan with VIP service',
    business_status: 'OPERATIONAL',
    country: 'United States of America',
    country_code: 'US',
    photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop&crop=center',
    cmsProfile: {}
  },
  {
    _id: '5',
    name: 'Paris Shisha Lounge',
    full_address: 'Champs-Élysées, Paris, France',
    latitude: 48.8566,
    longitude: 2.3522,
    rating: 4.5,
    reviews: 178,
    category: 'Shisha-Bar',
    type: 'lounge',
    about: 'Elegant French shisha experience with Parisian charm',
    business_status: 'OPERATIONAL',
    country: 'france',
    country_code: 'FR',
    photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop&crop=center',
    cmsProfile: {}
  }
];

export const fetchBusinessesInBox = async (params: BoxedQueryParams): Promise<Business[]> => {
  console.log('fetchBusinessesInBox', API_BASE_URL);
  try {
    // Try to fetch from Next.js API route first
    const response = await axios.get<Business[]>(
      `${API_BASE_URL}/api/businesses/box`,
      { 
        params,
        // timeout: 5000 // 5 second timeout
      }
    );
    return response.data;
  } catch (error) {
    console.warn('⚠️ API call failed, using mock data:', error);
    
    // Filter mock data based on the bounding box parameters
    const filteredMockData = mockBusinesses.filter(business => {
      if (!business.latitude || !business.longitude) return false;
      
      return business.latitude >= params.minLat &&
             business.latitude <= params.maxLat &&
             business.longitude >= params.minLon &&
             business.longitude <= params.maxLon;
    });
    
    // If no businesses in the box, return some nearby ones
    if (filteredMockData.length === 0) {
      console.log('📍 No mock businesses in bounding box, returning nearby ones');
      return mockBusinesses.slice(0, 3); // Return first 3 as fallback
    }
    
    return filteredMockData;
  }
};

// Helper function to get mock businesses by country
export const getMockBusinessesByCountry = (country: string): Business[] => {
  return mockBusinesses.filter(business => 
    business.country?.toLowerCase() === country.toLowerCase() ||
    business.country_code?.toLowerCase() === country.toLowerCase()
  );
};

// Function to update business information
export const updateBusiness = async (
  businessId: string, 
  updateData: Partial<Business>
): Promise<Business> => {
  try {
    const response = await axios.patch<Business>(
      `${API_BASE_URL}/api/businesses/${businessId}`,
      
      updateData,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      },
      
    );
    return response.data;
  } catch (error) {
    console.warn('⚠️ API call failed for updating business:', error);
    throw error; // Re-throw to let the caller handle the error
  }
};

// Function to update business working hours
export const updateBusinessWorkingHours = async (
  businessId: string, 
  workingHours: Record<string, string>
): Promise<Business> => {
  try {
    const response = await axios.patch<Business>(
      `${API_BASE_URL}/api/businesses/${businessId}/working-hours`,
      { working_hours: workingHours }
    );
    return response.data;
  } catch (error) {
    console.warn('⚠️ API call failed for updating working hours:', error);
    
    // For now, return a mock success response
    // In a real implementation, you would handle the error appropriately
    return {
      ...mockBusinesses.find(b => b._id === businessId),
      working_hours: workingHours
    } as Business;
  }
};

// Function to fetch a business by ID
export const fetchBusinessById = async (businessId: string): Promise<Business | null> => {
  try {
    const response = await axios.get<Business>(
      `${API_BASE_URL}/api/businesses/${businessId}`
    );
    return response.data;
  } catch (error) {
    console.warn('⚠️ API call failed for fetching business by ID:', error);
    
    // Return mock business if API fails
    const mockBusiness = mockBusinesses.find(b => b._id === businessId);
    return mockBusiness || null;
  }
};