import sanitizeHtml from 'sanitize-html';

const ALLOWED_TAGS = [
  'h2', 'h3', 'h4', 'p', 'a', 'strong', 'em',
  'ul', 'ol', 'li', 'blockquote', 'br',
];

const INTERNAL_HOSTS = new Set([
  'cimagrowth.com',
  'www.cimagrowth.com',
]);

export function sanitizeBlogHtml(raw: string): string {
  return sanitizeHtml(raw, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: { a: ['href', 'target', 'rel'] },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href;
        let isExternal = false;
        if (href) {
          try {
            const url = new URL(href, 'https://cimagrowth.com');
            isExternal =
              (url.protocol === 'http:' || url.protocol === 'https:') &&
              !INTERNAL_HOSTS.has(url.hostname);
          } catch {
            isExternal = false;
          }
        }
        const attribsOut = { ...attribs };
        if (isExternal) {
          attribsOut.target = '_blank';
          attribsOut.rel = 'noopener noreferrer';
        }
        return { tagName, attribs: attribsOut };
      },
    },
  });
}
