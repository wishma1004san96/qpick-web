'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    text: "Our family trip to Sri Lanka was absolutely magical. The cultural experiences, wildlife encounters, and especially our guide's knowledge made it unforgettable. Highly recommend!",
    author: "Sarah Johnson",
    role: "Family Traveler",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop",
    rating: 5
  },
  {
    text: "As a solo traveler, safety and authenticity were my priorities. This agency delivered on both fronts, providing an immersive Sri Lankan experience while ensuring I felt secure throughout.",
    author: "David Chen",
    role: "Solo Adventurer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop",
    rating: 5
  },
  {
    text: "The attention to detail in our customized honeymoon itinerary was impressive. From boutique hotels to private experiences, everything was perfect!",
    author: "Emma & James",
    role: "Honeymooners",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2940&auto=format&fit=crop",
    rating: 5
  },
  {
    text: "Airport pickup was on time, the vehicle was spotless, and the driver was friendly and professional. We felt comfortable from the first minute.",
    author: "Nadia Perera",
    role: "Airport Transfer",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2940&auto=format&fit=crop",
    rating: 5
  },
  {
    text: "We asked for a flexible itinerary and they delivered—great suggestions, smooth coordination, and plenty of time at each stop without feeling rushed.",
    author: "Michael Roberts",
    role: "Custom Tour",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2940&auto=format&fit=crop",
    rating: 5
  },
  {
    text: "Our group trip was handled perfectly. Clear communication, safe driving, and a comfortable ride even on long routes. Strongly recommended.",
    author: "Aisha Khan",
    role: "Group Traveler",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2940&auto=format&fit=crop",
    rating: 5
  },
  {
    text: "From Kandy to the hill country, everything was seamless. Great local knowledge and thoughtful stops made the journey as enjoyable as the destination.",
    author: "Oliver Martin",
    role: "Nature Explorer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2940&auto=format&fit=crop",
    rating: 5
  }
];

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [testimonialsPerPage, setTestimonialsPerPage] = useState(1);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef(0);
  const isHorizontalSwipeRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)'); // Tailwind md
    const update = () => setTestimonialsPerPage(mq.matches ? 3 : 1);
    update();

    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const getPageItems = (pageIndex: number) => {
    const start = pageIndex * testimonialsPerPage;
    const page = testimonials.slice(start, start + testimonialsPerPage);

    if (page.length >= testimonialsPerPage) return page;

    const missing = testimonialsPerPage - page.length;
    const fillStart = Math.max(0, start - missing);
    const fill = testimonials.slice(fillStart, start);
    return [...fill, ...page];
  };

  const pages = Array.from({ length: totalPages }, (_, pageIndex) => getPageItems(pageIndex));
  const safeCurrentPage = totalPages > 0 ? currentPage % totalPages : 0;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };   

  const goPrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const t = e.touches[0];
    touchStartXRef.current = t.clientX;
    touchStartYRef.current = t.clientY;
    touchDeltaXRef.current = 0;
    isHorizontalSwipeRef.current = false;
    setIsPaused(true);
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const t = e.touches[0];
    const dx = t.clientX - touchStartXRef.current;
    const dy = t.clientY - touchStartYRef.current;
    touchDeltaXRef.current = dx;

    if (!isHorizontalSwipeRef.current) {
      if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
        isHorizontalSwipeRef.current = true;
      }
    }

    if (isHorizontalSwipeRef.current) {
      e.preventDefault();
    }
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    const wasHorizontal = isHorizontalSwipeRef.current;
    const dx = touchDeltaXRef.current;

    // reset refs
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    touchDeltaXRef.current = 0;
    isHorizontalSwipeRef.current = false;

    setIsPaused(false);
    if (!wasHorizontal) return;

    const threshold = 60;
    if (dx > threshold) goPrev();
    if (dx < -threshold) goNext();
  };

  useEffect(() => {
    if (isPaused || totalPages <= 1) return;

    const autoplayMs = 5500;
    const id = window.setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, autoplayMs);

    return () => window.clearInterval(id);
  }, [isPaused, totalPages]);

  return (
    <section
      className="relative overflow-hidden bg-transparent py-20 sm:py-24"
      style={{
        backgroundImage: "url(/assets/images/train.jpeg)", 
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/72 to-white/88 backdrop-blur-[1.5px] dark:from-black/80 dark:via-black/70 dark:to-black/80" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-3 text-slate-900 dark:text-white">What Our Travelers Say</h2>
          <p className="text-slate-600 dark:text-gray-300">
            Real experiences from our valued guests who have explored Sri Lanka with us.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          <div className="relative overflow-hidden max-w-6xl mx-auto">
            <div
              className="flex transition-transform duration-500 ease-out will-change-transform"
              style={{ transform: `translateX(-${safeCurrentPage * 100}%)` }}
            >
              {pages.map((page, pageIndex) => (
                <div key={pageIndex} className="min-w-full px-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {page.map((testimonial, index) => (
                      <div
                        key={`${pageIndex}-${index}`}
                        className="group rounded-2xl border border-slate-200 bg-white/85 p-7 backdrop-blur-md transition-colors duration-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Image
                              src={testimonial.avatar}
                              alt={testimonial.author}
                              width={48}
                              height={48}
                              className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-200 dark:ring-white/10"
                            />
                            <div>
                              <h4 className="font-semibold leading-tight text-slate-900 dark:text-white">{testimonial.author}</h4>
                              <p className="text-sm text-slate-500 dark:text-gray-400">{testimonial.role}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {Array.from({ length: 5 }).map((_, i) => {
                              const filled = i < testimonial.rating;
                              return (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${filled ? 'text-accent fill-accent' : 'text-slate-300 dark:text-white/20'}`}
                                />
                              );
                            })}
                          </div>
                        </div>

                        <div className="mt-5">
                          <Quote className="w-8 h-8 text-slate-300 dark:text-white/20" />
                          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-gray-200/95">
                            {testimonial.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center mt-8 gap-4">
            <button
              type="button"
              onClick={goPrev}
              className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-800 transition hover:bg-slate-50 cursor-pointer dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5 mx-auto" />
            </button>

            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    safeCurrentPage === index
                      ? 'w-8 bg-sky-500 dark:bg-white'
                      : 'w-2 bg-slate-300 hover:bg-slate-400 dark:bg-white/30 dark:hover:bg-white/50'
                  }`}
                  style={{ cursor: 'pointer' }}
                  aria-label={`Go to testimonials page ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-800 transition hover:bg-slate-50 cursor-pointer dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
