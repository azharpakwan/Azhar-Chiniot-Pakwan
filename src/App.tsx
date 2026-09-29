import React, { useState } from 'react';
import { FoodProvider, useFood } from './context/FoodContext';
import { Navbar } from './components/Navbar';
import { FeaturedDishes } from './components/FeaturedDishes';
import { MenuSection } from './components/MenuSection';
import { SpecialOffers } from './components/SpecialOffers';
import { AboutUs } from './components/AboutUs';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FoodDetailModal } from './components/FoodDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CateringCalculatorModal } from './components/CateringCalculatorModal';
import { AdminModal } from './components/AdminModal';
import { MessageCircle, ShoppingBag } from 'lucide-react';

const AppContent: React.FC = () => {
  const { cartCount, setIsCartOpen, generateWhatsAppOrderUrl } = useFood();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <FeaturedDishes />
        <MenuSection onOpenCalculator={() => setIsCalculatorOpen(true)} />
        <SpecialOffers />
        <AboutUs />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <FoodDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <CateringCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
      <AdminModal />

      {/* Floating Action Quick Access (Mobile friendly, strictly within 15% sticky cap) */}
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2.5">
        <a
          href={generateWhatsAppOrderUrl()}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp Order"
          className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full font-bold text-xs shadow-xl shadow-black/80 hover:scale-105 active:scale-95 transition-all"
        >
          <MessageCircle className="w-5 h-5 fill-slate-950" />
          <span className="hidden sm:inline">WhatsApp Order</span>
        </a>

        {cartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            title="Open Shopping Cart"
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-full font-bold text-xs shadow-xl shadow-black/80 hover:scale-105 active:scale-95 transition-all animate-bounce"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="tabular-nums">Cart ({cartCount})</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <FoodProvider>
      <AppContent />
    </FoodProvider>
  );
}
