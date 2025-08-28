'use client';

import React from 'react';
import { Button } from '@mui/material';
import './Card.scss';

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

export interface CardProps {
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

export const Card: React.FC<CardProps> = ({
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
      className={`card card--${variant} ${className}`}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {comingSoon && (
        <div className="card__coming-soon">
          Coming Soon
        </div>
      )}

      {image && (
        <div className="card__image-container">
          <div 
            className="card__image"
            style={{ backgroundImage: `url(${image.src})` }}
          />
          {image.overlay && (
            <div className="card__image-overlay">
              {image.overlay}
            </div>
          )}
          {image.badge && (
            <div 
              className="card__badge"
              style={{ backgroundColor: image.badge.color }}
            >
              {image.badge.text}
            </div>
          )}
          {showPlayIcon && (
            <div className="card__play-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="white"/>
              </svg>
            </div>
          )}
        </div>
      )}

      <div className="card__content">
        {(title || subtitle || rating) && (
          <div className="card__header">
            {title && <h3 className="card__title">{title}</h3>}
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
            {rating && (
              <div className="card__rating">
                {rating.icon}
                {rating.value}
              </div>
            )}
          </div>
        )}

        {description && (
          <p className="card__description">{description}</p>
        )}

        {details && details.length > 0 && (
          <div className="card__details">
            {details.map((detail, index) => (
              <div key={index} className="card__detail-item">
                {detail.icon}
                <span>{detail.text}</span>
              </div>
            ))}
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className="card__tags">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="card__tag"
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
            className="card__cta-button"
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
      <a href={link} className="card__link">
        {cardContent}
      </a>
    );
  }

  return cardContent;
};

