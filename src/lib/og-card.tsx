import { ImageResponse } from 'next/og';

// Shared social card for the GrowthOS Map pages (/, /map, /keep).
// Same approach as src/app/consent/opengraph-image.tsx.

export const OG_SIZE = { width: 1200, height: 630 };

const TEAL_DEEP = '#143038';
const PAPER = '#FDFBF7';
const CLAY_SOFT = '#F2B48E';
const CLAY_DEEP = '#B5501C';
const MIST = '#E7EFEC';

const GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,!?:;'\"()[]{}@#$%&*-+=/\\|<>~`^_·";

async function loadGoogleFont(family: string, weight: number, text: string): Promise<ArrayBuffer | null> {
  const url =
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}` +
    `:wght@${weight}&text=${encodeURIComponent(text)}`;
  try {
    const cssRes = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!cssRes.ok) return null;
    const css = await cssRes.text();
    const match = css.match(/src:\s*url\(([^)]+)\)\s*format\('(?:opentype|truetype)'\)/);
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

export async function renderOgCard({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub: string;
}) {
  const [fraunces, dmSans, dmSansBold] = await Promise.all([
    loadGoogleFont('Fraunces', 500, GLYPHS + title),
    loadGoogleFont('DM Sans', 400, GLYPHS + sub),
    loadGoogleFont('DM Sans', 700, GLYPHS + eyebrow),
  ]);

  const fonts: NonNullable<ConstructorParameters<typeof ImageResponse>[1]>['fonts'] = [];
  if (fraunces) fonts.push({ name: 'Fraunces', data: fraunces, weight: 500, style: 'normal' });
  if (dmSans) fonts.push({ name: 'DM Sans', data: dmSans, weight: 400, style: 'normal' });
  if (dmSansBold) fonts.push({ name: 'DM Sans', data: dmSansBold, weight: 700, style: 'normal' });

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: TEAL_DEEP,
          color: PAPER,
          padding: '72px 80px',
          fontFamily: '"DM Sans"',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '9999px',
              backgroundColor: CLAY_DEEP,
              marginRight: '16px',
              display: 'flex',
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: CLAY_SOFT,
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '70px',
              lineHeight: 1.08,
              fontWeight: 500,
              letterSpacing: '-0.02em',
              fontFamily: '"Fraunces"',
              maxWidth: '1000px',
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: '28px', color: MIST, marginBottom: '28px', maxWidth: '980px' }}>
            {sub}
          </div>
          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: 'rgba(253, 251, 247, 0.2)',
              marginBottom: '24px',
              display: 'flex',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'baseline', fontSize: '30px' }}>
            <span style={{ fontWeight: 700 }}>GrowthOS</span>
            <span style={{ marginLeft: '10px', color: 'rgba(253, 251, 247, 0.75)' }}>by Cima Growth Solutions</span>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
