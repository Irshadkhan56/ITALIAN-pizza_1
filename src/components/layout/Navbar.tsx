import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, Phone, ShoppingBag, X } from 'lucide-react';
import { CategoryId, RoutePath } from '../../types';
import { RESTAURANT_INFO } from '../../data/menu';
import { useCart } from '../../context/CartContext';
import { cn } from '../../lib/utils';

interface NavbarProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath, category?: CategoryId) => void;
}

const NAV_LINKS: Array<{ label: string; path: RoutePath }> = [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar({ currentPath, onNavigate }: NavbarProps) {
  const { itemCount, openDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (path: RoutePath) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 h-16 sm:h-[72px] bg-[#FFF9F2]/95 backdrop-blur-md border-b border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Custom Typographic Wordmark */}
        <button
          type="button"
          onClick={() => handleLinkClick('/')}
          className="font-display text-xl sm:text-2xl font-bold tracking-[-0.03em] text-[#191714] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9362B] rounded-sm"
        >
          Italian <span className="text-[#D9362B]">Pizza</span>
        </button>

        {/* Zone 2: Center Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6E665E]"
        >
          {NAV_LINKS.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                type="button"
                onClick={() => handleLinkClick(link.path)}
                className={cn(
                  'relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer',
                  isActive ? 'text-[#191714] font-semibold' : 'hover:text-[#191714]'
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#D9362B]"
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Call Now & Cart */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={RESTAURANT_INFO.phoneHref}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-xl border border-[#EAE3DA] bg-white text-sm font-medium text-[#25211E] hover:border-[#191714] transition-colors whitespace-nowrap shrink-0"
          >
            <Phone className="w-4 h-4 text-[#D9362B]" strokeWidth={2} />
            <span>Call Now</span>
          </a>

          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Open shopping cart with ${itemCount} items`}
            className="relative inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 min-h-[42px] min-w-[44px] rounded-xl bg-[#D9362B] text-white text-sm font-semibold hover:bg-[#BD2B21] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={2} />
            <span className="hidden sm:inline">Cart</span>
            <span className="tabular-nums font-semibold">({itemCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl text-[#191714] hover:bg-[#F4EDE4] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Polished Mobile Slide-Out Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#FFF9F2] border-b border-[#EAE3DA] shadow-xl"
          >
            <nav aria-label="Mobile navigation" className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    type="button"
                    onClick={() => handleLinkClick(link.path)}
                    className={cn(
                      'w-full text-left px-4 py-3 min-h-[44px] rounded-xl text-base font-medium transition-colors cursor-pointer',
                      isActive
                        ? 'bg-white text-[#D9362B] font-semibold border border-[#EAE3DA]'
                        : 'text-[#25211E] hover:bg-[#F4EDE4]'
                    )}
                  >
                    {link.label}
                  </button>
                );
              })}

              <div className="pt-3 mt-3 border-t border-[#EAE3DA] flex flex-col gap-2.5">
                <a
                  href={RESTAURANT_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 min-h-[44px] rounded-xl border border-[#EAE3DA] bg-white text-sm font-semibold text-[#25211E]"
                >
                  <Phone className="w-4 h-4 text-[#D9362B]" />
                  <span>Call Now · {RESTAURANT_INFO.phoneDisplay}</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/cart')}
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 min-h-[44px] rounded-xl bg-[#191714] text-white text-sm font-semibold cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>View Cart ({itemCount})</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
