import { NextRequest, NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/mongodb';
import { Business, type BusinessDoc } from '@/models/Business';
import type { Business as BusinessResponse } from '@/types/Business';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const minLat = Number(searchParams.get('minLat'));
    const maxLat = Number(searchParams.get('maxLat'));
    const minLon = Number(searchParams.get('minLon'));
    const maxLon = Number(searchParams.get('maxLon'));
    const city = searchParams.get('city'); // Optional city parameter

    if ([minLat, maxLat, minLon, maxLon].some((v) => Number.isNaN(v))) {
      return NextResponse.json(
        { error: 'Invalid query parameters. Expected numeric minLat, maxLat, minLon, maxLon.' },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    // Build query object
    const query: any = {
      latitude: { $gte: minLat, $lte: maxLat },
      longitude: { $gte: minLon, $lte: maxLon },
    };

    // Add city filter if provided
    if (city && city.trim() !== '') {
      query.city = { $regex: new RegExp(city.trim(), 'i') };
      console.log('🏙️ Box API: Filtering by city:', city);
    }

    console.log('🔍 Box API Query:', query);

    const results = await Business.find(query,
      {
        name: 1,
        site: 1,
        business_status: 1,
        category: 1,
        full_address: 1,
        city: 1,
        postal_code: 1,
        state: 1,
        country_code: 1,
        latitude: 1,
        longitude: 1,
        country: 1,
        phone: 1,
        about: 1,
        owner_title: 1,
        location_link: 1,
        menu: 1,
        photo: 1,
        working_hours: 1,
        popular_times: 1,
        rating: 1,
        reviews: 1,
        food: 1,
        alcohol: 1,
        createdAt: 1,
      }
    )
      .sort({ rating: -1 })
      .lean();
    const normalized: BusinessResponse[] = results.map(mapBusinessDocToResponse);
    return NextResponse.json(normalized);
  } catch (error) {
    console.error('Error in business box API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch businesses' },
      { status: 500 }
    );
  }
}

function mapBusinessDocToResponse(doc: BusinessDoc): BusinessResponse {
  const rawReviews = (doc as { reviews?: unknown }).reviews;
  const reviewsCount = Array.isArray(rawReviews)
    ? (rawReviews.length > 0 ? rawReviews[0] : 0)
    : typeof rawReviews === 'number'
      ? rawReviews
      : 0;

  const rawCreatedAt = (doc as { createdAt?: unknown }).createdAt;
  const createdAtValue = typeof rawCreatedAt === 'number'
    ? rawCreatedAt
    : rawCreatedAt
      ? new Date(String(rawCreatedAt)).getTime()
      : undefined;

  const workingHours = (doc as { working_hours?: unknown }).working_hours as Record<string, string> | undefined;

  return {
    _id: (doc._id as unknown as string) ?? '',
    name: doc.name ?? '',
    full_address: doc.full_address ?? '',
    category: doc.category,
    business_status: doc.business_status,
    createdAt: createdAtValue,

    phone: doc.phone,

    latitude: doc.latitude,
    longitude: doc.longitude,
    city: doc.city,
    postal_code: doc.postal_code,
    country: doc.country,
    country_code: doc.country_code,

    site: doc.site,

    working_hours: workingHours,

    photo: doc.photo,

    rating: doc.rating ?? 0,
    reviews: reviewsCount,

    about: doc.about,

    owner_title: doc.owner_title,
    location_link: doc.location_link,
    menu: doc.menu,

    food: doc.food,
    alcohol: doc.alcohol,

    cmsProfile: {},
  } as BusinessResponse;
}
