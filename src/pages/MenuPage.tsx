import { useMemo, useState } from 'react';
import { ArrowUpDown, Search, Sparkles, X } from 'lucide-react';
import { CategoryId, MenuItem } from '../types';
import { MENU_CATEGORIES, MENU_ITEMS, RESTAURANT_INFO } from '../data/menu';
import { ProductCard } from '../components/products/ProductCard';
import { cn } from '../lib/utils';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

interface MenuPageProps {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (category: CategoryId | 'all') => void;
  onSelectProduct: (product: MenuItem) => void;
  onAddToCart: (product: MenuItem) => void;
}

export function MenuPage({
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
}: MenuPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [popularOnly, setPopularOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const matches = MENU_ITEMS.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (popularOnly && !item.isPopular) {
        return false;
      }
      if (query) {
        const haystack = `${item.name} ${item.description} ${item.categoryLabel}`.toLowerCase();
        return haystack.includes(query);
      }
      return true;
    });

    const sorted = [...matches];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.samplePricePkr - b.samplePricePkr);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.samplePricePkr - a.samplePricePkr);
    } else if (sortBy === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sorted.sort((a, b) => Number(Boolean(b.isPopular)) - Number(Boolean(a.isPopular)));
    }
    return sorted;
  }, [selectedCategory, popularOnly, searchQuery, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'all' || popularOnly || searchQuery.trim().length > 0;

  const resetFilters = () => {
    onSelectCategory('all');
    setSearchQuery('');
    setPopularOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="bg-[#FFF9F2] min-h-[70vh]">
      {/* Header Banner */}
      <section className="bg-[#F4EDE4]/70 border-b border-[#EAE3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#827A72] mb-2">
            Italian Pizza · {RESTAURANT_INFO.hours}
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191714] tracking-tight">
                Explore Our Menu
              </h1>
              <p className="mt-3 text-base text-[#6E665E] max-w-2xl leading-relaxed">
                Freshly baked pizzas, crispy Zinger burgers, golden chicken broast, seasoned fries, and combo deals crafted for dine-in, takeaway, and no-contact delivery.
              </p>
            </div>
            <p className="text-xs text-[#827A72] max-w-xs lg:text-right">
              Displayed PKR amounts are editable sample prices for this frontend MVP demonstration.
            </p>
          </div>
        </div>
      </section>

      {/* Controls & Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Search, Sort & Popular Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#827A72] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pizzas, burgers, chicken, fries..."
              aria-label="Search menu items"
              className="w-full pl-10 pr-10 py-2.5 min-h-[44px] rounded-xl bg-white border border-[#EAE3DA] text-sm text-[#25211E] placeholder:text-[#827A72] focus:outline-none focus:border-[#D9362B] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-[#827A72] hover:text-[#191714] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setPopularOnly((prev) => !prev)}
              aria-pressed={popularOnly}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border text-sm font-medium transition-colors whitespace-nowrap cursor-pointer',
                popularOnly
                  ? 'bg-[#191714] text-white border-[#191714]'
                  : 'bg-white text-[#25211E] border-[#EAE3DA] hover:border-[#191714]/40'
              )}
            >
              <Sparkles className="w-4 h-4" />
              <span>Popular Only</span>
            </button>

            <div className="relative inline-flex items-center">
              <ArrowUpDown className="w-4 h-4 text-[#827A72] absolute left-3.5 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort menu items"
                className="pl-9 pr-8 py-2.5 min-h-[44px] rounded-xl bg-white border border-[#EAE3DA] text-sm font-medium text-[#25211E] focus:outline-none focus:border-[#D9362B] cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Menu categories"
          className="flex items-center gap-2 overflow-x-auto pb-2 mb-8"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'all'}
            onClick={() => onSelectCategory('all')}
            className={cn(
              'px-4 py-2.5 min-h-[42px] rounded-xl text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer',
              selectedCategory === 'all'
                ? 'bg-[#D9362B] text-white'
                : 'bg-white text-[#25211E] border border-[#EAE3DA] hover:bg-[#F4EDE4]'
            )}
          >
            All Items ({MENU_ITEMS.length})
          </button>

          {MENU_CATEGORIES.map((cat) => {
            const count = MENU_ITEMS.filter((item) => item.category === cat.id).length;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectCategory(cat.id)}
                className={cn(
                  'px-4 py-2.5 min-h-[42px] rounded-xl text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                  isActive
                    ? 'bg-[#D9362B] text-white'
                    : 'bg-white text-[#25211E] border border-[#EAE3DA] hover:bg-[#F4EDE4]'
                )}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Results Meta */}
        <div className="flex items-center justify-between gap-4 mb-6 text-sm text-[#6E665E]">
          <p className="tabular-nums">
            Showing <strong className="text-[#191714]">{filteredItems.length}</strong>{' '}
            {filteredItems.length === 1 ? 'dish' : 'dishes'}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-medium text-[#D9362B] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Grid or Empty State */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#EAE3DA] p-12 text-center">
            <h2 className="text-xl font-semibold text-[#191714]">
              No menu items match your search
            </h2>
            <p className="mt-2 text-sm text-[#6E665E] max-w-md mx-auto">
              Try clearing your search query or switching back to all categories to browse our full selection.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex items-center justify-center px-5 py-2.5 min-h-[44px] rounded-xl bg-[#D9362B] text-white text-sm font-semibold hover:bg-[#BD2B21] transition-colors cursor-pointer"
            >
              Show All Menu Items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredItems.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
