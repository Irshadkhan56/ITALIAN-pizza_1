export type CategoryId = 'pizza' | 'burgers' | 'chicken' | 'fries' | 'deals';

export type RoutePath = '/' | '/menu' | '/about' | '/contact' | '/cart' | '/checkout';

export interface MenuCategory {
  id: CategoryId;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  description: string;
  /** Editable sample price in PKR for frontend MVP demonstration */
  samplePricePkr: number;
  image: string;
  imageAlt: string;
  isPopular?: boolean;
}

export interface CartItem {
  product: MenuItem;
  quantity: number;
}

export interface DemoReview {
  id: string;
  author: string;
  context: string;
  rating: number;
  comment: string;
  isDemo: true;
}

export type OrderType = 'delivery' | 'pickup';

export interface CheckoutFormValues {
  fullName: string;
  phone: string;
  orderType: OrderType;
  deliveryAddress: string;
  orderNotes: string;
}

export interface DemoOrderConfirmation {
  referenceId: string;
  placedAt: string;
  customer: CheckoutFormValues;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}
