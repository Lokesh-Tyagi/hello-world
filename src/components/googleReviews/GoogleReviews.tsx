'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import './GoogleReviews.scss';

interface GoogleReview {
  id: string;
  name: string;
  location: string;
  profileImage: string;
  timestamp: string;
  rating: number;
  reviewText: string;
}

const googleReviews: GoogleReview[] = [
  {
    id: '1',
    name: 'Amina R.',
    location: 'Dubai',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    timestamp: '2 weeks ago',
    rating: 4.5,
    reviewText: 'Hands down the best rooftop lounge I\'ve been to. The view of the Marina at night is unreal. Shisha was smooth, mint & grape mix is a must-try. Staff were super friendly and helped us choose flavors. Will definitely be back!'
  },
  {
    id: '2',
    name: 'Mario S.',
    location: 'New York',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face',
    timestamp: '2 weeks ago',
    rating: 4.5,
    reviewText: 'Went on Friday with friends and the place was packed — DJ was 🔥, crowd was mixed, and everything felt super relaxed. We got the blueberry + mint combo and a passionfruit mocktail. Hookah lasted almost 90 mins. Highly recommend for group vibes.'
  },
  {
    id: '3',
    name: 'Omar D.',
    location: 'Paris',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    timestamp: '2 weeks ago',
    rating: 4.5,
    reviewText: 'Loved the setup. Dim lights, soft beats, and that cool breeze on the terrace. Try their lemon ice + berry mix — crazy good. Chill crowd and solid playlist the whole night.'
  },
  {
    id: '4',
    name: 'Rami A.',
    location: 'Berlin',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face',
    timestamp: '2 weeks ago',
    rating: 4.0,
    reviewText: 'Decor is gorgeous — lanterns, floor seating, and a real Arabic vibe. We had a tea + shisha set for two and it was perfect. Super photogenic too, great for Insta shots.'
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg key={`full-${i}`} width="16" height="16" viewBox="0 0 24 24" fill="#FFD700">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <svg key="half" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700">
        <defs>
          <linearGradient id="halfStar">
            <stop offset="50%" stopColor="#FFD700"/>
            <stop offset="50%" stopColor="#E5E7EB"/>
          </linearGradient>
        </defs>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#halfStar)"/>
      </svg>
    );
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <svg key={`empty-${i}`} width="16" height="16" viewBox="0 0 24 24" fill="#E5E7EB">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    );
  }

  return <div className="google-reviews__stars">{stars}</div>;
};

export default function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Determine reviews per view based on screen size
  // Show reviews in rows (side by side) instead of columns
  const reviewsPerView = isMobile ? 1 : 2;
  const totalPages = Math.ceil(googleReviews.length / reviewsPerView);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleWriteReview = () => {
    // Handle write review action
  };

  const handleReadMoreReviews = () => {
    // Handle read more reviews action
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + reviewsPerView >= googleReviews.length ? 0 : prevIndex + reviewsPerView
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - reviewsPerView < 0 ? Math.max(0, totalPages - 1) * reviewsPerView : prevIndex - reviewsPerView
    );
  };

  const goToPage = (pageIndex: number) => {
    setCurrentIndex(pageIndex * reviewsPerView);
  };

  const visibleReviews = googleReviews.slice(currentIndex, currentIndex + reviewsPerView);

  return (
    <div className="google-reviews">
      <div className="google-reviews__container">
        {/* Header Section */}
        <div className="google-reviews__header">
          <div className="google-reviews__logo-section">
            <div className="google-reviews__logo">
              <Image 
                src="/Assets/logo/googleReviewLogo.png" 
                alt="Google" 
                className="google-reviews__logo-image"
                width={300}
                height={84}
              />
              {/* <div className="google-reviews__header-stars">
                <span className="google-reviews__logo-text">Reviews</span>
                <StarRating rating={5} />
              </div> */}
            </div>
            <div className="google-reviews__summary">
              <div className="google-reviews__summary-stars">
                <StarRating rating={4.9} />
                <div className="google-reviews__rating-text">
                  <span style={{fontWeight: 500, color: "#000"}}>4,9 rating </span>of 122 reviews
                </div>
              </div>
            </div>
          </div>
          
          <button className="google-reviews__write-review-btn" onClick={handleWriteReview}>
            Write a Review
          </button>
        </div>

        {/* Reviews Carousel */}
        <div className="google-reviews__carousel">
          <div className="google-reviews__carousel-container">
            {/* Reviews Display */}
            <div className="google-reviews__carousel-content">
              {/* Navigation Buttons - Hidden on mobile, shown on desktop */}
              <button 
                className="google-reviews__nav-btn google-reviews__nav-btn--prev google-reviews__nav-btn--overlay google-reviews__nav-btn--desktop" 
                onClick={goToPrevious}
                aria-label="Previous reviews"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>

              {visibleReviews.map((review) => (
                <div key={review.id} className="google-reviews__card">
                  <div className="google-reviews__card-header">
                    <div className="google-reviews__profile">
                      <div className="google-reviews__profile-image">
                        <Image
                          src={review.profileImage}
                          alt={`${review.name} profile`}
                          width={60}
                          height={60}
                          className="google-reviews__profile-image-img"
                        />
                      </div>
                      <div className="google-reviews__profile-info">
                        <div className="google-reviews__name-location">
                          {review.name} from {review.location}
                        </div>
                        <div className="google-reviews__timestamp">
                          {review.timestamp}
                        </div>
                        <div className="google-reviews__card-rating">
                          <StarRating rating={review.rating} />
                        </div>
                      </div>
                    </div>
                    <div className="google-reviews__google-logo">
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="google-reviews__card-content">
                    <p className="google-reviews__review-text">&ldquo;{review.reviewText}&rdquo;</p>
                  </div>
                </div>
              ))}

              <button 
                className="google-reviews__nav-btn google-reviews__nav-btn--next google-reviews__nav-btn--overlay google-reviews__nav-btn--desktop" 
                onClick={goToNext}
                aria-label="Next reviews"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Pagination Dots - Always visible, but styled differently for mobile/desktop */}
          {totalPages > 1 && (
            <div className="google-reviews__pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`google-reviews__pagination-dot ${
                    Math.floor(currentIndex / reviewsPerView) === index ? 'google-reviews__pagination-dot--active' : ''
                  }`}
                  onClick={() => goToPage(index)}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

       
      </div>
    </div>
  );
} 