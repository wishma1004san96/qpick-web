'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const navElement = navRef.current;
    if (!navElement) return;

    const updateNavbarHeight = () => {
      const navbarHeight = Math.ceil(navElement.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
    };

    updateNavbarHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateNavbarHeight();
    });

    resizeObserver.observe(navElement);
    window.addEventListener('resize', updateNavbarHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/tours', label: 'Tours' },
    { path: '/tailor-made-tours', label: 'Tailor Made Tours' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/vehicles', label: 'Vehicles' },
    { path: '/about', label: 'About' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact Us' }
  ];

  const isActive = (path: string) => {
    const currentPath = pathname || '/';
    if (path === '/' && currentPath !== '/') return false;
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed w-full z-[10000] transition-all duration-300 ${
        scrolled || isMenuOpen
          ? 'bg-white dark:bg-[#0B1120] shadow-lg py-3' 
          : 'bg-transparent py-4'
      }`}
    >
    <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {}
          <Link href="/" className="flex items-center space-x-3 z-50">
            <Image
              src="/images/logo/qpick-logo.webp"
              alt="Logo"
              width={80}
              height={60}
              className="w-20 h-15 object-contain"
              priority
            />
          </Link>


          {}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map(({ path, label }) => (
              <Link 
                key={path}
                href={path}
                className={`relative py-2 transition-colors ${
                  (scrolled || isMenuOpen)
                    ? 'text-gray-900 dark:text-white hover:text-primary'
                    : 'text-white hover:text-gray-200'
                } ${isActive(path) ? 'font-semibold' : 'font-normal'}
                `}
              >
                {label}
                {isActive(path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform"></span>
                )}
              </Link>
            ))}

            {}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-110 ${
                scrolled 
                  ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              aria-label={mounted ? (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode') : 'Toggle theme'}
            >
              {!mounted ? (
                <Moon className={`w-5 h-5 ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`} />
              ) : theme === 'dark' ? (
                <Sun className={`w-5 h-5 ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`} />
              ) : (
                <Moon className={`w-5 h-5 ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`} />
              )}
            </button>
          </div>

          {}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-full z-[10020] transition-colors ${
              isMenuOpen 
                ? 'bg-gray-100 dark:bg-gray-800' 
                : scrolled 
                  ? 'bg-gray-100 dark:bg-gray-800' 
                  : 'bg-white/10'
            }`}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${
                scrolled || isMenuOpen ? 'text-gray-900 dark:text-white' : 'text-white'
              }`} />
            ) : (
              <Menu className={`w-6 h-6 ${
                scrolled ? 'text-gray-900 dark:text-white' : 'text-white'
              }`} />
            )}
          </button>

          {}
          <div className={`lg:hidden fixed inset-0 z-[10010] bg-white dark:bg-[#0B1120] transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="flex flex-col h-full pt-6 pb-6 px-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-3" onClick={() => setIsMenuOpen(false)}>
                  <Image
                    src="/images/logo/qpick-logo.webp"
                    alt="Logo"
                    width={80}
                    height={60}
                    className="w-20 h-15 object-contain"
                    priority
                  />
                </Link>
              </div>

              <div className="mt-6 h-px bg-gray-200 dark:bg-gray-800" aria-hidden />
              {}
              <div className="flex-1">
                {navLinks.map(({ path, label }) => (
                  <Link
                    key={path}
                    href={path}
                    className={`block py-4 text-lg font-medium transition-colors ${
                      isActive(path)
                        ? 'text-primary'
                        : 'text-gray-900 dark:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {}
              <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                <button
                  onClick={toggleTheme}
                  className="flex items-center w-full py-4 text-lg font-medium text-gray-900 dark:text-white cursor-pointer"
                >
                  <span className="flex-1">
                    {!mounted ? 'Theme' : theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                  {!mounted ? (
                    <Moon className="w-5 h-5" />
                  ) : theme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

