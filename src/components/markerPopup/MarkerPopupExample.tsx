'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import MarkerPopup from './MarkerPopup';
import { Business } from '../../types/Business';

// Example business data
const exampleBusiness: Business = {
  _id: '1',
  name: 'Shisha Sky Lounge',
  full_address: '123 Main Street, Berlin, Germany',
  category: 'Hookah Bar',
  type: 'Restaurant',
  business_status: 'OPERATIONAL',
  rating: 4.5,
  reviews: 128,
  range: '$$',
  photo: 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Shisha+Lounge',
  working_hours: {
    monday: '10:00 AM - 2:00 AM',
    tuesday: '10:00 AM - 2:00 AM',
    wednesday: '10:00 AM - 2:00 AM',
    thursday: '10:00 AM - 2:00 AM',
    friday: '10:00 AM - 3:00 AM',
    saturday: '10:00 AM - 3:00 AM',
    sunday: '12:00 PM - 12:00 AM'
  },
  about: 'Experience the finest shisha and hookah in Berlin. Our lounge offers a relaxing atmosphere with premium tobacco flavors and excellent service. Perfect for groups and special occasions.',
  phone: '+49 30 12345678',
  website: 'https://example.com',
  latitude: 52.5200,
  longitude: 13.4050,
  country: 'Germany',
  cmsProfile: {}
};

const MarkerPopupExample: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Handle body scroll when popup is open
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPopup]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Marker Popup Component Example</h2>
      <p>Click the button below to see the marker popup in action:</p>
      
      <Button 
        variant="contained" 
        onClick={() => setShowPopup(true)}
        style={{ marginBottom: '20px' }}
      >
        Show Business Popup
      </Button>

      {showPopup && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowPopup(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <MarkerPopup 
              business={exampleBusiness} 
              onClose={() => setShowPopup(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkerPopupExample; 