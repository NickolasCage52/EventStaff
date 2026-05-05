/**
 * Single source of truth for the public site URL.
 * Priority: SITE_URL → PUBLIC_SITE_URL → NEXT_PUBLIC_SITE_URL → localhost
 */
export function publicSiteUrl(): string {
  const raw =
    process.env.SITE_URL?.trim() ||
    process.env.PUBLIC_SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    'http://localhost:3000';
  return raw.replace(/\/$/, '');
}

/** Convenience: build an absolute path on the site. */
export function siteUrl(path = ''): string {
  return `${publicSiteUrl()}${path}`;
}
