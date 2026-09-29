import React from 'react';
import { Star, Plus, Flame, Clock, Sparkles } from 'lucide-react';
import { useFood } from '../context/FoodContext';
import { MenuItem } from '../types/food';
import { IMAGES, resolveDishImage } from '../assets/images';

export const FeaturedDishes: React.FC = () => {
  const { menuItems, setSelectedDish, addToCart, language } = useFood();

  // Pick top 4 signature/popular dishes
  const featured = menuItems
    .filter((m) => m.isPopular || m.tag)
    .slice(0, 4);

  return (
    <section className="py-16 bg-[#0b0f17] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chinioti Culinary Pride</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Featured Royal Dishes
            </h2>
            {(language === 'both' || language === 'ur') && (
              <p className="font-urdu text-lg text-amber-200/80 pt-1">
                ماڈل ٹاؤن کے سب سے زیادہ پسندیدہ شاہی کھانے
              </p>
            )}
          </div>
          <a
            href="#menu"
            className="text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <span>View Full 24+ Item Menu</span>
            <span>&rarr;</span>
          </a>
        </div>

        {/* 4-Column Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((dish: MenuItem) => (
            <div
              key={dish.id}
              className="group bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800/90 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/60 hover:-translate-y-1"
            >
              {/* Image & Badges */}
              <div
                className="relative h-52 overflow-hidden cursor-pointer bg-slate-950"
                onClick={() => setSelectedDish(dish)}
              >
                <img
                  src={resolveDishImage(dish.image)}
                  alt={dish.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to hero image if any asset path issue arises
                    (e.target as HTMLImageElement).src = IMAGES.heroSpread;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                
                {/* Clean unboxed tags (Anti-slop compliant) */}
                <div className="absolute top-3 left-3 flex items-center gap-2 text-[11px] font-semibold text-amber-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-amber-500/30">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{dish.tag || 'Popular Dish'}</span>
                </div>

                {dish.spiceLevel && (
                  <div className="absolute top-3 right-3 text-[11px] text-slate-300 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-400" />
                    <span>{dish.spiceLevel}</span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-xs text-amber-200/90 font-medium">
                    {dish.portionLabel}
                  </p>
                </div>
              </div>

              {/* Dish Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div
                  className="cursor-pointer space-y-1"
                  onClick={() => setSelectedDish(dish)}
                >
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {dish.nameEn}
                  </h3>
                  {(language === 'both' || language === 'ur') && (
                    <p className="font-urdu text-sm text-amber-300/90 font-medium">
                      {dish.nameUrdu}
                    </p>
                  )}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed pt-1">
                    {dish.descriptionEn}
                  </p>
                </div>

                {/* Pricing & Add to Cart Action */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Price</span>
                    <span className="text-base sm:text-lg font-bold text-amber-400 tabular-nums">
                      Rs. {dish.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedDish(dish)}
                      className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                      title="View Ingredients & Portions"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => addToCart(dish)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all active:scale-95 whitespace-nowrap"
                      title="Add to Order"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
