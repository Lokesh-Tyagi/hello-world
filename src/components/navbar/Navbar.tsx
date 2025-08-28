'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import './navbar.scss';

interface Country {
  code: string;
  name: string;
  flag: string;
  language: string;
}



const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '/flags/us.svg', language: 'En' },
  // { code: 'GB', name: 'United Kingdom', flag: '/flags/gb.svg', language: 'En' },
  // { code: 'CA', name: 'Canada', flag: '/flags/ca.svg', language: 'En' },
  // { code: 'AU', name: 'Australia', flag: '/flags/au.svg', language: 'En' },
  { code: 'DE', name: 'Germany', flag: '/flags/de.svg', language: 'De' },
  // { code: 'FR', name: 'France', flag: '/flags/fr.svg', language: 'Fr' },
  // { code: 'ES', name: 'Spain', flag: '/flags/es.svg', language: 'Es' },
  // { code: 'IT', name: 'Italy', flag: '/flags/it.svg', language: 'It' },
  // { code: 'NL', name: 'Netherlands', flag: '/flags/nl.svg', language: 'Nl' },
  // { code: 'SE', name: 'Sweden', flag: '/flags/se.svg', language: 'Sv' },
  // { code: 'NO', name: 'Norway', flag: '/flags/no.svg', language: 'No' },
  // { code: 'DK', name: 'Denmark', flag: '/flags/dk.svg', language: 'Da' },
  // { code: 'FI', name: 'Finland', flag: '/flags/fi.svg', language: 'Fi' },
  // { code: 'CH', name: 'Switzerland', flag: '/flags/ch.svg', language: 'De' },
  // { code: 'AT', name: 'Austria', flag: '/flags/at.svg', language: 'De' },
  // { code: 'BE', name: 'Belgium', flag: '/flags/be.svg', language: 'Nl' },
  // { code: 'PT', name: 'Portugal', flag: '/flags/pt.svg', language: 'Pt' },
  // { code: 'IE', name: 'Ireland', flag: '/flags/ie.svg', language: 'En' },
  // { code: 'NZ', name: 'New Zealand', flag: '/flags/nz.svg', language: 'En' },
  // { code: 'JP', name: 'Japan', flag: '/flags/jp.svg', language: 'Ja' },
  // { code: 'KR', name: 'South Korea', flag: '/flags/kr.svg', language: 'Ko' },
  // { code: 'CN', name: 'China', flag: '/flags/cn.svg', language: 'Zh' },
  // { code: 'IN', name: 'India', flag: '/flags/in.svg', language: 'Hi' },
  // { code: 'BR', name: 'Brazil', flag: '/flags/br.svg', language: 'Pt' },
  // { code: 'MX', name: 'Mexico', flag: '/flags/mx.svg', language: 'Es' },
  // { code: 'AR', name: 'Argentina', flag: '/flags/ar.svg', language: 'Es' },
  // { code: 'CL', name: 'Chile', flag: '/flags/cl.svg', language: 'Es' },
  // { code: 'CO', name: 'Colombia', flag: '/flags/co.svg', language: 'Es' },
  // { code: 'PE', name: 'Peru', flag: '/flags/pe.svg', language: 'Es' },
  // { code: 'VE', name: 'Venezuela', flag: '/flags/ve.svg', language: 'Es' },
  // { code: 'RU', name: 'Russia', flag: '/flags/ru.svg', language: 'Ru' },
  // { code: 'PL', name: 'Poland', flag: '/flags/pl.svg', language: 'Pl' },
  // { code: 'CZ', name: 'Czech Republic', flag: '/flags/cz.svg', language: 'Cs' },
  // { code: 'HU', name: 'Hungary', flag: '/flags/hu.svg', language: 'Hu' },
  // { code: 'RO', name: 'Romania', flag: '/flags/ro.svg', language: 'Ro' },
  // { code: 'BG', name: 'Bulgaria', flag: '/flags/bg.svg', language: 'Bg' },
  // { code: 'HR', name: 'Croatia', flag: '/flags/hr.svg', language: 'Hr' },
  // { code: 'SI', name: 'Slovenia', flag: '/flags/si.svg', language: 'Sl' },
  // { code: 'SK', name: 'Slovakia', flag: '/flags/sk.svg', language: 'Sk' },
  // { code: 'LT', name: 'Lithuania', flag: '/flags/lt.svg', language: 'Lt' },
  // { code: 'LV', name: 'Latvia', flag: '/flags/lv.svg', language: 'Lv' },
  // { code: 'EE', name: 'Estonia', flag: '/flags/ee.svg', language: 'Et' },
  // { code: 'GR', name: 'Greece', flag: '/flags/gr.svg', language: 'El' },
  // { code: 'TR', name: 'Turkey', flag: '/flags/tr.svg', language: 'Tr' },
  // { code: 'IL', name: 'Israel', flag: '/flags/il.svg', language: 'He' },
  // { code: 'AE', name: 'UAE', flag: '/flags/ae.svg', language: 'Ar' },
  // { code: 'SA', name: 'Saudi Arabia', flag: '/flags/sa.svg', language: 'Ar' },
  // { code: 'EG', name: 'Egypt', flag: '/flags/eg.svg', language: 'Ar' },
  // { code: 'ZA', name: 'South Africa', flag: '/flags/za.svg', language: 'En' },
  // { code: 'NG', name: 'Nigeria', flag: '/flags/ng.svg', language: 'En' },
  // { code: 'KE', name: 'Kenya', flag: '/flags/ke.svg', language: 'En' },
  // { code: 'TH', name: 'Thailand', flag: '/flags/th.svg', language: 'Th' },
  // { code: 'VN', name: 'Vietnam', flag: '/flags/vn.svg', language: 'Vi' },
  // { code: 'MY', name: 'Malaysia', flag: '/flags/my.svg', language: 'Ms' },
  // { code: 'SG', name: 'Singapore', flag: '/flags/sg.svg', language: 'En' },
  // { code: 'PH', name: 'Philippines', flag: '/flags/ph.svg', language: 'En' },
  // { code: 'ID', name: 'Indonesia', flag: '/flags/id.svg', language: 'Id' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleCountryDropdown = () => {
    setIsCountryDropdownOpen(!isCountryDropdownOpen);
  };

  const selectCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.navbar')) {
        setIsMenuOpen(false);
      }
      if (!target.closest('.language-selector')) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Logo */}
        <div className="logo">
          <Link href="/" className="logo-link">
            <Image 
              src="/Assets/Navbar-Logo/shisha-logo@2x.png" 
              alt="SHISHA Logo" 
              width={50} 
              height={32}
              className="logo-image"
            />
          </Link>
        </div>

        {/* Navigation Links - moved to left side */}
        <div className={`nav-left ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/explore" className="nav-link" onClick={closeMenu}>
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link" onClick={closeMenu}>
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link" onClick={closeMenu}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link" onClick={closeMenu}>
                How To
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link" onClick={closeMenu}>
                Hookah Gear
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link" onClick={closeMenu}>
                The Scene
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side - Language, Login, Sign Up */}
        <div className={`nav-right ${isMenuOpen ? 'active' : ''}`}>
          <div className="language-selector">
            <button 
              className="language-button"
              onClick={toggleCountryDropdown}
              aria-label="Select language"
            >
              <div className="flag">
                {selectedCountry.flag ? (
                  <Image 
                    src={selectedCountry.flag} 
                    alt={`${selectedCountry.name} flag`}
                    width={20}
                    height={15}
                    className="flag-image"
                  />
                ) : (
                  <div className="flag-placeholder">
                    <span>Flag</span>
                  </div>
                )}
              </div>
              <span className="language-text">{selectedCountry.language}</span>
              <span className={`dropdown-arrow ${isCountryDropdownOpen ? 'active' : ''}`}>▼</span>
            </button>
            
            {isCountryDropdownOpen && (
              <div className="country-dropdown">
                <div className="dropdown-header">
                  <span>Select Country</span>
                </div>
                <div className="dropdown-content">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      className={`country-option ${selectedCountry.code === country.code ? 'selected' : ''}`}
                      onClick={() => selectCountry(country)}
                    >
                      <div className="flag">
                        {country.flag ? (
                          <Image 
                            src={country.flag} 
                            alt={`${country.name} flag`}
                            width={24}
                            height={18}
                            className="flag-image"
                          />
                        ) : (
                          <div className="flag-placeholder">
                            <span>Flag</span>
                          </div>
                        )}
                      </div>
                      <span className="country-name">{country.name}</span>
                      <span className="language-code">{country.language}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Link href="/" className="login-link" onClick={closeMenu}>
            Log In
          </Link>
          
          <Link href="/" className="signup-button" onClick={closeMenu}>
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}