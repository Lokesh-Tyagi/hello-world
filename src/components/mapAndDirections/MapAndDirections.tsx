'use client';


import './MapAndDirections.scss';

interface MapAndDirectionsProps {
  address?: string;
}

export default function MapAndDirections({ address = '60 Al Marsa St - Dubai Marina - Dubai - United Arab Emirates' }: MapAndDirectionsProps) {
  const openingHours = [
    { day: 'Mon', hours: '08:00 AM - 12:00 PM' },
    { day: 'Tue', hours: '08:00 AM - 12:00 PM' },
    { day: 'Wed', hours: '08:00 AM - 12:00 PM' },
    { day: 'Thu', hours: '08:00 AM - 02:00 AM' },
    { day: 'Fri', hours: '08:00 AM - 04:00 AM' },
    { day: 'Sat', hours: '08:00 AM - 04:00 AM' },
    { day: 'Sun', hours: '08:00 AM - 02:00 AM' },
  ];

  const handleGetDirections = () => {
    // This would typically open Google Maps or a navigation app
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="map-directions">
      <div className="map-directions__container">
        {/* Map & Directions Section */}
        <div className="map-section">
          <h2 className="map-section__title">Map & Directions</h2>
          <div className="map-section__address">
            {address}
          </div>
          <button 
            className="map-section__directions-btn"
            onClick={handleGetDirections}
          >
            Get Directions
          </button>
          
          <div className="map-section__content">
            <div className="map-section__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178509744302!2d55.2707!3d25.0921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sDubai%20Marina!5e0!3m2!1sen!2sae!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dubai Marina Location"
                className="map-iframe"
              ></iframe>
            </div>

            {/* Opening Hours Section - Child of Map Section */}
            <div className="hours-section">
              <h3 className="hours-section__title">Opening Hours</h3>
              <div className="hours-section__list">
                {openingHours.map((item, index) => (
                  <div key={index} className="hours-item">
                    <span className="hours-item__day">{item.day}:</span>
                    <span className="hours-item__time">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 