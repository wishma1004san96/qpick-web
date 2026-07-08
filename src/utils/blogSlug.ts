import type { Blog } from '@/data/blogs';

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function getBlogSlug(blog: Blog): string {
  // Include the numeric id to keep slugs unique and stable.
  return `${slugify(blog.title)}-${blog.id}`;
}

export function findBlogBySlug(allBlogs: Blog[], slug: string): Blog | undefined {
  const idMatch = slug.match(/-(\d+)$/);
  if (idMatch) {
    const id = Number(idMatch[1]);
    if (!Number.isNaN(id)) {
      const byId = allBlogs.find((b) => b.id === id);
      if (byId) return byId;
    }
  }

  const slugBase = slug.replace(/-\d+$/, '');
  const normalized = slugify(slugBase);
  return allBlogs.find((b) => slugify(b.title) === normalized);
}
