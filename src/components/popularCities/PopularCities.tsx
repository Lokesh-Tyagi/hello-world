'use client';

import { useRouter } from 'next/navigation';
import './PopularCities.scss';

interface City {
  id: string;
  name: string;
  image: string;
  hasImage: boolean;
  isClickable?: boolean;
}

const cities: City[] = [
  {
    id: '1',
    name: 'New York',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=200&h=200&fit=crop&crop=center',
    hasImage: true,
    isClickable: true
  },
  {
    id: '2',
    name: 'Berlin',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=200&h=200&fit=crop&crop=center',
    hasImage: true,
    isClickable: true
  },
  {
    id: '3',
    name: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&h=200&fit=crop&crop=center',
    hasImage: true,
    isClickable: false
  },
  // {
  //   id: '3',
  //   name: 'Muscat',
  //   image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center',
  //   hasImage: true
  // },
  {
    id: '4',
    name: 'San Francisco',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200&h=200&fit=crop&crop=center',
    hasImage: true,
    isClickable: false
  },
  // {
  //   id: '6',
  //   name: 'Austin',
  //   image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop&crop=center',
  //   hasImage: true
  // },
  // {
  //   id: '7',
  //   name: 'Paris',
  //   image: 'https://images.unsplash.com/photo-1502602898535-0e5b3b3b3b3b?w=200&h=200&fit=crop&crop=center',
  //   hasImage: true
  // },
  // {
  //   id: '8',
  //   name: 'Boston',
  //   image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center',
  //   hasImage: true
  // },
  // {
  //   id: '9',
  //   name: 'Dallas',
  //   image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center',
  //   hasImage: true
  // },
  // {
  //   id: '10',
  //   name: 'Phoenix',
  //   image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center',
  //   hasImage: true
  // },
  {
    id: '11',
    name: 'London',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=200&h=200&fit=crop&crop=center',
    hasImage: true,
    isClickable: false
  },
  {
    id: '12',
    name: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200&h=200&fit=crop&crop=center',
    hasImage: true,
    isClickable: false
  },
  {
    id: '13',
    name: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=200&h=200&fit=crop&crop=center',
    hasImage: true,
    isClickable: false
  },
  {
    id: '14',
    name: 'Amsterdam',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=200&h=200&fit=crop&crop=center',
    hasImage: true,
    isClickable: false
  },
  {
    id: '15',
    name: 'Barcelona',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=200&h=200&fit=crop&crop=center',
    hasImage: true,
    isClickable: false
  },
  {
    id: '16',
    name: 'Miami',
    image: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=200&h=200&fit=crop&crop=center',
    hasImage: true,
    isClickable: false
  },
  {
    id: '17',
    name: 'Los Angeles',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=200&h=200&fit=crop&crop=center',
    hasImage: true,
    isClickable: false
  },
  // {
  //   id: '18',
  //   name: 'Chicago',
  //   image: 'https://images.unsplash.com/photo-1494522358658-554da739c3a5?w=200&h=200&fit=crop&crop=center',
  //   hasImage: true
  // },
  {
    id: '19',
    name: 'Toronto',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=200&h=200&fit=crop&crop=center',
    hasImage: true,
    isClickable: false
  },
  {
    id: '20',
    name: 'Sydney',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=200&h=200&fit=crop&crop=center',
    hasImage: true,
    isClickable: false
  }
];

export default function PopularCities() {
  const router = useRouter();

  const handleCityClick = (cityId: string) => {
    // Find the city by ID
    const city = cities.find(c => c.id === cityId);
    if (!city || !city.isClickable) return;

    // Navigate to explore page with the city as location parameter
    const searchParams = new URLSearchParams();
    searchParams.set('location', city.name);
    
    const exploreUrl = `/explore?${searchParams.toString()}`;
    router.push(exploreUrl);
  };

  return (
    <div className="popular-cities">
      <div className="popular-cities__container">
        <h3 className="popular-cities__title">Popular Cities</h3>
        <div className="popular-cities__list">
          {cities.map((city) => (
            <div 
              key={city.id} 
              className="popular-cities__city"
              onClick={() => handleCityClick(city.id)}
            >
              <div className="popular-cities__city-image-container">
                {city.hasImage ? (
                  <div 
                    className="popular-cities__city-image"
                    style={{ backgroundImage: `url(${city.image})` }}
                  />
                ) : (
                  <div className="popular-cities__city-placeholder" />
                )}
              </div>
              <span className="popular-cities__city-name">{city.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 