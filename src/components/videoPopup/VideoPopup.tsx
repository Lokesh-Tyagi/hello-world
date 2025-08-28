'use client';

import React, { useEffect, useRef } from 'react';
import './VideoPopup.scss';

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoData: {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    thumbnail: string;
  } | null;
}

const VideoPopup: React.FC<VideoPopupProps> = ({ isOpen, onClose, videoData }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
      
      // Auto-play video when popup opens
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Handle autoplay restrictions
  
        });
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
      
      // Pause video when popup closes
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoData) {
    return null;
  }

  return (
    <div className="video-popup-overlay">
      <div className="video-popup" ref={modalRef}>
        <div className="video-popup__header">
          <div className="video-popup__title-section">
            <h2 className="video-popup__title">{videoData.title}</h2>
            <p className="video-popup__description">{videoData.description}</p>
          </div>
          <button 
            className="video-popup__close-button"
            onClick={onClose}
            aria-label="Close video popup"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="video-popup__content">
          <div className="video-popup__video-container">
            {videoData.videoUrl ? (
              videoData.videoUrl.includes('youtube.com') ? (
                <iframe
                  className="video-popup__video"
                  src={videoData.videoUrl}
                  title={videoData.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  ref={videoRef}
                  className="video-popup__video"
                  controls
                  poster={videoData.thumbnail}
                  preload="metadata"
                >
                  <source src={videoData.videoUrl} type="video/mp4" />
                  <source src={videoData.videoUrl} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              )
            ) : (
              <div className="video-popup__no-video">
                <p>Video URL not available</p>
              </div>
            )}
          </div>
        </div>
        

      </div>
    </div>
  );
};

export default VideoPopup; 