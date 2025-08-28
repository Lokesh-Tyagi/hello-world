'use client';

import SimilarLounges from '@/components/similarLounges/SimilarLounges';

export default function SimilarLoungesDemoPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div style={{ padding: '40px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ 
            textAlign: 'center', 
            marginBottom: '60px', 
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#171717'
          }}>
            Similar Lounges Component Demo
          </h1>
          
          <section>
            <p style={{ 
              textAlign: 'center', 
              marginBottom: '40px',
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto 40px auto'
            }}>
              This component showcases similar lounges with a horizontal scrollable layout, 
              matching the design from the reference image. It uses the GenericCard component 
              for consistent styling and functionality.
            </p>
            <SimilarLounges />
          </section>
        </div>
      </div>
    </div>
  );
} 