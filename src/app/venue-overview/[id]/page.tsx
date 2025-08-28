'use client';

import { useParams } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import VenueOverview from '@/components/venueOverview/venueOverview';

export default function VenueOverviewPage() {
  const params = useParams();
  const venueId = params.id as string;

  // Mock venue data for breadcrumbs - in a real app, this would come from an API
  const venueData = {
    '1': { name: 'Hürrem Sultan Shisha & Cigar Bars' },
    '2': { name: 'Sahara Sky Lounge' },
    '3': { name: 'Smoke & Silk' },
    '4': { name: 'Mirage Sky Bar' },
    '5': { name: 'Desert Oasis' },
    '6': { name: 'Urban Heights' },
    '7': { name: 'Golden Sands' }
  };

  const currentVenue = venueData[venueId as keyof typeof venueData] || { name: 'Venue' };

  return (
    <>
              {/* Breadcrumbs positioned outside and above VenueOverview */}
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Venues', goBack: true },
          { label: currentVenue.name, isActive: true }
        ]}
      />
      
              <VenueOverview venueId={venueId} />
    </>
  );
}
