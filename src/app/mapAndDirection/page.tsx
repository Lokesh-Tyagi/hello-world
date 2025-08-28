import MapAndDirections from '@/components/mapAndDirections/MapAndDirections';
import './mapAndDirection.scss';

export default function MapAndDirection() {
  return (
    <div className="map-direction-page">
      <div className="map-direction-page__container">
        <h1 className="map-direction-page__title">
          Map & Directions Component Demo
        </h1>
        
        <MapAndDirections />
        
        <div className="map-direction-page__features">
          <h2 className="map-direction-page__features-title">Component Features:</h2>
          <ul className="map-direction-page__features-list">
            <li>✅ Responsive design that works on all screen sizes</li>
            <li>✅ Interactive Get Directions button that opens Google Maps</li>
            <li>✅ Clean, modern UI matching the original design</li>
            <li>✅ Opening hours display with proper formatting</li>
            <li>✅ Map placeholder with location pin icon</li>
            <li>✅ Hover effects and smooth transitions</li>
            <li>✅ BEM methodology for CSS class naming</li>
            <li>✅ TypeScript support for type safety</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 