import { ImageResponse } from 'next/og';

// Static, brand-accurate social card for /training.
// File-convention route -> Next.js auto-injects og:image + twitter:image.
export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Training and Certification for B2B | Cima';

// Brand tokens (must match Tailwind config)
const TEAL = '#1B4D5C';
const OFF_WHITE = '#FDFBF7';
const CLAY = '#D2693B';
const ORANGE = '#F97316';
const SAND = '#E7DCC8';

const TITLE = 'Your customers need training. You built a folder of videos.';
const SUB = 'Onboarding, training, and certification for the companies you sell to.';

const GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,!?:;'\"()[]{}@#$%&*-+=/\\|<>~`^_.";

async function loadGoogleFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer | null> {
  const url =
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}` +
    `:wght@${weight}&text=${encodeURIComponent(text)}`;
  try {
    const cssRes = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    if (!cssRes.ok) return null;
    const css = await cssRes.text();
    const match = css.match(
      /src:\s*url\(([^)]+)\)\s*format\('(?:opentype|truetype)'\)/,
    );
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const [fraunces, jakarta, dmSans] = await Promise.all([
    loadGoogleFont('Fraunces', 340, GLYPHS + TITLE),
    loadGoogleFont('Plus Jakarta Sans', 700, GLYPHS),
    loadGoogleFont('DM Sans', 400, GLYPHS + SUB),
  ]);

  const fonts: NonNullable<
    ConstructorParameters<typeof ImageResponse>[1]
  >['fonts'] = [];
  if (fraunces)
    fonts.push({ name: 'Fraunces', data: fraunces, weight: 300, style: 'normal' });
  if (jakarta)
    fonts.push({
      name: 'Plus Jakarta Sans',
      data: jakarta,
      weight: 700,
      style: 'normal',
    });
  if (dmSans)
    fonts.push({ name: 'DM Sans', data: dmSans, weight: 400, style: 'normal' });

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: TEAL,
          color: OFF_WHITE,
          padding: '80px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: '"DM Sans"',
        }}
      >
        {/* Decorative accent orb */}
        <div
          style={{
            position: 'absolute',
            right: '-120px',
            top: '-120px',
            width: '420px',
            height: '420px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(249, 115, 22, 0.14)',
            display: 'flex',
          }}
        />

        {/* Eyebrow */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              width: '72px',
              height: '4px',
              backgroundColor: ORANGE,
              marginBottom: '24px',
              display: 'flex',
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: '22px',
              letterSpacing: '6px',
              color: SAND,
              textTransform: 'uppercase',
            }}
          >
            Training and certification
          </div>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
          <div
            style={{
              fontSize: '64px',
              lineHeight: 1.12,
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: OFF_WHITE,
              fontFamily: '"Fraunces", "Plus Jakarta Sans"',
              display: 'flex',
              maxWidth: '940px',
            }}
          >
            {TITLE}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '26px',
              color: 'rgba(253, 251, 247, 0.82)',
              marginBottom: '28px',
              maxWidth: '860px',
            }}
          >
            {SUB}
          </div>
          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: 'rgba(253, 251, 247, 0.2)',
              marginBottom: '28px',
              display: 'flex',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 700,
                fontFamily: '"Plus Jakarta Sans"',
                color: OFF_WHITE,
              }}
            >
              Cima
            </span>
            <span
              style={{
                fontSize: '32px',
                color: 'rgba(253, 251, 247, 0.7)',
                marginLeft: '12px',
              }}
            >
              Growth Solutions
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
