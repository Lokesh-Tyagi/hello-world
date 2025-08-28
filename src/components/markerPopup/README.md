# MarkerPopup Component

A comprehensive popup component for displaying business information when clicking on map markers. This component is designed to work with the `fetchBusinessesInBox` data structure and provides a rich, interactive display of business details.

## Features

- **Business Photo**: Displays the business photo with fallback handling
- **Business Information**: Name, address, rating, and price range
- **Business Status**: Visual status indicators (Open, Closed Temporarily, Closed Permanently)
- **Working Hours**: Complete weekly schedule display
- **About Section**: Business description and details
- **Contact Information**: Phone and website links
- **Categories**: Business type and category tags
- **Responsive Design**: Mobile-friendly layout
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Usage

### Basic Usage

```tsx
import MarkerPopup from '../markerPopup';

const MyComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  const handleMarkerClick = (business: Business) => {
    setSelectedBusiness(business);
    setShowPopup(true);
  };

  return (
    <div>
      {/* Your map component */}
      
      {/* Marker Popup */}
      {showPopup && selectedBusiness && (
        <div className="marker-popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="marker-popup-container" onClick={(e) => e.stopPropagation()}>
            <MarkerPopup 
              business={selectedBusiness} 
              onClose={() => setShowPopup(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `business` | `Business` | Yes | Business data object from `fetchBusinessesInBox` |
| `onClose` | `() => void` | No | Callback function when popup is closed |

### Business Data Structure

The component expects a `Business` object with the following key fields:

```typescript
interface Business {
  _id: string;
  name: string;
  full_address: string;
  photo?: string;
  rating?: number;
  reviews?: number;
  range?: string;
  business_status?: string;
  working_hours?: Record<string, string>;
  about?: string;
  phone?: string;
  website?: string;
  category?: string;
  type?: string;
  // ... other fields
}
```

## Styling

The component uses BEM methodology for CSS classes and includes:

- **Responsive Design**: Adapts to mobile and desktop screens
- **Smooth Animations**: Fade-in and slide-in effects
- **Custom Scrollbar**: Styled scrollbar for webkit browsers
- **Material-UI Integration**: Uses Material-UI components for consistency

### CSS Classes

- `.marker-popup`: Main container
- `.marker-popup__header`: Header section with close button
- `.marker-popup__content`: Content container
- `.marker-popup__photo-container`: Photo wrapper
- `.marker-popup__name`: Business name
- `.marker-popup__address`: Address text
- `.marker-popup__rating-section`: Rating and price section
- `.marker-popup__status-section`: Business status section
- `.marker-popup__hours-section`: Working hours section
- `.marker-popup__about-section`: About section
- `.marker-popup__contact-section`: Contact information section

## Integration with Google Maps

To integrate with Google Maps markers:

```tsx
// In your map component
const createMarker = (business: Business) => {
  const marker = new google.maps.Marker({
    position: { lat: business.latitude!, lng: business.longitude! },
    map: map,
    title: business.name
  });

  marker.addListener('click', () => {
    setSelectedBusiness(business);
    setShowPopup(true);
  });

  return marker;
};
```

## Example

See `MarkerPopupExample.tsx` for a complete working example of the component.

## Dependencies

- React
- Next.js (for Image component)
- Material-UI (Typography, Paper, Chip, Box, Divider)
- SCSS for styling

## Browser Support

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes 