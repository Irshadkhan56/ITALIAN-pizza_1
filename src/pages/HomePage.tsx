import { motion } from 'motion/react';
import {
  ArrowRight,
  Clock,
  ExternalLink,
  Flame,
  MapPin,
  Phone,
  Star,
  Utensils,
} from 'lucide-react';
import { CategoryId, MenuItem, RoutePath } from '../types';
import {
  DEMO_REVIEWS,
  MEDIA_ASSETS,
  MENU_CATEGORIES,
  MENU_ITEMS,
  RESTAURANT_INFO,
} from '../data/menu';
import { FoodImage } from '../components/ui/FoodImage';
import { ProductCard } from '../components/products/ProductCard';

interface HomePageProps {
  onNavigate: (path: RoutePath, category?: CategoryId) => void;
  onSelectProduct: (product: MenuItem) => void;
  onAddToCart: (product: MenuItem) => void;
}

const VALUE_PILLARS = [
  {
    icon: Flame,
    title: 'Freshly Prepared',
    description:
      'Baked and cooked fresh to order with warm, consistent quality from our kitchen to your table.',
  },
  {
    icon: Utensils,
    title: 'Delicious Variety',
    description:
      'Signature pizzas, Chicken Tikka favorites, Zinger Burgers, golden broast, fries, and chilled Coke combos.',
  },
  {
    icon: Clock,
    title: 'Open 24 Hours',
    description:
      'Serving Dera Ismail Khan around the clock for dine-in, quick takeaway, and no-contact delivery.',
  },
];

export function HomePage({
  onNavigate,
  onSelectProduct,
  onAddToCart,
}: HomePageProps) {
  const customerFavorites = MENU_ITEMS.filter((item) => item.isPopular).slice(0, 8);

  return (
    <div className="bg-[#FFF9F2] text-[#25211E]">
      {/* 1. Signature Editorial Hero Section */}
      <section className="border-b border-[#EAE3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Editorial Column */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#827A72] mb-4">
                Authentic Taste, Freshly Made.
              </p>

              <h1 className="text-[clamp(2.5rem,4.8vw,4.25rem)] font-bold text-[#191714] leading-[1.04] tracking-[-0.03em]">
                A Little <span className="text-[#D9362B]">Slice of Happiness</span>.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-[#6E665E] leading-relaxed max-w-lg">
                From delicious pizzas to crispy favorites, discover food made to bring people together.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-7">
                <button
                  type="button"
                  onClick={() => onNavigate('/menu')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 min-h-[52px] rounded-xl bg-[#D9362B] text-white text-sm sm:text-base font-semibold hover:bg-[#BD2B21] active:scale-[0.99] transition-all duration-150 whitespace-nowrap cursor-pointer"
                >
                  <span>Explore Our Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={RESTAURANT_INFO.phoneHref}
                  className="inline-flex items-center justify-center sm:justify-start gap-2 py-2 text-sm sm:text-base font-semibold text-[#25211E] hover:text-[#D9362B] transition-colors whitespace-nowrap group"
                >
                  <Phone className="w-4 h-4 text-[#D9362B]" />
                  <span className="border-b border-[#25211E]/30 group-hover:border-[#D9362B] pb-0.5 transition-colors">
                    Call to Order
                  </span>
                </a>
              </div>

              {/* Clean Rating Indicator */}
              <div className="mt-10 pt-6 border-t border-[#EAE3DA] flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#6E665E]">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#191714] tabular-nums">
                  <Star className="w-4 h-4 text-[#D9362B] fill-[#D9362B]" />
                  <span>{RESTAURANT_INFO.rating}</span>
                </span>
                <span aria-hidden="true" className="text-[#EAE3DA]">|</span>
                <span className="tabular-nums font-medium text-[#25211E]">
                  {RESTAURANT_INFO.reviewCount} Google Reviews
                </span>
                <span aria-hidden="true" className="text-[#EAE3DA]">·</span>
                <span>{RESTAURANT_INFO.hours}</span>
              </div>
            </motion.div>

            {/* Right Dominant Pizza Photography Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 relative"
            >
              <div className="relative w-full aspect-[4/3] lg:aspect-[5/4] rounded-[28px] overflow-hidden bg-[#191714] shadow-[0_24px_60px_rgba(25,23,20,0.14)] border border-[#EAE3DA]">
                <FoodImage
                  src={MEDIA_ASSETS.heroPizza}
                  alt="Freshly baked Italian pizza with bubbling melted mozzarella and fresh basil leaves"
                  priority
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Subtle Floating Editorial Label */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-sm border border-[#EAE3DA] rounded-2xl px-5 py-3.5 shadow-[0_12px_32px_rgba(25,23,20,0.12)] inline-flex items-center gap-3">
                <div className="w-2 h-8 rounded-full bg-[#D9362B] shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-[#191714] leading-tight">
                    Made for Every Craving
                  </p>
                  <p className="text-xs text-[#6E665E] mt-0.5">
                    Dine-in · Takeaway · No-contact Delivery
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Food Categories Section */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#191714] tracking-tight">
              Find Your Favorite
            </h2>
            <p className="mt-2 text-base text-[#6E665E]">
              Explore freshly prepared categories crafted for every appetite.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/menu')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#25211E] hover:text-[#D9362B] transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>Browse all items</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {MENU_CATEGORIES.map((category) => {
            const count = MENU_ITEMS.filter((item) => item.category === category.id).length;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onNavigate('/menu', category.id)}
                className="group text-left bg-white rounded-2xl border border-[#EAE3DA] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(25,23,20,0.08)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9362B]"
              >
                <div className="aspect-square w-full overflow-hidden bg-[#F4EDE4]">
                  <FoodImage
                    src={category.image}
                    alt={category.imageAlt}
                    fallbackLabel={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <div className="px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-[#191714] group-hover:text-[#D9362B] transition-colors">
                    {category.name}
                  </h3>
                  <span className="text-xs text-[#827A72] tabular-nums">{count}</span>
                </div>
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* 3. Best Sellers / Customer Favorites Section */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#F4EDE4]/65 border-y border-[#EAE3DA] py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#191714] tracking-tight">
                Customer Favorites
              </h2>
              <p className="mt-2 text-base text-[#6E665E]">
                Delicious choices worth coming back for.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/menu')}
              className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl border border-[#EAE3DA] bg-white text-sm font-semibold text-[#25211E] hover:border-[#191714] transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
            >
              <span>View Full Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {customerFavorites.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          <p className="mt-8 text-xs text-[#827A72]">
            Displayed PKR amounts are editable sample prices for frontend preview. Typical range at Italian Pizza: {RESTAURANT_INFO.priceRange}.
          </p>
        </div>
      </motion.section>

      {/* 4. Promotional Editorial Split Section */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-[#EAE3DA] bg-[#191714] shadow-[0_20px_50px_rgba(25,23,20,0.12)]">
          {/* Photography Side */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[460px] bg-[#25211E]">
            <FoodImage
              src={MEDIA_ASSETS.promoBanner}
              alt="Freshly baked artisan pizzas served on a rustic wooden table"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dark Charcoal Editorial Side */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-[#191714] text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFF9F2]/65 mb-4">
              Italian Pizza · Dera Ismail Khan
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.1] tracking-tight">
              Your Cravings Deserve Something Special.
            </h2>
            <p className="mt-4 text-base text-white/75 leading-relaxed max-w-md">
              Explore our menu and discover your next favorite.
            </p>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => onNavigate('/menu')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 min-h-[50px] rounded-xl bg-[#D9362B] text-white text-sm sm:text-base font-semibold hover:bg-[#BD2B21] transition-colors cursor-pointer"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. Why Choose Us Section (3-column) */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-10 border-t border-[#EAE3DA]">
          {VALUE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="flex flex-col">
                <Icon className="w-5 h-5 text-[#D9362B] mb-4" strokeWidth={1.75} />
                <h3 className="text-xl font-semibold text-[#191714] tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-[#6E665E] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* 6. Customer Reviews Section (Warm Cream Secondary Background) */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#F4EDE4] border-y border-[#EAE3DA] py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#191714] tracking-tight">
                Loved by Local Food Lovers
              </h2>
              <p className="mt-2 text-base text-[#6E665E]">
                A trusted 24-hour dining and delivery favorite in Dera Ismail Khan.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white border border-[#EAE3DA] rounded-2xl px-5 py-3.5 self-start lg:self-auto">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-[#D9362B] fill-[#D9362B]" />
                <span className="text-2xl font-bold text-[#191714] tabular-nums">
                  {RESTAURANT_INFO.rating} / 5
                </span>
              </div>
              <span aria-hidden="true" className="text-[#EAE3DA]">|</span>
              <span className="text-sm text-[#6E665E] tabular-nums">
                <strong className="text-[#191714]">{RESTAURANT_INFO.reviewCount}</strong> Google reviews
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO_REVIEWS.map((review) => (
              <article
                key={review.id}
                className="bg-white rounded-2xl border border-[#EAE3DA] p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className="flex items-center gap-0.5"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < review.rating
                              ? 'text-[#D9362B] fill-[#D9362B]'
                              : 'text-[#EAE3DA]'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#827A72]">Demo Content</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#25211E] leading-relaxed">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EAE3DA]">
                  <p className="text-sm font-semibold text-[#191714]">{review.author}</p>
                  <p className="text-xs text-[#827A72] mt-0.5">{review.context}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-xs text-[#827A72]">
            Google rating ({RESTAURANT_INFO.rating} / 5 across {RESTAURANT_INFO.reviewCount} reviews) reflects actual listing data. Review cards above are clearly marked demo content for layout presentation.
          </p>
        </div>
      </motion.section>

      {/* 7. Location Section (Two-Column with Embedded Map Preview) */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#827A72] mb-3">
              Visit Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#191714] tracking-tight">
              {RESTAURANT_INFO.name}
            </h2>
            <p className="mt-3 text-base text-[#6E665E] leading-relaxed">
              Stop by for warm dine-in hospitality, quick takeaway pickup, or call for no-contact delivery in Dera Ismail Khan.
            </p>

            <dl className="mt-8 space-y-5 text-sm sm:text-base">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#D9362B] shrink-0 mt-0.5" />
                <div>
                  <dt className="text-xs font-medium text-[#827A72]">Address</dt>
                  <dd className="text-[#25211E] font-medium mt-0.5">
                    {RESTAURANT_INFO.address}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#D9362B] shrink-0 mt-0.5" />
                <div>
                  <dt className="text-xs font-medium text-[#827A72]">Phone</dt>
                  <dd className="mt-0.5">
                    <a
                      href={RESTAURANT_INFO.phoneHref}
                      className="text-[#25211E] font-medium hover:text-[#D9362B] transition-colors tabular-nums"
                    >
                      {RESTAURANT_INFO.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#D9362B] shrink-0 mt-0.5" />
                <div>
                  <dt className="text-xs font-medium text-[#827A72]">Hours</dt>
                  <dd className="text-[#25211E] font-medium mt-0.5">
                    {RESTAURANT_INFO.hours}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl bg-[#D9362B] text-white text-sm font-semibold hover:bg-[#BD2B21] transition-colors whitespace-nowrap"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={RESTAURANT_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl border border-[#EAE3DA] bg-white text-[#25211E] text-sm font-semibold hover:border-[#191714] transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#D9362B]" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Right Embedded Map Preview */}
          <div className="lg:col-span-7">
            <div className="w-full h-full min-h-[340px] sm:min-h-[420px] rounded-3xl overflow-hidden bg-white border border-[#EAE3DA] shadow-[0_12px_32px_rgba(25,23,20,0.06)] relative">
              <iframe
                title="Italian Pizza Location Map — Dera Ismail Khan"
                src="https://www.google.com/maps?q=Italian+Pizza+RVGW%2B9MQ+Dera+Ismail+Khan+Pakistan&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[340px] sm:min-h-[420px] border-0"
              />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
