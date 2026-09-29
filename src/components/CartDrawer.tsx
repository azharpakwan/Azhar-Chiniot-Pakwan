import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle, Tag, Check, Sparkles } from 'lucide-react';
import { useFood } from '../context/FoodContext';
import { IMAGES, resolveDishImage } from '../assets/images';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    deliveryFee,
    discountAmount,
    cartTotal,
    appliedOffer,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen,
    generateWhatsAppOrderUrl,
  } = useFood();

  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMsg({ text: res.message, error: !res.success });
    if (res.success) setPromoInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e1422] border-l border-amber-500/20 text-slate-100 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  Your Food Cart
                </h3>
                <p className="text-xs text-slate-400">
                  {cart.length === 0 ? 'No items selected' : `${cart.length} dish types selected`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Clear Cart"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Your cart is empty</h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Explore our biryani, mutton kunna, qorma, and authentic traditional dishes to place an order.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md"
                >
                  Explore Our Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3.5 hover:border-slate-700 transition-all"
                >
                  <img
                    src={resolveDishImage(item.menuItem.image)}
                    alt={item.menuItem.nameEn}
                    className="w-16 h-16 rounded-lg object-cover bg-slate-950 shrink-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = IMAGES.heroSpread;
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                        {item.menuItem.nameEn}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.selectedPortion && (
                      <p className="text-[11px] text-amber-300/90">
                        {item.selectedPortion.name}
                      </p>
                    )}

                    {item.specialInstructions && (
                      <p className="text-[10px] text-slate-400 italic truncate">
                        Note: {item.specialInstructions}
                      </p>
                    )}

                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 tabular-nums">
                        Rs. {(item.unitPrice * item.quantity).toLocaleString()}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950/90 space-y-4">
              
              {/* Promo code input */}
              <div>
                {appliedOffer ? (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-amber-950/40 border border-amber-500/40 text-xs">
                    <div className="flex items-center gap-2 text-amber-300">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{appliedOffer.code}</strong> applied (-{appliedOffer.discountPercent}%)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-slate-400 hover:text-white text-xs underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code (e.g. SHADI15)"
                      className="flex-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-white placeholder-slate-500 outline-none uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMsg && (
                  <p className={`text-[11px] mt-1 ${promoMsg.error ? 'text-red-400' : 'text-emerald-400'}`}>
                    {promoMsg.text}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal:</span>
                  <span className="font-semibold tabular-nums">Rs. {cartSubtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount:</span>
                    <span className="tabular-nums">-Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Delivery Fee (Model Town & Lahore):</span>
                  <span className="font-semibold tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400">FREE</span>
                    ) : (
                      `Rs. ${deliveryFee}`
                    )}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-[10px] text-amber-400/80">
                    Add Rs. {(2500 - cartSubtotal).toLocaleString()} more for FREE delivery!
                  </p>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-sm font-bold text-white">
                  <span>Grand Total:</span>
                  <span className="text-amber-400 text-base tabular-nums">
                    Rs. {cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg shadow-amber-400/20 transition-all active:scale-95"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={generateWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-950" />
                  <span>Send Order via WhatsApp</span>
                </a>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
