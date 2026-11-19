import { Plus } from 'lucide-react';
import { MenuItem } from '../../types';
import { formatPkr } from '../../lib/utils';
import { FoodImage } from '../ui/FoodImage';

interface ProductCardProps {
  product: MenuItem;
  onSelect: (product: MenuItem) => void;
  onAddToCart: (product: MenuItem) => void;
}

export function ProductCard({ product, onSelect, onAddToCart }: ProductCardProps) {
  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-[#EAE3DA] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(25,23,20,0.08)]">
      <button
        type="button"
        onClick={() => onSelect(product)}
        className="relative block w-full aspect-[4/3] overflow-hidden bg-[#F4EDE4] text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D9362B]"
        aria-label={`View details for ${product.name}`}
      >
        <FoodImage
          src={product.image}
          alt={product.imageAlt}
          fallbackLabel={product.name}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
        />
      </button>

      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#6E665E] mb-1">
          <span className="truncate">{product.categoryLabel}</span>
          {product.isPopular && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-[#D9362B] shrink-0">Popular</span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => onSelect(product)}
          className="text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9362B] rounded-sm"
        >
          <h3 className="text-[15px] sm:text-lg font-semibold text-[#25211E] tracking-tight leading-snug group-hover:text-[#D9362B] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </button>

        <p className="mt-1.5 text-xs sm:text-sm text-[#6E665E] leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="mt-4 pt-3.5 border-t border-[#EAE3DA] flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm sm:text-base font-semibold text-[#D9362B] tabular-nums truncate">
              {formatPkr(product.samplePricePkr)}
            </p>
            <p className="text-[10px] sm:text-[11px] text-[#827A72]">Sample price</p>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-3.5 py-2 min-h-[38px] sm:min-h-[40px] rounded-lg bg-[#D9362B] text-white text-xs sm:text-sm font-medium hover:bg-[#BD2B21] active:scale-[0.97] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.2} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
