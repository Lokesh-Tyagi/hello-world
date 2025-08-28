# Google Maps Integration Setup

## Prerequisites

1. **Google Maps API Key**: You need a Google Maps API key to use the map functionality.

## Setup Instructions

### 1. Get Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API (for search functionality)
   - Geocoding API (for address lookup)
4. Create credentials (API Key)
5. Restrict the API key to your domain for security

### 2. Environment Variables

Create a `.env.local` file in your project root and add:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 3. MarkerClusterer Library

The component uses MarkerClusterer for clustering markers. The library is loaded automatically from Google's CDN.

## Features

- **Interactive Google Maps**: Real map with zoom, pan, and street view
- **Marker Clustering**: Groups nearby markers into clusters for better performance
- **Custom Markers**: Different colored markers for different venue types
- **Info Windows**: Click markers to see venue details
- **Real-time Filtering**: Filter venues by type, services, rating, etc.
- **Search Integration**: URL parameters are passed from the search form
- **Responsive Design**: Works on all screen sizes

## Venue Types

- **Hookah Bars**: Brown markers
- **Lounges**: Dark gray markers  
- **Nightclubs**: Light gray markers
- **Other**: Default gray markers

## Customization

You can customize the map by:
- Adding more venue types
- Changing marker colors and icons
- Modifying the map styles
- Adding more filter options
- Customizing info window content

## Troubleshooting

- Make sure your API key is valid and has the required permissions
- Check that the API key is restricted to your domain
- Ensure you have billing enabled on your Google Cloud project
- Verify that all required APIs are enabled 