import { ImageResponse } from 'next/og';

// Brand-accurate dynamic social card for each blog post.
// File-convention route → Next.js auto-injects og:image + twitter:image.
export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Cima Growth Solutions — blog post';

const FALLBACK_TITLE = 'Cima Growth Solutions — Fertility Marketing';

// Brand tokens (do not change — must match Tailwind config)
const TEAL = '#1B4D5C';
const OFF_WHITE = '#FDFBF7';
const ORANGE = '#F97316';

// Glyph set requested from Google Fonts so dynamic titles render with the
// brand fonts (Google returns a ttf subset, which satori/next-og can parse).
const GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,!?:;'\"()[]{}@#$%&*-+=/\\|<>~`^_…—–’‘“”";

interface PostMeta {
  title: string;
  reading_time_minutes: number | null;
}

async function fetchPost(slug: string): Promise<PostMeta | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Public anon key only — never a service-role key in the edge bundle.
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;

  try {
    const endpoint =
      `${url}/rest/v1/website_blog_posts` +
      `?slug=eq.${encodeURIComponent(slug)}` +
      `&status=eq.published` +
      `&select=title,reading_time_minutes,meta_title&limit=1`;

    const res = await fetch(endpoint, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    if (!res.ok) return null;

    const rows = (await res.json()) as Array<{
      title: string | null;
      reading_time_minutes: number | null;
    }>;
    const row = rows?.[0];
    if (!row?.title) return null;

    return {
      title: row.title,
      reading_time_minutes: row.reading_time_minutes,
    };
  } catch {
    return null;
  }
}

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

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const post = await fetchPost(params.slug);
  const rawTitle = post?.title ?? FALLBACK_TITLE;
  // Guard against pathologically long titles; line-clamp handles the rest.
  const title = rawTitle.length > 160 ? `${rawTitle.slice(0, 157)}…` : rawTitle;
  const readingLabel =
    post?.reading_time_minutes && post.reading_time_minutes > 0
      ? `${post.reading_time_minutes} min read`
      : null;

  // Load brand fonts (graceful: render even if a fetch fails — never throw).
  const [jakarta, dmSans] = await Promise.all([
    loadGoogleFont('Plus Jakarta Sans', 700, GLYPHS + title),
    loadGoogleFont('DM Sans', 400, GLYPHS),
  ]);

  const fonts: NonNullable<
    ConstructorParameters<typeof ImageResponse>[1]
  >['fonts'] = [];
  if (jakarta)
    fonts.push({
      name: 'Plus Jakarta Sans',
      data: jakarta,
      weight: 700,
      style: 'normal',
    });
  if (dmSans)
    fonts.push({
      name: 'DM Sans',
      data: dmSans,
      weight: 400,
      style: 'normal',
    });

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
        {/* Oversized 47 watermark */}
        <div
          style={{
            position: 'absolute',
            right: '-30px',
            bottom: '-140px',
            fontSize: '460px',
            lineHeight: 1,
            fontWeight: 700,
            color: 'rgba(249, 115, 22, 0.08)',
            fontFamily: '"Plus Jakarta Sans"',
            display: 'flex',
          }}
        >
          47
        </div>

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
              color: ORANGE,
              textTransform: 'uppercase',
            }}
          >
            The 47 Frameworks
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              lineHeight: 1.15,
              fontWeight: 700,
              color: OFF_WHITE,
              fontFamily: '"Plus Jakarta Sans"',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden',
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: 'rgba(253, 251, 247, 0.2)',
              marginBottom: '28px',
              display: 'flex',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
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
            {readingLabel ? (
              <div
                style={{
                  display: 'flex',
                  fontSize: '26px',
                  color: 'rgba(253, 251, 247, 0.85)',
                }}
              >
                {readingLabel}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
