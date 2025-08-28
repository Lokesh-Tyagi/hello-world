export interface VideoData {
  id: number;
  image: string;
  thumbnail: string;
  caption: string;
  title: string;
  description: string;
  videoUrl: string;
  playIcon: boolean;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  language: string;
}

export interface NavbarProps {
  isMenuOpen: boolean;
  isCountryDropdownOpen: boolean;
  selectedCountry: Country;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onToggleCountryDropdown: () => void;
  onSelectCountry: (country: Country) => void;
}

export interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoData: VideoData | null;
}

export interface SearchFormData {
  search: string;
  location: string;
  filters: string[];
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
}

export interface Venue {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
  description: string;
}

export interface Journal {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
} 