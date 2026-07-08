import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, MapPin, ArrowLeft, Star } from 'lucide-react';
import { blogs, type Blog } from '../data/blogs';
import { findBlogBySlug } from '@/utils/blogSlug';

type BlogPostProps = {
  id?: string;
  slug?: string;
};

const BlogPost = ({ id, slug }: BlogPostProps) => {
  const blog = slug
    ? findBlogBySlug(blogs, slug)
    : id && !Number.isNaN(Number(id))
      ? blogs.find((b: Blog) => b.id === Number(id))
      : undefined;

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
        <Link 
          href="/blog"
          className="text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </Link>
      </div>
    );
  }

  const heroImage = blog.heroImage ?? blog.image ?? '/assets/images/blog/blog1.jpeg';

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120]">
      <header className="relative w-full h-[56svh] sm:h-[64svh] lg:h-[72svh] overflow-hidden">
        <Image
          src={heroImage}
          alt={blog.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-4 pb-10 sm:pb-14">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-white/85">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-white/60">/</li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li className="text-white/60">/</li>
                <li className="text-white line-clamp-1">{blog.title}</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/90 text-sm mb-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur">
                  <Clock className="w-4 h-4" />
                  {blog.readTime}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur">
                  <Calendar className="w-4 h-4" />
                  {blog.date}
                </span>
                {blog.location && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur">
                    <MapPin className="w-4 h-4" />
                    {blog.location}
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display leading-tight">
                {blog.title}
              </h1>

              {blog.subtitle && (
                <p className="mt-4 text-lg sm:text-xl text-white/90 leading-relaxed">
                  {blog.subtitle}
                </p>
              )}

              {blog.imageCredit && (
                <p className="mt-5 text-xs text-white/70">
                  {blog.imageCredit}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="mb-8 text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>

          <div className="flex items-center mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2940&auto=format&fit=crop"
                alt={blog.author}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-bold text-gray-900 dark:text-white">{blog.author}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Travel Writer & Photographer</div>
              </div>
            </div>
          </div>

          {blog.introduction && (
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">{blog.introduction}</p>
            </div>
          )}

          {blog.content && (
            <div className="space-y-12">
              {blog.content.highlights && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Highlights</h2>
                  <div className="grid grid-cols-1 gap-8">
                    {blog.content.highlights.map((highlight, index) => (
                      <div key={index} className="bg-white dark:bg-[#1C2537] rounded-xl overflow-hidden shadow-lg">
                        <div className="relative h-64">
                          <Image
                            src={highlight.image}
                            alt={highlight.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 1200px"
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{highlight.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{highlight.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {blog.content.activities && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Activities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {blog.content.activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 bg-white dark:bg-[#1C2537] p-4 rounded-lg">
                        <Star className="w-5 h-5 text-primary" />
                        <span className="text-gray-700 dark:text-gray-300">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {blog.content.accommodation && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Where to Stay</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blog.content.accommodation.map((acc, index) => (
                      <div key={index} className="bg-white dark:bg-[#1C2537] p-6 rounded-xl">
                        <h3 className="font-bold mb-2 text-gray-900 dark:text-white">{acc.type}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{acc.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {blog.content.dining && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Where to Eat</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blog.content.dining.map((dining, index) => (
                      <div key={index} className="bg-white dark:bg-[#1C2537] p-6 rounded-xl">
                        <h3 className="font-bold mb-2 text-gray-900 dark:text-white">{dining.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{dining.specialty}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {blog.content.travelTips && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Travel Tips</h2>
                  <div className="bg-white dark:bg-[#1C2537] p-6 rounded-xl">
                    <ul className="space-y-4">
                      {blog.content.travelTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Star className="w-5 h-5 text-primary shrink-0 mt-1" />
                          <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default BlogPost;