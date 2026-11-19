import { ArrowRight, Clock, MapPin, Star, Utensils } from 'lucide-react';
import { RoutePath } from '../types';
import { MEDIA_ASSETS, RESTAURANT_INFO } from '../data/menu';
import { FoodImage } from '../components/ui/FoodImage';

interface AboutPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="bg-[#F8F5F0]">
      <section className="bg-white border-b border-[#171717]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <p className="text-sm font-medium text-[#D92D20] mb-2">
                Our Story · Dera Ismail Khan
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171717] tracking-tight leading-[1.1]">
                Freshly Baked Flavor, Ready Around the Clock.
              </h1>
              <p className="mt-5 text-base text-[#5E5E5E] leading-relaxed">
                Italian Pizza brings together oven-baked pizza craft and Dera Ismail Khan&apos;s favorite comfort foods under one roof. Whether you are gathering with friends for dine-in, grabbing quick takeaway, or ordering no-contact delivery late at night, our kitchen stays open 24 hours a day.
              </p>
              <p className="mt-4 text-base text-[#5E5E5E] leading-relaxed">
                From our signature Italian Pizza and Chicken Tikka Pizza to crispy Zinger Burgers, golden Chicken Broast, and seasoned French fries, we focus on consistent preparation and welcoming value within PKR 1–1,000 per person.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('/menu')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 min-h-[48px] rounded-lg bg-[#D92D20] text-white text-sm font-semibold hover:bg-[#B91C1C] transition-colors cursor-pointer"
                >
                  <span>Explore Our Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 min-h-[48px] rounded-lg border border-[#171717]/15 bg-white text-[#171717] text-sm font-semibold hover:bg-[#F8F5F0] transition-colors cursor-pointer"
                >
                  <span>Visit &amp; Contact</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#171717] shadow-lg">
                <FoodImage
                  src={MEDIA_ASSETS.promoBanner}
                  alt="Freshly baked pizzas served on a rustic wooden table at Italian Pizza"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facts Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-[#171717]/8 p-6">
            <Clock className="w-5 h-5 text-[#D92D20] mb-3" />
            <h2 className="text-base font-semibold text-[#171717]">Open 24 Hours</h2>
            <p className="mt-1.5 text-sm text-[#5E5E5E]">
              Serving Dera Ismail Khan day and night with no closing-hour rush.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#171717]/8 p-6">
            <Utensils className="w-5 h-5 text-[#D92D20] mb-3" />
            <h2 className="text-base font-semibold text-[#171717]">Three Ways to Enjoy</h2>
            <p className="mt-1.5 text-sm text-[#5E5E5E]">
              {RESTAURANT_INFO.services.join(', ')}.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#171717]/8 p-6">
            <Star className="w-5 h-5 text-[#D92D20] mb-3" />
            <h2 className="text-base font-semibold text-[#171717] tabular-nums">
              {RESTAURANT_INFO.rating}/5 Google Rating
            </h2>
            <p className="mt-1.5 text-sm text-[#5E5E5E] tabular-nums">
              Trusted across {RESTAURANT_INFO.reviewCount} customer reviews.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#171717]/8 p-6">
            <MapPin className="w-5 h-5 text-[#D92D20] mb-3" />
            <h2 className="text-base font-semibold text-[#171717]">Accessible Location</h2>
            <p className="mt-1.5 text-sm text-[#5E5E5E]">
              {RESTAURANT_INFO.address}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
