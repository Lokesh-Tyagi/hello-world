'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import VenueOverview from '@/components/venueOverview/venueOverview';
import './explore.scss';

export default function Explore() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Explore', href: '/explore' },
    { label: 'Venue Details', isActive: true }
  ];

  return (
    <div className="explore-page">
      <div className="explore-container">
        <Breadcrumb items={breadcrumbItems} />
        <VenueOverview />
                  {/* <VenueOverview /> */}
      </div>
    </div>
  );
}
