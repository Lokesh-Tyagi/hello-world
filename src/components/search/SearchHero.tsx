'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Autocomplete, Checkbox, TextField, Button, CircularProgress } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './SearchHero.scss';



// Place Types
const placeTypes = [
  'Kiosk',
  'Food and drink',
  'Shisha Bar',
  'Bar',
  'Restaurant',
  'Hotels'
];

// Services
const services = [
  'Delivery',
  'Takeout',
  'Reservations',
  'Parking',
  'WiFi',
  'Live Music',
  'Outdoor Seating',
  'Private Rooms',
  'Rooftop',
  'Live DJ',
  'Hookah Bar'
];

// Combined filter options
const filterOptions = [...placeTypes, ...services];

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function SearchHero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleSearch = () => {
    // Handle search functionality
    console.log('🚀 SearchHero - Starting search with:', {
      searchQuery,
      location,
      selectedFilters,
      filtersCount: selectedFilters.length
    });
    
    // Navigate to explore map page with search parameters
    const searchParams = new URLSearchParams();
    if (searchQuery) searchParams.set('q', searchQuery);
    if (location) searchParams.set('location', location);
    if (selectedFilters.length > 0) searchParams.set('filters', selectedFilters.join(','));
    
    const finalUrl = `/explore?${searchParams.toString()}`;
    console.log('🔗 SearchHero - Navigating to:', finalUrl);
    
    router.push(finalUrl);
  };

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsGettingLocation(true);
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Try to get location name using free reverse geocoding
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.display_name) {
            // Extract city and country from the full address
            const addressParts = data.display_name.split(', ');
            const city = addressParts[0] || 'Unknown City';
            const country = addressParts[addressParts.length - 1] || 'Unknown Country';
            setLocation(`${city}, ${country}`);
          } else {
            setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }
        } else {
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }
      } catch (geocodingError) {
        // Fallback to coordinates if geocoding fails

        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      }
    } catch (error) {

      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('Location access denied. Please enable location services.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('Location information unavailable.');
            break;
          case error.TIMEOUT:
            alert('Location request timed out.');
            break;
          default:
            alert('An unknown error occurred while getting location.');
        }
      } else {
        alert('Failed to get location. Please try again.');
      }
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleLocationIconClick = () => {
    getCurrentLocation();
  };

  return (
    <div className="search-hero">
      <div className="search-hero__background">
        <div className="search-hero__overlay"></div>
        <div className="search-hero__content">
          <div className="search-container">
            <h3 className="search-container__title">
              Find the best shisha venues and events
            </h3>
            
            <div className="search-container__form">
              <div className="search-field">
                <label className="search-field__label">What are you looking for</label>
                <TextField
                  id="search-input"
                  placeholder="Search for venues or events"
                  variant="outlined"
                  size="medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px',
                      backgroundColor: 'white',
                      height: '48px',
                      '& fieldset': {
                        borderColor: '#e5e7eb',
                      },
                      '&:hover fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#e0e0e0',
                      },
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '1rem',
                      padding: '12px 20px',
                      height: 'auto',
                    },
                  }}
                />
              </div>

              <div className="search-field">
                <label className="search-field__label">Location</label>
                <TextField
                  id="location-input"
                  placeholder={isGettingLocation ? "Getting your location..." : "Search for location"}
                  variant="outlined"
                  size="medium"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={isGettingLocation}
                  InputProps={{
                    endAdornment: (
                      isGettingLocation ? (
                        <CircularProgress 
                          size={20} 
                          sx={{ 
                            color: '#6b7280', 
                            ml: 1 
                          }} 
                        />
                      ) : (
                        <LocationOnIcon 
                          onClick={handleLocationIconClick}
                          sx={{ 
                            color: '#6b7280', 
                            ml: 1,
                            cursor: 'pointer',
                            '&:hover': {
                              color: '#374151',
                            }
                          }} 
                        />
                      )
                    ),
                  }}
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px',
                      backgroundColor: 'white',
                      height: '48px',
                      '& fieldset': {
                        borderColor: '#e5e7eb',
                      },
                      '&:hover fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#e0e0e0',
                      },
                      '&.Mui-disabled': {
                        backgroundColor: '#f9fafb',
                        cursor: 'not-allowed',
                      },
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '1rem',
                      padding: '12px 20px',
                      height: 'auto',
                      '&:disabled': {
                        cursor: 'not-allowed',
                      },
                    },
                  }}
                />
              </div>

              <div className="search-field">
                <label className="search-field__label">Add filters</label>
                <div className="search-field__autocomplete-wrapper">
                              <Autocomplete
                                style={{ maxHeight: '48px', overflow: 'hidden' }}
                    multiple
                    id="filters-autocomplete"
                    options={filterOptions}
                    disableCloseOnSelect
                    value={selectedFilters}
                    onChange={(event, newValue) => {
                      setSelectedFilters(newValue);
                    }}
                    renderTags={(value, getTagProps) => {
                      const visibleTags = value.slice(0, 2);
                      const hiddenCount = value.length - 2;
                      
                      return (
                        <>
                          {visibleTags.map((option, index) => {
                            const { onDelete, ...tagProps } = getTagProps({ index });
                            return (
                              <span
                                {...tagProps}
                                key={option}
                                style={{
                                  backgroundColor: '#e0e0e0',
                                  color: 'black',
                                  borderRadius: '16px',
                                  fontSize: '0.75rem',
                                  height: '24px',
                                  flexShrink: 0,
                                  margin: '0 4px 0 0',
                                  padding: '0 8px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  maxWidth: '120px',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {option}
                              </span>
                            );
                          })}
                          {hiddenCount > 0 && (
                            <span
                              style={{
                                backgroundColor: '#e0e0e0',
                                color: 'black',
                                borderRadius: '16px',
                                fontSize: '0.75rem',
                                height: '24px',
                                flexShrink: 0,
                                margin: '0 4px 0 0',
                                padding: '0 8px',
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'default'
                              }}
                            >
                              +{hiddenCount}
                            </span>
                          )}
                        </>
                      );
                    }}
                    renderOption={(props, option, { selected }) => {
                      const { key, ...optionProps } = props;
                      return (
                        <li key={key} {...optionProps} style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          padding: '8px 16px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8, flexShrink: 0 }}
                            checked={selected}
                          />
                          <span style={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {option}
                          </span>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={selectedFilters.length === 0 ? "Select filters" : ""}
                        variant="outlined"
                        size="small"
                                                          sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: '50px',
                                      backgroundColor: 'white',
                                      height: '48px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      overflow: 'hidden',
                                      '& fieldset': {
                                        borderColor: '#e5e7eb',
                                      },
                                      '&:hover fieldset': {
                                        borderColor: '#d1d5db',
                                      },
                                      '&.Mui-focused fieldset': {
                                        borderColor: '#e0e0e0',
                                      },
                                    },
                                    '& .MuiInputBase-input': {
                                      fontSize: '1rem',
                                      padding: '12px 20px',
                                      height: 'auto',
                                      display: 'flex',
                                      alignItems: 'center',
                                    },
                                    '& .MuiAutocomplete-endAdornment': {
                                      top: '50%',
                                      transform: 'translateY(-50%)',
                                    },
                                    '& .MuiAutocomplete-inputRoot': {
                                      display: 'flex',
                                      alignItems: 'center',
                                      minHeight: '48px',
                                      maxHeight: '48px',
                                      overflow: 'hidden',
                                      flexWrap: 'nowrap',
                                      padding: '12px 20px',
                                      flexDirection: 'row',
                                      width: '100%',
                                    },
                                  }}
                      />
                    )}
                                                    sx={{
                                  '& .MuiAutocomplete-paper': {
                                    maxWidth: '100%',
                                    overflow: 'hidden',
                                    '& .MuiAutocomplete-listbox': {
                                      maxWidth: '100%',
                                      overflow: 'hidden',
                                      '& li': {
                                        maxWidth: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                      }
                                    }
                                  },

                                  '& .MuiAutocomplete-inputRoot': {
                                    overflowX: 'auto',
                                    overflowY: 'hidden',
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                    maxHeight: '48px',
                                    height: '48px',
                                    flexWrap: 'nowrap',
                                    alignItems: 'center',
                                    padding: '12px 20px',
                                    flexDirection: 'row',
                                    width: '100%',
                                    '&::-webkit-scrollbar': {
                                      display: 'none',
                                    },
                                  },
                                  '& .MuiInputBase-input': {
                                    overflowX: 'auto',
                                    overflowY: 'hidden',
                                    whiteSpace: 'nowrap',
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                    '&::-webkit-scrollbar': {
                                      display: 'none',
                                    },
                                  },
                                }}
                  />
                </div>
              </div>

              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  backgroundColor: '#374151',
                  borderRadius: '50px',
                  height: '48px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#1f2937',
                    transform: 'translateY(-1px)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                }}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 