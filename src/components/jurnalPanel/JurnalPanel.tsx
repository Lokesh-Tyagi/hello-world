'use client';

import Link from 'next/link';
import './JurnalPanel.scss';

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
    title: 'What to Expect at a Shisha & Beats Night',
    description: 'Volutpat in morbi sit enim interdum tempus et gravida. Ante nunc ultricies sit adipiscing dui...',
    // image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=250&fit=crop&crop=center',
    image: '../Assets/Images/ShishaJurnals/shishaJurnal_6.jpg',
    link: '/journal/shisha-beats-night'
  },
  {
    id: '2',
    title: 'The Most Instagrammable Hookah Spots',
    description: 'Volutpat in morbi sit enim interdum tempus et gravida. Ante nunc ultricies sit adipiscing dui...',
    // image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop&crop=center',
    image: '../Assets/Images/ShishaJurnals/shishJurnal_7.png',
    link: '/journal/instagrammable-hookah-spots'
  },
  {
    id: '3',
    title: 'Shisha & Drink Pairings That Just Work',
    description: 'Volutpat in morbi sit enim interdum tempus et gravida. Ante nunc ultricies sit adipiscing dui...',
    // image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop&crop=center',
    image: '../Assets/Images/ShishaJurnals/shishJurnal_8.png',
    link: '/journal/shisha-drink-pairings'
  },
  {
    id: '4',
    title: 'How to Book a VIP Table That\'s Actually Worth It',
    description: 'Volutpat in morbi sit enim interdum tempus et gravida. Ante nunc ultricies sit adipiscing dui...',
    // image: 'https://images.unsplash.com/photo-1587740851725-3d3e64e9f19e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    image: '../Assets/Images/ShishaJurnals/shishJurnal_9.jpg',
    link: '/journal/vip-table-booking'
  },
  {
    id: '5',
    title: 'A Brief History of Shisha Around the World',
    description: 'Volutpat in morbi sit enim interdum tempus et gravida. Ante nunc ultricies sit adipiscing dui...',
    // image: 'https://images.unsplash.com/photo-1663574295702-0cf515abccb9?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    image: '../Assets/Images/ShishaJurnals/shishJurnal_10.jpg',
    link: '/journal/shisha-history'
  },
  {
    id: '6',
    title: 'How to Prep a Perfect Hookah at Home',
    description: 'Volutpat in morbi sit enim interdum tempus et gravida. Ante nunc ultricies sit adipiscing dui...',
    // image: 'https://images.unsplash.com/photo-1662468527222-e4edb1cda938?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    image: '../Assets/Images/ShishaJurnals/shishJurnal_11.jpg',
    link: '/journal/perfect-hookah-home'
  },
  {
    id: '7',
    title: 'Luxury Lounges That Are Worth the Price',
    description: 'Volutpat in morbi sit enim interdum tempus et gravida. Ante nunc ultricies sit adipiscing dui...',
    // image: 'https://images.unsplash.com/photo-1626274941806-3664ce9dee7e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    image: '../Assets/Images/ShishaJurnals/shishJurnal_12.jpg',
    link: '/journal/luxury-lounges'
  },
  {
    id: '8',
    title: 'Late-Night Lounges That Stay Open Past 2AM',
    description: 'Volutpat in morbi sit enim interdum tempus et gravida. Ante nunc ultricies sit adipiscing dui...',
    // image: 'https://images.unsplash.com/photo-1702889369889-2b467b5d1aaf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    image: '../Assets/Images/ShishaJurnals/shishJurnal_13.jpg',
    link: '/journal/late-night-lounges'
  }
];

export default function JurnalPanel() {
  const handleArticleClick = (articleId: string) => {

    // Handle article click - navigate to article details
  };

  return (
    <div className="jurnal-panel">
      <div className="jurnal-panel__container">
        <div className="jurnal-panel__header">
          <h3 className="jurnal-panel__title">Shisha Journal</h3>
          <span className="jurnal-panel__subtitle">
            Discover stories, guides, and insider tips from the world of shisha and nightlife.
          </span>
        </div>

        <div className="jurnal-panel__grid">
          {articles.map((article) => (
            <div
              key={article.id}
              className="jurnal-panel__card"
              onClick={() => handleArticleClick(article.id)}
            >
              <div className="jurnal-panel__image-container">
                <div 
                  className="jurnal-panel__image"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
              </div>

              <div className="jurnal-panel__content">
                <h3 className="jurnal-panel__article-title">{article.title}</h3>
                <p className="jurnal-panel__article-description">{article.description}</p>
                <Link href={article.link} className="jurnal-panel__learn-more">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 