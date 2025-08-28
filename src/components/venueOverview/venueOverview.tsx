'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Favorite, FavoriteBorder, Share, Phone, PermPhoneMsgOutlined, LanguageSharp } from '@mui/icons-material';
import PromotionsEvents from '@/components/promotionsEvents/PromotionsEvents';
import MapAndDirections from '@/components/mapAndDirections/MapAndDirections';
import './venueOverview.scss';
import GoogleReviews from '../googleReviews/GoogleReviews';


import { VideoCard } from '../ui/VideoCard';
import { videoData } from '@/data/videos';
import SimilarLounges from '../similarLounges/SimilarLounges';
import InstagramProfile from '../instagramProfile';
import { Business } from '../../types/Business';

interface VenueOverviewProps {
  venueId?: string;
  business?: Business;
}

export default function VenueOverview({ venueId, business }: VenueOverviewProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('Overview');

  // Function to scroll to section
  const scrollToSection = (sectionName: string) => {
    setActiveTab(sectionName);

    // Map tab names to section IDs
    const sectionMap: { [key: string]: string } = {
      'Overview': 'overview-section',
      'Menu': 'menu-section',
      'Promotions': 'promotions-section',
      'Map & Directions': 'map-directions-section',
      'Reviews': 'reviews-section',
      'Social': 'social-section'
    };

    const sectionId = sectionMap[sectionName];
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        // Get the element's position and account for any fixed headers
        const elementPosition = element.offsetTop;
        const offset = 100; // Adjust this value based on your header height

        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    }
  };

  // Function to handle horizontal scroll for navigation tabs
  const handleTabScroll = (direction: 'left' | 'right') => {
    const tabsContainer = document.querySelector('.navigation-tabs') as HTMLElement;
    if (tabsContainer) {
      const scrollAmount = 200; // Adjust scroll amount as needed
      if (direction === 'left') {
        tabsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        tabsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Add touch event handling for mobile navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.overflowX = 'auto';
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const target = e.currentTarget as HTMLElement;
    // Keep overflow-x auto for mobile scrolling
  };

  // Mock venue data - in a real app, this would come from an API
  const venueData = {
    '1':{
      name: 'Hürrem Sultan Shisha & Cigar Bars',
      location: 'Oranienstraße 52-53, 10969 Berlin',
      address: 'Oranienstraße 52-53, 10969 Berlin',
      rating: '4.8',
      closingTime: '2:00 AM',
      averagePrice: '120',
      tags: ['cocktails', 'Music', 'Mint', 'Cocktails'],
      images:[
        '/Assets/Images/Venues/hurrem-sultan.png',
        'https://huerremsultan.de/wp-content/uploads/2024/03/location-819x1024.jpeg',
        // 'https://huerremsultan.de/wp-content/uploads/2024/03/B4C5365-scaled-819x1024.jpg',
        'https://huerremsultan.de/wp-content/uploads/2024/03/fulltable-819x1024.jpeg',
        'https://huerremsultan.de/wp-content/uploads/2024/03/B4C52832-scaled-819x1024.jpg',
        // 'https://huerremsultan.de/wp-content/uploads/2024/03/location2-819x1024.jpeg',
        'https://huerremsultan.de/wp-content/uploads/2024/03/Lachfillet-819x1024.jpeg',
        'https://huerremsultan.de/wp-content/uploads/2024/03/location3-1-819x1024.jpeg'
        // '/Assets/Images/Hurram_Images/hurram_43.jpg',
        // '/Assets/Images/Hurram_Images/hurram_21.webp',
        // '/Assets/Images/Hurram_Images/hurram_32.webp',
        

      ]
    },
    '2': {
      name: 'Sahara Sky Lounge',
      location: 'Downtown New York, USA',
      address: '60 Al Marsa St - Dubai Marina - Dubai - United Arab Emirates',
      rating: '5.0',
      averagePrice: '120',
      tags: ['Rooftop', 'Live DJ', 'Outdoor Seating', 'Cocktails'],
      images: [
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=center'
      ]
    },
    
    '3': {
      name: 'Smoke & Silk',
      location: 'Dubai Marina, UAE',
      address: 'Dubai Marina - Dubai - United Arab Emirates',
      rating: '4.8',
      averagePrice: '150',
      tags: ['Rooftop', 'Live DJ', 'VIP', 'Full Menu'],
      images: [
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=center'
      ]
    },
    '4': {
      name: 'Mirage Sky Bar',
      location: 'Los Angeles, USA',
      address: 'Los Angeles - California - United States',
      rating: '4.5',
      averagePrice: '180',
      tags: ['Rooftop', 'Cocktails', 'Skyline View'],
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop&crop=center'
      ]
    },
    '5': {
      name: 'Desert Oasis',
      location: 'Abu Dhabi, UAE',
      address: 'Abu Dhabi - United Arab Emirates',
      rating: '4.9',
      averagePrice: '200',
      tags: ['Luxury', 'Private Rooms', 'Fine Dining', 'VIP'],
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&crop=center'
      ]
    },
    '6': {
      name: 'Urban Heights',
      location: 'Chicago, USA',
      address: 'Chicago - Illinois - United States',
      rating: '4.7',
      averagePrice: '140',
      tags: ['Rooftop', 'Live Music', 'Dance Floor', 'Cocktails'],
      images: [
        'https://images.unsplash.com/photo-1562581146-d7000f1318d4?w=800&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&crop=center'
      ]
    },
    '7': {
      name: 'Golden Sands',
      location: 'Doha, Qatar',
      address: 'Doha - Qatar',
      rating: '4.6',
      averagePrice: '160',
      tags: ['Traditional', 'Arabic Music', 'Outdoor Seating'],
      images: [
        'https://images.unsplash.com/photo-1702889369889-2b467b5d1aaf?w=800&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&crop=center'
      ]
    }
  };

  // Get venue data based on business prop, venueId, or use default data
  const currentVenue = business ? {
    name: business.name || 'Business Name',
    location: business.full_address || 'Address not available',
    address: business.full_address || 'Address not available',
    rating: business.rating?.toString() || 'N/A',
    averagePrice: business.range || 'Price not available',
    tags: business.about ? (() => {
      try {
        const aboutData = JSON.parse(business.about);
        const tags = [];
        for (const section in aboutData) {
          for (const option in aboutData[section]) {
            if (aboutData[section][option]) {
              tags.push(option);
            }
          }
        }
        return tags.slice(0, 6); // Limit to 6 tags
      } catch {
        return ['Shisha', 'Hookah', 'Lounge'];
      }
    })() : ['Shisha', 'Hookah', 'Lounge'],
    images: business.photo ? (Array.isArray(business.photo) ? business.photo : [business.photo]).filter(Boolean) : [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=center'
    ]
  } : venueId && venueData[venueId as keyof typeof venueData]
    ? venueData[venueId as keyof typeof venueData]
    : venueData['1']; // Default to ID 1 data if no specific venue is found

  // Menu images data
  const menuImages = [
    {
      src: "/Assets/Images/Menus/menu_1.png",
      alt: "Drinks Menu"
    },
    {
      src: "/Assets/Images/Menus/menu_2.png",
      alt: "HÜRREM SULTAN Menüs"
    },
    {
      src: "/Assets/Images/Menus/menu_3.png",
      alt: "Coffee & Hot Specials"
    },
    {
      src: "/Assets/Images/Menus/menu_4.png",
      alt: "Daily Specials"
    },
    {
      src: "/Assets/Images/Menus/menu_4.png",
      alt: "Premium Shisha"
    },
    {
      src: "/Assets/logo/shisha-logo.svg",
      alt: "Signature Cocktails"
    }
  ];

  const tags = currentVenue.tags;
  const carouselImages = currentVenue.images.map((src, index) => ({
    id: index + 1,
    src,
    alt: `${currentVenue.name} - Image ${index + 1}`
  }));

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  // Promotions data moved to PromotionsEvents component

  return (
          <div className="venue-overview">
      {/* Header Section */}
      <div className="event-header">
        <div className="event-header__left">
          <div className="event-header__title-row">
            <h3 className="event-header__title">{currentVenue.name}</h3>
            <div className="event-header__rating">
              <span className="event-header__rating-score">{currentVenue.rating}</span>

              <span className="event-header__rating-stars">★★★★★</span>
              <span className="event-header__rating-count">(24 reviews)</span>
            </div>
          </div>
          <div className="event-header__address">
            {/* <LocationOn sx={{ fontSize: 16 }} /> */}
            <span>{currentVenue.address}  <button className="event-header__show-map">Show map</button></span>

            <div className="event-header__actions">
              <button
                className={`event-header__action ${isLiked ? 'liked' : ''}`}
                onClick={() => setIsLiked(!isLiked)}
              >
                {isLiked ? <Favorite sx={{ fontSize: 20 }} /> : <FavoriteBorder sx={{ fontSize: 20 }} />}
              </button>
              <button className="event-header__action">
                <Share sx={{ fontSize: 20 }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="event-content">
        {/* Main Content */}
        <div className="event-main">
          {/* Hero Image Section */}
          <div className="hero-section">
            <div className="hero-image">
              {carouselImages[currentImageIndex] && carouselImages[currentImageIndex].src ? (
                <Image
                  src={carouselImages[currentImageIndex].src}
                  alt={carouselImages[currentImageIndex].alt}
                  className="hero-image__img"
                  width={800}
                  height={400}
                  priority
                />
              ) : (
                <div className="hero-image__placeholder">
                  <span>Image not available</span>
                </div>
              )}
              <div className="hero-image__navigation">
                <button
                  className="hero-image__nav-btn hero-image__nav-btn--prev"
                  onClick={prevImage}
                >
                  ‹
                </button>
                <button
                  className="hero-image__nav-btn hero-image__nav-btn--next"
                  onClick={nextImage}
                >
                  ›
                </button>
              </div>
              <div className="hero-image__indicators">
                 {carouselImages.map((_, index) => (
                   <button
                     key={index}
                     className={`hero-image__indicator ${index === currentImageIndex ? 'active' : ''}`}
                     onClick={() => setCurrentImageIndex(index)}
                   />
                 ))}
               </div>
            </div>

            {/* Tags */}
            <div className="tags">
              {tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>

            {/* Mobile Reservation Card - Only visible on mobile */}
            <div className="mobile-reservation-card">
              <div className="reservation-card">
                <h2 className="reservation-card__title">Reserve Your Table</h2>
                <p className="reservation-card__price">$$ - Average ${currentVenue.averagePrice} per person</p>

                <div className="reservation-card__category">
                  <span className="category-icon">🍷</span>
                  <span>Food & Drinks</span>
                </div>

                <div className="reservation-card__hours">
                  <span className="hours-icon">🕐</span>
                  <span className="hours-status open">Opens</span>
                  <span className="hours-time">2:00 AM</span>
                </div>

                <div className="reservation-card__actions">
                  <button className="btn btn--primary">Make a Reservation</button>
                </div>

                <div className="reservation-card__contact-buttons">
                  <button className="contact-btn contact-btn--phone">
                    <PermPhoneMsgOutlined className="contact-btn__icon" />
                    <span className="contact-btn__text">Call us</span>
                  </button>
                  <button className="contact-btn contact-btn--website">
                    <LanguageSharp className="contact-btn__icon" />
                    <span className="contact-btn__text">Website</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="navigation-tabs-wrapper">
              
              <div 
                className="navigation-tabs"
                style={{
                  // overflowX: 'auto',
                  // overflowY: 'hidden',
                  // scrollbarWidth: 'thin',
                  // scrollBehavior: 'smooth',
                  //  WebkitOverflowScrolling: 'touch'
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div className="nav-tab" onClick={() => scrollToSection('Overview')}>
                  <span className={`nav-tab__text ${activeTab === 'Overview' ? 'active' : ''}`}>
                    Overview
                  </span>
                </div>
                <div className="nav-tab" onClick={() => scrollToSection('Menu')}>
                  <span className={`nav-tab__text ${activeTab === 'Menu' ? 'active' : ''}`}>
                    Menu
                  </span>
                </div>
                <div className="nav-tab" onClick={() => scrollToSection('Promotions')}>
                  <span className={`nav-tab__text ${activeTab === 'Promotions' ? 'active' : ''}`}>
                    Promotions
                  </span>
                </div>
                <div className="nav-tab" onClick={() => scrollToSection('Map & Directions')}>
                  <span className={`nav-tab__text ${activeTab === 'Map & Directions' ? 'active' : ''}`}>
                    Map & Directions
                  </span>
                </div>
                <div className="nav-tab" onClick={() => scrollToSection('Reviews')}>
                  <span className={`nav-tab__text ${activeTab === 'Reviews' ? 'active' : ''}`}>
                    Reviews
                  </span>
                </div>
                <div className="nav-tab" onClick={() => scrollToSection('Social')}>
                  <span className={`nav-tab__text ${activeTab === 'Social' ? 'active' : ''}`}>
                    Social
                  </span>
                </div>
              </div>
              
             
            </div>

            {/* Divider */}


          </div>

          {/* Overview Section */}
          <section id="overview-section" className="overview-section">
            <h2 className="section-title">Overview</h2>
            <div className="overview-content">
              <p>
                Welcome to {currentVenue.name}, where luxury meets comfort in the heart of {currentVenue.location}.
                Our venue offers a unique atmosphere and exceptional service, creating the
                perfect backdrop for an unforgettable evening.
              </p>
              <p>
                Experience the finest amenities, expertly crafted services, and live entertainment
                in our sophisticated atmosphere. Whether you&apos;re looking for a romantic date night or a
                fun evening with friends, {currentVenue.name} provides the ideal setting.
              </p>
              {/* <button className="read-more">Read More</button> */}
            </div>
          </section>
          <div className="section-divider"></div>

          <section id="menu-section" className="menu-section">
            <h2 className="section-title">Menu</h2>
            <p className="menu-description">
              Discover our carefully curated menu of premium shisha flavors, signature cocktails, and gourmet bites — crafted to elevate your lounge experience.
            </p>

            <div className="menu-cards">
              {/* Desktop: Show 4 cards with plus on 4th */}
              <div className="menu-cards-desktop">
                {menuImages.slice(0, 4).map((image, index) => (
                  <div key={`desktop-${index}`} className="menu-card menu-card--image">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      className="menu-card__dummy-image"
                      width={200}
                      height={150}
                    />
                    {/* Show plus icon and count on the 4th card for desktop */}
                    {index === 3 && menuImages.length > 4 && (
                      <div className="menu-card__count-overlay">
                        <div className="menu-card__plus-icon">+</div>
                        <div className="menu-card__count-text">{menuImages.length - 4}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Mobile: Show 3 cards with plus on 3rd */}
              <div className="menu-cards-mobile">
                {menuImages.slice(0, 3).map((image, index) => (
                  <div key={`mobile-${index}`} className="menu-card menu-card--image">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      className="menu-card__dummy-image"
                      width={200}
                      height={150}
                    />
                    {/* Show plus icon and count on the 3rd card for mobile */}
                    {index === 2 && menuImages.length > 3 && (
                      <div className="menu-card__count-overlay">
                        <div className="menu-card__plus-icon">+</div>
                        <div className="menu-card__count-text">{menuImages.length - 3}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="section-divider"></div>

          {/* Promotions Section */}
          <section id="promotions-section" className="promotions-section">
            <h2 className="section-title">Promotions</h2>
            <p className="promotions-description">
              From happy hour hookah to weekend group discounts, <strong>Hürrem Sultan Shisha & Cigar Bars</strong> knows how to keep the vibe high and the price low. Explore our current promotions and make your night even smoother.
            </p>

            <div className="promotion-card">
              <div className="promotion-card__image">
                <Image
                  src="/Assets/sliderImage/SliderImage.jpg"
                  alt="Happy Hour Drink"
                  className="promotion-card__img"
                  width={400}
                  height={300}
                  priority
                />
              </div>
              <div className="promotion-card__content">
                <h3 className="promotion-card__title">Happy Hour</h3>
                <p className="promotion-card__details">Mon-Fri from 12 PM to 4 PM</p>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="section-divider"></div>

          {/* Map & Directions Section */}
          <section id="map-directions-section">
            <MapAndDirections address={currentVenue.address} />
          </section>
        

          {/* Instagram Profile Section */}


          <div className="section-divider"></div>
          <section id="reviews-section">
            <GoogleReviews />
          </section>

          <div className="section-divider"></div>
          <section id="social-section" className="instagram-section">

            <InstagramProfile />
          </section>
          {/* <div className="section-divider"></div> */}
          {/* <div className="video-card-container"> 
                                           <VideoCard 
                        title="See the vibe.Feel the night."
                        description="follow the flavor,the beats,and vibe on TikTok and Instagram."
                        videos={videoData}
                      /> 

                     </div> */}
          
        </div>

        {/* Sidebar */}
        <div className="event-sidebar">
          <div className="reservation-card">
            <h2 className="reservation-card__title">Reserve Your Table</h2>
            <p className="reservation-card__price">$$ - Average ${currentVenue.averagePrice} per person</p>

            <div className="reservation-card__category">
              <span className="category-icon">🍷</span>
              <span>Food & Drinks</span>
            </div>

            <div className="reservation-card__hours">
              <span className="hours-icon">🕐</span>
              <span className="hours-status open">Opens</span>
              <span className="hours-time">2:00 AM</span>
            </div>

            <div className="reservation-card__actions">
              <button className="btn btn--primary">Make a Reservation</button>
              {/* <button className="btn btn--secondary">
                 <Phone sx={{ fontSize: 16 }} />
                 Call us at 466-5247
               </button> */}
            </div>

            <div className="reservation-card__contact-buttons">
              <button className="contact-btn contact-btn--phone">
                <PermPhoneMsgOutlined className="contact-btn__icon" />
                <span className="contact-btn__text">Call us</span>
              </button>
              <button className="contact-btn contact-btn--website">
                <LanguageSharp className="contact-btn__icon" />
                <span className="contact-btn__text">Website</span>
              </button>
            </div>
          </div>

          <div className="owner-card">
            <div className="owner-card__header">
              <span className="owner-card__title">Claim & manage</span>
              <span className="owner-card__badge">Claim this listing</span>
            </div>
            {/* <p className="owner-card__description">
               Take control of your profile - add events, manage promotions, and keep your info fresh.
             </p>
             <button className="owner-card__claim">Claim This Listing</button> */}
          </div>
        </div>
      </div>
      <div className='similar-lounges-container'>
        <SimilarLounges />
      </div>
    </div>
  );
}
