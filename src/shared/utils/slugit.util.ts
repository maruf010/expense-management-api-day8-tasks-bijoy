/* eslint-disable prettier/prettier */
export const slugify = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    // eslint-disable-next-line no-useless-escape
    .replace(/[^a-z0-9\-]/g, '');
