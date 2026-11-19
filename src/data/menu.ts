import { DemoReview, MenuCategory, MenuItem } from '../types';

export const RESTAURANT_INFO = {
  name: 'Italian Pizza',
  locationShort: 'Dera Ismail Khan, Pakistan',
  address: 'RVGW+9MQ, Dera Ismail Khan, Pakistan',
  phoneDisplay: '+92 336 5333350',
  phoneHref: 'tel:+923365333350',
  hours: 'Open 24 hours',
  rating: '4.0',
  reviewCount: 339,
  priceRange: 'PKR 1–1,000 per person',
  services: ['Dine-in', 'Takeaway', 'No-contact delivery'] as const,
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Italian+Pizza+RVGW%2B9MQ+Dera+Ismail+Khan+Pakistan',
  sampleDeliveryFeePkr: 150,
} as const;

export const MEDIA_ASSETS = {
  heroPizza: '/src/assets/images/hero_italian_pizza_1795045544149.jpg',
  chickenTikkaPizza: '/src/assets/images/chicken_tikka_pizza_1795045543126.jpg',
  supremePizza: '/src/assets/images/supreme_pizza_1795045542755.jpg',
  hotSpicyPizza: '/src/assets/images/hot_spicy_pizza_1795045542762.jpg',
  zingerBurger: '/src/assets/images/zinger_burger_1795045543533.jpg',
  crispyChickenBroast: '/src/assets/images/crispy_chicken_broast_1795045542389.jpg',
  seasonedFries: '/src/assets/images/seasoned_fries_1795045542674.jpg',
  pizzaCokeDeal: '/src/assets/images/pizza_coke_deal_1795045543025.jpg',
  promoBanner: '/src/assets/images/promo_pizza_banner_1795045543082.jpg',
} as const;

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'pizza',
    name: 'Pizza',
    description: 'Oven-baked classics and bold local favorites.',
    image: MEDIA_ASSETS.heroPizza,
    imageAlt: 'Freshly baked Italian pizza with melted cheese and herbs',
  },
  {
    id: 'burgers',
    name: 'Burgers',
    description: 'Golden crispy fillets in toasted buns.',
    image: MEDIA_ASSETS.zingerBurger,
    imageAlt: 'Crispy Zinger Burger with lettuce and cheddar',
  },
  {
    id: 'chicken',
    name: 'Chicken',
    description: 'Crunchy golden broast and crispy pieces.',
    image: MEDIA_ASSETS.crispyChickenBroast,
    imageAlt: 'Golden crispy fried chicken broast platter',
  },
  {
    id: 'fries',
    name: 'Fries',
    description: 'Hot, golden, and generously seasoned.',
    image: MEDIA_ASSETS.seasonedFries,
    imageAlt: 'Bowl of seasoned French fries with dipping sauces',
  },
  {
    id: 'deals',
    name: 'Deals',
    description: 'Pizza paired with chilled Coke for effortless meals.',
    image: MEDIA_ASSETS.pizzaCokeDeal,
    imageAlt: 'Chicken Tikka Pizza served alongside a chilled cola',
  },
];

/**
 * Initial menu items based strictly on the restaurant's popular offerings.
 * Note: samplePricePkr values are clearly labeled editable frontend sample prices.
 */
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'italian-pizza',
    slug: 'italian-pizza',
    name: 'Italian Pizza',
    category: 'pizza',
    categoryLabel: 'Pizza',
    description:
      'Our house signature baked fresh to order with rich tomato sauce and bubbling melted cheese on a crisp golden crust.',
    samplePricePkr: 950,
    image: MEDIA_ASSETS.heroPizza,
    imageAlt: 'Signature Italian Pizza served hot on a dark wooden peel',
    isPopular: true,
  },
  {
    id: 'chicken-tikka-pizza',
    slug: 'chicken-tikka-pizza',
    name: 'Chicken Tikka Pizza',
    category: 'pizza',
    categoryLabel: 'Pizza',
    description:
      'A local favorite topped with savory spiced chicken tikka and melted cheese on freshly baked dough.',
    samplePricePkr: 950,
    image: MEDIA_ASSETS.chickenTikkaPizza,
    imageAlt: 'Chicken Tikka Pizza on a warm ceramic platter',
    isPopular: true,
  },
  {
    id: 'hot-and-spicy-pizza',
    slug: 'hot-and-spicy-pizza',
    name: 'Hot and Spicy Pizza',
    category: 'pizza',
    categoryLabel: 'Pizza',
    description:
      'Bold heat balanced with rich melted cheese and a crisp oven-baked base for spice lovers.',
    samplePricePkr: 950,
    image: MEDIA_ASSETS.hotSpicyPizza,
    imageAlt: 'Hot and Spicy Pizza with sliced jalapenos and chili flakes',
    isPopular: true,
  },
  {
    id: 'supreme-pizza',
    slug: 'supreme-pizza',
    name: 'Supreme Pizza',
    category: 'pizza',
    categoryLabel: 'Pizza',
    description:
      'Generously loaded with savory toppings, crisp vegetables, and golden melted cheese in every slice.',
    samplePricePkr: 990,
    image: MEDIA_ASSETS.supremePizza,
    imageAlt: 'Supreme Pizza served on a dark stone slate board',
    isPopular: true,
  },
  {
    id: 'zinger-burger',
    slug: 'zinger-burger',
    name: 'Zinger Burger',
    category: 'burgers',
    categoryLabel: 'Burgers',
    description:
      'Crispy golden fried chicken fillet layered with crisp lettuce and creamy sauce in a soft toasted bun.',
    samplePricePkr: 450,
    image: MEDIA_ASSETS.zingerBurger,
    imageAlt: 'Crispy Zinger Burger served on parchment paper',
    isPopular: true,
  },
  {
    id: 'crispy-chicken',
    slug: 'crispy-chicken',
    name: 'Crispy Chicken',
    category: 'chicken',
    categoryLabel: 'Chicken',
    description:
      'Juicy chicken prepared with a crunchy golden coating, served piping hot for dine-in, takeaway, or delivery.',
    samplePricePkr: 550,
    image: MEDIA_ASSETS.crispyChickenBroast,
    imageAlt: 'Golden Crispy Chicken pieces with dipping sauce',
    isPopular: true,
  },
  {
    id: 'chicken-broast',
    slug: 'chicken-broast',
    name: 'Chicken Broast',
    category: 'chicken',
    categoryLabel: 'Chicken',
    description:
      'Classic golden-brown broast cooked crisp on the outside and tender inside, ideal for sharing or solo meals.',
    samplePricePkr: 650,
    image: MEDIA_ASSETS.crispyChickenBroast,
    imageAlt: 'Golden Chicken Broast platter with lemon wedge and garlic dip',
    isPopular: false,
  },
  {
    id: 'seasoned-french-fries',
    slug: 'seasoned-french-fries',
    name: 'Seasoned French Fries',
    category: 'fries',
    categoryLabel: 'Fries',
    description:
      'Golden crisp potato fries finished with savory house seasoning—an essential companion to pizza or burgers.',
    samplePricePkr: 250,
    image: MEDIA_ASSETS.seasonedFries,
    imageAlt: 'Seasoned French Fries in a dark ceramic dish with dips',
    isPopular: true,
  },
  {
    id: 'chicken-tikka-pizza-1l-coke',
    slug: 'chicken-tikka-pizza-1l-coke',
    name: 'Chicken Tikka Pizza with 1L Coke',
    category: 'deals',
    categoryLabel: 'Deals',
    description:
      'Our signature Chicken Tikka Pizza paired with a chilled 1L Coke for convenient sharing.',
    samplePricePkr: 1000,
    image: MEDIA_ASSETS.pizzaCokeDeal,
    imageAlt: 'Chicken Tikka Pizza served with chilled cola',
    isPopular: true,
  },
  {
    id: 'chicken-tikka-pizza-regular-coke',
    slug: 'chicken-tikka-pizza-regular-coke',
    name: 'Chicken Tikka Pizza with Regular Coke',
    category: 'deals',
    categoryLabel: 'Deals',
    description:
      'Freshly baked Chicken Tikka Pizza served with a chilled Regular Coke, ready any hour of the day.',
    samplePricePkr: 980,
    image: MEDIA_ASSETS.pizzaCokeDeal,
    imageAlt: 'Chicken Tikka Pizza paired with a chilled glass of cola',
    isPopular: false,
  },
];

/**
 * Clearly marked sample testimonials for frontend MVP demonstration.
 * Never presented as verified real customer quotes.
 */
export const DEMO_REVIEWS: DemoReview[] = [
  {
    id: 'demo-review-1',
    author: 'Sample Guest A',
    context: 'Demo Testimonial · Dine-in',
    rating: 5,
    comment:
      'Ordered the Chicken Tikka Pizza late at night and it arrived hot with a crisp crust. Great having a 24-hour spot in Dera Ismail Khan.',
    isDemo: true,
  },
  {
    id: 'demo-review-2',
    author: 'Sample Guest B',
    context: 'Demo Testimonial · Takeaway',
    rating: 4,
    comment:
      'The Zinger Burger and Seasoned French Fries were freshly prepared and packed neatly for takeaway. Quick counter service.',
    isDemo: true,
  },
  {
    id: 'demo-review-3',
    author: 'Sample Guest C',
    context: 'Demo Testimonial · No-contact Delivery',
    rating: 4,
    comment:
      'Supreme Pizza and Crispy Chicken made an easy family dinner. Good value within budget and convenient ordering.',
    isDemo: true,
  },
];
