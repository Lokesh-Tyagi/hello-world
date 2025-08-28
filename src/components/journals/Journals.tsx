import Link from 'next/link';
import Image from 'next/image';
import './Journals.scss';

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Upcoming Shisha & Chill Events',
    description: 'Volutpat in morbi sit enim interdum tempus et gravida. Ante nunc ultricies sit adipiscing dui pulvinar cursus pulvinar egestas. Facilisis mattis...',
    // image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&h=200&fit=crop&crop=center',
    image: '../Assets/Images/ShishaJurnals/shishaJurnal_2.jpg',
    link: '/articles/upcoming-events'
  },
  {
    id: '2',
    title: 'What to Wear to a Shisha Night Event',
    description: 'Volutpat in morbi sit enim interdum tempus et gravida. Ante nunc ultricies sit adipiscing dui pulvinar cursus pulvinar egestas. Facilisis mattis...',
    // image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop&crop=center',
    image: '../Assets/Images/ShishaJurnals/shishaJurnal_3.jpg',
    link: '/articles/what-to-wear'
  },
  {
    id: '3',
    title: 'What Gen Z Wants in a Shisha Lounge',
    description: 'Volutpat in morbi sit enim interdum tempus et gravida. Ante nunc ultricies sit adipiscing dui pulvinar cursus pulvinar egestas. Facilisis mattis...',
    // image: 'https://images.unsplash.com/photo-1635547821500-77542481940c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    image: '../Assets/Images/ShishaJurnals/shishaJurnal_4.jpg',
    link: '/articles/gen-z-preferences'
  }
];

export default function Journals() {
  return (
    <div className="journals">
      <div className="journals__container">
        {/* Header */}
        <div className="journals__header">
          <h3 className="journals__title">Shisha Journal</h3>
          <p className="journals__subtitle">From flavor trends to lounge culture</p>
        </div>

        {/* Content */}
        <div className="journals__content">
          {/* Featured Article - Left Column */}
          <div className="journals__featured">
            <div className="journals__featured-card">
              <div 
                className="journals__featured-image"
                style={{
                  backgroundImage: `url('../Assets/Images/ShishaJurnals/shishaJurnal_1.png')`
                  // backgroundImage: `url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop&crop=center')`
                }}
              >
                <div className="journals__featured-overlay">
                  <h2 className="journals__featured-title">
                    Top 10 Shisha Spots with a View
                  </h2>
                  <Link href="/articles/top-10-shisha-spots" className="journals__featured-link">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Article List - Right Column */}
          <div className="journals__articles">
            {articles.map((article) => (
              <div key={article.id} className="journals__article-card">
                <div className="journals__article-image">
                  {article.image ? (
                    <Image 
                      src={article.image} 
                      alt={article.title}
                      width={200}
                      height={200}
                      className="journals__article-img"
                    />
                  ) : (
                    <div className="journals__article-image-placeholder">
                      <span>Image not available</span>
                    </div>
                  )}
                </div>
                <div className="journals__article-content">
                  <h3 className="journals__article-title">{article.title}</h3>
                  <p className="journals__article-description">{article.description}</p>
                  <Link href={article.link} className="journals__article-link">
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 