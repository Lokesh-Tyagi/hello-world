import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

// Interfaces for nested structures
interface EmailValidation {
  status?: string;
  status_details?: string;
}

interface EmailInfo {
  email?: string;
  emails_validator?: EmailValidation;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  title?: string;
  phone?: string;
}

interface PhoneEnricher {
  carrier_name?: string;
  carrier_type?: string;
}

interface PhoneInfo {
  phone?: string;
  phones_enricher?: PhoneEnricher;
}

interface ReviewsPerScore {
  reviews_per_score_1?: number;
  reviews_per_score_2?: number;
  reviews_per_score_3?: number;
  reviews_per_score_4?: number;
  reviews_per_score_5?: number;
}

interface ThirdPartyData {
  query?: string;
  categories?: string[];
  address?: string;
  city?: string;
  claimed?: boolean;
  closed?: boolean;
  country?: string;
  email?: string;
  name?: string;
  phone?: string;
  profile_image?: string;
  rating?: number;
  reviews?: number;
  site?: string;
  temporarily_closed?: boolean;
  zip_code?: string;
  page_url?: string;
  activity_is_using_paid_features?: boolean;
  activity_has_subscription?: boolean;
  activity_is_asking_for_reviews?: boolean;
  activity_claimed_date?: string;
  activity_is_claimed?: boolean;
  activity_previously_claimed?: boolean;
  activity_reply_behavior_average_days_to_reply?: number;
  activity_reply_behavior_last_reply_to_negative_review?: string;
  activity_reply_behavior_negative_reviews_with_replies_count?: number;
  activity_reply_behavior_reply_percentage?: number;
  activity_reply_behavior_total_negative_reviews_count?: number;
  activity_verification_verified_by_google?: boolean;
  activity_verification_verified_business?: boolean;
  activity_verification_verified_payment_method?: boolean;
  activity_verification_verified_user_identity?: boolean;
  activity_has_business_unit_merge_history?: boolean;
  activity_basiclink_rate?: number;
  activity_hide_basic_link_alert?: boolean;
  activity_is_using_a_i_responses?: boolean;
}

export interface IBusiness extends Document {
  // Basic Information
  query?: string;
  name?: string;
  name_for_emails?: string;
  site?: string;
  subtypes?: string[];
  category?: string;
  type?: string;
  description?: string;
  about?: string;
  typical_time_spent?: string;
  business_status?: string;
  verified?: boolean;

  // Location Information
  full_address?: string;
  borough?: string;
  street?: string;
  city?: string;
  postal_code?: string;
  state?: string;
  us_state?: string;
  country?: string;
  country_code?: string;
  latitude?: number;
  longitude?: number;
  h3?: string;
  time_zone?: string;
  plus_code?: string;
  area_service?: string[];
  located_in?: string;
  
  // Contact Information
  phone?: string;
  phone_info?: PhoneEnricher;
  email_1?: EmailInfo;
  email_2?: EmailInfo;
  email_3?: EmailInfo;
  phone_1?: PhoneInfo;
  phone_2?: PhoneInfo;
  phone_3?: PhoneInfo;

  // Reviews and Ratings
  rating?: number;
  reviews?: any[]; // Changed from number to array to match JSON schema
  reviews_link?: string;
  reviews_tags?: string[];
  reviews_per_score?: ReviewsPerScore;

  // Media
  photos_count?: number;
  photo?: string;
  street_view?: string;
  logo?: string;
  imageUrls?: string[]; // Added to match JSON schema

  // Hours and Operation
  working_hours?: Record<string, any>;
  working_hours_old_format?: Record<string, any>;
  other_hours?: Record<string, any>;
  popular_times?: Record<string, any>;
  range?: string;

  // Owner Information
  owner_id?: string;
  owner_title?: string;
  owner_link?: string;

  // Links
  reservation_links?: string[];
  booking_appointment_link?: string;
  menu_link?: string;
  order_links?: string[];
  location_link?: string;
  location_reviews_link?: string;
  menu?: string; // Added to match JSON schema

  // Google Identifiers
  place_id?: string;
  google_id?: string;
  cid?: string;
  kgmid?: string;
  reviews_id?: string;
  located_google_id?: string;

  // Social Media
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  medium?: string;
  reddit?: string;
  skype?: string;
  snapchat?: string;
  telegram?: string;
  whatsapp?: string;
  twitter?: string;
  vimeo?: string;
  youtube?: string;
  github?: string;
  crunchbase?: string;

  // Website Information
  website_title?: string;
  website_generator?: string;
  website_description?: string;
  website_keywords?: string[];
  website_has_fb_pixel?: boolean;
  website_has_google_tag?: boolean;

  // Third Party Data
  tp_data?: ThirdPartyData;

  // Posts and Content
  posts?: any[];

  createdAt?: number;

  // Food and Alcohol
  food?: string;
  alcohol?: string;
}

// Align schema with the previously used structure and collection conventions
const BusinessSchema = new Schema(
  {
    // Basic Information
    query: String,
    name: String,
    name_for_emails: String,
    site: String,
    subtypes: [String],
    category: String,
    type: String,
    description: String,
    about: String,
    typical_time_spent: String,
    business_status: String,
    verified: Boolean,

    // Location Information
    full_address: String,
    borough: String,
    street: String,
    city: String,
    postal_code: String,
    state: String,
    us_state: String,
    country: String,
    country_code: String,
    latitude: { type: Number, index: true },
    longitude: { type: Number, index: true },
    h3: String,
    time_zone: String,
    plus_code: String,
    area_service: [String],
    located_in: String,

    // Contact Information
    phone: String,
    phone_info: {
      carrier_name: String,
      carrier_type: String
    },
    email_1: {
      email: String,
      emails_validator: {
        status: String,
        status_details: String
      },
      full_name: String,
      first_name: String,
      last_name: String,
      title: String,
      phone: String
    },
    email_2: {
      email: String,
      emails_validator: {
        status: String,
        status_details: String
      },
      full_name: String,
      first_name: String,
      last_name: String,
      title: String,
      phone: String
    },
    email_3: {
      email: String,
      emails_validator: {
        status: String,
        status_details: String
      },
      full_name: String,
      first_name: String,
      last_name: String,
      title: String,
      phone: String
    },
    phone_1: {
      phone: String,
      phones_enricher: {
        carrier_name: String,
        carrier_type: String
      }
    },
    phone_2: {
      phone: String,
      phones_enricher: {
        carrier_name: String,
        carrier_type: String
      }
    },
    phone_3: {
      phone: String,
      phones_enricher: {
        carrier_name: String,
        carrier_type: String
      }
    },

    // Reviews and Ratings
    rating: Number,
    reviews: [Schema.Types.Mixed],
    reviews_link: String,
    reviews_tags: [String],
    reviews_per_score: {
      reviews_per_score_1: Number,
      reviews_per_score_2: Number,
      reviews_per_score_3: Number,
      reviews_per_score_4: Number,
      reviews_per_score_5: Number
    },

    // Media
    photos_count: Number,
    photo: String,
    street_view: String,
    logo: String,
    imageUrls: [String],

    // Hours and Operation
    working_hours: Schema.Types.Mixed,
    working_hours_old_format: Schema.Types.Mixed,
    other_hours: Schema.Types.Mixed,
    popular_times: Schema.Types.Mixed,
    range: String,

    // Owner Information
    owner_id: String,
    owner_title: String,
    owner_link: String,

    // Links
    reservation_links: [String],
    booking_appointment_link: String,
    menu_link: String,
    order_links: [String],
    location_link: String,
    location_reviews_link: String,
    menu: String,

    // Google Identifiers
    place_id: String,
    google_id: String,
    cid: String,
    kgmid: String,
    reviews_id: String,
    located_google_id: String,

    // Social Media
    facebook: String,
    instagram: String,
    linkedin: String,
    tiktok: String,
    medium: String,
    reddit: String,
    skype: String,
    snapchat: String,
    telegram: String,
    whatsapp: String,
    twitter: String,
    vimeo: String,
    youtube: String,
    github: String,
    crunchbase: String,

    // Website Information
    website_title: String,
    website_generator: String,
    website_description: String,
    website_keywords: [String],
    website_has_fb_pixel: Boolean,
    website_has_google_tag: Boolean,

    // Third Party Data
    tp_data: {
      query: String,
      categories: [String],
      address: String,
      city: String,
      claimed: Boolean,
      closed: Boolean,
      country: String,
      email: String,
      name: String,
      phone: String,
      profile_image: String,
      rating: Number,
      reviews: Number,
      site: String,
      temporarily_closed: Boolean,
      zip_code: String,
      page_url: String,
      activity_is_using_paid_features: Boolean,
      activity_has_subscription: Boolean,
      activity_is_asking_for_reviews: Boolean,
      activity_claimed_date: String,
      activity_is_claimed: Boolean,
      activity_previously_claimed: Boolean,
      activity_reply_behavior_average_days_to_reply: Number,
      activity_reply_behavior_last_reply_to_negative_review: String,
      activity_reply_behavior_negative_reviews_with_replies_count: Number,
      activity_reply_behavior_reply_percentage: Number,
      activity_reply_behavior_total_negative_reviews_count: Number,
      activity_verification_verified_by_google: Boolean,
      activity_verification_verified_business: Boolean,
      activity_verification_verified_payment_method: Boolean,
      activity_verification_verified_user_identity: Boolean,
      activity_has_business_unit_merge_history: Boolean,
      activity_basiclink_rate: Number,
      activity_hide_basic_link_alert: Boolean,
      activity_is_using_a_i_responses: Boolean
    },

    // Food and Alcohol
    food: String,
    alcohol: String,

    // Posts and Content
    posts: [Schema.Types.Mixed],

    createdAt: { type: Number, default: () => Date.now() }
  },
  {
    strict: false
  }
);

// Indexes
BusinessSchema.index({ latitude: 1, longitude: 1 });
BusinessSchema.index({ geohash: 1 });
BusinessSchema.index({ h3: 1 });
BusinessSchema.index({ name: 'text', description: 'text' });

mongoose.pluralize(null);

export type BusinessDoc = InferSchemaType<typeof BusinessSchema> & { _id: mongoose.Types.ObjectId };

export const Business: Model<BusinessDoc> =
  (mongoose.models['db_ny_ger'] as Model<BusinessDoc>) || mongoose.model<BusinessDoc>('db_ny_ger', BusinessSchema);

