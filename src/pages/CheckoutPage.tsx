import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Info,
  Phone,
  ShoppingBag,
  Store,
  Truck,
} from 'lucide-react';
import { CheckoutFormValues, DemoOrderConfirmation, RoutePath } from '../types';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menu';
import { cn, formatPkr, generateDemoOrderRef } from '../lib/utils';

interface CheckoutPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { items, subtotal, clearCart } = useCart();
  const [confirmation, setConfirmation] = useState<DemoOrderConfirmation | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    defaultValues: {
      fullName: '',
      phone: '',
      orderType: 'delivery',
      deliveryAddress: '',
      orderNotes: '',
    },
  });

  const orderType = watch('orderType');
  const deliveryFee = orderType === 'delivery' ? RESTAURANT_INFO.sampleDeliveryFeePkr : 0;
  const total = subtotal + deliveryFee;

  const onSubmit = (data: CheckoutFormValues) => {
    const snapshot: DemoOrderConfirmation = {
      referenceId: generateDemoOrderRef(),
      placedAt: new Date().toLocaleTimeString('en-PK', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      customer: {
        ...data,
        deliveryAddress:
          data.orderType === 'pickup'
            ? `Pickup at ${RESTAURANT_INFO.address}`
            : data.deliveryAddress.trim(),
      },
      items: [...items],
      subtotal,
      deliveryFee,
      total,
    };
    setConfirmation(snapshot);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Demo Checkout Confirmation State
  if (confirmation) {
    return (
      <div className="bg-[#F8F5F0] min-h-[75vh] py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-[#171717]/8 p-6 sm:p-10">
            <div className="flex items-center gap-3 text-[#D92D20] mb-4">
              <CheckCircle2 className="w-7 h-7" />
              <span className="text-sm font-semibold">Demo Checkout Confirmation</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight">
              Preview Order Summary Ready
            </h1>

            <div className="mt-4 p-4 rounded-xl bg-[#FFF8EF] border border-[#171717]/10 text-sm text-[#171717] flex items-start gap-3">
              <Info className="w-5 h-5 text-[#D92D20] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Frontend MVP Notice:</strong> This is a demonstration confirmation screen. No real order has been submitted to the kitchen and no payment was processed. To place a live order, please call{' '}
                <a href={RESTAURANT_INFO.phoneHref} className="font-semibold underline">
                  {RESTAURANT_INFO.phoneDisplay}
                </a>
                .
              </p>
            </div>

            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-y border-[#171717]/8 py-5">
              <div>
                <dt className="text-xs text-[#5E5E5E]">Demo Reference</dt>
                <dd className="mt-0.5 font-semibold text-[#171717] tabular-nums">
                  {confirmation.referenceId}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#5E5E5E]">Order Type</dt>
                <dd className="mt-0.5 font-semibold text-[#171717] capitalize">
                  {confirmation.customer.orderType} · {confirmation.placedAt}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#5E5E5E]">Customer</dt>
                <dd className="mt-0.5 font-medium text-[#171717]">
                  {confirmation.customer.fullName} ({confirmation.customer.phone})
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#5E5E5E]">
                  {confirmation.customer.orderType === 'delivery' ? 'Delivery Address' : 'Pickup Location'}
                </dt>
                <dd className="mt-0.5 font-medium text-[#171717]">
                  {confirmation.customer.deliveryAddress}
                </dd>
              </div>
              {confirmation.customer.orderNotes && (
                <div className="sm:col-span-2">
                  <dt className="text-xs text-[#5E5E5E]">Order Notes</dt>
                  <dd className="mt-0.5 text-[#171717]">{confirmation.customer.orderNotes}</dd>
                </div>
              )}
            </dl>

            <div className="mt-6">
              <h2 className="text-sm font-semibold text-[#171717] mb-3">Ordered Items</h2>
              <ul className="divide-y divide-[#171717]/6 text-sm">
                {confirmation.items.map(({ product, quantity }) => (
                  <li key={product.id} className="py-2.5 flex items-center justify-between gap-4">
                    <span className="text-[#171717]">
                      <strong className="tabular-nums">{quantity} ×</strong> {product.name}
                    </span>
                    <span className="font-medium text-[#171717] tabular-nums">
                      {formatPkr(product.samplePricePkr * quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 border-t border-[#171717]/10 space-y-2 text-sm">
                <div className="flex justify-between text-[#5E5E5E]">
                  <span>Subtotal (sample)</span>
                  <span className="tabular-nums">{formatPkr(confirmation.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#5E5E5E]">
                  <span>Delivery fee placeholder</span>
                  <span className="tabular-nums">{formatPkr(confirmation.deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#171717] pt-2">
                  <span>Demo Total</span>
                  <span className="tabular-nums">{formatPkr(confirmation.total)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('/menu')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-lg bg-[#D92D20] text-white text-sm font-semibold hover:bg-[#B91C1C] transition-colors cursor-pointer"
              >
                <span>Back to Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={RESTAURANT_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-lg border border-[#171717]/15 bg-white text-[#171717] text-sm font-semibold hover:bg-[#F8F5F0] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D92D20]" />
                <span>Call Restaurant to Order</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty Cart Guard on Checkout
  if (items.length === 0) {
    return (
      <div className="bg-[#F8F5F0] min-h-[70vh] py-16">
        <div className="max-w-lg mx-auto px-4 text-center bg-white rounded-2xl border border-[#171717]/8 p-10">
          <div className="w-14 h-14 rounded-full bg-[#F8F5F0] flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-6 h-6 text-[#5E5E5E]" />
          </div>
          <h1 className="text-2xl font-bold text-[#171717]">No items to check out</h1>
          <p className="mt-2 text-sm text-[#5E5E5E]">
            Add at least one item to your cart before proceeding to the demo checkout.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/menu')}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 min-h-[46px] rounded-lg bg-[#D92D20] text-white text-sm font-semibold hover:bg-[#B91C1C] transition-colors cursor-pointer"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F5F0] min-h-[75vh]">
      <section className="bg-white border-b border-[#171717]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <button
            type="button"
            onClick={() => onNavigate('/cart')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5E5E5E] hover:text-[#171717] mb-3 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to cart</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-[#5E5E5E]">
            Frontend MVP preview checkout — review your items and test the ordering flow.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Customer Details Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#171717]/8 p-6 sm:p-8 space-y-6">
            {/* Order Type Selector */}
            <div>
              <span className="block text-sm font-semibold text-[#171717] mb-3">
                Order Type
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setValue('orderType', 'delivery', { shouldValidate: true })}
                  className={cn(
                    'flex items-center justify-center gap-2.5 p-4 min-h-[54px] rounded-xl border text-sm font-semibold transition-all cursor-pointer',
                    orderType === 'delivery'
                      ? 'border-[#D92D20] bg-[#FFF8EF] text-[#171717]'
                      : 'border-[#171717]/12 bg-white text-[#5E5E5E] hover:border-[#171717]/30'
                  )}
                >
                  <Truck
                    className={cn(
                      'w-4 h-4',
                      orderType === 'delivery' ? 'text-[#D92D20]' : 'text-[#5E5E5E]'
                    )}
                  />
                  <span>No-contact Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setValue('orderType', 'pickup', { shouldValidate: true })}
                  className={cn(
                    'flex items-center justify-center gap-2.5 p-4 min-h-[54px] rounded-xl border text-sm font-semibold transition-all cursor-pointer',
                    orderType === 'pickup'
                      ? 'border-[#D92D20] bg-[#FFF8EF] text-[#171717]'
                      : 'border-[#171717]/12 bg-white text-[#5E5E5E] hover:border-[#171717]/30'
                  )}
                >
                  <Store
                    className={cn(
                      'w-4 h-4',
                      orderType === 'pickup' ? 'text-[#D92D20]' : 'text-[#5E5E5E]'
                    )}
                  />
                  <span>Pickup / Takeaway</span>
                </button>
              </div>
              <input type="hidden" {...register('orderType')} />
            </div>

            {/* Full Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="checkout-name"
                  className="block text-sm font-medium text-[#171717] mb-1.5"
                >
                  Full Name <span className="text-[#D92D20]">*</span>
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  autoComplete="name"
                  {...register('fullName', {
                    required: 'Full name is required',
                    minLength: { value: 2, message: 'Enter at least 2 characters' },
                  })}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 min-h-[46px] rounded-lg border border-[#171717]/15 bg-[#F8F5F0]/50 text-sm text-[#171717] focus:bg-white focus:outline-none focus:border-[#D92D20]"
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-[#D92D20]">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-sm font-medium text-[#171717] mb-1.5"
                >
                  Phone Number <span className="text-[#D92D20]">*</span>
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  autoComplete="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9+\-\s()]{7,18}$/,
                      message: 'Enter a valid phone number',
                    },
                  })}
                  placeholder="+92 3XX XXXXXXX"
                  className="w-full px-4 py-3 min-h-[46px] rounded-lg border border-[#171717]/15 bg-[#F8F5F0]/50 text-sm text-[#171717] focus:bg-white focus:outline-none focus:border-[#D92D20]"
                />
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-[#D92D20]">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Delivery Address (conditional) */}
            {orderType === 'delivery' ? (
              <div>
                <label
                  htmlFor="checkout-address"
                  className="block text-sm font-medium text-[#171717] mb-1.5"
                >
                  Delivery Address (Dera Ismail Khan) <span className="text-[#D92D20]">*</span>
                </label>
                <textarea
                  id="checkout-address"
                  rows={3}
                  autoComplete="street-address"
                  {...register('deliveryAddress', {
                    validate: (val) =>
                      orderType !== 'delivery' ||
                      val.trim().length >= 8 ||
                      'Please enter a complete delivery address (at least 8 characters)',
                  })}
                  placeholder="House / Street, Mohalla / Sector, nearby landmark in Dera Ismail Khan"
                  className="w-full px-4 py-3 rounded-lg border border-[#171717]/15 bg-[#F8F5F0]/50 text-sm text-[#171717] focus:bg-white focus:outline-none focus:border-[#D92D20]"
                />
                {errors.deliveryAddress && (
                  <p className="mt-1.5 text-xs text-[#D92D20]">
                    {errors.deliveryAddress.message}
                  </p>
                )}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#F8F5F0] border border-[#171717]/8 text-sm text-[#5E5E5E]">
                <p className="font-semibold text-[#171717]">Pickup Location</p>
                <p className="mt-1">{RESTAURANT_INFO.address}</p>
                <p className="mt-0.5 text-xs">{RESTAURANT_INFO.hours}</p>
              </div>
            )}

            {/* Order Notes */}
            <div>
              <label
                htmlFor="checkout-notes"
                className="block text-sm font-medium text-[#171717] mb-1.5"
              >
                Order Notes <span className="text-[#5E5E5E] font-normal">(Optional)</span>
              </label>
              <textarea
                id="checkout-notes"
                rows={3}
                {...register('orderNotes')}
                placeholder="Any delivery instructions or special requests..."
                className="w-full px-4 py-3 rounded-lg border border-[#171717]/15 bg-[#F8F5F0]/50 text-sm text-[#171717] focus:bg-white focus:outline-none focus:border-[#D92D20]"
              />
            </div>

            <div className="p-4 rounded-xl bg-[#FFF8EF] border border-[#171717]/10 text-xs text-[#5E5E5E] leading-relaxed">
              <strong className="text-[#171717]">Demo Checkout Notice:</strong> Submitting this form displays a demo confirmation screen only. No actual order is sent and no payment is charged.
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="lg:col-span-5 bg-white rounded-2xl border border-[#171717]/8 p-6 sm:p-8 sticky top-24">
            <h2 className="text-lg font-semibold text-[#171717]">Order Summary</h2>

            <ul className="mt-5 divide-y divide-[#171717]/8 text-sm max-h-72 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="py-3 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-medium text-[#171717]">{product.name}</p>
                    <p className="text-xs text-[#5E5E5E] tabular-nums mt-0.5">
                      Qty {quantity} × {formatPkr(product.samplePricePkr)}
                    </p>
                  </div>
                  <span className="font-semibold text-[#171717] tabular-nums shrink-0">
                    {formatPkr(product.samplePricePkr * quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-5 border-t border-[#171717]/8 space-y-2.5 text-sm">
              <div className="flex justify-between text-[#5E5E5E]">
                <span>Subtotal (sample prices)</span>
                <span className="font-medium text-[#171717] tabular-nums">
                  {formatPkr(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#5E5E5E]">
                <span>
                  {orderType === 'delivery' ? 'Delivery fee placeholder' : 'Pickup fee'}
                </span>
                <span className="font-medium text-[#171717] tabular-nums">
                  {formatPkr(deliveryFee)}
                </span>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-[#171717]/10 flex items-baseline justify-between">
              <span className="text-base font-semibold text-[#171717]">Total</span>
              <span className="text-2xl font-bold text-[#171717] tabular-nums">
                {formatPkr(total)}
              </span>
            </div>

            <button
              type="submit"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 min-h-[50px] rounded-lg bg-[#D92D20] text-white text-sm font-semibold hover:bg-[#B91C1C] active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>Complete Demo Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </aside>
        </form>
      </section>
    </div>
  );
}
