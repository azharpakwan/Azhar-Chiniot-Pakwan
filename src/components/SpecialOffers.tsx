import React, { useState } from 'react';
import { Tag, Copy, Check, Gift, ArrowRight } from 'lucide-react';
import { useFood } from '../context/FoodContext';

export const SpecialOffers: React.FC = () => {
  const { offers, applyPromoCode, setIsCartOpen, language } = useFood();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    const res = applyPromoCode(code);
    if (res.success) {
      setMessage(res.message);
    }
    setTimeout(() => {
      setCopiedCode(null);
      setMessage(null);
    }, 4000);
  };

  return (
    <section id="offers" className="py-14 bg-gradient-to-b from-[#0b0f17] via-[#0d131f] to-[#0b0f17] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-950/60 border border-amber-500/20 px-3 py-1 rounded-md">
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            <span>Pakwan Deals & Discounts</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Special Offers & Packages
          </h2>
          {(language === 'both' || language === 'ur') && (
            <p className="font-urdu text-lg text-amber-200/80">
              شادی بیاہ، دعوت اور آن لائن آرڈر پر خصوصی رعایت
            </p>
          )}
          {message && (
            <div className="mt-3 p-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs rounded-lg inline-block">
              {message}
            </div>
          )}
        </div>

        {/* 3 Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="relative p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-lg hover:shadow-amber-500/5 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-semibold tracking-wider uppercase text-[11px]">
                    {offer.badge}
                  </span>
                  <span className="text-slate-400 text-[11px]">{offer.validity}</span>
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {offer.titleEn}
                  </h3>
                  {(language === 'both' || language === 'ur') && (
                    <p className="font-urdu text-sm text-amber-200/80 pt-0.5">
                      {offer.titleUrdu}
                    </p>
                  )}
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {offer.descriptionEn}
                  </p>
                </div>
              </div>

              {/* Promo code bar */}
              <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-dashed border-amber-500/40 font-mono text-xs font-bold text-amber-400 tracking-wider">
                  {offer.code}
                </div>

                <button
                  onClick={() => handleCopy(offer.code)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap active:scale-95"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied & Applied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
