'use client';

import { useParams } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import EventOverview from '@/components/eventOverview/eventOverview';

export default function EventOverviewPage() {
  const params = useParams();
  const venueId = params.id as string;

  // Mock venue data for breadcrumbs - in a real app, this would come from an API
  const venueData = {
    '1': { name: 'Sahara Sky Lounge' },
    '2': { name: 'Smoke & Silk' },
    '3': { name: 'Mirage Sky Bar' },
    '4': { name: 'Desert Oasis' },
    '5': { name: 'Urban Heights' },
    '6': { name: 'Golden Sands' }
  };

  const currentVenue = venueData[venueId as keyof typeof venueData] || { name: 'Venue' };

  return (
    <>
      {/* Breadcrumbs positioned outside and above EventOverview */}
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Venues', goBack: true },
          { label: currentVenue.name, isActive: true }
        ]}
      />
      
      <EventOverview venueId={venueId} />
    </>
  );
}
