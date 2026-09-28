import React from 'react';
import { ChefHat, Flame, Award, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';
import { useFood } from '../context/FoodContext';

export const AboutUs: React.FC = () => {
  const { language } = useFood();

  return (
    <section id="about" className="py-18 bg-[#0e1422] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image showcase with Authentic Copper Deg */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-black/80 group">
              <img
                src="/src/assets/images/catering_wedding_deg_1790592481502.jpg"
                alt="Traditional copper pakwan deghs of Azhar Chiniot Pakwan simmering for wedding catering"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-amber-500/30">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Chinioti Heritage
                </p>
                <h4 className="text-white font-semibold text-sm sm:text-base">
                  Authentic Copper Daig Sealing (دم پخت)
                </h4>
                <p className="text-[11px] text-slate-300 mt-1">
                  Cooked over slow coal embers with pure ghee and whole spices.
                </p>
              </div>
            </div>

            {/* Experience badge */}
            <div className="absolute -top-4 -left-4 bg-amber-400 text-slate-950 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 font-bold">
              <span className="font-display text-3xl">30+</span>
              <div className="text-left leading-tight text-xs">
                <span>Years of Royal</span>
                <span className="block font-normal">Chinioti Pakwan</span>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Specialization */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <ChefHat className="w-4 h-4 text-amber-400" />
                <span>Our Heritage & Craft</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                About Azhar Chiniot Pakwan
              </h2>
              {(language === 'both' || language === 'ur') && (
                <p className="font-urdu text-2xl font-bold text-amber-300 pt-1">
                  المشہور ماڈل ٹاؤن والا - اصل روایتی پکوان اور کیٹرنگ
                </p>
              )}
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Founded on the timeless culinary traditions of Chiniot, <strong className="text-white font-semibold">Azhar Chiniot Pakwan</strong> has earned legendary status in Model Town, Lahore. We specialize in authentic Pakistani pakwan, slow-cooked in traditional copper deghs and earthenware clay pots.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              From our world-renowned <strong className="text-amber-300 font-semibold">Mutton Kunna</strong> and celebratory <strong className="text-amber-300 font-semibold">Degi Biryani</strong> to rich Mughlai <strong className="text-amber-300 font-semibold">Chicken & Mutton Qorma</strong>, each recipe is prepared with 100% fresh halal meat, pure desi ghee, and our family secret blend of hand-ground potli spices.
            </p>

            {/* Core Capabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Grand Wedding Catering</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Custom deghs from 10kg to 100kg+, live tandoor setups, and courteous staff for Barat and Walima.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Home Delivery & Dawat</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Insulated thermal packaging ensuring biryani and curries arrive piping hot at your doorstep.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Chiniot Mitti Ki Handi</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  The original 6-hour simmered Mutton Kunna cooked inside authentic clay pots.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Hygiene & Halal Guarantee</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Daily fresh slaughter goat and poultry, triple-washed basmati rice, and strict food safety.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
