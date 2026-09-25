'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShop } from '@/lib/domain/context';

export function Header() {
  const pathname = usePathname();
  const { cartCount } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/katalog', label: 'Katalog' },
    { href: '/konfigurator', label: 'Konfigurator' },
    { href: '/atelier', label: 'Atelier' },
    { href: '/haendler', label: 'Händleransicht', isBadge: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-[#F7F5F0]/90 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex flex-col focus-visible:ring-2 focus-visible:ring-[#D97724] focus-visible:outline-none"
            aria-label="LUMENWERK Studio — Zur Startseite"
          >
            <span className="font-serif text-2xl font-normal tracking-[0.18em] text-[#1E1D1B] uppercase transition-colors group-hover:text-[#D97724]">
              LUMENWERK
            </span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-stone-700 uppercase">
              Atelier Wien & Berlin
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Hauptnavigation"
        >
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? 'text-[#8F4400] font-bold'
                    : 'text-[#1E1D1B]/80 hover:text-[#1E1D1B]'
                }`}
              >
                {link.label}
                {link.isBadge && (
                  <span className="ml-1.5 rounded-sm bg-stone-200 px-1.5 py-0.5 font-mono text-[10px] text-stone-700 uppercase">
                    Demo
                  </span>
                )}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#8F4400]"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Cart & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/warenkorb"
            className="relative flex items-center gap-2 rounded-sm border border-stone-300 bg-white/70 px-3.5 py-2 text-xs font-medium uppercase tracking-wider text-[#1E1D1B] transition-all hover:border-[#8F4400] hover:bg-white hover:shadow-xs focus-visible:ring-2 focus-visible:ring-[#8F4400]"
            aria-label={`Warenkorb, ${cartCount} Positionen`}
          >
            <svg
              className="h-4 w-4 text-[#1E1D1B]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="hidden sm:inline font-mono">Warenkorb</span>
            <span
              className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 font-mono text-[11px] font-semibold transition-colors ${
                cartCount > 0
                  ? 'bg-[#8F4400] text-white'
                  : 'bg-stone-200 text-stone-700'
              }`}
              data-testid="header-cart-badge"
            >
              {cartCount}
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-stone-300 bg-white/60 text-[#1E1D1B] md:hidden focus-visible:ring-2 focus-visible:ring-[#D97724]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Menü schließen' : 'Hauptmenü öffnen'}
          >
            <span className="sr-only">Menü umschalten</span>
            {mobileMenuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="border-b border-stone-300 bg-[#F7F5F0] px-4 pt-3 pb-6 md:hidden shadow-lg animate-in fade-in duration-150"
          role="region"
          aria-label="Mobiles Navigationsmenü"
        >
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center justify-between rounded-sm px-3 py-2.5 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-white text-[#D97724] font-semibold border-l-4 border-[#D97724]'
                      : 'text-[#1E1D1B] hover:bg-white/60'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  {link.isBadge && (
                    <span className="rounded-sm bg-stone-200 px-2 py-0.5 font-mono text-xs uppercase text-stone-700">
                      Cockpit
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
