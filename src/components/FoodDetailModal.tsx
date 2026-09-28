import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Flame, ShoppingBag, Clock, Sparkles, Check, MessageCircle } from 'lucide-react';
import { useFood } from '../context/FoodContext';
import { PortionOption } from '../types/food';

export const FoodDetailModal: React.FC = () => {
  const {
    selectedDish,
    setSelectedDish,
    addToCart,
    setIsCartOpen,
    setIsCheckoutOpen,
    language,
    generateWhatsAppOrderUrl,
  } = useFood();

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedPortion, setSelectedPortion] = useState<PortionOption | undefined>(undefined);
  const [instructions, setInstructions] = useState<string>('');
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (selectedDish) {
      setQuantity(1);
      setInstructions('');
      if (selectedDish.portions && selectedDish.portions.length > 0) {
        setSelectedPortion(selectedDish.portions[0]);
      } else {
        setSelectedPortion(undefined);
      }
    }
  }, [selectedDish]);

  if (!selectedDish) return null;

  const currentPrice = selectedPortion ? selectedPortion.price : selectedDish.price;
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    addToCart(selectedDish, selectedPortion, quantity, instructions);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      setSelectedDish(null);
    }, 1200);
  };

  const handleOrderNow = () => {
    addToCart(selectedDish, selectedPortion, quantity, instructions);
    setSelectedDish(null);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppInstant = () => {
    addToCart(selectedDish, selectedPortion, quantity, instructions);
    setSelectedDish(null);
    window.open(generateWhatsAppOrderUrl(), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0e1422] border border-amber-500/30 rounded-2xl sm:rounded-3xl shadow-2xl text-slate-100 flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedDish(null)}
          className="absolute top-4 right-4 z-20 p-2 text-slate-300 hover:text-white bg-black/60 hover:bg-black/90 backdrop-blur-sm rounded-full transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top: Large Food Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950 shrink-0">
          <img
            src={selectedDish.image}
            alt={selectedDish.nameEn}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/src/assets/images/hero_azhar_pakwan_spread_1790592430943.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1422] via-[#0e1422]/20 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                {selectedDish.categoryId.toUpperCase()}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                {selectedDish.nameEn}
              </h2>
              {(language === 'both' || language === 'ur') && (
                <p className="font-urdu text-xl text-amber-200">
                  {selectedDish.nameUrdu}
                </p>
              )}
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-300 block">Current Portion</span>
              <span className="text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">
                Rs. {currentPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          
          {/* Toast Notification */}
          {addedToast && (
            <div className="p-3 bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 animate-in zoom-in-95">
              <Check className="w-4 h-4" />
              <span>Added to your food cart successfully!</span>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              About This Dish
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {selectedDish.descriptionEn}
            </p>
            {(language === 'both' || language === 'ur') && (
              <p className="font-urdu text-base text-amber-100/90 pt-1 leading-relaxed">
                {selectedDish.descriptionUrdu}
              </p>
            )}
          </div>

          {/* Portions / Serving Sizes Selector */}
          {selectedDish.portions && selectedDish.portions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Select Portion / Serving Size
                </label>
                <span className="text-xs text-slate-400">
                  Standard Serving: {selectedDish.servingSize}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedDish.portions.map((portion) => {
                  const isSelected = selectedPortion?.name === portion.name;
                  return (
                    <button
                      key={portion.name}
                      type="button"
                      onClick={() => setSelectedPortion(portion)}
                      className={`p-3 text-left rounded-xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-950/50 border-amber-400 text-white shadow-md'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-semibold">{portion.name}</p>
                        <p className="text-[11px] text-slate-400">{portion.serving}</p>
                      </div>
                      <span className="text-xs font-bold text-amber-400 tabular-nums">
                        Rs. {portion.price.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Ingredients & Prep */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                Fresh Ingredients
              </h4>
              <ul className="text-xs text-slate-300 space-y-1">
                {selectedDish.ingredientsEn.map((ing, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                Authentic Prep Details
              </h4>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Serving Measure:</span>
                  <span>{selectedDish.servingSize}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Spice Level:</span>
                  <span className="text-amber-300">{selectedDish.spiceLevel || 'Medium'}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400">Kitchen Prep:</span>
                  <span>{selectedDish.prepTime || '15-20 mins'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Special Cooking Instructions input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">
              Special Instructions (e.g., less spice, extra raita, well fried onions):
            </label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Add your note for our master chef..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
            />
          </div>

          {/* Quantity and Actions Bar */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Quantity Stepper */}
            <div className="flex items-center justify-between sm:justify-start gap-3">
              <span className="text-xs font-medium text-slate-400">Quantity:</span>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-white tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-right sm:text-left sm:ml-3">
                <span className="text-[10px] text-slate-400 block uppercase">Subtotal</span>
                <span className="text-base font-bold text-amber-400 tabular-nums">
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* CTA Buttons: Add to Cart & Order Now */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all whitespace-nowrap active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleOrderNow}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg shadow-amber-400/25 transition-all whitespace-nowrap active:scale-95"
              >
                <span>Order Now</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppInstant}
                title="Instant WhatsApp Order"
                className="p-3 text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-900/30 transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-emerald-950" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
