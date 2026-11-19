import { Clock, MapPin, Phone } from 'lucide-react';
import { CategoryId, RoutePath } from '../../types';
import { MENU_CATEGORIES, RESTAURANT_INFO } from '../../data/menu';

interface FooterProps {
  onNavigate: (path: RoutePath, category?: CategoryId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#191714] text-white/85 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="font-display text-2xl font-bold tracking-[-0.03em] text-white cursor-pointer"
            >
              Italian <span className="text-[#D9362B]">Pizza</span>
            </button>
            <p className="text-sm text-white/65 leading-relaxed max-w-xs">
              Freshly prepared pizzas, crispy chicken, Zinger burgers, and seasoned fries in Dera Ismail Khan. Open 24 hours for dine-in, takeaway, and no-contact delivery.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-white/60">
              <span>Instagram</span>
              <span aria-hidden="true">·</span>
              <span>Facebook</span>
              <span aria-hidden="true">·</span>
              <span>WhatsApp</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Explore Menu
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact &amp; Location
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/cart')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shopping Cart
                </button>
              </li>
            </ul>
          </div>

          {/* Menu Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4">
              Menu Categories
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              {MENU_CATEGORIES.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate('/menu', category.id)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Opening Hours */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4">
              Contact &amp; Hours
            </h3>
            <ul className="space-y-3.5 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D9362B] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D9362B] shrink-0" />
                <a
                  href={RESTAURANT_INFO.phoneHref}
                  className="hover:text-white transition-colors tabular-nums"
                >
                  {RESTAURANT_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D9362B] shrink-0" />
                <span>{RESTAURANT_INFO.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/55">
          <p>
            © {new Date().getFullYear()} {RESTAURANT_INFO.name}, Dera Ismail Khan. All rights reserved.
          </p>
          <p>
            Frontend MVP Preview · Sample PKR prices shown for demonstration.
          </p>
        </div>
      </div>
    </footer>
  );
}
