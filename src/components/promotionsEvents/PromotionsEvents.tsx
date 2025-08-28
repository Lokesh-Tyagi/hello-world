'use client';

import React from 'react';
import './PromotionsEvents.scss';

interface PromotionCard {
  id: number;
  title: string;
  description: string;
  image: string;
}

export default function PromotionsEvents() {
  const promotions: PromotionCard[] = [
    {
      id: 1,
      title: 'Happy Hour Tuesdays',
      description: 'Complimentary cocktails with every shisha',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=80&h=80&fit=crop&crop=center'
    },
    {
      id: 2,
      title: 'Ladies Night Friday',
      description: 'Free cocktails with every shisha for ladies. Starts 8PM.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop&crop=center'
    },
    {
      id: 3,
      title: 'Hookah + Cocktail Combo',
      description: 'Signature flavor + cocktail for just $15. Available till 10PM daily.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=80&fit=crop&crop=center'
    },
    {
      id: 4,
      title: 'Group Booking Discount',
      description: 'Book for 4+ and get 20% off your total bill. Perfect for squad nights.',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=80&h=80&fit=crop&crop=center'
    }
  ];

  return (
    <div className="promotions-events">
      <div className="promotions-events__container">
        <h2 className="promotions-events__title">Promotions & Events</h2>
        
        <p className="promotions-events__description">
          From happy hour hookah to weekend group discounts, Shisha Sky Lounge knows how to keep the vibe high and the price low. Explore our current promotions and make your night even smoother.
        </p>

        <div className="promotions-events__grid">
          {promotions.map((promotion) => (
            <div key={promotion.id} className="promotion-card">
              <div className="promotion-card__image">
                {promotion.image ? (
                  <img 
                    src={promotion.image} 
                    alt={promotion.title}
                    className="promotion-card__img"
                  />
                ) : (
                  <div className="promotion-card__image-placeholder">
                    <span>Image not available</span>
                  </div>
                )}
              </div>
              <div className="promotion-card__content">
                <h3 className="promotion-card__title">{promotion.title}</h3>
                <p className="promotion-card__description">{promotion.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 