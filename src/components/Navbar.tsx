import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Settings, Menu, X, Globe } from 'lucide-react';
import { useFood } from '../context/FoodContext';

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen, setIsAdminOpen, generateWhatsAppOrderUrl, language, setLanguage } = useFood();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    if (language === 'both') setLanguage('ur');
    else if (language === 'ur') setLanguage('en');
    else setLanguage('both');
  };

  const getLangLabel = () => {
    if (language === 'both') return 'EN / اردو';
    if (language === 'ur') return 'اردو';
    return 'English';
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0f17]/95 backdrop-blur-md border-b border-amber-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-display font-bold text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            AP
          </div>
          <div>
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white block group-hover:text-amber-400 transition-colors">
              Azhar Chiniot Pakwan
            </span>
          </div>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#hero" className="hover:text-amber-400 transition-colors">
            Home
          </a>
          <a href="#menu" className="hover:text-amber-400 transition-colors">
            Menu
          </a>
          <a href="#categories" className="hover:text-amber-400 transition-colors">
            Categories
          </a>
          <a href="#offers" className="hover:text-amber-400 transition-colors">
            Offers
          </a>
          <a href="#about" className="hover:text-amber-400 transition-colors">
            About Us
          </a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">
            Contact
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            title="Switch Language (Urdu / English)"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-200 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 rounded-lg transition-colors whitespace-nowrap"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{getLangLabel()}</span>
          </button>

          {/* Admin Switch */}
          <button
            onClick={() => setIsAdminOpen(true)}
            title="Admin Portal"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* WhatsApp Direct Order Button */}
          <a
            href={generateWhatsAppOrderUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm shadow-emerald-900/40 transition-all whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-950" />
            <span>WhatsApp Order</span>
          </a>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md shadow-amber-500/20 transition-all active:scale-95 whitespace-nowrap"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-slate-950" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] font-bold text-white bg-slate-950 rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e1420] border-b border-slate-800 px-5 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-base font-medium text-slate-200">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400"
            >
              Home
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400"
            >
              Explore Menu
            </a>
            <a
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400"
            >
              Food Categories
            </a>
            <a
              href="#offers"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400"
            >
              Special Offers
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400"
            >
              About Us (چنیوٹی روایات)
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400"
            >
              Contact & Location
            </a>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <a
              href={generateWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-950 bg-emerald-400 rounded-lg"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-950" />
              <span>WhatsApp Direct Order</span>
            </a>
            <button
              onClick={() => {
                setIsAdminOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1.5 py-2 px-3 bg-slate-800/80 rounded-lg"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
