# GenericCard Component

A flexible and reusable card component that supports multiple variants and configurations for displaying content in a card format.

## Features

- **Multiple Variants**: Supports venue, article, event, video, and default card types
- **Flexible Content**: Configurable image, title, subtitle, description, details, tags, and CTA
- **Interactive Elements**: Click handlers, hover effects, and CTA buttons
- **Responsive Design**: Mobile-friendly with responsive breakpoints
- **Customizable**: Supports custom styling and children components
- **Accessible**: Proper semantic HTML and keyboard navigation

## Usage

```tsx
import GenericCard from '@/components/ui/GenericCard';

// Basic usage
<GenericCard
  title="Card Title"
  description="Card description"
  image={{ src: '/path/to/image.jpg' }}
  onClick={() => console.log('Card clicked')}
/>

// With all props
<GenericCard
  variant="venue"
  image={{
    src: '/venue-image.jpg',
    badge: { text: 'Featured', color: '#ef4444' }
  }}
  title="Venue Name"
  subtitle="Location"
  rating={{ value: '4.8', icon: <StarIcon /> }}
  details={[
    { icon: <CheckIcon />, text: 'Open until 2:00 AM' },
    { icon: <MoneyIcon />, text: 'Average $120 per person' }
  ]}
  tags={[
    { text: 'Rooftop' },
    { text: 'Live DJ' }
  ]}
  cta={{
    text: 'Book Now',
    onClick: () => handleBooking()
  }}
  onClick={() => handleCardClick()}
/>
```

## Props

### GenericCardProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier for the card |
| `className` | `string` | `''` | Additional CSS classes |
| `image` | `CardImage` | - | Image configuration |
| `title` | `string` | - | Card title |
| `subtitle` | `string` | - | Card subtitle |
| `description` | `string` | - | Card description |
| `details` | `CardDetail[]` | - | Array of detail items with icons and text |
| `tags` | `CardTag[]` | - | Array of tag items |
| `rating` | `{ value: string \| number, icon?: React.ReactNode }` | - | Rating display with optional icon |
| `cta` | `{ text: string, onClick?: () => void, variant?: string, href?: string }` | - | Call-to-action button configuration |
| `link` | `string` | - | If provided, wraps card in an anchor tag |
| `onClick` | `() => void` | - | Click handler for the entire card |
| `onMouseEnter` | `() => void` | - | Mouse enter handler |
| `onMouseLeave` | `() => void` | - | Mouse leave handler |
| `children` | `React.ReactNode` | - | Custom content to render inside the card |
| `variant` | `'default' \| 'venue' \| 'article' \| 'event' \| 'video'` | `'default'` | Card variant for different styling |
| `showPlayIcon` | `boolean` | `false` | Shows play button overlay for video cards |
| `comingSoon` | `boolean` | `false` | Shows "Coming Soon" badge |

### CardImage

| Prop | Type | Description |
|------|------|-------------|
| `src` | `string` | Image source URL |
| `alt` | `string` | Image alt text (optional) |
| `overlay` | `React.ReactNode` | Custom overlay content |
| `badge` | `{ text: string, color: string }` | Badge configuration |

### CardDetail

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `React.ReactNode` | Icon component (optional) |
| `text` | `string` | Detail text |

### CardTag

| Prop | Type | Description |
|------|------|-------------|
| `text` | `string` | Tag text |
| `color` | `string` | Custom background color (optional) |

## Variants

### Default
Basic card with image, title, and description.

### Venue
Optimized for venue listings with rating, details, and tags.

### Article
Designed for blog posts and articles with description and link.

### Event
Perfect for event listings with date/time, price, and CTA button.

### Video
Compact card for video content with play button overlay.

## Examples

### Venue Card
```tsx
<GenericCard
  variant="venue"
  image={{
    src: '/venue-image.jpg'
  }}
  title="Sahara Sky Lounge"
  subtitle="Downtown New York, USA"
  rating={{
    value: '5.0',
    icon: <StarIcon style={{ color: '#fbbf24' }} />
  }}
  details={[
    {
      icon: <CheckCircleIcon />,
      text: 'Open until 2:00 AM'
    },
    {
      icon: <AttachMoneyIcon />,
      text: 'Average $120 per person'
    }
  ]}
  tags={[
    { text: 'Rooftop' },
    { text: 'Live DJ' },
    { text: 'Outdoor Seating' }
  ]}
  onClick={() => handleVenueClick()}
/>
```

### Article Card
```tsx
<GenericCard
  variant="article"
  image={{
    src: '/article-image.jpg'
  }}
  title="What to Expect at a Shisha & Beats Night"
  description="Discover the ultimate guide to enjoying shisha and live music..."
  link="/journal/shisha-beats-night"
/>
```

### Event Card
```tsx
<GenericCard
  variant="event"
  image={{
    src: '/event-image.jpg',
    badge: {
      text: 'Featured',
      color: '#ef4444'
    }
  }}
  title="Friday Night Vibes"
  subtitle="Shisha SKY LOUNGE"
  details={[
    {
      icon: <CalendarTodayIcon />,
      text: 'Dec 15, 2024 · 9:00 PM'
    },
    {
      icon: <LocalOfferIcon />,
      text: 'From $25'
    }
  ]}
  tags={[
    { text: 'Live DJ' },
    { text: 'Rooftop' }
  ]}
  cta={{
    text: 'RSVP & Buy Tickets',
    onClick: () => handleBooking()
  }}
/>
```

### Video Card
```tsx
<GenericCard
  variant="video"
  image={{
    src: '/video-thumbnail.jpg'
  }}
  title="Real Lounges. Real People. Real Nights."
  showPlayIcon={true}
  onClick={() => handleVideoClick()}
/>
```

## Styling

The component uses BEM methodology for CSS classes and includes responsive breakpoints:

- **Desktop**: Default styles
- **Tablet** (≤768px): Adjusted padding and font sizes
- **Mobile** (≤480px): Compact layout with smaller elements

## Accessibility

- Proper semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- Focus indicators for interactive elements
- Alt text support for images

## Best Practices

1. **Always provide alt text** for images when using the `alt` prop
2. **Use appropriate variants** for different content types
3. **Keep titles concise** for better readability
4. **Limit tags** to 3-4 items for optimal display
5. **Provide meaningful click handlers** for interactive cards
6. **Use consistent icon sizes** (16px recommended) for details 