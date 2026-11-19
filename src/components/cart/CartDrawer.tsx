import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { RoutePath } from '../../types';
import { formatPkr } from '../../lib/utils';
import { FoodImage } from '../ui/FoodImage';

interface CartDrawerProps {
  onNavigate: (path: RoutePath) => void;
}

export function CartDrawer({ onNavigate }: CartDrawerProps) {
  const {
    items,
    itemCount,
    subtotal,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
  } = useCart();

  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen, closeDrawer]);

  const handleGoTo = (path: RoutePath) => {
    closeDrawer();
    onNavigate(path);
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-[#171717]/55 backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#171717]/8 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#171717]">Your Order</h2>
                <p className="text-xs text-[#5E5E5E] tabular-nums">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close shopping cart"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#5E5E5E] hover:bg-[#F8F5F0] hover:text-[#171717] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-[#F8F5F0] flex items-center justify-center mb-4">
                    <ShoppingBag className="w-6 h-6 text-[#5E5E5E]" strokeWidth={1.6} />
                  </div>
                  <h3 className="text-base font-semibold text-[#171717]">
                    Your cart is empty
                  </h3>
                  <p className="mt-1.5 text-sm text-[#5E5E5E] max-w-xs">
                    Browse our freshly baked pizzas, crispy chicken, burgers, and deals to start your order.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleGoTo('/menu')}
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-lg bg-[#D92D20] text-white text-sm font-semibold hover:bg-[#B91C1C] transition-colors cursor-pointer"
                  >
                    <span>Explore Menu</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-[#171717]/8">
                  {items.map(({ product, quantity }) => (
                    <li key={product.id} className="py-4 first:pt-0 flex gap-4">
                      <div className="w-20 h-16 rounded-lg overflow-hidden bg-[#EFEAE2] shrink-0">
                        <FoodImage
                          src={product.image}
                          alt={product.imageAlt}
                          fallbackLabel={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-[#171717] truncate">
                            {product.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            aria-label={`Remove ${product.name}`}
                            className="p-1 text-[#5E5E5E] hover:text-[#D92D20] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs text-[#5E5E5E] tabular-nums mt-0.5">
                          {formatPkr(product.samplePricePkr)} each
                        </p>

                        <div className="mt-3 flex items-center justify-between gap-2">
                          <div className="inline-flex items-center rounded-md border border-[#171717]/12 bg-[#F8F5F0]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              aria-label={`Decrease quantity of ${product.name}`}
                              className="w-8 h-8 inline-flex items-center justify-center text-[#171717] hover:bg-[#171717]/5 cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold text-[#171717] tabular-nums">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              aria-label={`Increase quantity of ${product.name}`}
                              className="w-8 h-8 inline-flex items-center justify-center text-[#171717] hover:bg-[#171717]/5 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <p className="text-sm font-semibold text-[#171717] tabular-nums">
                            {formatPkr(product.samplePricePkr * quantity)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer summary */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#171717]/8 bg-[#F8F5F0]/70 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm text-[#5E5E5E]">
                    <span>Subtotal (sample prices)</span>
                    <span className="font-semibold text-[#171717] tabular-nums">
                      {formatPkr(subtotal)}
                    </span>
                  </div>
                  <p className="text-xs text-[#5E5E5E]">
                    Delivery fee placeholder calculated at checkout.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleGoTo('/checkout')}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-lg bg-[#D92D20] text-white text-sm font-semibold hover:bg-[#B91C1C] transition-colors cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGoTo('/cart')}
                    className="w-full inline-flex items-center justify-center px-5 py-2.5 min-h-[42px] rounded-lg border border-[#171717]/15 bg-white text-[#171717] text-sm font-medium hover:bg-[#F8F5F0] transition-colors cursor-pointer"
                  >
                    View Full Cart
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
