import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ShoppingBag } from 'lucide-react';
import { CategoryId, MenuItem, RoutePath } from './types';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';

const VALID_ROUTES: RoutePath[] = ['/', '/menu', '/about', '/contact', '/cart', '/checkout'];

const PAGE_TITLES: Record<RoutePath, string> = {
  '/': 'Italian Pizza | Pizza, Burgers & Chicken in Dera Ismail Khan',
  '/menu': 'Menu | Italian Pizza — Dera Ismail Khan',
  '/about': 'About Us | Italian Pizza — Dera Ismail Khan',
  '/contact': 'Contact & Location | Italian Pizza — Dera Ismail Khan',
  '/cart': 'Your Cart | Italian Pizza',
  '/checkout': 'Demo Checkout | Italian Pizza',
};

function readRouteFromHash(): RoutePath {
  if (typeof window === 'undefined') return '/';
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const clean = raw.split('?')[0] as RoutePath;
  return VALID_ROUTES.includes(clean) ? clean : '/';
}

function AppShell() {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() => readRouteFromHash());
  const [menuCategory, setMenuCategory] = useState<CategoryId | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const { addItem, lastAddedMessage, openDrawer } = useCart();

  useEffect(() => {
    document.title = PAGE_TITLES[currentPath];
  }, [currentPath]);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(readRouteFromHash());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = useCallback((path: RoutePath, category?: CategoryId) => {
    if (path === '/menu') {
      setMenuCategory(category ?? 'all');
    }
    setCurrentPath(path);
    const targetHash = path === '/' ? '#/' : `#${path}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleQuickAdd = useCallback(
    (product: MenuItem) => {
      addItem(product, 1);
    },
    [addItem]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F2] text-[#25211E]">
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentPath === '/' && (
              <HomePage
                onNavigate={handleNavigate}
                onSelectProduct={setSelectedProduct}
                onAddToCart={handleQuickAdd}
              />
            )}

            {currentPath === '/menu' && (
              <MenuPage
                selectedCategory={menuCategory}
                onSelectCategory={setMenuCategory}
                onSelectProduct={setSelectedProduct}
                onAddToCart={handleQuickAdd}
              />
            )}

            {currentPath === '/about' && <AboutPage onNavigate={handleNavigate} />}

            {currentPath === '/contact' && <ContactPage />}

            {currentPath === '/cart' && <CartPage onNavigate={handleNavigate} />}

            {currentPath === '/checkout' && <CheckoutPage onNavigate={handleNavigate} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Product Details Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addItem}
      />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer onNavigate={handleNavigate} />

      {/* Non-intrusive Cart Feedback Toast */}
      <AnimatePresence>
        {lastAddedMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            aria-live="polite"
            className="fixed bottom-5 right-5 z-40 max-w-sm bg-[#191714] text-white px-4 py-3 rounded-xl shadow-xl border border-white/10 flex items-center gap-3"
          >
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#D9362B] text-white shrink-0">
              <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
            </span>
            <span className="text-sm font-medium truncate">{lastAddedMessage}</span>
            <button
              type="button"
              onClick={openDrawer}
              className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-[#FFF9F2] hover:text-[#D9362B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>View Cart</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppShell />
    </CartProvider>
  );
}
