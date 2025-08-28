# Next.js Project Architecture

This document outlines the best-practice architecture implemented for the Shisha.com Next.js project.

## 📁 Project Structure

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   └── Modal.tsx
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── navbar/           # Navigation components
│   ├── search/           # Search functionality
│   ├── videoCard/        # Video card components
│   ├── videoPopup/       # Video popup components
│   └── ...               # Other feature components
├── hooks/                # Custom React hooks
│   ├── useLocalStorage.ts
│   ├── useClickOutside.ts
│   └── useMediaQuery.ts
├── lib/                  # Utility libraries
│   └── utils.ts         # Common utility functions
├── types/               # TypeScript type definitions
│   └── index.ts        # Shared interfaces and types
├── constants/           # Application constants
│   └── index.ts        # Global constants and data
├── data/               # Mock data and static content
│   └── videos.ts       # Video data
└── pages/              # Page components (legacy structure)
    ├── home.tsx
    ├── login/
    └── signup/
```

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**
- **Components**: UI logic and presentation
- **Hooks**: Business logic and state management
- **Types**: Type definitions and interfaces
- **Constants**: Application-wide data and configuration
- **Utils**: Pure utility functions

### 2. **Component Organization**
- **UI Components**: Reusable, generic components (`src/components/ui/`)
- **Layout Components**: Page structure components (`src/components/layout/`)
- **Feature Components**: Domain-specific components (`src/components/[feature]/`)

### 3. **Type Safety**
- Centralized type definitions in `src/types/`
- Shared interfaces for common data structures
- Strict TypeScript configuration

### 4. **Data Management**
- Static data in `src/data/`
- Constants in `src/constants/`
- Local storage management via custom hooks

## 🔧 Key Features

### Custom Hooks
- `useLocalStorage`: Persistent state management
- `useClickOutside`: Click outside detection
- `useMediaQuery`: Responsive design utilities

### Utility Functions
- `cn()`: Class name utility for conditional styling
- `formatDate()`: Date formatting
- `truncateText()`: Text truncation
- `generateId()`: Unique ID generation
- `debounce()`: Function debouncing

### UI Components
- **Button**: Reusable button with variants
- **Modal**: Modal dialog component
- **VideoPopup**: Video player popup

## 📱 Responsive Design

### Breakpoints
```typescript
export const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px'
}
```

### Z-Index System
```typescript
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1001,
  modal: 1002,
  popup: 1003,
  tooltip: 1004
}
```

## 🎨 Styling Architecture

### CSS Organization
- **Global Styles**: `src/app/globals.css`
- **Component Styles**: Co-located SCSS files
- **Utility Classes**: Tailwind CSS integration

### Naming Conventions
- **BEM Methodology**: Block__Element--Modifier
- **Component Prefix**: Feature-specific prefixes
- **Consistent Spacing**: Standardized padding/margin

## 🚀 Performance Optimizations

### Code Splitting
- Dynamic imports for heavy components
- Route-based code splitting
- Component-level lazy loading

### Image Optimization
- Next.js Image component usage
- Proper image sizing and formats
- Lazy loading implementation

### Bundle Optimization
- Tree shaking for unused code
- Minimal dependencies
- Efficient imports

## 🔒 Security Considerations

### Input Validation
- TypeScript for compile-time safety
- Runtime validation where needed
- Sanitization of user inputs

### Authentication
- Secure token management
- Protected routes
- Session handling

## 📊 State Management

### Local State
- React hooks for component state
- Custom hooks for complex logic
- Context API for shared state

### Persistent State
- LocalStorage for user preferences
- SessionStorage for temporary data
- Cookie management for authentication

## 🧪 Testing Strategy

### Unit Testing
- Component testing with React Testing Library
- Hook testing with custom test utilities
- Utility function testing

### Integration Testing
- Page-level testing
- User flow testing
- API integration testing

## 📈 Scalability

### Component Reusability
- Generic UI components
- Configurable props
- Consistent interfaces

### Code Maintainability
- Clear file organization
- Consistent naming conventions
- Comprehensive documentation

### Performance Monitoring
- Bundle size tracking
- Performance metrics
- Error tracking

## 🔄 Migration Guide

### From Legacy Structure
1. Move page components to `src/pages/`
2. Update imports to use new structure
3. Implement new type definitions
4. Replace inline data with constants
5. Add custom hooks for state management

### Best Practices
- Use TypeScript for all new code
- Follow component naming conventions
- Implement proper error boundaries
- Add comprehensive documentation
- Write unit tests for new features

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs) 