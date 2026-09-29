import React, { useState } from 'react';
import { X, ChefHat, Users, MessageCircle, Calculator, Sparkles } from 'lucide-react';

interface CateringCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CateringCalculatorModal: React.FC<CateringCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [guests, setGuests] = useState<number>(50);
  const [dishChoice, setDishChoice] = useState<'chicken_biryani' | 'mutton_biryani' | 'mutton_kunna' | 'chicken_qorma'>('chicken_biryani');
  const [meatRatio, setMeatRatio] = useState<'standard' | 'royal'>('standard');
  const [includeSweet, setIncludeSweet] = useState<boolean>(true);

  if (!isOpen) return null;

  // Calculation logic based on traditional Pakistani pakwan standards:
  // 1 Daig of 12kg raw rice feeds approx 35-40 guests comfortably
  const daigsNeeded = Math.max(1, Math.ceil(guests / 38));

  // Pricing estimates
  let baseDaigPrice = 17500; // Chicken biryani daig
  let dishName = 'Chicken Biryani Daig';
  if (dishChoice === 'mutton_biryani') {
    baseDaigPrice = 36000;
    dishName = 'Degi Mutton Biryani Daig';
  } else if (dishChoice === 'mutton_kunna') {
    baseDaigPrice = 32000;
    dishName = 'Chinioti Mutton Kunna Handi Deg';
  } else if (dishChoice === 'chicken_qorma') {
    baseDaigPrice = 18500;
    dishName = 'Shahi Chicken Qorma Daig (with Naan)';
  }

  const multiplier = meatRatio === 'royal' ? 1.2 : 1.0;
  const daigTotal = Math.round(daigsNeeded * baseDaigPrice * multiplier);
  const sweetTotal = includeSweet ? Math.round(guests * 120) : 0;
  const estimatedGrandTotal = daigTotal + sweetTotal;

  const buildWhatsAppCateringMessage = () => {
    const text = `*Catering / Bulk Daig Inquiry - Azhar Chiniot Pakwan*\n\n` +
      `• *Total Guests:* ${guests} Persons\n` +
      `• *Main Menu Choice:* ${dishName}\n` +
      `• *Meat Ratio:* ${meatRatio === 'royal' ? 'Royal Meat (1:1.5)' : 'Standard (1:1)'}\n` +
      `• *Estimated Daigs Needed:* ${daigsNeeded} Daig(s) (~${daigsNeeded * 12}kg)\n` +
      `• *Includes Degi Zarda/Sweet:* ${includeSweet ? 'Yes (Zarda/Mutanjan)' : 'No'}\n` +
      `• *Estimated Total Budget:* Rs. ${estimatedGrandTotal.toLocaleString()}\n\n` +
      `Please provide booking availability, live tandoor options, and formal quote for my event.`;
    return `https://wa.me/923004936594?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0e1422] border border-amber-500/30 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6 text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Pakwan & Daig Calculator
              </h3>
              <p className="text-xs text-slate-400">
                دیگ اور کیٹرنگ تخمینہ کیلکولیٹر
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          
          {/* Guest Count Slider & Quick Buttons */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-slate-300">Expected Guests:</span>
              <span className="font-bold text-amber-400 text-sm tabular-nums">
                {guests} Persons
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="10"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex items-center gap-2 mt-2">
              {[35, 75, 120, 200, 350].map((count) => (
                <button
                  key={count}
                  onClick={() => setGuests(count)}
                  className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
                    guests === count
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {count}p
                </button>
              ))}
            </div>
          </div>

          {/* Dish Selection */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Primary Dish:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'chicken_biryani', label: 'Chicken Biryani' },
                { id: 'mutton_biryani', label: 'Mutton Biryani' },
                { id: 'mutton_kunna', label: 'Mutton Kunna' },
                { id: 'chicken_qorma', label: 'Chicken Qorma + Naan' },
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDishChoice(d.id as any)}
                  className={`p-2.5 text-xs text-left rounded-xl border transition-all ${
                    dishChoice === d.id
                      ? 'bg-amber-950/40 border-amber-500/60 text-amber-300 font-semibold shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Meat Ratio */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-300">Meat Ratio:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMeatRatio('standard')}
                className={`px-3 py-1 rounded-md ${
                  meatRatio === 'standard'
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'bg-slate-900 text-slate-400'
                }`}
              >
                Standard (1:1)
              </button>
              <button
                type="button"
                onClick={() => setMeatRatio('royal')}
                className={`px-3 py-1 rounded-md ${
                  meatRatio === 'royal'
                    ? 'bg-amber-400 text-slate-950 font-semibold'
                    : 'bg-slate-900 text-slate-400'
                }`}
              >
                Royal Extra Meat
              </button>
            </div>
          </div>

          {/* Add Sweet Rice Checkbox */}
          <div className="flex items-center gap-2 pt-1 text-xs">
            <input
              type="checkbox"
              id="includeSweet"
              checked={includeSweet}
              onChange={(e) => setIncludeSweet(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-amber-400 focus:ring-0"
            />
            <label htmlFor="includeSweet" className="text-slate-300 cursor-pointer">
              Include Degi Shahi Zarda / Mutanjan Sweet Rice (+Rs. 120/guest)
            </label>
          </div>

        </div>

        {/* Calculation Result Summary Card */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-500/30 space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-300">
            <span>Recommended Quantity:</span>
            <span className="font-bold text-amber-300 text-sm">
              {daigsNeeded} Daig(s) (~{daigsNeeded * 12} Kg)
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Per Person Serving:</span>
            <span>Approx. 350-400g + Raita & Salad</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-sm font-bold text-white">
            <span>Estimated Total:</span>
            <span className="text-amber-400 text-base tabular-nums">
              Rs. {estimatedGrandTotal.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href={buildWhatsAppCateringMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-900/40 transition-all hover:scale-[1.01]"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-950" />
            <span>Send Estimate to WhatsApp Manager</span>
          </a>
        </div>

      </div>
    </div>
  );
};
