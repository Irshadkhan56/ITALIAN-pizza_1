import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { RoutePath } from '../types';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menu';
import { formatPkr } from '../lib/utils';
import { FoodImage } from '../components/ui/FoodImage';

interface CartPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function CartPage({ onNavigate }: CartPageProps) {
  const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <div className="bg-[#F8F5F0] min-h-[70vh]">
      <section className="bg-white border-b border-[#171717]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <button
            type="button"
            onClick={() => onNavigate('/menu')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5E5E5E] hover:text-[#171717] mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue browsing menu</span>
          </button>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
              Shopping Cart
            </h1>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-sm font-medium text-[#5E5E5E] hover:text-[#D92D20] transition-colors cursor-pointer"
              >
                Clear cart
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#171717]/8 p-12 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#F8F5F0] flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="w-7 h-7 text-[#5E5E5E]" strokeWidth={1.6} />
            </div>
            <h2 className="text-2xl font-semibold text-[#171717]">Your cart is empty</h2>
            <p className="mt-2 text-sm text-[#5E5E5E] leading-relaxed">
              Add freshly baked pizzas, crispy chicken, Zinger burgers, or seasoned fries from our menu to get started.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/menu')}
              className="mt-7 inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-lg bg-[#D92D20] text-white text-sm font-semibold hover:bg-[#B91C1C] transition-colors cursor-pointer"
            >
              <span>Explore Our Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-[#171717]/8 divide-y divide-[#171717]/8">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 sm:items-center"
                >
                  <div className="w-full sm:w-28 aspect-[4/3] rounded-xl overflow-hidden bg-[#EFEAE2] shrink-0">
                    <FoodImage
                      src={product.image}
                      alt={product.imageAlt}
                      fallbackLabel={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#5E5E5E]">{product.categoryLabel}</p>
                    <h2 className="text-lg font-semibold text-[#171717] mt-0.5">
                      {product.name}
                    </h2>
                    <p className="text-sm text-[#5E5E5E] tabular-nums mt-1">
                      {formatPkr(product.samplePricePkr)} each · Sample price
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-4">
                    <div className="inline-flex items-center rounded-lg border border-[#171717]/15 bg-[#F8F5F0]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label={`Decrease quantity of ${product.name}`}
                        className="w-10 h-10 inline-flex items-center justify-center text-[#171717] hover:bg-[#171717]/5 cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-[#171717] tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label={`Increase quantity of ${product.name}`}
                        className="w-10 h-10 inline-flex items-center justify-center text-[#171717] hover:bg-[#171717]/5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-base font-semibold text-[#171717] tabular-nums">
                        {formatPkr(product.samplePricePkr * quantity)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="p-2 text-[#5E5E5E] hover:text-[#D92D20] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="lg:col-span-4 bg-white rounded-2xl border border-[#171717]/8 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-[#171717]">Order Summary</h2>
              <p className="text-xs text-[#5E5E5E] mt-1 tabular-nums">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} selected
              </p>

              <div className="mt-6 space-y-3 text-sm border-t border-[#171717]/8 pt-5">
                <div className="flex items-center justify-between text-[#5E5E5E]">
                  <span>Subtotal (sample prices)</span>
                  <span className="font-medium text-[#171717] tabular-nums">
                    {formatPkr(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#5E5E5E]">
                  <span>Estimated delivery fee</span>
                  <span className="font-medium text-[#171717] tabular-nums">
                    {formatPkr(RESTAURANT_INFO.sampleDeliveryFeePkr)}
                  </span>
                </div>
                <p className="text-xs text-[#5E5E5E]">
                  Pickup orders have PKR 0 delivery fee. Final order type is selected at checkout.
                </p>
              </div>

              <div className="mt-5 pt-5 border-t border-[#171717]/8 flex items-baseline justify-between">
                <span className="text-base font-semibold text-[#171717]">Estimated Total</span>
                <span className="text-xl font-bold text-[#171717] tabular-nums">
                  {formatPkr(subtotal + RESTAURANT_INFO.sampleDeliveryFeePkr)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('/checkout')}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-lg bg-[#D92D20] text-white text-sm font-semibold hover:bg-[#B91C1C] transition-colors cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="mt-4 text-xs text-[#5E5E5E] leading-relaxed">
                Frontend MVP demonstration: No live payment is processed online. You can also place an order by calling{' '}
                <a href={RESTAURANT_INFO.phoneHref} className="text-[#171717] font-medium underline">
                  {RESTAURANT_INFO.phoneDisplay}
                </a>
                .
              </p>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
