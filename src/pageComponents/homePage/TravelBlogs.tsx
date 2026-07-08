'use client';

import React, { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { blogs } from '@/data/blogs';
import { getBlogSlug } from '@/utils/blogSlug';
import AnimatedSection from '@/components/AnimatedSection';

const subscribeToViewport = (onStoreChange: () => void) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('resize', onStoreChange);
  return () => window.removeEventListener('resize', onStoreChange);
};

const getViewportWidth = () => (typeof window === 'undefined' ? 1280 : window.innerWidth);

const getSlidesPerView = (viewportWidth: number) => {
  if (viewportWidth >= 1024) return 3;
  if (viewportWidth >= 768) return 2;
  return 1;
};

interface HomeBlogCarouselProps {
  slidesPerView: number;
}

const HomeBlogCarousel = ({ slidesPerView }: HomeBlogCarouselProps) => {
  const totalSlides = blogs.length;
  const cloneCount = slidesPerView;
  const loopedBlogs = useMemo(
    () => [
      ...blogs.slice(-cloneCount),
      ...blogs,
      ...blogs.slice(0, cloneCount),
    ],
    [cloneCount]
  );
  const [currentIndex, setCurrentIndex] = useState(cloneCount);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const goToNext = () => {
    setIsAnimating(true);
    setCurrentIndex((previousIndex) => previousIndex + 1);
  };

  const goToPrevious = () => {
    setIsAnimating(true);
    setCurrentIndex((previousIndex) => previousIndex - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= totalSlides + cloneCount) {
      setIsAnimating(false);
      setCurrentIndex(cloneCount);
      return;
    }

    if (currentIndex < cloneCount) {
      setIsAnimating(false);
      setCurrentIndex(currentIndex + totalSlides);
    }
  };

  useEffect(() => {
    if (isAnimating) return;

    const animationFrame = window.requestAnimationFrame(() => {
      setIsAnimating(true);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [isAnimating]);

  useEffect(() => {
    if (isHovered) return;

    const intervalId = window.setInterval(() => {
      goToNext();
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [currentIndex, isHovered]);

  const activeDotIndex = ((currentIndex - cloneCount) % totalSlides + totalSlides) % totalSlides;

  return (
    <div
      className="mt-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
              transition: isAnimating ? 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {loopedBlogs.map((blog, index) => (
              <div
                key={`${blog.id}-${index}`}
                className="shrink-0 basis-full px-3 md:basis-1/2 lg:basis-1/3"
                style={{ flexBasis: `${100 / slidesPerView}%` }}
              >
                <Link
                  href={`/blog/${getBlogSlug(blog)}`}
                  className="group block h-full"
                >
                  <div className="h-full overflow-hidden rounded-3xl border border-gray-200/70 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_26px_70px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.09]">
                    <div className="relative overflow-hidden rounded-t-3xl">
                      <Image
                        src={blog.heroImage || blog.image || '/assets/images/blog/blog1.jpeg'}
                        alt={blog.title}
                        width={800}
                        height={480}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                          <Clock className="h-4 w-4" />
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex h-[calc(100%-18rem)] flex-col p-6">
                      <h3 className="line-clamp-2 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary dark:text-white">
                        {blog.title}
                      </h3>

                      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                        {blog.date} · by {blog.author}
                      </p>

                      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                        {blog.subtitle || blog.introduction}
                      </p>

                      <div className="mt-auto pt-6">
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-300 group-hover:text-primary-dark dark:group-hover:text-primary-light">
                          Read article
                          <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200/80 bg-white/90 p-3 text-gray-900 shadow-lg backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-white dark:border-white/10 dark:bg-[#1C2537]/90 dark:text-white lg:flex"
          aria-label="Previous blog posts"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200/80 bg-white/90 p-3 text-gray-900 shadow-lg backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-white dark:border-white/10 dark:bg-[#1C2537]/90 dark:text-white lg:flex"
          aria-label="Next blog posts"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={goToPrevious}
          className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-sm transition-all duration-300 hover:scale-110 hover:border-primary hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-white lg:hidden"
          aria-label="Previous blog posts"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center justify-center gap-2">
          {blogs.map((blog, index) => (
            <button
              key={blog.id}
              onClick={() => {
                setIsAnimating(true);
                setCurrentIndex(index + cloneCount);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeDotIndex === index
                  ? 'w-8 bg-primary'
                  : 'w-2.5 bg-gray-300 hover:bg-primary/50 dark:bg-white/20 dark:hover:bg-white/40'
              }`}
              aria-label={`Go to blog slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-sm transition-all duration-300 hover:scale-110 hover:border-primary hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-white lg:hidden"
          aria-label="Next blog posts"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const TravelBlogs = () => {
  const viewportWidth = useSyncExternalStore(subscribeToViewport, getViewportWidth, () => 1280);
  const slidesPerView = getSlidesPerView(viewportWidth);

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 dark:bg-[#0B1120]">
      <div className="absolute inset-x-0 top-0 h-px bg-gray-200/70 dark:bg-white/10" aria-hidden />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection animation="slide-up">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary-dark dark:bg-white/10 dark:text-white">
                <span className="h-2 w-2 rounded-full bg-primary dark:bg-white/80" />
                <span className="text-sm font-semibold tracking-wide">Travel Blogs</span>
              </div>

              <h2 className="mt-5 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                Travel Blogs
              </h2>

              <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                Discover incredible destinations and travel experiences through our curated collection of travel stories.
              </p>
            </div>
          </AnimatedSection>

          <HomeBlogCarousel key={slidesPerView} slidesPerView={slidesPerView} />
        </div>
      </div>
    </section>
  );
}

export default TravelBlogs;