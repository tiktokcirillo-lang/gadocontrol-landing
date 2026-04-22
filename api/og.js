// Vercel Edge Function — og:image dinâmica para GadoControl
import { ImageResponse } from '@vercel/og';
import React from 'react';

export const config = { runtime: 'edge' };

export default function handler() {
  const e = React.createElement;

  return new ImageResponse(
    e('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#050a06',
        padding: '72px 88px',
        justifyContent: 'center',
      },
    },
      // Tag superior
      e('div', { style: { display: 'flex', marginBottom: 20 } },
        e('span', {
          style: {
            color: '#d4a847',
            fontSize: 17,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: 'uppercase',
          },
        }, 'GESTÃO DE REBANHO')
      ),

      // Logo
      e('div', { style: { display: 'flex', marginBottom: 30, alignItems: 'baseline' } },
        e('span', {
          style: { color: '#ffffff', fontSize: 96, fontWeight: 900, letterSpacing: -3, lineHeight: 1 },
        }, 'Gado'),
        e('span', {
          style: { color: '#4ade80', fontSize: 96, fontWeight: 900, letterSpacing: -3, lineHeight: 1 },
        }, 'Control')
      ),

      // Tagline
      e('div', { style: { display: 'flex', marginBottom: 52 } },
        e('span', {
          style: {
            color: 'rgba(240,253,244,0.80)',
            fontSize: 33,
            fontWeight: 500,
            lineHeight: 1.4,
            maxWidth: 800,
          },
        }, 'Todo dia sem controle é dinheiro saindo sem você ver.')
      ),

      // Badges
      e('div', { style: { display: 'flex', flexDirection: 'row' } },
        e('div', {
          style: {
            display: 'flex', alignItems: 'center',
            backgroundColor: 'rgba(34,197,94,0.12)',
            borderRadius: 100,
            paddingTop: 10, paddingBottom: 10, paddingLeft: 22, paddingRight: 22,
            marginRight: 16,
          },
        },
          e('div', { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4ade80', marginRight: 10, display: 'flex' } }),
          e('span', { style: { color: '#86efac', fontSize: 18, fontWeight: 700 } }, 'Offline first')
        ),

        e('div', {
          style: {
            display: 'flex', alignItems: 'center',
            backgroundColor: 'rgba(34,197,94,0.12)',
            borderRadius: 100,
            paddingTop: 10, paddingBottom: 10, paddingLeft: 22, paddingRight: 22,
            marginRight: 16,
          },
        },
          e('div', { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4ade80', marginRight: 10, display: 'flex' } }),
          e('span', { style: { color: '#86efac', fontSize: 18, fontWeight: 700 } }, '14 dias grátis')
        ),

        e('div', {
          style: {
            display: 'flex', alignItems: 'center',
            backgroundColor: 'rgba(34,197,94,0.12)',
            borderRadius: 100,
            paddingTop: 10, paddingBottom: 10, paddingLeft: 22, paddingRight: 22,
          },
        },
          e('div', { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4ade80', marginRight: 10, display: 'flex' } }),
          e('span', { style: { color: '#86efac', fontSize: 18, fontWeight: 700 } }, 'Sem cartão')
        )
      )
    ),
    { width: 1200, height: 630 }
  );
}
