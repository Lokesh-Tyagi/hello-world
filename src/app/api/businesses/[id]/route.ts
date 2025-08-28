import { NextRequest, NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/mongodb';
import { Business, type BusinessDoc } from '@/models/Business';
import type { Business as BusinessResponse } from '@/types/Business';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: businessId } = await params;
    const body = await request.json();

    await connectToMongoDB();
    const updated = await Business.findByIdAndUpdate(businessId, body, { new: true }).lean();
    if (!updated) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error in business update API route:', error);
    return NextResponse.json(
      { error: 'Failed to update business' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: businessId } = await params;
    await connectToMongoDB();
    const doc = await Business.findById(businessId).lean();
    if (!doc) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }
    return NextResponse.json(mapBusinessDocToResponse(doc));
  } catch (error) {
    console.error('Error in business get API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch business' },
      { status: 500 }
    );
  }
}

function mapBusinessDocToResponse(doc: BusinessDoc): BusinessResponse {
  const rawReviews = (doc as { reviews?: unknown }).reviews;
  const reviewsCount = Array.isArray(rawReviews)
    ? rawReviews.length
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
