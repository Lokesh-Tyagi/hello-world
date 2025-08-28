// Google Maps Configuration
export const GOOGLE_MAPS_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
  LIBRARIES: ['geometry', 'places'],
  DEFAULT_CENTER: { lat: 52.5200, lng: 13.4050 }, // Berlin center
  DEFAULT_ZOOM: 12,
  // Normal map configuration without clustering
  MAP_OPTIONS: {
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ],
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  }
}; 