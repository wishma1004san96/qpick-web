import type { Metadata } from 'next';

import BlogPost from '@/pageComponents/BlogPost';
import { blogs } from '@/data/blogs';
import { findBlogBySlug, getBlogSlug } from '@/utils/blogSlug';
import { buildMetadata } from '@/utils/seo';

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: getBlogSlug(blog) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = findBlogBySlug(blogs, slug);

  if (!blog) {
    return buildMetadata({
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: blog.title,
    description: blog.subtitle || blog.introduction || 'Read travel insights and destination stories from Q Pick.',
    path: `/blog/${slug}`,
    images: [blog.heroImage || blog.image || '/assets/images/blog/blog1.jpeg'],
    type: 'article',
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogPost slug={slug} />;
}

