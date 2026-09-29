import React, { useState } from 'react';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Check,
  Star,
  ToggleLeft,
  ToggleRight,
  Package,
  Layers,
  Tag,
  ShoppingBag,
  RotateCcw,
  Sparkles,
  Search,
} from 'lucide-react';
import { useFood } from '../context/FoodContext';
import { MenuItem, Category, SpecialOffer, Order } from '../types/food';
import { IMAGES, resolveDishImage } from '../assets/images';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    menuItems,
    categories,
    offers,
    orders,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleItemAvailability,
    toggleItemPopular,
    addCategory,
    addSpecialOffer,
    updateOrderStatus,
    resetToDefaults,
  } = useFood();

  const [activeTab, setActiveTab] = useState<'dishes' | 'addDish' | 'offers' | 'categories' | 'orders'>('dishes');
  const [editingDish, setEditingDish] = useState<MenuItem | null>(null);
  const [searchAdmin, setSearchAdmin] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New Dish Form State
  const [newDish, setNewDish] = useState({
    nameEn: '',
    nameUrdu: '',
    categoryId: 'biryani',
    descriptionEn: '',
    descriptionUrdu: '',
    price: 500,
    portionLabel: 'Full Plate',
    image: IMAGES.chickenBiryani,
    ingredientsEn: 'Basmati Rice, Fresh Chicken, Desi Spices',
    ingredientsUrdu: 'باسمتی چاول، چکن، مصالحہ جات',
    servingSize: 'Plate (~450g)',
    spiceLevel: 'Medium' as 'Mild' | 'Medium' | 'Spicy' | 'Royal Deg Masala',
    isPopular: false,
    isAvailable: true,
  });

  // New Offer Form State
  const [newOffer, setNewOffer] = useState({
    titleEn: '',
    titleUrdu: '',
    descriptionEn: '',
    descriptionUrdu: '',
    code: '',
    discountPercent: 10,
    minOrder: 1500,
    badge: 'Special Deal',
    validity: 'Limited Time',
  });

  // New Category Form State
  const [newCat, setNewCat] = useState({
    nameEn: '',
    nameUrdu: '',
    description: '',
  });

  if (!isAdminOpen) return null;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSaveNewDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDish.nameEn.trim()) return;

    addMenuItem({
      nameEn: newDish.nameEn,
      nameUrdu: newDish.nameUrdu || newDish.nameEn,
      categoryId: newDish.categoryId,
      descriptionEn: newDish.descriptionEn,
      descriptionUrdu: newDish.descriptionUrdu || newDish.descriptionEn,
      price: Number(newDish.price),
      portionLabel: newDish.portionLabel,
      image: newDish.image,
      ingredientsEn: newDish.ingredientsEn.split(',').map((s) => s.trim()),
      ingredientsUrdu: newDish.ingredientsUrdu.split('،').map((s) => s.trim()),
      servingSize: newDish.servingSize,
      spiceLevel: newDish.spiceLevel,
      isPopular: newDish.isPopular,
      isAvailable: newDish.isAvailable,
      portions: [
        { name: 'Standard Portion', price: Number(newDish.price), serving: newDish.servingSize },
      ],
    });

    showToast(`Added ${newDish.nameEn} to the menu!`);
    setActiveTab('dishes');
    setNewDish({
      nameEn: '',
      nameUrdu: '',
      categoryId: 'biryani',
      descriptionEn: '',
      descriptionUrdu: '',
      price: 500,
      portionLabel: 'Full Plate',
      image: IMAGES.chickenBiryani,
      ingredientsEn: 'Basmati Rice, Fresh Chicken, Desi Spices',
      ingredientsUrdu: 'باسمتی چاول، چکن، مصالحہ جات',
      servingSize: 'Plate (~450g)',
      spiceLevel: 'Medium',
      isPopular: false,
      isAvailable: true,
    });
  };

  const handleSaveEditDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDish) return;
    updateMenuItem(editingDish);
    showToast(`Updated ${editingDish.nameEn}!`);
    setEditingDish(null);
  };

  const handleSaveOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOffer.code.trim()) return;
    addSpecialOffer({
      id: `offer-${Date.now()}`,
      titleEn: newOffer.titleEn,
      titleUrdu: newOffer.titleUrdu || newOffer.titleEn,
      descriptionEn: newOffer.descriptionEn,
      descriptionUrdu: newOffer.descriptionUrdu,
      code: newOffer.code.toUpperCase(),
      discountPercent: Number(newOffer.discountPercent),
      minOrder: Number(newOffer.minOrder),
      badge: newOffer.badge,
      validity: newOffer.validity,
    });
    showToast(`Added Promo Code ${newOffer.code}!`);
    setNewOffer({
      titleEn: '',
      titleUrdu: '',
      descriptionEn: '',
      descriptionUrdu: '',
      code: '',
      discountPercent: 10,
      minOrder: 1500,
      badge: 'Special Deal',
      validity: 'Limited Time',
    });
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.nameEn.trim()) return;
    const catId = newCat.nameEn.toLowerCase().replace(/\s+/g, '-');
    addCategory({
      id: catId,
      nameEn: newCat.nameEn,
      nameUrdu: newCat.nameUrdu || newCat.nameEn,
      description: newCat.description,
      icon: 'UtensilsCrossed',
    });
    showToast(`Added Category ${newCat.nameEn}!`);
    setNewCat({ nameEn: '', nameUrdu: '', description: '' });
  };

  const filteredDishes = menuItems.filter((d) =>
    d.nameEn.toLowerCase().includes(searchAdmin.toLowerCase()) ||
    d.nameUrdu.includes(searchAdmin) ||
    d.categoryId.includes(searchAdmin.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#0e1422] border border-amber-500/30 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col text-slate-100 overflow-hidden">
        
        {/* Top Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
              ACP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-white">
                  Owner Management Console
                </h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded">
                  Admin Portal
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Azhar Chiniot Pakwan (Al Mashoor Model Town Wala)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetToDefaults}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg transition-colors"
              title="Reset all menu data to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMsg && (
          <div className="bg-emerald-950 border-b border-emerald-500/40 text-emerald-300 px-5 py-2 text-xs flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 overflow-x-auto px-5 gap-1 scrollbar-none">
          {[
            { id: 'dishes', label: `Manage Dishes (${menuItems.length})`, icon: Package },
            { id: 'addDish', label: 'Add New Dish', icon: Plus },
            { id: 'orders', label: `Live Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'offers', label: `Promo Offers (${offers.length})`, icon: Tag },
            { id: 'categories', label: `Categories (${categories.length})`, icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setEditingDish(null);
                }}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'border-amber-400 text-amber-300 bg-amber-950/20'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          
          {/* TAB 1: MANAGE DISHES */}
          {activeTab === 'dishes' && (
            <div className="space-y-4">
              {/* Search & Actions */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchAdmin}
                    onChange={(e) => setSearchAdmin(e.target.value)}
                    placeholder="Search dish to edit..."
                    className="w-full bg-slate-900 border border-slate-800 pl-9 pr-3 py-1.5 rounded-xl text-xs text-white placeholder-slate-500 outline-none"
                  />
                </div>

                <button
                  onClick={() => setActiveTab('addDish')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Dish</span>
                </button>
              </div>

              {/* Edit Modal / Inline Panel if editingDish is set */}
              {editingDish && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/40 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h4 className="text-sm font-bold text-amber-300">
                      Edit Dish: {editingDish.nameEn}
                    </h4>
                    <button
                      onClick={() => setEditingDish(null)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleSaveEditDish} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1">English Name</label>
                        <input
                          type="text"
                          value={editingDish.nameEn}
                          onChange={(e) => setEditingDish({ ...editingDish, nameEn: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Urdu Name</label>
                        <input
                          type="text"
                          value={editingDish.nameUrdu}
                          onChange={(e) => setEditingDish({ ...editingDish, nameUrdu: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-urdu"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1">Price (PKR)</label>
                        <input
                          type="number"
                          value={editingDish.price}
                          onChange={(e) => setEditingDish({ ...editingDish, price: Number(e.target.value) })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white tabular-nums"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Category</label>
                        <select
                          value={editingDish.categoryId}
                          onChange={(e) => setEditingDish({ ...editingDish, categoryId: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                        >
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.nameEn}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Serving Measure</label>
                        <input
                          type="text"
                          value={editingDish.portionLabel}
                          onChange={(e) => setEditingDish({ ...editingDish, portionLabel: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Description (English)</label>
                      <textarea
                        rows={2}
                        value={editingDish.descriptionEn}
                        onChange={(e) => setEditingDish({ ...editingDish, descriptionEn: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Image URL / Path</label>
                      <input
                        type="text"
                        value={editingDish.image}
                        onChange={(e) => setEditingDish({ ...editingDish, image: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-[11px]"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingDish(null)}
                        className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-amber-400 text-slate-950 font-bold rounded-lg hover:bg-amber-300"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Dishes Table */}
              <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950/70">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Dish</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Popular</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredDishes.map((dish) => (
                      <tr key={dish.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={resolveDishImage(dish.image, dish.id, dish.categoryId)}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover bg-slate-900 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = IMAGES.chickenBiryani;
                            }}
                          />
                          <div>
                            <span className="font-semibold text-white block">{dish.nameEn}</span>
                            <span className="text-slate-400 font-urdu">{dish.nameUrdu}</span>
                          </div>
                        </td>
                        <td className="p-3 text-slate-300 capitalize">{dish.categoryId}</td>
                        <td className="p-3 font-bold text-amber-400 tabular-nums">
                          Rs. {dish.price.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => toggleItemPopular(dish.id)}
                            className={`p-1 rounded transition-colors ${
                              dish.isPopular ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
                            }`}
                            title="Toggle Popular status"
                          >
                            <Star className={`w-4 h-4 ${dish.isPopular ? 'fill-amber-400' : ''}`} />
                          </button>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => toggleItemAvailability(dish.id)}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                              dish.isAvailable
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                                : 'bg-red-950 text-red-400 border border-red-500/30'
                            }`}
                          >
                            {dish.isAvailable ? 'Available' : 'Unavailable'}
                          </button>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => setEditingDish(dish)}
                            className="p-1 text-slate-400 hover:text-amber-300 transition-colors"
                            title="Edit Dish"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete ${dish.nameEn}?`)) {
                                deleteMenuItem(dish.id);
                                showToast(`Deleted ${dish.nameEn}`);
                              }
                            }}
                            className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                            title="Delete Dish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ADD NEW DISH */}
          {activeTab === 'addDish' && (
            <div className="max-w-2xl mx-auto space-y-5 p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <h4 className="text-base font-bold text-white">Add New Food Dish</h4>
                <p className="text-xs text-slate-400">
                  Add biryani, handi, qorma or catering daig package to the live menu
                </p>
              </div>

              <form onSubmit={handleSaveNewDish} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Dish Name (English) *</label>
                    <input
                      type="text"
                      required
                      value={newDish.nameEn}
                      onChange={(e) => setNewDish({ ...newDish, nameEn: e.target.value })}
                      placeholder="e.g. Mutton Shinwari Karahi"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Dish Name (Urdu)</label>
                    <input
                      type="text"
                      value={newDish.nameUrdu}
                      onChange={(e) => setNewDish({ ...newDish, nameUrdu: e.target.value })}
                      placeholder="مٹن شنواری کڑاہی"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-urdu"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Base Price (PKR) *</label>
                    <input
                      type="number"
                      required
                      value={newDish.price}
                      onChange={(e) => setNewDish({ ...newDish, price: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Category *</label>
                    <select
                      value={newDish.categoryId}
                      onChange={(e) => setNewDish({ ...newDish, categoryId: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Serving Label</label>
                    <input
                      type="text"
                      value={newDish.portionLabel}
                      onChange={(e) => setNewDish({ ...newDish, portionLabel: e.target.value })}
                      placeholder="Full Handi / Single Plate"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Description (English) *</label>
                  <textarea
                    rows={2}
                    required
                    value={newDish.descriptionEn}
                    onChange={(e) => setNewDish({ ...newDish, descriptionEn: e.target.value })}
                    placeholder="Tender mutton slow-cooked with fresh tomatoes and crushed black pepper..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Select Preset Image or Custom URL</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-2">
                    {[
                      { label: 'Chicken Biryani Deg', path: IMAGES.chickenBiryani },
                      { label: 'Sindhi Biryani Deg', path: IMAGES.sindhiBiryani },
                      { label: 'Chicken Qorma', path: IMAGES.chickenQorma },
                      { label: 'Mutton Kunna', path: IMAGES.muttonKunna },
                      { label: 'Wedding Daig', path: IMAGES.weddingDeg },
                    ].map((imgPreset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNewDish({ ...newDish, image: imgPreset.path })}
                        className={`p-1.5 rounded-lg border text-center transition-all ${
                          newDish.image === imgPreset.path
                            ? 'border-amber-400 bg-amber-950/40 text-amber-300 font-semibold'
                            : 'border-slate-800 bg-slate-950 text-slate-400'
                        }`}
                      >
                        <span className="block text-[10px]">{imgPreset.label}</span>
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={newDish.image}
                    onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-[11px]"
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newDish.isPopular}
                      onChange={(e) => setNewDish({ ...newDish, isPopular: e.target.checked })}
                      className="rounded bg-slate-800 border-slate-700 text-amber-400"
                    />
                    <span className="text-slate-300">Mark as Popular Dish</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newDish.isAvailable}
                      onChange={(e) => setNewDish({ ...newDish, isAvailable: e.target.checked })}
                      className="rounded bg-slate-800 border-slate-700 text-amber-400"
                    />
                    <span className="text-slate-300">In Stock / Available</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-lg transition-colors mt-2"
                >
                  Save & Publish Dish
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: LIVE ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Customer Orders Tracking</h4>
                  <p className="text-xs text-slate-400">
                    Real-time orders received from the website
                  </p>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 border border-slate-800 rounded-xl">
                  No orders placed yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                        <div>
                          <span className="text-xs font-bold text-amber-400">
                            Order #{ord.orderNumber}
                          </span>
                          <span className="text-slate-400 text-xs ml-2">
                            {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        {/* Order Status Selector */}
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400">Status:</span>
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as Order['status'])}
                            className="bg-slate-950 border border-slate-700 text-xs text-amber-300 rounded-lg px-2.5 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="cooking">Cooking in Kitchen</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="completed">Completed / Delivered</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="font-semibold text-white">Customer:</p>
                          <p className="text-slate-300">{ord.customer.name} ({ord.customer.phone})</p>
                          <p className="text-slate-400">{ord.customer.address || 'Self Pickup'}</p>
                          {ord.customer.notes && (
                            <p className="text-amber-300/80 italic mt-1">Note: {ord.customer.notes}</p>
                          )}
                        </div>

                        <div>
                          <p className="font-semibold text-white">Items Ordered:</p>
                          <ul className="text-slate-300 space-y-0.5">
                            {ord.items.map((item, idx) => (
                              <li key={idx}>
                                {item.menuItem.nameEn} ({item.selectedPortion?.name || 'Standard'}) x {item.quantity}
                              </li>
                            ))}
                          </ul>
                          <p className="font-bold text-amber-400 mt-2">
                            Total: Rs. {ord.total.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SPECIAL OFFERS */}
          {activeTab === 'offers' && (
            <div className="space-y-6">
              {/* Add Offer Form */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 max-w-xl">
                <h4 className="text-sm font-bold text-white">Create New Special Offer / Promo</h4>
                <form onSubmit={handleSaveOffer} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Offer Title</label>
                      <input
                        type="text"
                        required
                        value={newOffer.titleEn}
                        onChange={(e) => setNewOffer({ ...newOffer, titleEn: e.target.value })}
                        placeholder="e.g. Eid Daig Discount"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Promo Code</label>
                      <input
                        type="text"
                        required
                        value={newOffer.code}
                        onChange={(e) => setNewOffer({ ...newOffer, code: e.target.value.toUpperCase() })}
                        placeholder="EID20"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white uppercase font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Discount %</label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        required
                        value={newOffer.discountPercent}
                        onChange={(e) => setNewOffer({ ...newOffer, discountPercent: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Min Order Amount (PKR)</label>
                      <input
                        type="number"
                        required
                        value={newOffer.minOrder}
                        onChange={(e) => setNewOffer({ ...newOffer, minOrder: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Offer Description</label>
                    <input
                      type="text"
                      required
                      value={newOffer.descriptionEn}
                      onChange={(e) => setNewOffer({ ...newOffer, descriptionEn: e.target.value })}
                      placeholder="Get 20% off on all catering daigs..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-lg hover:bg-amber-300"
                  >
                    Add Special Offer
                  </button>
                </form>
              </div>

              {/* Existing Offers List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">{offer.titleEn}</span>
                      <span className="bg-amber-950 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                        {offer.code}
                      </span>
                    </div>
                    <p className="text-slate-400">{offer.descriptionEn}</p>
                    <p className="text-[11px] text-slate-500">
                      Discount: {offer.discountPercent}% · Min Order: Rs. {offer.minOrder.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 max-w-xl">
                <h4 className="text-sm font-bold text-white">Create Food Category</h4>
                <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Category Name (English)</label>
                    <input
                      type="text"
                      required
                      value={newCat.nameEn}
                      onChange={(e) => setNewCat({ ...newCat, nameEn: e.target.value })}
                      placeholder="e.g. Barbeque Specials"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Category Name (Urdu)</label>
                    <input
                      type="text"
                      value={newCat.nameUrdu}
                      onChange={(e) => setNewCat({ ...newCat, nameUrdu: e.target.value })}
                      placeholder="باربی کیو اسپیشل"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-urdu"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Description</label>
                    <input
                      type="text"
                      value={newCat.description}
                      onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                      placeholder="Charcoal grilled delicacies..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-lg hover:bg-amber-300"
                  >
                    Add Category
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1"
                  >
                    <h5 className="font-bold text-white">{c.nameEn}</h5>
                    <p className="text-amber-300 font-urdu">{c.nameUrdu}</p>
                    <p className="text-slate-400 text-[11px]">{c.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
