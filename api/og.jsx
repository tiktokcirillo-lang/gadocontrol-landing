import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#050a06',
          padding: '72px 88px',
          justifyContent: 'center',
        }}
      >
        {/* Tag */}
        <div style={{ display: 'flex', marginBottom: 20 }}>
          <span
            style={{
              color: '#d4a847',
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            GESTÃO DE REBANHO
          </span>
        </div>

        {/* Logo */}
        <div style={{ display: 'flex', marginBottom: 30, alignItems: 'baseline' }}>
          <span
            style={{
              color: '#ffffff',
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            Gado
          </span>
          <span
            style={{
              color: '#4ade80',
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            Control
          </span>
        </div>

        {/* Tagline */}
        <div style={{ display: 'flex', marginBottom: 52 }}>
          <span
            style={{
              color: 'rgba(240,253,244,0.80)',
              fontSize: 33,
              fontWeight: 500,
              lineHeight: 1.4,
              maxWidth: 800,
            }}
          >
            Todo dia sem controle é dinheiro saindo sem você ver.
          </span>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(34,197,94,0.10)',
              borderRadius: 100,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 22,
              paddingRight: 22,
              marginRight: 16,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#4ade80',
                marginRight: 10,
                display: 'flex',
              }}
            />
            <span style={{ color: '#86efac', fontSize: 18, fontWeight: 700 }}>
              Offline first
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(34,197,94,0.10)',
              borderRadius: 100,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 22,
              paddingRight: 22,
              marginRight: 16,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#4ade80',
                marginRight: 10,
                display: 'flex',
              }}
            />
            <span style={{ color: '#86efac', fontSize: 18, fontWeight: 700 }}>
              14 dias grátis
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(34,197,94,0.10)',
              borderRadius: 100,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 22,
              paddingRight: 22,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#4ade80',
                marginRight: 10,
                display: 'flex',
              }}
            />
            <span style={{ color: '#86efac', fontSize: 18, fontWeight: 700 }}>
              Sem cartão
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
