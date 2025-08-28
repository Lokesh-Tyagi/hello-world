import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "../components/layout/LayoutWrapper";

export const metadata: Metadata = {
  title: "Shisha - Discover Amazing Shisha Experiences",
  description: "Join thousands of users exploring the best shisha lounges and events worldwide. Find premium lounges, exclusive events, and connect with fellow enthusiasts.",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "Shisha - Discover Amazing Shisha Experiences",
    description: "Join thousands of users exploring the best shisha lounges and events worldwide.",
    type: 'website',
    images: [
      {
        url: '/favicon.svg',
        width: 120,
        height: 32,
        alt: 'Shisha Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Shisha - Discover Amazing Shisha Experiences",
    description: "Join thousands of users exploring the best shisha lounges and events worldwide.",
    images: ['/favicon.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#E37875" />
      </head>
      <body
        className="antialiased"
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>

      </body>
    </html>
  );
}
