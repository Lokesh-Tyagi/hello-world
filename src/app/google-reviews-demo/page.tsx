import GoogleReviews from '@/components/googleReviews/GoogleReviews';

export default function GoogleReviewsDemo() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5', 
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '40px', 
          color: '#333',
          fontSize: '2.5rem',
          fontWeight: 'bold'
        }}>
          Google Reviews Component Demo
        </h1>
        
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          padding: '40px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <GoogleReviews />
        </div>
        
        <div style={{ 
          marginTop: '40px', 
          textAlign: 'center',
          color: '#666',
          fontSize: '1rem'
        }}>
          <p>This component replicates the exact Google Reviews design from the provided image.</p>
          <p>Features include:</p>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            display: 'inline-block',
            textAlign: 'left'
          }}>
            <li>• Google logo and branding</li>
            <li>• Overall rating display (4.9/5 stars)</li>
            <li>• &ldquo;Write a Review&rdquo; button</li>
            <li>• 2x2 grid of review cards</li>
            <li>• Individual star ratings for each review</li>
            <li>• Profile pictures and user information</li>
            <li>• &ldquo;Read More Reviews&rdquo; link</li>
            <li>• Fully responsive design</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 