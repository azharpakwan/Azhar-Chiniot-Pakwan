import React from 'react';
import { ArrowRight, MessageCircle, Flame, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { useFood } from '../context/FoodContext';

export const Hero: React.FC = () => {
  const { generateWhatsAppOrderUrl, language } = useFood();

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#0b0f17] via-[#0f172a] to-[#0b0f17]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand, Tagline, Story, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-400 bg-amber-950/60 border border-amber-500/30 rounded-lg px-3.5 py-1.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Al Mashoor Model Town Wala</span>
              <span className="text-amber-500/50">·</span>
              <span className="font-urdu text-sm">المشہور ماڈل ٹاؤن والا</span>
            </div>

            {/* Main Brand Title */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-tight">
                Azhar Chiniot <span className="text-amber-400">Pakwan</span>
              </h1>
              {(language === 'both' || language === 'ur') && (
                <p className="font-urdu text-2xl sm:text-3xl font-bold text-amber-200/90 pt-1">
                  اظہر چنیوٹ پکوان و کیٹرنگ سروس
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed text-balance">
              The premier destination for authentic Chinioti culinary mastery in Lahore. Renowned for our signature slow-simmered <strong className="text-white font-semibold">Mutton Kunna</strong>, royal saffron <strong className="text-white font-semibold">Degi Biryani</strong>, velvety Mughlai <strong className="text-white font-semibold">Qorma</strong>, and grand wedding catering.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 rounded-xl transition-all whitespace-nowrap"
              >
                <span>Explore Our Menu</span>
              </a>

              <a
                href={generateWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 text-sm font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02] whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-950" />
                <span>WhatsApp Order</span>
              </a>
            </div>

            {/* Trust and Authenticity Signals (Anti-slop, clean unboxed proof) */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Pure Desi Ghee</span>
                </div>
                <p className="text-xs text-slate-400">Hand-ground secret spices</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>30+ Years Trust</span>
                </div>
                <p className="text-xs text-slate-400">Model Town landmark</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Hot Daig Delivery</span>
                </div>
                <p className="text-xs text-slate-400">Insulated steam packaging</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Weddings & Dawat</span>
                </div>
                <p className="text-xs text-slate-400">10 to 500+ guests</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset & Floating Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-black/80 bg-slate-900 group">
              <img
                src="/src/assets/images/hero_azhar_pakwan_spread_1790592430943.jpg"
                alt="Azhar Chiniot Pakwan royal feast with steaming biryani, mutton karahi, and fresh tandoori naan"
                className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              {/* Bottom Badge Bar */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-amber-500/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
                    <span>Signature Pakwan</span>
                    <span>·</span>
                    <span>Prepared Daily</span>
                  </div>
                  <h2 className="text-white font-semibold text-sm sm:text-base">
                    Copper Deg & Clay Handi Cooking
                  </h2>
                </div>
                <a
                  href="#menu"
                  className="px-3.5 py-1.5 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg whitespace-nowrap transition-colors"
                >
                  Order
                </a>
              </div>
            </div>

            {/* Subtle decorative accent pill */}
            <div className="absolute -top-4 -right-4 bg-slate-900/90 border border-amber-400/40 shadow-xl rounded-xl p-3 hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                100%
              </div>
              <div className="text-left">
                <p className="text-[11px] font-semibold text-white">Fresh Halal Meat</p>
                <p className="text-[10px] text-slate-400">Certified Daily Slaughter</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
