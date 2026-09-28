import React, { useState } from 'react';
import { X, MapPin, Phone, User, Bike, Store, CreditCard, MessageCircle, Check, ArrowRight } from 'lucide-react';
import { useFood } from '../context/FoodContext';
import { OrderCustomer } from '../types/food';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    deliveryFee,
    discountAmount,
    cartTotal,
    placeOrder,
    generateWhatsAppOrderUrl,
  } = useFood();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'jazzcash' | 'easypaisa' | 'bank_transfer'>('cod');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isCheckoutOpen) return null;

  const currentDeliveryFee = deliveryType === 'pickup' ? 0 : deliveryFee;
  const currentTotal = cartSubtotal - discountAmount + currentDeliveryFee;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Please enter your full name';
    if (!phone.trim()) {
      errs.phone = 'Please enter your mobile number';
    } else if (!/^(\+92|0)?3[0-9]{2}-?[0-9]{7}$/.test(phone.replace(/\s+/g, ''))) {
      errs.phone = 'Please enter a valid Pakistani mobile number (e.g. 0300-1234567)';
    }
    if (deliveryType === 'delivery' && !address.trim()) {
      errs.address = 'Please enter your street address and nearest landmark in Lahore';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmOnline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const customer: OrderCustomer = {
      name,
      phone,
      deliveryType,
      address: deliveryType === 'delivery' ? address : 'Self-Pickup: Azhar Chiniot Pakwan, Model Town Link Road',
      notes,
    };

    placeOrder(customer, paymentMethod);
    setIsCheckoutOpen(false);
  };

  const handleConfirmViaWhatsApp = () => {
    if (!validate()) return;

    const customer: OrderCustomer = {
      name,
      phone,
      deliveryType,
      address: deliveryType === 'delivery' ? address : 'Self-Pickup: Model Town Branch',
      notes,
    };

    placeOrder(customer, paymentMethod);
    setIsCheckoutOpen(false);
    window.open(generateWhatsAppOrderUrl(customer), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0e1422] border border-amber-500/30 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              Complete Your Order
            </h3>
            <p className="text-xs text-slate-400">
              Provide delivery details or select takeaway from our Model Town branch
            </p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleConfirmOnline} className="space-y-6">
          
          {/* Delivery or Pickup Toggle */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Order Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  deliveryType === 'delivery'
                    ? 'bg-amber-950/40 border-amber-400 text-white shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg ${deliveryType === 'delivery' ? 'bg-amber-400 text-slate-950' : 'bg-slate-800'}`}>
                  <Bike className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold">Home Delivery</p>
                  <p className="text-[10px] text-slate-400">Model Town & Lahore City</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  deliveryType === 'pickup'
                    ? 'bg-amber-950/40 border-amber-400 text-white shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg ${deliveryType === 'pickup' ? 'bg-amber-400 text-slate-950' : 'bg-slate-800'}`}>
                  <Store className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold">Self Pickup (Takeaway)</p>
                  <p className="text-[10px] text-slate-400">Model Town Link Road</p>
                </div>
              </button>
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Customer Information
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mian Rehman / Farhan Khan"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>
                {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Mobile / WhatsApp Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {deliveryType === 'delivery' && (
              <div>
                <label className="block text-xs text-slate-400 mb-1">Delivery Address & Landmark *</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House number, Street, Block, Model Town / DHA / Gulberg, Lahore"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>
                {errors.address && <p className="text-[11px] text-red-400 mt-1">{errors.address}</p>}
              </div>
            )}

            <div>
              <label className="block text-xs text-slate-400 mb-1">Order Notes (Optional)</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Raita instructions, change required for 5000 note, ring bell twice, etc."
                className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 px-3 py-2 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Payment Method
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { id: 'cod', label: 'Cash on Delivery' },
                { id: 'jazzcash', label: 'JazzCash' },
                { id: 'easypaisa', label: 'EasyPaisa' },
                { id: 'bank_transfer', label: 'Bank Transfer' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    paymentMethod === m.id
                      ? 'bg-amber-950/40 border-amber-400 text-amber-300 font-bold shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary Recap */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Items Total ({cart.length} dishes):</span>
              <span className="tabular-nums">Rs. {cartSubtotal.toLocaleString()}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount Applied:</span>
                <span className="tabular-nums">-Rs. {discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-300">
              <span>Delivery Charges:</span>
              <span className="tabular-nums">
                {currentDeliveryFee === 0 ? 'FREE' : `Rs. ${currentDeliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-sm font-bold text-white">
              <span>Net Payable Amount:</span>
              <span className="text-amber-400 text-base tabular-nums">
                Rs. {currentTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Confirmation Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg shadow-amber-400/20 transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Order Online</span>
            </button>

            <button
              type="button"
              onClick={handleConfirmViaWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-900/30 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-950" />
              <span>Confirm via WhatsApp</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
