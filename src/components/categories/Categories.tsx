'use client';

import './Categories.scss';

const categories = [
  'Rooftop',
  'Live DJ',
  'Outdoor Seating',
  'Chill Vibes',
  'Garden Lounge',
  'Skyline View',
  'Ladies Night',
  'Arabic Music',
  'RSVP Only',
  'Romantic',
  'Cocktails',
  'VIP',
  'Full Menu',
  'Weekend Vibes',
  'Dance Floor'
];

export default function Categories() {
  const handleCategoryClick = (category: string) => {

    // Handle category selection
  };

  return (
    <div className="categories">
      <div className="categories__container">
        <div className="categories__card">
          <div className="categories__header">
            <h3 className="categories__title">Explore Categories</h3>
            <span className="categories__subtitle">Choose the vibe that fits your night.</span>
          </div>
          
          <div className="categories__tags">
            {categories.map((category, index) => (
              <button
                key={index}
                className="categories__tag"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 