# Instagram Profile Component

A React component that displays an Instagram profile with posts grid, similar to the Instagram interface.

## Features

- **Profile Header**: Displays profile logo, name, username, and follow button
- **Posts Grid**: Shows 3 posts at a time with navigation arrows
- **Video Support**: Play button overlay for video posts
- **Responsive Design**: Mobile-friendly layout
- **Customizable**: Accepts custom profile data and posts

## Usage

```tsx
import InstagramProfile from '@/components/instagramProfile';

// Basic usage with default data
<InstagramProfile />

// Custom profile data
<InstagramProfile 
  profileName="your.username"
  profileLogo="/path/to/logo.png"
  posts={customPosts}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `profileName` | `string` | `"hurremsultan.berlin"` | Instagram username |
| `profileLogo` | `string` | `"/Assets/logo/shisha-logo.svg"` | Profile logo image URL |
| `posts` | `InstagramPost[]` | `[]` | Array of custom posts |

## Post Interface

```tsx
interface InstagramPost {
  id: string;
  type: 'image' | 'video';
  imageUrl: string;
  title?: string;
  description?: string;
  timeAgo: string;
  isVideo?: boolean;
}
```

## Default Posts

The component includes 3 default posts based on the Hürrem Sultan Lounge Instagram profile:
1. **MANUSBABA** - Music event promotion
2. **Kunefe Dessert** - Traditional Turkish dessert
3. **Black & White** - Signature burgers

## Styling

The component uses BEM methodology for CSS classes and includes:
- Hover effects and transitions
- Instagram gradient colors
- Responsive breakpoints
- Modern card design with shadows

## Dependencies

- React 18+
- Next.js Image component
- Material-UI icons
- SCSS for styling
