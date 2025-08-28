'use client';

import './Testimonials.scss';

interface Review {
  id: string;
  name: string;
  location: string;
  profileImage: string;
  timestamp: string;
  title: string;
  content: string;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Amina R.',
    location: 'Dubai',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
  
    timestamp: '2 weeks ago',
    title: '"Perfect Rooftop Vibes"',
    content: 'Unreal rooftop lounge with the best view of the Marina. Live DJ was 🔥 and the shisha was smooth, mint & grape mix. Staff were super friendly. Free Entry with RSVP, VIP tables from $500. Hookah lasted almost 90 mins!'
  },
  {
    id: '2',
    name: 'Sarah T.',
    location: 'London',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    timestamp: '2 weeks ago',
    title: '"Great atmosphere"',
    content: 'Packed on weekends but super relaxed during weekdays. Outdoor Seating with garden vibes. Blueberry + mint combo was perfect. Prices were higher than most spots but worth it for the experience.'
  },
  {
    id: '3',
    name: 'Luka M.',
    location: 'Belgrade',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    timestamp: '2 weeks ago',
    title: '"Nice spot, but pricey"',
    content: 'Cozy private club feel with Private Rooms available. Chill crowd and real Arabic vibe. Passionfruit mocktail was amazing. Super photogenic too, great for Insta shots. Worth the splurge for special occasions.'
  },
  // {
  //   id: '4',
  //   name: 'Omar D.',
  //   location: 'Paris',
  //   profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
  //   timestamp: '2 weeks ago',
  //   title: '"10/10 for weekend nights!"',
  //   content: 'Beachfront location with luxury vibes. Sports Bar area with live games. BBQ options available. Lemon ice + berry mix was refreshing. Intimate setting perfect for date nights. Highly recommend!'
  // },
  // {
  //   id: '5',
  //   name: 'Rami A.',
  //   location: 'Berlin',
  //   profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face',
  //   timestamp: '2 weeks ago',
  //   title: '"Flavors, music & mood all 🔥"',
  //   content: 'Jazz nights are incredible here. Live music every Thursday. The shisha flavors are authentic and the atmosphere is electric. Great for groups and solo visits. Outdoor seating with city views.'
  // },
  // {
  //   id: '6',
  //   name: 'Mario S.',
  //   location: 'New York',
  //   profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face',
  //   timestamp: '2 weeks ago',
  //   title: '"Hidden gem in the city"',
  //   content: 'Found this place through a friend and it exceeded expectations. Rooftop views of Manhattan skyline. The staff remembered our preferences from last visit. Perfect blend of traditional and modern vibes.'
  // }
];

export default function Testimonials() {
  const handleReviewClick = (reviewId: string) => {

    // Handle review click - could open full review or navigate to venue
  };

  return (
    <div className="testimonials">
      <div className="testimonials__container">
        <div className="testimonials__header">
          <h2 className="testimonials__title">Nights Worth Talking About</h2>
          <p className="testimonials__subtitle">A collection of experiences from those who know great shisha.</p>
        </div>

        <div className="testimonials__grid">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="testimonials__card"
              onClick={() => handleReviewClick(review.id)}
            >
              <div className="testimonials__header-section">
                <div className="testimonials__profile">
                  <div 
                    className="testimonials__profile-image"
                    style={{ backgroundImage: `url(${review.profileImage})` }}
                  />
                  <div className="testimonials__profile-info">
                    <div className="testimonials__name-location">
                      {review.name} — {review.location}
                    </div>
                    <div className="testimonials__timestamp">
                      {review.timestamp}
                    </div>
                  </div>
                </div>
              </div>

              <div className="testimonials__content">
                <h3 className="testimonials__review-title">{review.title}</h3>
                <p className="testimonials__review-text">{review.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 