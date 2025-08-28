'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Typography, Paper, Chip, Box, Divider, Button, TextField, IconButton, Tabs, Tab } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import RemoveIcon from '@mui/icons-material/Remove';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { Business } from '../../types/Business';
import { updateBusiness } from '../../services/businessService';

import './MarkerPopup.scss';

// Rating Display Component
const RatingDisplay = ({ rating, reviewCount }: { rating: number; reviewCount?: number }) => {
  if (!rating || rating < 0 || rating > 5) {
    return <span>N/A</span>;
  }

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
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
    
      <span className="rating-fraction">{rating.toFixed(1)}</span>
      <span className="rating-stars">{stars.join('')}</span>
      {reviewCount !== undefined && reviewCount > 0 && (
        <span className="review-count"> ({reviewCount})</span>
      )}
    </span>
  );
};

interface MarkerPopupProps {
  business: Business;
  onClose?: () => void;
}

  const MarkerPopup: React.FC<MarkerPopupProps> = ({ business, onClose }) => {
    const router = useRouter();
    
    // Function to convert Google Photos URL to displayable format
    const getDisplayablePhotoUrl = (photoUrl: string): string => {
      if (!photoUrl) return '';
      
      // Clean the URL by removing any extra characters and quotes
      let cleanUrl = photoUrl.toString().trim();
      
      // Remove any surrounding quotes or brackets
      cleanUrl = cleanUrl.replace(/^['"\[\]]+|['"\[\]]+$/g, '');
      
      // If it's a Google Photos URL, convert it to displayable format
      if (cleanUrl.includes('googleusercontent.com')) {
        // Remove any existing size parameters and add standard size
        const baseUrl = cleanUrl.split('=')[0];
        return `${baseUrl}=w800-h600-c`;
      }
      
      // If it's a Google Street View URL, ensure it's displayable
      if (cleanUrl.includes('maps.googleapis.com') || cleanUrl.includes('streetviewpixels')) {
        // Ensure the URL has proper parameters for display
        if (!cleanUrl.includes('size=') && !cleanUrl.includes('=')) {
          return `${cleanUrl}?size=800x600`;
        }
      }
      
      // For other URLs, ensure they have proper protocol
      if (cleanUrl.startsWith('//')) {
        return `https://${cleanUrl}`;
      }
      
      // If URL doesn't start with http/https, assume it's relative and add base
      if (!cleanUrl.startsWith('http://') && !cleanUrl.includes('https://')) {
        return `https://${cleanUrl}`;
      }
      
      return cleanUrl;
    };

    const [isClient, setIsClient] = useState(false);
  const [isOwnershipMode, setIsOwnershipMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingWorkingHours, setEditingWorkingHours] = useState<Record<string, string>>({});
  const [editingAboutData, setEditingAboutData] = useState<Record<string, Record<string, boolean>>>({});
  const [editingBusinessInfo, setEditingBusinessInfo] = useState({
    name: '',
    full_address: '',
    phone: '',
    website: ''
  });
  const [activeTab, setActiveTab] = useState(0);
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    full_address?: string;
  }>({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Dummy analytics data for the business
  const businessAnalytics = {
    overview: {
      totalVisits: Math.floor(Math.random() * 1000) + 500,
      totalReviews: business.reviews || Math.floor(Math.random() * 100) + 20,
      avgRating: business.rating || (Math.random() * 2 + 3).toFixed(1),
      monthlyGrowth: (Math.random() * 20 + 5).toFixed(1)
    },
    monthlyData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      visits: Array.from({ length: 6 }, () => Math.floor(Math.random() * 200) + 100),
      reviews: Array.from({ length: 6 }, () => Math.floor(Math.random() * 30) + 10),
      ratings: Array.from({ length: 6 }, () => (Math.random() * 2 + 3).toFixed(1))
    },
    topServices: [
      { name: 'Classic Shisha', popularity: 85, color: '#FF6B6B' },
      { name: 'Premium Tobacco', popularity: 72, color: '#4ECDC4' },
      { name: 'Hookah Setup', popularity: 68, color: '#45B7D1' },
      { name: 'Flavored Shisha', popularity: 65, color: '#96CEB4' }
    ]
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset image error when business changes
  useEffect(() => {
    setImageError(false);
  }, [business._id]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isClient) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      
      // Get the current body styles
      const originalStyle = window.getComputedStyle(document.body);
      const originalPosition = originalStyle.position;
      const originalTop = originalStyle.top;
      const originalWidth = originalStyle.width;
      const originalOverflow = originalStyle.overflow;
      
      // Disable body scroll when popup is mounted
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // For iOS Safari, also prevent touch scrolling
      document.body.style.touchAction = 'none';
      
      // Re-enable body scroll when popup is unmounted
      return () => {
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = '';
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isClient]);

  const formatWorkingHours = (workingHours: Record<string, string> | undefined) => {
    if (!workingHours) return 'Hours not available';
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days.map(day => {
      const hours = workingHours[day.toLowerCase()];
      return hours ? `${day}: ${hours}` : `${day}: Closed`;
    }).join('\n');
  };

  const getBusinessStatusColor = (status: string | undefined): 'success' | 'warning' | 'error' | 'default' => {
    switch (status?.toLowerCase()) {
      case 'operational':
        return 'success';
      case 'closed_temporarily':
        return 'warning';
      case 'closed_permanently':
        return 'error';
      default:
        return 'default';
    }
  };

  const getBusinessStatusLabel = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case 'operational':
        return 'Open';
      case 'closed_temporarily':
        return 'Closed Temporarily';
      case 'closed_permanently':
        return 'Closed Permanently';
      default:
        return 'Status Unknown';
    }
  };

  const parseAboutData = (aboutText: string | undefined) => {
    if (!aboutText) return null;
    
    try {
      return JSON.parse(aboutText);
    } catch (error) {
      return null;
    }
  };

  const getAboutSections = (aboutData: Record<string, Record<string, boolean>> | null) => {
    if (!aboutData) return [];
    
    return Object.entries(aboutData).map(([sectionName, options]) => ({
      name: sectionName,
      options: Object.entries(options).map(([optionName, available]) => ({
        name: optionName,
        available
      }))
    }));
  };

  const handleTakeOwnership = () => {
    setIsOwnershipMode(true);
    // Clear any previous validation errors and success state
    setValidationErrors({});
    setSaveSuccess(false);
    // Reset image error state
    setImageError(false);
    // Initialize editing hours with current working hours
    setEditingWorkingHours(business.working_hours || {});
    // Initialize editing about data
    const currentAboutData = parseAboutData(business.about) || {};
    setEditingAboutData(currentAboutData);
    // Initialize editing business info
    setEditingBusinessInfo({
      name: business.name || '',
      full_address: business.full_address || '',
      phone: business.phone || '',
      website: business.website || ''
    });
  };

  // Validation function
  const validateBusinessInfo = (): boolean => {
    const errors: { name?: string; full_address?: string } = {};
    
    // Validate business name
    if (!editingBusinessInfo.name || editingBusinessInfo.name.trim().length === 0) {
      errors.name = 'Business name is required';
    } else if (editingBusinessInfo.name.trim().length < 2) {
      errors.name = 'Business name must be at least 2 characters long';
    }
    
    // Validate full address
    if (!editingBusinessInfo.full_address || editingBusinessInfo.full_address.trim().length === 0) {
      errors.full_address = 'Business address is required';
    } else if (editingBusinessInfo.full_address.trim().length < 5) {
      errors.full_address = 'Business address must be at least 5 characters long';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveAll = async () => {
    // Validate before proceeding
    if (!validateBusinessInfo()) {
      console.log('❌ Validation failed:', validationErrors);
      return;
    }
    
    setIsUpdating(true);
    try {
      // Prepare the payload for API update
      const updatePayload = {
        name: editingBusinessInfo.name.trim(),
        full_address: editingBusinessInfo.full_address.trim(),
        phone: editingBusinessInfo.phone,
        website: editingBusinessInfo.website,
        working_hours: editingWorkingHours,
        about: JSON.stringify(editingAboutData)
      };

      // Send update to API using the service
      const updatedBusiness = await updateBusiness(business._id, updatePayload);
      
      // Update business info locally with the response from API
      business.name = updatedBusiness.name || editingBusinessInfo.name;
      business.full_address = updatedBusiness.full_address || editingBusinessInfo.full_address;
      business.phone = updatedBusiness.phone || editingBusinessInfo.phone;
      business.website = updatedBusiness.website || editingBusinessInfo.website;
      business.working_hours = updatedBusiness.working_hours || editingWorkingHours;
      business.about = updatedBusiness.about || JSON.stringify(editingAboutData);
      
      setIsOwnershipMode(false);
      setSaveSuccess(true);
      // Clear success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
      console.log('✅ Business data updated successfully via API:', updatedBusiness);
    } catch (error) {
      console.error('Failed to update business information via API:', error);
      // Fallback to local update if API fails
      try {
        business.name = editingBusinessInfo.name;
        business.full_address = editingBusinessInfo.full_address;
        business.phone = editingBusinessInfo.phone;
        business.website = editingBusinessInfo.website;
        business.working_hours = { ...editingWorkingHours };
        business.about = JSON.stringify(editingAboutData);
        console.log('⚠️ Fallback to local update due to API failure');
      } catch (localError) {
        console.error('Local update also failed:', localError);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelOwnership = () => {
    setIsOwnershipMode(false);
    setEditingWorkingHours({});
    setEditingAboutData({});
    setEditingBusinessInfo({
      name: '',
      full_address: '',
      phone: '',
      website: ''
    });
    // Clear validation errors and success state when canceling
    setValidationErrors({});
    setSaveSuccess(false);
  };

  const handleDayChange = (day: string, value: string) => {
    setEditingWorkingHours(prev => ({ ...prev, [day]: value }));
  };

  // Clear validation errors when user starts typing
  const handleFieldChange = (field: 'name' | 'full_address' | 'phone' | 'website', value: string) => {
    setEditingBusinessInfo(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[field as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };



  const handleAddServiceSection = () => {
    const sectionName = prompt('Enter new service section name:');
    if (sectionName && sectionName.trim()) {
      setEditingAboutData(prev => ({
        ...prev,
        [sectionName.trim()]: {}
      }));
    }
  };

  const handleAddServiceOption = (sectionName: string) => {
    const optionName = prompt('Enter new service option name:');
    if (optionName && optionName.trim()) {
      setEditingAboutData(prev => ({
        ...prev,
        [sectionName]: {
          ...prev[sectionName],
          [optionName.trim()]: true
        }
      }));
    }
  };

  const handleToggleServiceOption = (sectionName: string, optionName: string) => {
    setEditingAboutData(prev => ({
      ...prev,
      [sectionName]: {
        ...prev[sectionName],
        [optionName]: !prev[sectionName]?.[optionName]
      }
    }));
  };

  const handleRemoveServiceSection = (sectionName: string) => {
    if (confirm(`Are you sure you want to remove the "${sectionName}" section?`)) {
      setEditingAboutData(prev => {
        const newData = { ...prev };
        delete newData[sectionName];
        return newData;
      });
    }
  };

  const handleRemoveServiceOption = (sectionName: string, optionName: string) => {
    if (confirm(`Are you sure you want to remove "${optionName}" from "${sectionName}"?`)) {
      setEditingAboutData(prev => {
        const newData = { ...prev };
        if (newData[sectionName]) {
          delete newData[sectionName][optionName];
        }
        return newData;
      });
    }
  };

  const handleViewDetails = () => {
    // Open venue overview page with business ID in a new tab
    window.open(`/venue-overview/${business._id}`, '_blank');
  };

  // Simple Chart Components for Analytics
  const SimpleLineChart = ({ data, labels, color, height = 120 }: { data: number[], labels: string[], color: string, height?: number }) => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value - minValue) / range) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <Box sx={{ width: '100%', height }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          <path
            d={`M 0,100 L ${points} L 100,100 Z`}
            fill={`url(#gradient-${color.replace('#', '')})`}
          />
          
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((value - minValue) / range) * 100;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill={color}
              />
            );
          })}
        </svg>
      </Box>
    );
  };

  const SimpleBarChart = ({ data, labels, color, height = 120 }: { data: number[], labels: string[], color: string, height?: number }) => {
    const maxValue = Math.max(...data);
    
    return (
      <Box sx={{ width: '100%', height }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {data.map((value, index) => {
            const barWidth = 100 / data.length;
            const barHeight = (value / maxValue) * 80;
            const x = index * barWidth + barWidth * 0.1;
            const y = 100 - barHeight;
            
            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth * 0.8}
                  height={barHeight}
                  fill={color}
                  opacity="0.8"
                />
              </g>
            );
          })}
        </svg>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          {labels.map((label, index) => (
            <Typography key={index} variant="caption" sx={{ fontSize: '0.6rem' }}>
              {label}
            </Typography>
          ))}
        </Box>
      </Box>
    );
  };

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <Paper className="marker-popup" elevation={3}>
        <div className="marker-popup__photo-container">
          <div className="marker-popup__photo-placeholder">
            Loading...
          </div>
        </div>
        <div className="marker-popup__content">
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading...
          </div>
        </div>
      </Paper>
    );
  }

  return (
    <>
      <Paper className="marker-popup" elevation={3}>
             {/* Business Photo */}
       <div className="marker-popup__photo-container">
         {business.photo && Array.isArray(business.photo) && business.photo.length > 0 && business.photo[0] && !imageError ? (
           <Image
             src={getDisplayablePhotoUrl(business.photo[0])}
             alt={business.name || 'Business photo'}
             width={300}
             height={500}
             className="marker-popup__photo"
             onError={() => setImageError(true)}
             onLoad={() => setImageError(false)}
           />
         ) : business.photo && typeof business.photo === 'string' && business.photo.trim() !== '' && !imageError ? (
           <Image
             src={getDisplayablePhotoUrl(business.photo)}
             alt={business.name || 'Business photo'}
             width={300}
             height={500}
             className="marker-popup__photo"
             onError={() => setImageError(true)}
             onLoad={() => setImageError(false)}
           />
         ) : (
           <div className="marker-popup__photo-placeholder">
             <span style={{ fontSize: '2rem', opacity: 0.5 }}>📷</span>
             <span style={{ marginTop: '8px', fontSize: '0.9rem', opacity: 0.7 }}>Image not available</span>
           </div>
         )}
         <div className="marker-popup__status-overlay">
           <Chip
             label={getBusinessStatusLabel(business.business_status)}
             color={getBusinessStatusColor(business.business_status)}
             size="medium"
             className="marker-popup__status-chip"
           />
         </div>
         <button className="marker-popup__close-btn" onClick={onClose}>
           ×
         </button>
       </div>

      <div className="marker-popup__content">
        {/* Business Name */}
        {!isOwnershipMode ? (
          <h3 className="marker-popup__name">
            {business.name}
          </h3>
        ) : (
          <TextField
            fullWidth
            label="Business Name"
            value={editingBusinessInfo.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            className="marker-popup__edit-name marker-popup__required-field"
            size="small"
            margin="dense"
            error={!!validationErrors.name}
            helperText={validationErrors.name}
          />
        )}

        {/* Address */}
        {!isOwnershipMode ? (
          <Box className="marker-popup__address" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              <Typography variant="body2" component="span">
                {business.full_address}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              size="small"
              onClick={handleViewDetails}
              sx={{
                borderColor: '#000',
                color: '#000',
                '&:hover': {
                  borderColor: '#333',
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              View Details
            </Button>
          </Box>
        ) : (
          <TextField
            fullWidth
            label="Address"
            value={editingBusinessInfo.full_address}
            onChange={(e) => handleFieldChange('full_address', e.target.value)}
            className="marker-popup__edit-address marker-popup__required-field"
            size="small"
            margin="dense"
            error={!!validationErrors.full_address}
            helperText={validationErrors.full_address}
            InputProps={{
              startAdornment: <LocationOnIcon sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
            }}
          />
        )}

        {/* Contact Information */}
        {(business.phone || business.website) && (
          <Box className="marker-popup__contact-section">
            
            {!isOwnershipMode ? (
              <Box sx={{ display: 'flex', gap: 0}}>
                {business.phone && (
                  <Box className="marker-popup__contact-item" sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                    <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2" component="span">
                      {business.phone}
                    </Typography>
                  </Box>
                )}
                {business.website && (
                  <Typography variant="body2" className="marker-popup__contact-item" sx={{ flex: 1 }}>
                    🌐 <a href={business.website} target="_blank" rel="noopener noreferrer" className="marker-popup__website">
                      {business.website}
                    </a>
                  </Typography>
                )}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Phone Number"
                  value={editingBusinessInfo.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  className="marker-popup__edit-phone"
                  size="small"
                  margin="dense"
                  sx={{ flex: 1 }}
                  InputProps={{
                    startAdornment: <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                  }}
                />
                <TextField
                  label="Website"
                  value={editingBusinessInfo.website}
                  onChange={(e) => handleFieldChange('website', e.target.value)}
                  className="marker-popup__edit-website"
                  size="small"
                  margin="dense"
                  placeholder="https://example.com"
                  sx={{ flex: 1 }}
                  InputProps={{
                    startAdornment: <span style={{ marginRight: '8px' }}>🌐</span>
                  }}
                />
              </Box>
            )}
          </Box>
        )}

        {/* Rating and Price Range */}
        <Box className="marker-popup__rating-section">
          <div className="marker-popup__rating">
            {business.rating ? (
              <RatingDisplay rating={business.rating} reviewCount={business.reviews} />
            ) : (
              <Typography variant="body2" className="marker-popup__no-rating">
                No rating
              </Typography>
            )}
          </div>
          {business.range && (
            <Typography variant="body2" className="marker-popup__price-range">
              💰 {business.range}
            </Typography>
          )}
        </Box>

                          <Divider className="marker-popup__divider" />

      

                 {/* Working Hours */}
         <Box className="marker-popup__hours-section">
           <Box className="marker-popup__hours-header">
             <h3 className="marker-popup__section-title">
               Working Hours
             </h3>

           </Box>
           
                                     {!isOwnershipMode ? (
               // Display mode
               business.working_hours && Object.keys(business.working_hours).length > 0 ? (
                 <div className="marker-popup__hours">
                   {Object.entries(business.working_hours).map(([day, hours]) => (
                     <div key={day} className="marker-popup__hour-row">
                       <Typography variant="body2" className="marker-popup__day">
                         {day.charAt(0).toUpperCase() + day.slice(1)}:
                       </Typography>
                       <Typography variant="body2" className="marker-popup__time">
                         {hours || 'Closed'}
                       </Typography>
                     </div>
                   ))}
                 </div>
               ) : (
                 <Typography variant="body2" className="marker-popup__no-hours">
                   No working hours set
                 </Typography>
               )
             ) : (
               // Edit mode
               <div className="marker-popup__hours-edit">
                 {Object.entries(business.working_hours || {}).map(([day, hours]) => (
                   <div key={day} className="marker-popup__hour-edit-row">
                     <Typography variant="body2" className="marker-popup__day">
                       {day.charAt(0).toUpperCase() + day.slice(1)}:
                     </Typography>

                     
                     <TextField
                       size="small"
                       placeholder="9:00 AM - 5:00 PM"
                       value={editingWorkingHours[day] !== undefined ? editingWorkingHours[day] : (hours || '')}
                       onChange={(e) => handleDayChange(day, e.target.value)}
                       className="marker-popup__time-input"
                       
                     />
                   </div>
                 ))}
               </div>
             )}
         </Box>
   <Divider className="marker-popup__divider" />
         {/* About Section */}
         <Box className="marker-popup__about-section">
           <Box className="marker-popup__about-header">
             <h3 className="marker-popup__section-title">
               About
             </h3>
             {isOwnershipMode && (
               <Button
                 size="small"
                 variant="text"
                 onClick={handleAddServiceSection}
                 className="marker-popup__add-section-btn"
                 startIcon={<AddIcon />}
               >
                 Add New Section
               </Button>
             )}
           </Box>
           
           {!isOwnershipMode ? (
             // Display mode
             business.about && (() => {
               const aboutData = parseAboutData(business.about);
               const aboutSections = getAboutSections(aboutData);
               
               return aboutSections.length > 0 ? (
                 <>
                   {aboutSections.map((section) => (
                     <Box key={section.name} className="marker-popup__services-section">
                       <h2 className="marker-popup__section-title">{section.name}</h2>
                       <div className="marker-popup__services">
                         {section.options.map((option) => (
                           <Chip
                             key={option.name}
                             label={option.name}
                             variant={option.available ? "filled" : "outlined"}
                             size="small"
                             className={`marker-popup__service-chip ${option.available ? 'marker-popup__service-chip--available' : 'marker-popup__service-chip--unavailable'}`}
                           />
                         ))}
                       </div>
                     </Box>
                   ))}
                 </>
               ) : (
                 <Typography variant="body2" className="marker-popup__no-about">
                   No about information set
                 </Typography>
               );
             })()
           ) : (
             // Edit mode
             <div className="marker-popup__about-edit">
               {Object.entries(editingAboutData).map(([sectionName, options]) => (
                 <Box key={sectionName} className="marker-popup__edit-service-section">
                   <Box className="marker-popup__edit-section-header">
                     <Typography variant="h6" className="marker-popup__edit-section-title">
                       {sectionName}
                     </Typography>
                     <IconButton
                       size="small"
                       onClick={() => handleRemoveServiceSection(sectionName)}
                       className="marker-popup__remove-section-btn"
                       style={{ color: '#000' }}
                     >
                       <RemoveIcon fontSize="small" />
                     </IconButton>
                   </Box>
                   
                   <div className="marker-popup__edit-services">
                     {Object.entries(options).map(([optionName, available]) => (
                       <Box key={optionName} className="marker-popup__edit-service-option">
                         <Chip
                           label={optionName}
                           variant={available ? "filled" : "outlined"}
                           size="small"
                           onClick={() => handleToggleServiceOption(sectionName, optionName)}
                           {...(available ? { 
                             onDelete: () => handleRemoveServiceOption(sectionName, optionName),
                             deleteIcon: <CancelIcon />
                           } : {})}
                           className={`marker-popup__service-chip ${available ? 'marker-popup__service-chip--available' : 'marker-popup__service-chip--unavailable'}`}
                         />
                       </Box>
                     ))}
                   </div>
                   
                   <Button
                     size="small"
                     variant="text"
                     onClick={() => handleAddServiceOption(sectionName)}
                     className="marker-popup__add-option-btn"
                     startIcon={<AddIcon />}
                   >
                     Add Option
                   </Button>
                 </Box>
               ))}
               
             </div>
           )}
         </Box>

        {/* Analytics Section - Only visible in ownership mode */}
        {isOwnershipMode && (
          <>
            <Divider className="marker-popup__divider" />
            <Box className="marker-popup__analytics-section">
              <Box className="marker-popup__analytics-header">
                <h3 className="marker-popup__section-title">
                  Analytics
                </h3>
              </Box>
              
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 2 }}>
                <Tab label="Overview" />
                <Tab label="Trends" />
                <Tab label="Services" />
              </Tabs>

              {/* Overview Tab */}
              {activeTab === 0 && (
                <Box className="marker-popup__analytics-overview">
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 3 }}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                      <Typography variant="h6" sx={{ color: '#FF6B6B', fontWeight: 'bold' }}>
                        {businessAnalytics.overview.totalVisits}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Total Visits
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                      <Typography variant="h6" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                        {businessAnalytics.overview.totalReviews}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Total Reviews
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                      <Typography variant="h6" sx={{ color: '#45B7D1', fontWeight: 'bold' }}>
                        {businessAnalytics.overview.avgRating}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Avg Rating
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                      <Typography variant="h6" sx={{ color: '#96CEB4', fontWeight: 'bold' }}>
                        +{businessAnalytics.overview.monthlyGrowth}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Monthly Growth
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Trends Tab */}
              {activeTab === 1 && (
                <Box className="marker-popup__analytics-trends">
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                      Monthly Visits
                    </Typography>
                    <SimpleLineChart
                      data={businessAnalytics.monthlyData.visits}
                      labels={businessAnalytics.monthlyData.labels}
                      color="#FF6B6B"
                      height={120}
                    />
                    {/* Monthly Visit Count Display */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, flexWrap: 'wrap', gap: 1.5 }}>
                      {businessAnalytics.monthlyData.visits.map((visitCount, index) => (
                        <Box key={index} sx={{ 
                          textAlign: 'center', 
                          minWidth: '65px',
                          p: 1.5,
                          bgcolor: '#f8f9fa',
                          borderRadius: 1,
                          border: '1px solid #e0e0e0'
                        }}>
                          <Typography variant="caption" sx={{ 
                            display: 'block', 
                            color: 'text.secondary', 
                            mb: 1,
                            fontSize: '0.7rem'
                          }}>
                            {businessAnalytics.monthlyData.labels[index]}
                          </Typography>
                          <Typography variant="body2" sx={{ 
                            fontWeight: 'bold', 
                            color: '#FF6B6B',
                            fontSize: '0.9rem'
                          }}>
                            {visitCount}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                      Monthly Reviews
                    </Typography>
                    <SimpleBarChart
                      data={businessAnalytics.monthlyData.reviews}
                      labels={businessAnalytics.monthlyData.labels}
                      color="#4ECDC4"
                      height={120}
                    />
                    {/* Monthly Review Count Display */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, flexWrap: 'wrap', gap: 1.5 }}>
                      {businessAnalytics.monthlyData.reviews.map((reviewCount, index) => (
                        <Box key={index} sx={{ 
                          textAlign: 'center', 
                          minWidth: '65px',
                          p: 1.5,
                          bgcolor: '#f8f9fa',
                          borderRadius: 1,
                          border: '1px solid #e0e0e0'
                        }}>
                          <Typography variant="caption" sx={{ 
                            display: 'block', 
                            color: 'text.secondary', 
                            mb: 1,
                            fontSize: '0.7rem'
                          }}>
                            {businessAnalytics.monthlyData.labels[index]}
                          </Typography>
                          <Typography variant="body2" sx={{ 
                            fontWeight: 'bold', 
                            color: '#4ECDC4',
                            fontSize: '0.9rem'
                          }}>
                            {reviewCount}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Services Tab */}
              {activeTab === 2 && (
                <Box className="marker-popup__analytics-services">
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Popular Services
                  </Typography>
                  {businessAnalytics.topServices.map((service, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: service.color, mr: 2 }} />
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {service.name}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: service.color }}>
                        {service.popularity}%
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </>
        )}

        {/* Success Message */}
        {saveSuccess && (
          <Box 
            sx={{ 
              mb: 2, 
              p: 2, 
              bgcolor: '#e8f5e8', 
              border: '1px solid #4caf50', 
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <span style={{ color: '#4caf50', fontSize: '1.2rem' }}>✅</span>
            <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 'medium' }}>
              Business information updated successfully!
            </Typography>
          </Box>
        )}

        {/* Action Buttons */}
        <Box className="marker-popup__action-buttons">
          {!isOwnershipMode ? (
            <>
              <button className="marker-popup__call-btn">
                Call
              </button>
              <button 
                className="marker-popup__ownership-btn"
                onClick={handleTakeOwnership}
              >
                Take Ownership
              </button>
            </>
          ) : (
            <Box className="marker-popup__ownership-actions">
              <Button 
                variant="outlined" 
                onClick={handleCancelOwnership}
                disabled={isUpdating}
                className="marker-popup__cancel-ownership-btn"
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                onClick={handleSaveAll}
                disabled={isUpdating}
                className="marker-popup__save-ownership-btn"
                style={{ 
                  backgroundColor: '#000', 
                  color: 'white' 
                }}
              >
                {isUpdating ? 'Saving...' : 'Save All Changes'}
              </Button>
            </Box>
          )}
        </Box>
        
      </div>
    </Paper>
    </>
  );
};

export default MarkerPopup; 