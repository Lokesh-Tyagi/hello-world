export interface Business {
  // Basic Information
  _id: string;
  name: string;
  name_for_emails?: string;
  full_address: string;
  category?: string;
  type?: string;
  subtypes?: string;
  description?: string;
  business_status?: string;
  verified?: boolean;
  range?: string; // Price range
  createdAt?: number;

  // Contact Information
  phone?: string;
  email_1?: string;
  email_2?: string;
  email_1_validator?: {
    status: string;
    status_details: string;
  };
  email_2_validator?: {
    status: string;
    status_details: string;
  };

  // Location Details
  latitude?: number;
  longitude?: number;
  street?: string;
  city?: string;
  borough?: string;
  postal_code?: string;
  country?: string;
  country_code?: string;
  time_zone?: string;
  h3?: string;
  area_service?: boolean;

  // Online Presence
  website?: string;
  site?: string;
  website_title?: string;
  website_description?: string;
  website_keywords?: string;
  facebook?: string;
  instagram?: string;

  // Hours
  working_hours?: Record<string, string>;
  working_hours_old_format?: string;

  // Media
  logo?: string;
  photo?: string;
  photos_count?: number;
  street_view?: string;

  // Reviews & Ratings
  rating?: number;
  reviews?: number;
  reviews_per_score?: {
    reviews_per_score_1?: number;
    reviews_per_score_2?: number;
    reviews_per_score_3?: number;
    reviews_per_score_4?: number;
    reviews_per_score_5?: number;
  };

  // Google-specific
  google_id?: string;
  cid?: string;
  kgmid?: string;
  place_id?: string;
  location_link?: string;
  location_reviews_link?: string;
  reviews_link?: string;
  reviews_id?: string;

  // Owner Information
  owner_id?: string;
  owner_title?: string;
  owner_link?: string;

  // Additional Data
  about?: string;
  query?: string;

  cmsProfile: any;
} 