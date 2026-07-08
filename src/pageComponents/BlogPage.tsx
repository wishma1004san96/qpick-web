'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Clock, MapPin, Calendar } from 'lucide-react';
import { blogs } from '../data/blogs';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import { getBlogSlug } from '@/utils/blogSlug';



const BlogPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120]">
      <PageHero
        title="Blog"
        subtitle="Stories, tips, and destination guides to help you plan your Sri Lanka journey."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => {
            const coverImage = blog.heroImage ?? blog.image ?? '/assets/images/blog/blog1.jpeg';
            return (
              <AnimatedSection
                key={blog.id}
                animation="scale-up"
                delay={index * 100}
              >
                <article 
                  className="group cursor-pointer bg-white dark:bg-[#1C2537]/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300"
                  onClick={() => router.push(`/blog/${getBlogSlug(blog)}`)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={coverImage}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {blog.location && (
                      <div className="absolute bottom-4 left-4 flex items-center text-white/90 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{blog.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{blog.readTime}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{blog.date}</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h2>

                    {blog.subtitle && (
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {blog.subtitle}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        By {blog.author}
                      </span>
                      <span className="text-primary group-hover:translate-x-2 transition-transform">
                        Read More →
                      </span>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;