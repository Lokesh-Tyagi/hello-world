'use client';

import React from 'react';
import GenericCard from './GenericCard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const GenericCardExample: React.FC = () => {
  const handleCardClick = (id: string) => {

  };

  const handleCTAClick = (id: string) => {

  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '40px', textAlign: 'center' }}>GenericCard Component Examples</h1>
      
      {/* Venue Cards */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>Venue Cards</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <GenericCard
            variant="venue"
            image={{
              src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&crop=center'
            }}
            title="Sahara Sky Lounge"
            subtitle="Downtown New York, USA"
            rating={{
              value: '5.0',
              icon: <StarIcon style={{ fontSize: '16px', color: '#fbbf24' }} />
            }}
            details={[
              {
                icon: <CheckCircleIcon style={{ fontSize: '16px' }} />,
                text: 'Open until 2:00 AM'
              },
              {
                icon: <AttachMoneyIcon style={{ fontSize: '16px' }} />,
                text: 'Average $120 per person'
              }
            ]}
            tags={[
              { text: 'Rooftop' },
              { text: 'Live DJ' },
              { text: 'Outdoor Seating' },
              { text: 'Cocktails' }
            ]}
            onClick={() => handleCardClick('venue-1')}
          />

          <GenericCard
            variant="venue"
            image={{
              src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop&crop=center'
            }}
            title="Smoke & Silk"
            subtitle="Dubai Marina, UAE"
            rating={{
              value: '4.8',
              icon: <StarIcon style={{ fontSize: '16px', color: '#fbbf24' }} />
            }}
            details={[
              {
                icon: <CheckCircleIcon style={{ fontSize: '16px' }} />,
                text: 'Open until 1:00 AM'
              },
              {
                icon: <AttachMoneyIcon style={{ fontSize: '16px' }} />,
                text: 'Average $150 per person'
              }
            ]}
            tags={[
              { text: 'Rooftop' },
              { text: 'Live DJ' },
              { text: 'VIP' },
              { text: 'Full Menu' }
            ]}
            comingSoon={true}
            onClick={() => handleCardClick('venue-2')}
          />
        </div>
      </section>

      {/* Article Cards */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>Article Cards</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <GenericCard
            variant="article"
            image={{
              src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=250&fit=crop&crop=center'
            }}
            title="What to Expect at a Shisha & Beats Night"
            description="Volutpat in morbi sit enim interdum tempus et gravida. Ante nunc ultricies sit adipiscing dui..."
            link="/journal/shisha-beats-night"
          />

          <GenericCard
            variant="article"
            image={{
              src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop&crop=center'
            }}
            title="The Most Instagrammable Hookah Spots"
            description="Volutpat in morbi sit enim interdum tempus et gravida. Ante nunc ultricies sit adipiscing dui..."
            link="/journal/instagrammable-hookah-spots"
          />
        </div>
      </section>

      {/* Event Cards */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>Event Cards</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <GenericCard
            variant="event"
            image={{
              src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&crop=center',
              badge: {
                text: 'Featured',
                color: '#ef4444'
              }
            }}
            title="Friday Night Vibes"
            subtitle="Shisha SKY LOUNGE"
            details={[
              {
                icon: <CalendarTodayIcon style={{ fontSize: '16px' }} />,
                text: 'Dec 15, 2024 · 9:00 PM'
              },
              {
                icon: <LocalOfferIcon style={{ fontSize: '16px' }} />,
                text: 'From $25'
              }
            ]}
            tags={[
              { text: 'Live DJ' },
              { text: 'Rooftop' },
              { text: 'Cocktails' }
            ]}
            cta={{
              text: 'RSVP & Buy Tickets',
              onClick: () => handleCTAClick('event-1')
            }}
            onClick={() => handleCardClick('event-1')}
          />

          <GenericCard
            variant="event"
            image={{
              src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop&crop=center'
            }}
            title="Desert Nights"
            subtitle="Mirage Sky Bar"
            details={[
              {
                icon: <CalendarTodayIcon style={{ fontSize: '16px' }} />,
                text: 'Dec 20, 2024 · 8:00 PM'
              },
              {
                icon: <LocalOfferIcon style={{ fontSize: '16px' }} />,
                text: 'From $35'
              }
            ]}
            tags={[
              { text: 'Arabic Music' },
              { text: 'Traditional' },
              { text: 'VIP Tables' }
            ]}
            cta={{
              text: 'RSVP & Buy Tickets',
              onClick: () => handleCTAClick('event-2')
            }}
            onClick={() => handleCardClick('event-2')}
          />
        </div>
      </section>

      {/* Video Cards */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>Video Cards</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          <GenericCard
            variant="video"
            image={{
              src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=200&fit=crop&crop=center'
            }}
            title="Real Lounges. Real People. Real Nights."
            showPlayIcon={true}
            onClick={() => handleCardClick('video-1')}
          />

          <GenericCard
            variant="video"
            image={{
              src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=200&fit=crop&crop=center'
            }}
            title="Behind the Scenes: Shisha Culture"
            showPlayIcon={true}
            onClick={() => handleCardClick('video-2')}
          />
        </div>
      </section>

      {/* Custom Card with Children */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>Custom Card with Children</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <GenericCard
            image={{
              src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&crop=center'
            }}
            title="Custom Card"
            description="This card demonstrates the use of children prop for custom content."
            onClick={() => handleCardClick('custom-1')}
          >
            <div style={{ 
              marginTop: '16px', 
              padding: '12px', 
              background: '#f3f4f6', 
              borderRadius: '8px',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              <strong>Custom Content:</strong> You can add any React components as children to create custom card layouts.
            </div>
          </GenericCard>
        </div>
      </section>
    </div>
  );
};

export default GenericCardExample; 