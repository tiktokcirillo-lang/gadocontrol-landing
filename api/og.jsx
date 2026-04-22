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
          background: 'linear-gradient(135deg, #050a06 0%, #0a1f0e 55%, #0f2e14 100%)',
          padding: '80px 90px',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Glow decorativo */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Tag superior */}
        <p
          style={{
            color: '#d4a847',
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: 'uppercase',
            margin: '0 0 22px',
            display: 'flex',
          }}
        >
          GESTÃO DE REBANHO
        </p>

        {/* Logo */}
        <h1
          style={{
            color: '#ffffff',
            fontSize: 100,
            fontWeight: 900,
            margin: '0 0 32px',
            letterSpacing: -3,
            lineHeight: 1,
            display: 'flex',
          }}
        >
          Gado
          <span style={{ color: '#4ade80' }}>Control</span>
        </h1>

        {/* Tagline — promessa principal */}
        <p
          style={{
            color: 'rgba(240,253,244,0.82)',
            fontSize: 34,
            fontWeight: 500,
            margin: '0 0 56px',
            lineHeight: 1.35,
            maxWidth: 820,
            display: 'flex',
          }}
        >
          Todo dia sem controle é dinheiro saindo sem você ver.
        </p>

        {/* Diferenciais */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['Offline first', '14 dias grátis', 'Sem cartão'].map((txt) => (
            <div
              key={txt}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(34,197,94,0.10)',
                border: '1px solid rgba(34,197,94,0.22)',
                borderRadius: 100,
                padding: '10px 22px',
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  background: '#4ade80',
                  display: 'flex',
                }}
              />
              <span style={{ color: '#86efac', fontSize: 18, fontWeight: 700 }}>{txt}</span>
            </div>
          ))}
        </div>

        {/* URL */}
        <p
          style={{
            position: 'absolute',
            bottom: 48,
            right: 90,
            color: 'rgba(134,239,172,0.35)',
            fontSize: 18,
            letterSpacing: 1,
            margin: 0,
            display: 'flex',
          }}
        >
          gadocontrol.vercel.app
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
