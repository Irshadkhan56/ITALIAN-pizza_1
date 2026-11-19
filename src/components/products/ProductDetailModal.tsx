import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { MenuItem } from '../../types';
import { formatPkr } from '../../lib/utils';
import { FoodImage } from '../ui/FoodImage';

interface ProductDetailModalProps {
  product: MenuItem | null;
  onClose: () => void;
  onAddToCart: (product: MenuItem, quantity: number) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  const handleConfirmAdd = () => {
    if (!product) return;
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#191714]/65 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full sm:max-w-4xl bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#EAE3DA] max-h-[92vh] flex flex-col"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close product details"
              className="absolute top-4 right-4 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/95 text-[#25211E] border border-[#EAE3DA] shadow-sm hover:bg-[#191714] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto grid grid-cols-1 md:grid-cols-12">
              {/* Left: Large Product Image */}
              <div className="md:col-span-6 relative aspect-[4/3] md:aspect-auto md:min-h-[420px] bg-[#F4EDE4]">
                <FoodImage
                  src={product.image}
                  alt={product.imageAlt}
                  fallbackLabel={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right: Product Information & Purchase Module */}
              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#6E665E] mb-2">
                    <span>{product.categoryLabel}</span>
                    {product.isPopular && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-[#D9362B]">Customer Favorite</span>
                      </>
                    )}
                  </div>

                  <h2
                    id="product-modal-title"
                    className="text-2xl sm:text-3xl font-bold text-[#25211E] tracking-tight"
                  >
                    {product.name}
                  </h2>

                  <div className="mt-3 flex items-baseline gap-2.5">
                    <p className="text-2xl font-bold text-[#D9362B] tabular-nums">
                      {formatPkr(product.samplePricePkr)}
                    </p>
                    <span className="text-xs text-[#827A72]">Editable sample price</span>
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-[#6E665E] leading-relaxed">
                    {product.description}
                  </p>

                  <p className="mt-5 pt-4 border-t border-[#EAE3DA] text-xs text-[#827A72]">
                    Available for Dine-in, Takeaway, and No-contact Delivery · Open 24 Hours.
                  </p>
                </div>

                <div className="mt-7 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-[#25211E]">Quantity</span>
                    <div className="inline-flex items-center rounded-xl border border-[#EAE3DA] bg-[#FFF9F2]">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                        className="inline-flex items-center justify-center w-11 h-11 text-[#25211E] hover:bg-[#F4EDE4] disabled:opacity-40 transition-colors cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-[#25211E] tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.min(25, q + 1))}
                        aria-label="Increase quantity"
                        className="inline-flex items-center justify-center w-11 h-11 text-[#25211E] hover:bg-[#F4EDE4] transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmAdd}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl bg-[#D9362B] text-white text-sm font-semibold hover:bg-[#BD2B21] active:scale-[0.99] transition-all duration-150 whitespace-nowrap cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      Add to Cart · {formatPkr(product.samplePricePkr * quantity)}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
