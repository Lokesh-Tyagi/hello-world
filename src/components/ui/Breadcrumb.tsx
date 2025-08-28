'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './Breadcrumb.scss';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
  goBack?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="breadcrumb__circle"></div>
      <ol className="breadcrumb__list">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb__item">
            {item.goBack && !item.isActive ? (
              <button 
                onClick={handleGoBack}
                className="breadcrumb__link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}
              >
                {item.label}
              </button>
            ) : item.href && !item.isActive ? (
              <Link href={item.href} className="breadcrumb__link">
                {item.label}
              </Link>
            ) : (
              <span className={`breadcrumb__text ${item.isActive ? 'breadcrumb__text--active' : ''}`}>
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="breadcrumb__separator">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 