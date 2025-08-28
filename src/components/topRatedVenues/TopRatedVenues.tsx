'use client';

import { useRouter } from 'next/navigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarIcon from '@mui/icons-material/Star';
import './TopRatedVenues.scss';

// Rating Display Component
const RatingDisplay = ({ rating, reviews }: { rating: string; reviews: number }) => {
  const numRating = parseFloat(rating);
  if (isNaN(numRating) || numRating < 0 || numRating > 5) {
    return <span>N/A</span>;
  }

  const fullStars = Math.floor(numRating);
  const hasHalfStar = numRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push('★');
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    stars.push('☆');
  }
  
  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push('☆');
  }

  return (
    <span className="rating-display">
      <span className="rating-count">{numRating}</span>
      <span className="rating-stars">{stars.join('')}</span>
      <span className="review-count">({reviews})</span>
    </span>
  );
};

interface Venue {
  id: string;
  name: string;
  location: string;
  rating: string;
  reviews: number;
  closingTime: string;
  averagePrice: string;
  tags: string[];
  image: string;
  comingSoon?: boolean;
  status: 'open' | 'closed';
}

const venues: Venue[] = [
  {
    id: '1',
    name: 'Hürrem Sultan Shisha & Cigar Bars',
    location: 'Oranienstraße 52-53, 10969 Berlin',
    rating: '4.8',
    reviews: 127,
    closingTime: '2:00 AM',
    averagePrice: '120',
    tags: ['cocktails', 'Music', 'int', 'Cocktails'],
    image: '../Assets/Images/Venues/hurrem-sultan.png',
    status: 'open'
  },
  {
    id: '2',
    name: 'Sahara Sky Lounge',
    location: 'Downtown New York, USA',
    rating: '5.0',
    reviews: 89,
    closingTime: '2:00 AM',
    averagePrice: '120',
    tags: ['Rooftop', 'Live DJ', 'Outdoor Seating', 'Cocktails'],
    image: '../Assets/Images/Venues/topRatedVenue_1.jpg',
    status: 'open'
  },
  {
    id: '3',
    name: 'Smoke & Silk',
    location: 'Dubai Marina, UAE',
    rating: '4.8',
    reviews: 156,
    closingTime: '1:00 AM',
    averagePrice: '150',
    tags: ['Rooftop', 'Live DJ', 'VIP', 'Full Menu'],
    image: '../Assets/Images/Venues/topRatedVenue_2.png',
    status: 'closed'
  },
  {
    id: '4',
    name: 'Mirage Sky Bar',
    location: 'Los Angeles, USA',
    rating: '4.5',
    reviews: 203,
    closingTime: '2:00 AM',
    averagePrice: '180',
    tags: ['Rooftop', 'Cocktails', 'Skyline View'],
    image: '../Assets/Images/Venues/topRatedVenue_3.jpg',
    comingSoon: true,
    status: 'closed'
  },
  {
    id: '5',
    name: 'Desert Oasis',
    location: 'Abu Dhabi, UAE',
    rating: '4.9',
    reviews: 78,
    closingTime: '1:30 AM',
    averagePrice: '200',
    tags: ['Luxury', 'Private Rooms', 'Fine Dining', 'VIP'],
    image: '../Assets/Images/Venues/topRatedVenue_4.jpg',
    status: 'open'
  },
  {
    id: '6',
    name: 'Urban Heights',
    location: 'Chicago, USA',
    rating: '4.7',
    reviews: 142,
    closingTime: '2:00 AM',
    averagePrice: '140',
    tags: ['Rooftop', 'Live Music', 'Dance Floor', 'Cocktails'],
    image: 'https://images.unsplash.com/photo-1562581146-d7000f1318d4?q=80&w=797&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'open'
  },
  {
    id: '7',
    name: 'Golden Sands',
    location: 'Doha, Qatar',
    rating: '4.6',
    reviews: 95,
    closingTime: '1:00 AM',
    averagePrice: '160',
    tags: ['Traditional', 'Arabic Music', 'Outdoor Seating'],
    image: 'https://images.unsplash.com/photo-1702889369889-2b467b5d1aaf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'closed'
  }
];

export default function TopRatedVenues() {
  const router = useRouter();

  const handleVenueClick = (venueId: string) => {
    router.push(`/venue-overview/${venueId}`);
  };

  return (
    <div className="top-rated-venues">
      <div className="top-rated-venues__container">
        <div className="top-rated-venues__header">
          <div className="top-rated-venues__title-section">
            <h3 className="top-rated-venues__title">Top Rated Venues</h3>
            <div className="top-rated-venues__subtitle-container">
              <span className="top-rated-venues__subtitle">Based on user reviews</span>
              <a href="/venues" className="top-rated-venues__see-all">
                See All Venues
              </a>
            </div>
          </div>
        </div>

        <div className="top-rated-venues__cards">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="top-rated-venues__card"
              onClick={() => handleVenueClick(venue.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleVenueClick(venue.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${venue.name} in ${venue.location}`}
            >
              {venue.comingSoon && (
                <div className="top-rated-venues__coming-soon">
                  Coming Soon
                </div>
              )}
              <div className="top-rated-venues__image-container">
                <div 
                  className="top-rated-venues__image"
                  style={{ backgroundImage: `url(${venue.image})` }}
                />
              </div>

              <div className="top-rated-venues__content">
                <h3 className="top-rated-venues__venue-name">{venue.name}</h3>
                
                <div className="top-rated-venues__rating">
                  <RatingDisplay rating={venue.rating} reviews={venue.reviews} />
                </div>
                
                <p className="top-rated-venues__location">{venue.location}</p>
                
                <div className="top-rated-venues__details">
                  <div className="top-rated-venues__detail-item">
                    {/* <CheckCircleIcon className="top-rated-venues__icon" /> */}
                    <span 
                      className={`top-rated-venues__status ${
                        venue.status === 'open' ? 'top-rated-venues__status--open' : 'top-rated-venues__status--closed'
                      }`}
                    >
                      {venue.status === 'open' ? 'Open' : 'Closed'}
                    </span>
                    <span>Open {venue.closingTime}. $$</span>
                  </div>
                  {/* <div className="top-rated-venues__detail-item">
                    <AttachMoneyIcon className="top-rated-venues__icon" />
                    <span>Average ${venue.averagePrice} per person</span>
                  </div> */}
                </div>

                <div className="top-rated-venues__tags">
                  {venue.tags.map((tag, index) => (
                    <span key={index} className="top-rated-venues__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="top-rated-venues__pagination">
          {[0, 1, 2].map((dot) => (
            <div
              key={dot}
              className={`top-rated-venues__dot ${
                currentSlide === dot ? 'top-rated-venues__dot--active' : ''
              }`}
              onClick={() => setCurrentSlide(dot)}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
} 