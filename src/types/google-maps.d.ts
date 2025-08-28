declare global {
  interface Window {
    google: typeof google;
    MarkerClusterer: unknown;
  }
}

// Reference the official Google Maps types
/// <reference types="google.maps" />

export {}; 