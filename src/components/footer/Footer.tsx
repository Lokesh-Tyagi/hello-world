'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import './Footer.scss';

export default function Footer() {
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({
    shop: false,
    about: false,
    support: false
  });

  const handleSocialClick = (platform: string) => {
    // Handle social media clicks
  };

  const toggleDropdown = (dropdownKey: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey]
    }));
  };

  // Contact click handler removed as it's not being used

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          {/* Left Section - Brand & Contact */}
          <div className="footer__brand-section">
            <div className="footer__logo">
              <Image 
                src="/Assets/logo/shisha-logo.svg" 
                alt="SHISHA Logo" 
                width={120} 
                height={32}
                className="footer-logo-image"
              />
            </div>
            
            <div className="footer__contact">
              <div className="footer__contact-item">
                <svg className="footer__contact-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className="footer__contact-text">1-866-HOOKAHS (466-5247)</span>
              </div>
              
              <div className="footer__contact-item">
                <svg className="footer__contact-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span className="footer__contact-text">hookah_email@gmail.com</span>
              </div>
            </div>

            <div className="footer__social">
              <button 
                className="footer__social-icon"
                onClick={() => handleSocialClick('instagram')}
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>
              
              <button 
                className="footer__social-icon"
                onClick={() => handleSocialClick('youtube')}
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="footer__shop-business-mobile">
           
            <p>Shop Business</p>
          </div>
          {/* Right Section - Navigation Columns */}
          <div className="footer__navigation">
            <div className="footer__nav-column">
              {/* Desktop Title */}
              <h3 className="footer__nav-title">SHOP</h3>
              {/* Mobile Button */}
              <button 
                className="footer__nav-title footer__nav-title--mobile"
                onClick={() => toggleDropdown('shop')}
                aria-expanded={openDropdowns.shop}
              >
                Shop
                <svg 
                  className={`footer__nav-arrow ${openDropdowns.shop ? 'footer__nav-arrow--open' : ''}`}
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>
              <ul className={`footer__nav-list ${openDropdowns.shop ? 'footer__nav-list--open' : ''}`}>
                <li><Link href="/shop/hookahs">Hookahs</Link></li>
                <li><Link href="/shop/shisha-tobacco">Shisha Tobacco</Link></li>
                <li><Link href="/shop/charcoal">Charcoal</Link></li>
                <li><Link href="/shop/ooka">OOKA</Link></li>
                <li><Link href="/shop/bestsellers">Bestsellers</Link></li>
                <li><Link href="/shop/accessories">Hookah Accessories</Link></li>
              </ul>
            </div>

            <div className="footer__nav-column">
              {/* Desktop Title */}
              <h3 className="footer__nav-title">ABOUT</h3>
              {/* Mobile Button */}
              <button 
                className="footer__nav-title footer__nav-title--mobile"
                onClick={() => toggleDropdown('about')}
                aria-expanded={openDropdowns.about}
              >
                About
                <svg 
                  className={`footer__nav-arrow ${openDropdowns.about ? 'footer__nav-arrow--open' : ''}`}
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>
              <ul className={`footer__nav-list ${openDropdowns.about ? 'footer__nav-list--open' : ''}`}>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/rewards">Reward Program</Link></li>
              </ul>
            </div>

            <div className="footer__nav-column">
              {/* Desktop Title */}
              <h3 className="footer__nav-title">SUPPORT</h3>
              {/* Mobile Button */}
              <button 
                className="footer__nav-title footer__nav-title--mobile"
                onClick={() => toggleDropdown('support')}
                aria-expanded={openDropdowns.support}
              >
                Support
                <svg 
                  className={`footer__nav-arrow ${openDropdowns.support ? 'footer__nav-arrow--open' : ''}`}
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>
              <ul className={`footer__nav-list ${openDropdowns.support ? 'footer__nav-list--open' : ''}`}>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/orders">My Orders</Link></li>
                <li><Link href="/shipping">Shipping & Returns</Link></li>
                <li><Link href="/accessibility">Accessibility</Link></li>
                <li><Link href="/terms">Terms and Conditions</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/warranty">Warranty</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright & Address */}
        <div className="footer__bottom">
          <div className="footer__divider"></div>
          <div className="footer__copyright">
            <span>© 2025 Hookah Digital Services INC. All Rights Reserved.</span>
            <span>3525 Whitehall Park Drive, Suite 300, Charlotte, NC 28273</span>
            <span>Tel: 1-888-866-5232</span>
          </div>
        </div>
      </div>
    </footer>
  );
}