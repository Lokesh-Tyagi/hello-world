'use client';

import React from 'react';
import GenericCard from '../ui/GenericCard';

import StarIcon from '@mui/icons-material/Star';
import './SimilarLounges.scss';

interface SimilarVenue {
  id: string;
  name: string;
  location: string;
  rating: string;
  closingTime: string;
  averagePrice: string;
  tags: string[];
  image: string;
  comingSoon?: boolean;
  status: 'open' | 'closed';
}

const similarVenues: SimilarVenue[] = [
  {
    id: '1',
    name: 'Sahara Sky Lounge',
    location: 'Downtown New York, USA',
    rating: '5.0',
    closingTime: '2:00 AM',
    averagePrice: '120',
    tags: ['Rooftop', 'Live DJ', 'Outdoor Seating'],
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&crop=center',
    status: 'open'
  },
  {
    id: '2',
    name: 'Smoke & Silk',
    location: 'Dubai Marina, UAE',
    rating: '4.8',
    closingTime: '1:00 AM',
    averagePrice: '120',
    tags: ['Live DJ', 'Outdoor Seating'],
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop&crop=center',
    status: 'open'
  },
  {
    id: '3',
    name: 'Mirage Sky Bar',
    location: 'Downtown New York, USA',
    rating: '4.5',
    closingTime: '2:00 AM',
    averagePrice: '120',
    tags: ['Rooftop', 'Cocktails', 'Outdoor Seating'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center',
    comingSoon: true,
    status: 'closed'
  },
  {
    id: '4',
    name: 'Drift Lounge',
    location: 'Downtown Miami, USA',
    rating: '4.7',
    closingTime: '3:00 AM',
    averagePrice: '150',
    tags: ['Outdoor Seating', 'Beach View'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
    status: 'open'
  },
  {
    id: '5',
    name: 'Urban Heights',
    location: 'Chicago, USA',
    rating: '4.7',
    closingTime: '2:00 AM',
    averagePrice: '140',
    tags: ['Rooftop', 'Live Music', 'Dance Floor'],
    image: 'https://images.unsplash.com/photo-1562581146-d7000f1318d4?q=80&w=797&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'open'
  },
  {
    id: '6',
    name: 'Golden Sands',
    location: 'Doha, Qatar',
    rating: '4.6',
    closingTime: '1:00 AM',
    averagePrice: '160',
    tags: ['Traditional', 'Arabic Music'],
    image: 'https://images.unsplash.com/photo-1702889369889-2b467b5d1aaf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'open'
  }
];

export default function SimilarLounges() {
  const handleVenueClick = (venueId: string) => {

    // Handle venue click - navigate to venue details
  };

  // See all venues handler removed as it's not being used

  return (
    <div className="similar-lounges">
      <div className="similar-lounges__container">
        <div className="similar-lounges__header">
          <div className="similar-lounges__title-section">
            <h3 className="similar-lounges__title">Similar Lounges You Might Like</h3>
            <div className="similar-lounges__subtitle-container">
              <span className="similar-lounges__subtitle">
                Explore other local lounges with top-rated vibes, views, and flavors.
              </span>
              <a href="/venues" className="similar-lounges__see-all">
                See All Venues
              </a>
            </div>
          </div>
        </div>

        <div className="similar-lounges__cards-wrapper">
          <div className="similar-lounges__cards">
            {similarVenues.map((venue) => (
              <GenericCard
                key={venue.id}
                variant="venue"
                image={{
                  src: venue.image
                }}
                title={venue.name}
                subtitle={venue.location}
                rating={{
                  value: venue.rating,
                  icon: <StarIcon style={{ fontSize: '16px', color: '#fbbf24' }} />
                }}
                details={[
                  {
                    icon: (
                      <span 
                        style={{
                          color: venue.status === 'open' ? '#10b981' : '#ef4444',
                          fontWeight: '600',
                          fontSize: '14px',
                          // padding: '2px 8px',
                          borderRadius: '12px',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {venue.status === 'open' ? 'Open' : 'Closed'}
                      </span>
                    ),
                    text: `Open  ${venue.closingTime}. $$`
                  }
                ]}
                tags={venue.tags.map(tag => ({ text: tag }))}
                comingSoon={venue.comingSoon}
                onClick={() => handleVenueClick(venue.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 