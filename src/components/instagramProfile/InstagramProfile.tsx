'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, PlayArrow } from '@mui/icons-material';
import './InstagramProfile.scss';
// import ProfileLogo from '@/assets/SliderImage/Slider1.png';

interface InstagramPost {
  id: string;
  type: 'image' | 'video';
  imageUrl: string;
  title: string;
  description: string;
  timeAgo: string;
  isVideo: boolean;
}

interface InstagramProfileProps {
  profileName?: string;
  profileLogo?: string;
  posts?: InstagramPost[];
}

export default function InstagramProfile({ 
  profileName = "hurremsultan.berlin",
  profileLogo = "/Assets/logo/socialMediaIcon.jpg",
  posts = []
}: InstagramProfileProps) {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const postsRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Default posts using local Hurram images
  const defaultPosts: InstagramPost[] = [
    {
      id: '1',
      type: 'image',
      imageUrl: '/Assets/Images/Hurram_Images/hurram_1.jpg',
      title: 'Hürrem Lounge Experience',
      description: 'Experience the finest shisha and atmosphere at Hürrem Lounge',
      timeAgo: '2 days ago',
      isVideo: false
    },
    {
      id: '2',
      type: 'image',
      imageUrl: '/Assets/Images/Hurram_Images/hurram_2.jpg',
      title: 'Premium Shisha Selection',
      description: 'Discover our premium selection of shisha flavors and tobacco',
      timeAgo: '4 days ago',
      isVideo: false
    },
    {
      id: '3',
      type: 'image',
      imageUrl: '/Assets/Images/Hurram_Images/hurram_3.jpg',
      title: 'Luxury Lounge Atmosphere',
      description: 'Immerse yourself in our luxury lounge atmosphere and comfort',
      timeAgo: 'A week ago',
      isVideo: false
    }
  ];

  const displayPosts = posts.length > 0 ? posts : defaultPosts;

  const nextPost = () => {
    if (isMobile) {
      // On mobile, go to next single image
      setCurrentPostIndex((prev) => 
        prev === displayPosts.length - 1 ? 0 : prev + 1
      );
    } else {
      // On desktop, move 3-image window
      setCurrentPostIndex((prev) => 
        prev === displayPosts.length - 3 ? 0 : prev + 1
      );
    }
  };

  const prevPost = () => {
    if (isMobile) {
      // On mobile, go to previous single image
      setCurrentPostIndex((prev) => 
        prev === 0 ? displayPosts.length - 1 : prev - 1
      );
    } else {
      // On desktop, move 3-image window
      setCurrentPostIndex((prev) => 
        prev === 0 ? displayPosts.length - 3 : prev - 1
      );
    }
  };

  // Touch/swipe functionality for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped left - next post
        nextPost();
      } else {
        // Swiped right - previous post
        prevPost();
      }
    }
    
    setIsDragging(false);
  };

  // Determine which posts to show based on device type
  const visiblePosts = isMobile 
    ? [displayPosts[currentPostIndex]] // Show only one post on mobile
    : displayPosts.slice(currentPostIndex, currentPostIndex + 3); // Show 3 posts on desktop

  // Always show navigation if there are posts
  const showNavigation = displayPosts.length > 0;

  // Debug logging
  console.log('InstagramProfile Debug:', {
    displayPostsLength: displayPosts.length,
    showNavigation,
    currentPostIndex,
    visiblePostsLength: visiblePosts.length,
    isMobile
  });

  return (
    <div className="instagram-profile">
      {/* Profile Header */}
      <div className="instagram-profile__header">
        <div className="instagram-profile__logo">
          <Image 
            src={profileLogo} 
            alt="Profile Logo" 
            width={60} 
            height={60}
            className="instagram-profile__logo-img"
          />
        </div>
        
        <div className="instagram-profile__info">
          <h3 className="instagram-profile__name">Hürrem LOUNGE</h3>
          {/* <span className="instagram-profile__username">@{profileName}</span> */}
        </div>
        
        <button className="instagram-profile__follow-btn">
          <svg className="instagram-profile__instagram-icon" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Follow us
        </button>
      </div>

      {/* Posts Grid */}
      <div className="instagram-profile__posts">
        {/* Navigation buttons - only show on desktop */}
        {showNavigation && !isMobile && (
          <button 
            className="instagram-profile__nav-btn instagram-profile__nav-btn--prev"
            onClick={prevPost}
            disabled={displayPosts.length <= 3}
          >
            <ChevronLeft />
          </button>
        )}

        <div 
          className={`instagram-profile__posts-grid ${isMobile ? 'instagram-profile__posts-grid--mobile' : ''}`}
          ref={postsRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {visiblePosts.map((post) => (
            <div key={post.id} className="instagram-profile__post">
              <div className="instagram-profile__post-image">
                <Image 
                  src={post.imageUrl} 
                  alt={post.title || 'Instagram Post'} 
                  width={250} 
                  height={300}
                  className="instagram-profile__post-img"
                />
                
                {post.isVideo && (
                  <div className="instagram-profile__play-button">
                    <PlayArrow />
                  </div>
                )}
                
                <div className="instagram-profile__post-overlay">
                  <div className="instagram-profile__post-logo">
                    <Image 
                      src={profileLogo} 
                      alt="Profile Logo" 
                      width={40} 
                      height={40}
                      className="instagram-profile__post-logo-img"
                    />
                    <div className="instagram-profile__post-info">
                      <span className="instagram-profile__post-username">@{profileName}</span>
                      <span className="instagram-profile__post-time">{post.timeAgo}</span>
                    </div>
                  </div>
                  <div className="instagram-profile__post-instagram">
                    <svg className="instagram-profile__instagram-icon-small" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons - only show on desktop */}
        {showNavigation && !isMobile && (
          <button 
            className="instagram-profile__nav-btn instagram-profile__nav-btn--next"
            onClick={nextPost}
            disabled={displayPosts.length <= 3}
          >
            <ChevronRight />
          </button>
        )}
      </div>

      {/* Carousel indicators - only show on mobile, positioned below posts */}
      {showNavigation && isMobile && (
        <div className="instagram-profile__indicators">
          {displayPosts.map((_, index) => (
            <button
              key={index}
              className={`instagram-profile__indicator ${index === currentPostIndex ? 'instagram-profile__indicator--active' : ''}`}
              onClick={() => setCurrentPostIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
