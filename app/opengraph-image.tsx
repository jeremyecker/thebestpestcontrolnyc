import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'The Best Pest Control NYC | Licensed Exterminators';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #14532d 0%, #166534 60%, #15803d 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Star badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.12)',
          borderRadius: '40px',
          padding: '10px 28px',
          marginBottom: '32px',
        }}>
          <span style={{ color: '#facc15', fontSize: '28px', marginRight: '10px' }}>★★★★★</span>
          <span style={{ color: '#d1fae5', fontSize: '22px', fontWeight: 600 }}>4.9 · 5,000+ Reviews</span>
        </div>

        {/* Main heading */}
        <h1 style={{
          color: 'white',
          fontSize: '72px',
          fontWeight: 900,
          margin: '0 0 16px 0',
          textAlign: 'center',
          lineHeight: 1.05,
          letterSpacing: '-1px',
        }}>
          The Best Pest Control NYC
        </h1>

        {/* Subline */}
        <p style={{
          color: '#86efac',
          fontSize: '30px',
          margin: '0 0 40px 0',
          textAlign: 'center',
          fontWeight: 500,
        }}>
          NYS Licensed · 318+ Neighborhoods · 32 Pest Types Eliminated
        </p>

        {/* CTA pill */}
        <div style={{
          background: '#facc15',
          color: '#14532d',
          padding: '16px 48px',
          borderRadius: '12px',
          fontSize: '26px',
          fontWeight: 800,
          letterSpacing: '0.3px',
        }}>
          Free Inspection · No Money Upfront
        </div>
      </div>
    ),
    { ...size }
  );
}
