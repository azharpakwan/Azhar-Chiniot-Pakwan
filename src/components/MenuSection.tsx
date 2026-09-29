import React, { useState } from 'react';
import { Search, Plus, Star, Flame, Calculator, Sparkles, AlertCircle } from 'lucide-react';
import { useFood } from '../context/FoodContext';
import { MenuItem } from '../types/food';
import { IMAGES, resolveDishImage } from '../assets/images';

interface MenuSectionProps {
  onOpenCalculator: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onOpenCalculator }) => {
  const {
    menuItems,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    popularOnly,
    setPopularOnly,
    setSelectedDish,
    addToCart,
    language,
  } = useFood();

  // Filter items
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.categoryId === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameUrdu.includes(searchQuery) ||
      item.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPopular = !popularOnly || item.isPopular;
    return matchesCategory && matchesSearch && matchesPopular;
  });

  return (
    <section id="menu" className="py-16 bg-[#0b0f17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authentic Pakistani Pakwan</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore Our Food Menu
            </h2>
            {(language === 'both' || language === 'ur') && (
              <p className="font-urdu text-xl text-amber-200/90 pt-1">
                چنیوٹ کا اصلی ذائقہ، خالص اجزاء اور روایتی تراکیب
              </p>
            )}
          </div>

          {/* Daig & Catering Calculator CTA */}
          <button
            onClick={onOpenCalculator}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/40 rounded-xl transition-all shadow-md active:scale-95"
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Daig / Catering Estimator</span>
          </button>
        </div>

        {/* Filter Controls (Search + Category Tabs + Popular Switch) */}
        <div className="space-y-4 mb-10">
          
          {/* Search bar & Popular toggle */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Biryani, Kunna, Qorma, Pulao..."
                className="w-full bg-slate-900/90 border border-slate-800 focus:border-amber-400 pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Popular toggle button */}
            <button
              onClick={() => setPopularOnly(!popularOnly)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                popularOnly
                  ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-400/20'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${popularOnly ? 'fill-slate-950' : 'text-amber-400'}`} />
              <span>Popular Only</span>
            </button>
          </div>

          {/* Category Tabs (Segmented control style) */}
          <div id="categories" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All Dishes ({menuItems.length})
            </button>

            {categories.map((cat) => {
              const count = menuItems.filter((i) => i.categoryId === cat.id).length;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <span>{cat.nameEn}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Food Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-400/60 mx-auto" />
            <h3 className="text-lg font-bold text-white">No dishes found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find any dishes matching your search. Try another keyword or switch category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPopularOnly(false);
              }}
              className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((dish: MenuItem) => (
              <div
                key={dish.id}
                className="group bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/70"
              >
                {/* Food Image */}
                <div
                  className="relative h-52 overflow-hidden cursor-pointer bg-slate-950"
                  onClick={() => setSelectedDish(dish)}
                >
                  <img
                    src={resolveDishImage(dish.image, dish.id, dish.categoryId)}
                    alt={dish.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = IMAGES.chickenBiryani;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  
                  {/* Tags */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {dish.isPopular && (
                      <span className="text-[11px] font-semibold text-amber-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-amber-500/30 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>Popular</span>
                      </span>
                    )}
                    {dish.tag && (
                      <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-emerald-500/30">
                        {dish.tag}
                      </span>
                    )}
                  </div>

                  {dish.spiceLevel && (
                    <div className="absolute top-3 right-3 text-[11px] text-slate-300 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Flame className="w-3 h-3 text-red-400" />
                      <span>{dish.spiceLevel}</span>
                    </div>
                  )}

                  {!dish.isAvailable && (
                    <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                      <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-500/50 px-3 py-1 rounded-md uppercase tracking-wider">
                        Currently Unavailable
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-xs text-amber-200/90 font-medium">
                      {dish.portionLabel}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
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

                  {/* Pricing and Action Buttons */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Starting at</span>
                      <span className="text-base sm:text-lg font-bold text-amber-400 tabular-nums">
                        Rs. {dish.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedDish(dish)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        Details
                      </button>
                      <button
                        disabled={!dish.isAvailable}
                        onClick={() => addToCart(dish)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all active:scale-95 whitespace-nowrap ${
                          dish.isAvailable
                            ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
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
        )}

      </div>
    </section>
  );
};
