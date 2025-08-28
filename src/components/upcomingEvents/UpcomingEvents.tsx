'use client';

// useState removed as it's not being used
import { Button } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import './UpcomingEvents.scss';

interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  price: string;
  tags: string[];
  image: string;
  label?: {
    text: string;
    color: string;
  };
}

const events: Event[] = [
  {
    id: '1',
    title: 'Midnight Shisha & Beats',
    location: 'Sahara Sky Lounge, Dubai Marina',
    date: 'Saturday, August 3',
    time: '9:00 PM - 2:00 AM',
    price: 'Free Entry with RSVP · VIP tables from $500',
    tags: ['Rooftop', 'Live DJ', 'Outdoor Seating'],
    image: '../Assets/Images/UpcomingVibes/upcomingVibes_1.png',
    label: {
      text: 'Limited Spots',
      color: '#ef4444'
    }
  },
  {
    id: '2',
    title: 'Moonlight Puff',
    location: 'Sahara Sky Lounge, Dubai Marina',
    date: 'Saturday, August 3',
    time: '9:00 PM - 2:00 AM',
    price: 'From $100',
    tags: ['Cocktails', 'Outdoor Seating'],
    // image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop&crop=center'
    image: '../Assets/Images/UpcomingVibes/upcomingVibes_2.jpg'
  },
  {
    id: '3',
    title: 'Boho Shisha Vibes',
    location: 'Sahara Sky Lounge, Dubai Marina',
    date: 'Saturday, August 3',
    time: '9:00 PM - 2:00 AM',
    price: 'From $50',
    tags: ['Rooftop', 'Live DJ', 'Cocktails'],
    // image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center',
    image: '../Assets/Images/UpcomingVibes/upcomingVibes_3.jpg',
    label: {
      text: 'Trending',
      color: '#22c55e'
    }
  },
  {
    id: '4',
    title: 'Desert Nights',
    location: 'Sahara Sky Lounge, Dubai Marina',
    date: 'Saturday, August 3',
    time: '9:00 PM - 2:00 AM',
    price: 'From $75',
    tags: ['Cocktails', 'Live Music'],
    // image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
    image: '../Assets/Images/UpcomingVibes/upcomingVibes_4.jpg',
  },
  {
    id: '5',
    title: 'Arabian Nights',
    location: 'Oasis Lounge, Downtown Dubai',
    date: 'Friday, August 2',
    time: '8:00 PM - 1:00 AM',
    price: 'From $120',
    tags: ['Traditional', 'Live Music', 'Private Rooms'],
    image: 'https://images.unsplash.com/photo-1626274941806-3664ce9dee7e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    label: {
      text: 'Popular',
      color: '#f59e0b'
    }
  },
  {
    id: '6',
    title: 'Sunset Shisha',
    location: 'Palm Beach Club, Palm Jumeirah',
    date: 'Sunday, August 4',
    time: '6:00 PM - 11:00 PM',
    price: 'From $80',
    tags: ['Beachfront', 'Sunset Views', 'Cocktails'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: '7',
    title: 'Urban Vibes',
    location: 'City Heights, Business Bay',
    date: 'Thursday, August 1',
    time: '10:00 PM - 3:00 AM',
    price: 'From $90',
    tags: ['Nightclub', 'Live DJ', 'VIP Service'],
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
    label: {
      text: 'New',
      color: '#8b5cf6'
    }
  },
  {
    id: '8',
    title: 'Garden Party',
    location: 'Green Oasis, Al Barsha',
    date: 'Saturday, August 3',
    time: '5:00 PM - 10:00 PM',
    price: 'From $60',
    tags: ['Garden', 'Family Friendly', 'Food'],
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: '9',
    title: 'Luxury Lounge',
    location: 'Royal Palace, Sheikh Zayed Road',
    date: 'Wednesday, July 31',
    time: '7:00 PM - 12:00 AM',
    price: 'From $200',
    tags: ['Luxury', 'Fine Dining', 'Exclusive'],
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&h=300&fit=crop&crop=center',
    label: {
      text: 'Premium',
      color: '#dc2626'
    }
  },
  {
    id: '10',
    title: 'Weekend Warriors',
    location: 'Sports Bar, JBR',
    date: 'Friday, August 2',
    time: '8:00 PM - 2:00 AM',
    price: 'From $70',
    tags: ['Sports Bar', 'Happy Hour', 'Live Sports'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: '11',
    title: 'Chill & Grill',
    location: 'BBQ Garden, Al Qudra',
    date: 'Saturday, August 3',
    time: '4:00 PM - 9:00 PM',
    price: 'From $85',
    tags: ['BBQ', 'Outdoor', 'Family'],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: '12',
    title: 'Jazz & Shisha',
    location: 'Blue Note, Dubai Creek',
    date: 'Tuesday, July 30',
    time: '8:00 PM - 1:00 AM',
    price: 'From $95',
    tags: ['Jazz', 'Live Music', 'Intimate'],
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
    label: {
      text: 'Featured',
      color: '#0891b2'
    }
  }
];

export default function UpcomingEvents() {
  // Hover state removed as it's not being used

  const handleEventClick = (eventId: string) => {

    // Handle event click - navigate to event details or open modal
  };

  return (
    <div className="upcoming-events">
      <div className="upcoming-events__container">
        <div className="upcoming-events__header">
          <div className="upcoming-events__title-section">
            <h3 className="upcoming-events__title">Upcoming Vibes</h3>
            <div className="upcoming-events__subtitle-container">
              <span className="upcoming-events__subtitle">
                Discover live DJs, themed nights, and rooftop experiences near you.
              </span>
              <a href="/events" className="upcoming-events__see-all">
                See All Events
              </a>
            </div>
          </div>
          
        </div>

        <div className="upcoming-events__cards">
          {events.map((event) => (
                         <div 
               key={event.id} 
               className="upcoming-events__card"
             >
              {event.label && (
                <div 
                  className="upcoming-events__label"
                  style={{ backgroundColor: event.label.color }}
                >
                  {event.label.text}
                </div>
              )}
              
              <div className="upcoming-events__image-container">
                <div 
                  className="upcoming-events__image"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                <div className="upcoming-events__image-overlay">
                  {event.id === '1' && (
                    <div className="upcoming-events__venue-name">Shisha SKY LOUNGE</div>
                  )}
                </div>
              </div>
              
              <div className="upcoming-events__content">
                <h3 className="upcoming-events__event-title">{event.title}</h3>
                <p className="upcoming-events__location">{event.location}</p>
                
                <div className="upcoming-events__details">
                  <div className="upcoming-events__detail-item">
                    <CalendarTodayIcon className="upcoming-events__calendar-icon" />
                    <span>{event.date} · {event.time}</span>
                  </div>
                  <div className="upcoming-events__detail-item">
                    <LocalOfferIcon className="upcoming-events__icon" />
                    <span>{event.price}</span>
                  </div>
                </div>
                
                <div className="upcoming-events__tags">
                  {event.tags.map((tag, index) => (
                    <span key={index} className="upcoming-events__tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <Button
                  variant="outlined"
                  className="upcoming-events__cta-button"
                  onClick={() => handleEventClick(event.id)}
                  sx={{
                     borderColor: '#d1d5db',
                    // color: '#374151',
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                    
                    '&:hover': {
                      borderColor: '#9ca3af',
                      backgroundColor: '#f9fafb',
                    },
                  }}
                >
                  RSVP & Buy Tickets
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 