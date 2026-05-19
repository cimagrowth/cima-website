import DOMPurify from 'isomorphic-dompurify';

const ALLOWED_TAGS = [
  'h2', 'h3', 'h4', 'p', 'a', 'strong', 'em',
  'ul', 'ol', 'li', 'blockquote', 'br',
];

const ALLOWED_ATTR = ['href', 'target', 'rel'];

const INTERNAL_HOSTS = new Set([
  'cimagrowth.com',
  'www.cimagrowth.com',
]);

export function sanitizeBlogHtml(raw: string): string {
  const clean = DOMPurify.sanitize(raw, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  });

  return clean.replace(/<a\s+([^>]*?)>/gi, (match, attrs: string) => {
    const hrefMatch = attrs.match(/href\s*=\s*"([^"]*)"/i);
    if (!hrefMatch) return match;
    const href = hrefMatch[1];

    let isExternal = false;
    try {
      const url = new URL(href, 'https://www.cimagrowth.com');
      isExternal = !INTERNAL_HOSTS.has(url.hostname);
    } catch {
      isExternal = false;
    }

    if (!isExternal) return match;

    let next = attrs;
    next = /target\s*=/i.test(next)
      ? next.replace(/target\s*=\s*"[^"]*"/i, 'target="_blank"')
      : `${next} target="_blank"`;
    next = /rel\s*=/i.test(next)
      ? next.replace(/rel\s*=\s*"[^"]*"/i, 'rel="noopener noreferrer"')
      : `${next} rel="noopener noreferrer"`;

    return `<a ${next.trim()}>`;
  });
}
