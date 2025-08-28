'use client';

import React from 'react';
import { Button } from '@mui/material';
import './GenericCard.scss';

// Rating Display Component
const RatingDisplay = ({ rating }: { rating: string | number }) => {
  const numRating = typeof rating === 'string' ? parseFloat(rating) : rating;
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
      <span className="rating-number">{numRating.toFixed(1)}</span>
      <span className="rating-stars"> {stars.join('')}</span>
      <span className="rating-fraction"> ({numRating.toFixed(1)}/5)</span>
    </span>
  );
};

export interface CardImage {
  src: string;
  alt?: string;
  overlay?: React.ReactNode;
  badge?: {
    text: string;
    color: string;
  };
}

export interface CardDetail {
  icon?: React.ReactNode;
  text: string;
}

export interface CardTag {
  text: string;
  color?: string;
}

export interface GenericCardProps {
  id?: string;
  className?: string;
  image?: CardImage;
  title?: string;
  subtitle?: string;
  description?: string;
  details?: CardDetail[];
  tags?: CardTag[];
  rating?: {
    value: string | number;
    icon?: React.ReactNode;
  };
  cta?: {
    text: string;
    onClick?: () => void;
    variant?: 'text' | 'outlined' | 'contained';
    href?: string;
  };
  link?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: React.ReactNode;
  variant?: 'default' | 'venue' | 'article' | 'event' | 'video';
  showPlayIcon?: boolean;
  comingSoon?: boolean;
}

const GenericCard: React.FC<GenericCardProps> = ({
  className = '',
  image,
  title,
  subtitle,
  description,
  details,
  tags,
  rating,
  cta,
  link,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
  variant = 'default',
  showPlayIcon = false,
  comingSoon = false,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleCTAClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cta?.onClick) {
      cta.onClick();
    }
  };

  const cardContent = (
    <div
      className={`generic-card generic-card--${variant} ${className}`}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {comingSoon && (
        <div className="generic-card__coming-soon">
          Coming Soon
        </div>
      )}

      {image && (
        <div className="generic-card__image-container">
          <div 
            className="generic-card__image"
            style={{ backgroundImage: `url(${image.src})` }}
          />
          {image.overlay && (
            <div className="generic-card__image-overlay">
              {image.overlay}
            </div>
          )}
          {image.badge && (
            <div 
              className="generic-card__badge"
              style={{ backgroundColor: image.badge.color }}
            >
              {image.badge.text}
            </div>
          )}
          {showPlayIcon && (
            <div className="generic-card__play-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="white"/>
              </svg>
            </div>
          )}
        </div>
      )}

      <div className="generic-card__content">
        {(title || subtitle || rating) && (
          <div className="generic-card__header">
            {title && <h3 className="generic-card__title">{title}</h3>}
            {subtitle && <p className="generic-card__subtitle">{subtitle}</p>}
            {rating && (
              <div className="generic-card__rating">
                <RatingDisplay rating={rating.value} />
              </div>
            )}
          </div>
        )}

        {description && (
          <p className="generic-card__description">{description}</p>
        )}

        {details && details.length > 0 && (
          <div className="generic-card__details">
            {details.map((detail, index) => (
              <div key={index} className="generic-card__detail-item">
                {detail.icon}
                <span>{detail.text}</span>
              </div>
            ))}
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className="generic-card__tags">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="generic-card__tag"
                style={tag.color ? { backgroundColor: tag.color } : undefined}
              >
                {tag.text}
              </span>
            ))}
          </div>
        )}

        {cta && (
          <Button
            variant={cta.variant || 'outlined'}
            className="generic-card__cta-button"
            onClick={handleCTAClick}
            href={cta.href}
            sx={{
              borderColor: '#d1d5db',
              color: '#374151',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#9ca3af',
                backgroundColor: '#f9fafb',
              },
            }}
          >
            {cta.text}
          </Button>
        )}

        {children}
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} className="generic-card__link">
        {cardContent}
      </a>
    );
  }

  return cardContent;
};

export default GenericCard; 