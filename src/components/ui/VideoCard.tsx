'use client';

import React, { useState } from 'react';
import VideoPopup from '../videoPopup/VideoPopup';
import { VideoData } from '@/types';
import './VideoCard.scss';

interface VideoCardProps {
  title?: string;
  description?: string;
  videos: VideoData[];
  className?: string;
  showPlayIcon?: boolean;
  onVideoClick?: (video: VideoData) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  title = "Real Lounges. Real People. Real Nights.",
  description = "From rooftop lounges to late-night events — follow us on Instagram & TikTok for real scenes, real smoke, and real energy.",
  videos,
  className = "",
  showPlayIcon = true,
  onVideoClick
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);

  const handleVideoClick = (video: VideoData) => {
    if (onVideoClick) {
      onVideoClick(video);
    } else {
      setSelectedVideo(video);
      setIsPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedVideo(null);
  };

  return (
    <section className={`video-card ${className}`}>
      <div className="video-card__container">
        {(title || description) && (
          <div className="video-card__header">
            {title && <h3 className="video-card__title">{title}</h3>}
            {description && (
              <span className="video-card__description">
                {description}
              </span>
            )}
          </div>
        )}
        
        <div className="video-card__videos">
          {videos.map((video) => (
            <div key={video.id} className="video-card__video">
              <div 
                className="video-card__thumbnail"
                onClick={() => handleVideoClick(video)}
                style={{ cursor: 'pointer' }}
              >
                {video.image ? (
                  <img 
                    src={video.image} 
                    alt={video.caption}
                    className="video-card__image"
                  />
                ) : (
                  <div className="video-card__image-placeholder">
                    <span>Image not available</span>
                  </div>
                )}
                <div className="video-card__caption-overlay">
                  <p className="video-card__caption">{video.caption}</p>
                </div>
                {showPlayIcon && video.playIcon && (
                  <div className="video-card__play-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {!onVideoClick && (
          <VideoPopup
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            videoData={selectedVideo}
          />
        )}
      </div>
    </section>
  );
};

 