import React from 'react';
import { CheckCircle2, MessageCircle, Clock, MapPin, Phone, Printer, X, Sparkles } from 'lucide-react';
import { useFood } from '../context/FoodContext';

export const OrderConfirmationModal: React.FC = () => {
  const { latestConfirmedOrder, setLatestConfirmedOrder } = useFood();

  if (!latestConfirmedOrder) return null;

  const order = latestConfirmedOrder;

  const handlePrint = () => {
    window.print();
  };

  const getWhatsAppFollowUp = () => {
    const text = `Assalam-o-Alaikum! I have placed order *#${order.orderNumber}* for *${order.customer.name}*. Total: Rs. ${order.total.toLocaleString()}. Please confirm receipt and estimated delivery time. Shukriya!`;
    return `https://wa.me/923004936594?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#0e1422] border border-amber-500/30 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => setLatestConfirmedOrder(null)}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Success Banner */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block">
            Order Confirmed
          </span>
          <h3 className="font-display text-2xl font-bold text-white">
            Shukriya! Order #{order.orderNumber}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
            Your authentic Chinioti meal is being forwarded to our master bawarchi in Model Town Extension.
          </p>
        </div>

        {/* Preparation Timeline */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Order Status
          </p>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-semibold">
              <span className="block text-[10px] text-emerald-400">Step 1</span>
              <span>Received</span>
            </div>
            <div className="p-2 rounded-lg bg-amber-950/80 border border-amber-500/50 text-amber-300 font-semibold">
              <span className="block text-[10px] text-amber-400">Step 2</span>
              <span>In Kitchen</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-500">
              <span className="block text-[10px]">Step 3</span>
              <span>Dispatched</span>
            </div>
          </div>
          <p className="text-[11px] text-amber-400/90 text-center flex items-center justify-center gap-1.5 pt-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Estimated cooking & dispatch: 30 - 45 minutes</span>
          </p>
        </div>

        {/* Itemized Receipt */}
        <div className="space-y-3 text-xs">
          <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 pb-2">
            <span>Dish</span>
            <span>Total</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start text-slate-200">
                <div>
                  <span className="font-semibold">{item.menuItem.nameEn}</span>
                  {item.selectedPortion && (
                    <span className="text-slate-400 text-[11px] block">
                      {item.selectedPortion.name}
                    </span>
                  )}
                  <span className="text-slate-500 text-[11px]">
                    Qty: {item.quantity} x Rs. {item.unitPrice.toLocaleString()}
                  </span>
                </div>
                <span className="font-bold tabular-nums text-white">
                  Rs. {(item.unitPrice * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-3 border-t border-slate-800 space-y-1 text-slate-300">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="tabular-nums">Rs. {order.subtotal.toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount:</span>
                <span className="tabular-nums">-Rs. {order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Charges:</span>
              <span className="tabular-nums">
                {order.deliveryFee === 0 ? 'FREE' : `Rs. ${order.deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-sm font-bold text-white">
              <span>Total Bill:</span>
              <span className="text-amber-400 text-base tabular-nums">
                Rs. {order.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Customer & Address Details */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5 text-slate-300">
          <p className="font-semibold text-white">Customer Information:</p>
          <p><strong>Name:</strong> {order.customer.name}</p>
          <p><strong>Phone:</strong> {order.customer.phone}</p>
          <p><strong>Type:</strong> {order.customer.deliveryType === 'delivery' ? 'Home Delivery' : 'Self Pickup (Model Town Extension)'}</p>
          {order.customer.address && <p><strong>Address:</strong> {order.customer.address}</p>}
          {order.customer.notes && <p><strong>Instructions:</strong> {order.customer.notes}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <a
            href={getWhatsAppFollowUp()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-950" />
            <span>Track & Chat on WhatsApp</span>
          </a>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors whitespace-nowrap"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>

      </div>
    </div>
  );
};
