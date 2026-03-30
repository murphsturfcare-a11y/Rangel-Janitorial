'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* Track scroll position */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll(); // initialise on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const linkClass = 'font-body text-sm font-medium transition-colors duration-300 hover:text-sage text-charcoal';

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8"
        aria-label="Main navigation"
      >
        {/* ---- Logo ---- */}
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Link
            href="/"
            className="flex items-center gap-2 transition-colors duration-300"
            aria-label="Rangel Janitorial — Home"
          >
            <Image
              src="/images/logo.webp"
              alt="Rangel Janitorial"
              width={480}
              height={235}
              priority
              className="h-16 w-auto object-contain"
            />
          </Link>
        </motion.div>

        {/* ---- Desktop nav ---- */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          <Link href="/" className={linkClass}>
            Home
          </Link>

          <Link href="/services" className={linkClass}>
            Services
          </Link>

          <Link href="/locations" className={linkClass}>
            Locations
          </Link>

          <Link href="/blog" className={linkClass}>
            Blog
          </Link>
        </div>

        {/* ---- Desktop CTA ---- */}
        <Link
          href="/locations"
          className="hidden lg:inline-flex bg-sage text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-forest transition-colors duration-200"
        >
          Get Free Quote
        </Link>

        {/* ---- Mobile hamburger ---- */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="lg:hidden text-charcoal transition-colors duration-300"
          aria-label="Open menu"
        >
          <Menu className="h-7 w-7" />
        </button>
      </nav>

      {/* ================================================================ */}
      {/*  Mobile drawer                                                    */}
      {/* ================================================================ */}

      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              aria-hidden="true"
              onClick={closeDrawer}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <Link
                  href="/"
                  onClick={closeDrawer}
                  className="flex items-center gap-2 text-forest"
                  aria-label="Rangel Janitorial — Home"
                >
                  <Image
                    src="/images/logo.webp"
                    alt="Rangel Janitorial"
                    width={360}
                    height={177}
                    className="h-12 w-auto object-contain"
                  />
                </Link>

                <button
                  type="button"
                  onClick={closeDrawer}
                  className="text-charcoal-light hover:text-charcoal transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Drawer body */}
              <div className="overflow-y-auto h-[calc(100%-73px)] px-5 py-4">
                <Link
                  href="/"
                  onClick={closeDrawer}
                  className="block py-3 font-body text-base font-medium text-charcoal transition-colors hover:text-forest"
                >
                  Home
                </Link>

                <Link
                  href="/services"
                  onClick={closeDrawer}
                  className="block py-3 font-body text-base font-medium text-charcoal transition-colors hover:text-forest"
                >
                  Services
                </Link>

                <Link
                  href="/locations"
                  onClick={closeDrawer}
                  className="block py-3 font-body text-base font-medium text-charcoal transition-colors hover:text-forest"
                >
                  Locations
                </Link>

                <Link
                  href="/blog"
                  onClick={closeDrawer}
                  className="block py-3 font-body text-base font-medium text-charcoal transition-colors hover:text-forest"
                >
                  Blog
                </Link>

                {/* CTA */}
                <Link
                  href="/locations"
                  onClick={closeDrawer}
                  className="mt-6 block text-center bg-sage text-white px-5 py-3 rounded-lg font-semibold hover:bg-forest transition-colors duration-200"
                >
                  Get Free Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
