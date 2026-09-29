import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, Category, CartItem, Order, OrderCustomer, SpecialOffer, PortionOption } from '../types/food';
import { INITIAL_CATEGORIES, INITIAL_MENU_ITEMS, INITIAL_OFFERS } from '../data/initialMenu';
import { resolveDishImage, IMAGES } from '../assets/images';

interface FoodContextType {
  menuItems: MenuItem[];
  categories: Category[];
  offers: SpecialOffer[];
  cart: CartItem[];
  orders: Order[];
  selectedDish: MenuItem | null;
  setSelectedDish: (dish: MenuItem | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  latestConfirmedOrder: Order | null;
  setLatestConfirmedOrder: (order: Order | null) => void;
  
  // Navigation & Filtering
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  popularOnly: boolean;
  setPopularOnly: (val: boolean) => void;
  language: 'en' | 'ur' | 'both';
  setLanguage: (lang: 'en' | 'ur' | 'both') => void;

  // Cart operations
  addToCart: (item: MenuItem, portion?: PortionOption, quantity?: number, instructions?: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  deliveryFee: number;
  discountAmount: number;
  cartTotal: number;
  appliedOffer: SpecialOffer | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Orders
  placeOrder: (customer: OrderCustomer, paymentMethod?: Order['paymentMethod']) => Order;
  generateWhatsAppOrderUrl: (overrideCustomer?: Partial<OrderCustomer>) => string;

  // Admin management
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  toggleItemAvailability: (id: string) => void;
  toggleItemPopular: (id: string) => void;
  addCategory: (category: Category) => void;
  addSpecialOffer: (offer: SpecialOffer) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  resetToDefaults: () => void;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  MENU: 'azhar_pakwan_menu_v4',
  CATEGORIES: 'azhar_pakwan_categories_v4',
  OFFERS: 'azhar_pakwan_offers_v4',
  CART: 'azhar_pakwan_cart_v4',
  ORDERS: 'azhar_pakwan_orders_v4',
  LANG: 'azhar_pakwan_lang_v4',
};

export const FoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.MENU);
      if (saved) {
        const parsed: MenuItem[] = JSON.parse(saved);
        return parsed.map((item) => ({
          ...item,
          image: resolveDishImage(item.image, item.id, item.categoryId),
        }));
      }
      return INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [offers, setOffers] = useState<SpecialOffer[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.OFFERS);
      return saved ? JSON.parse(saved) : INITIAL_OFFERS;
    } catch {
      return INITIAL_OFFERS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        return parsed.map((item) => ({
          ...item,
          menuItem: {
            ...item.menuItem,
            image: resolveDishImage(item.menuItem.image),
          },
        }));
      }
      return [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
      // Mock 1 sample recent order for realism in admin
      return [
        {
          id: 'ord-sample-1',
          orderNumber: 'ACP-8492',
          items: [
            {
              id: 'cart-sample-1',
              menuItem: INITIAL_MENU_ITEMS[0],
              selectedPortion: INITIAL_MENU_ITEMS[0].portions?.[0],
              unitPrice: 480,
              quantity: 2,
            },
            {
              id: 'cart-sample-2',
              menuItem: INITIAL_MENU_ITEMS[9], // Mutton Kunna
              selectedPortion: INITIAL_MENU_ITEMS[9].portions?.[0],
              unitPrice: 1650,
              quantity: 1,
            },
          ],
          customer: {
            name: 'Chaudhry Tariq Mehmood',
            phone: '0300-4829104',
            deliveryType: 'delivery',
            address: 'House 42-B, Model Town, Lahore',
            notes: 'Please pack in clay handi with extra salad & mint raita.',
          },
          subtotal: 2610,
          deliveryFee: 0,
          discount: 0,
          total: 2610,
          paymentMethod: 'cod',
          status: 'cooking',
          createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        }
      ];
    } catch {
      return [];
    }
  });

  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [latestConfirmedOrder, setLatestConfirmedOrder] = useState<Order | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [popularOnly, setPopularOnly] = useState<boolean>(false);
  const [language, setLanguage] = useState<'en' | 'ur' | 'both'>('both');
  const [appliedOffer, setAppliedOffer] = useState<SpecialOffer | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.MENU, JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.OFFERS, JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  // Cart calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce((total, item) => {
    return total + item.unitPrice * item.quantity;
  }, 0);

  const discountAmount = appliedOffer
    ? Math.round((cartSubtotal * appliedOffer.discountPercent) / 100)
    : 0;

  // Free delivery above 2500 PKR, else 150 PKR delivery fee (0 for pickup)
  const deliveryFee = cartSubtotal >= 2500 || cartSubtotal === 0 ? 0 : 150;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + (cart.length > 0 ? deliveryFee : 0));

  const addToCart = (
    item: MenuItem,
    portion?: PortionOption,
    quantity: number = 1,
    instructions?: string
  ) => {
    const selectedPortion = portion || (item.portions && item.portions.length > 0 ? item.portions[0] : undefined);
    const unitPrice = selectedPortion ? selectedPortion.price : item.price;
    const cartItemId = `${item.id}-${selectedPortion?.name || 'standard'}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.id === cartItemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          specialInstructions: instructions || next[existingIndex].specialInstructions,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            menuItem: item,
            selectedPortion,
            unitPrice,
            quantity,
            specialInstructions: instructions,
          },
        ];
      }
    });
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedOffer(null);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = offers.find((o) => o.code.toUpperCase() === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Check active offers.' };
    }
    if (cartSubtotal < found.minOrder) {
      return {
        success: false,
        message: `Minimum order for code ${found.code} is Rs. ${found.minOrder.toLocaleString()}.`,
      };
    }
    setAppliedOffer(found);
    return {
      success: true,
      message: `Promo code applied! You saved ${found.discountPercent}% off subtotal.`,
    };
  };

  const removePromoCode = () => {
    setAppliedOffer(null);
  };

  const placeOrder = (
    customer: OrderCustomer,
    paymentMethod: Order['paymentMethod'] = 'cod'
  ): Order => {
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `ACP-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...cart],
      customer,
      subtotal: cartSubtotal,
      deliveryFee: customer.deliveryType === 'pickup' ? 0 : deliveryFee,
      discount: discountAmount,
      total: customer.deliveryType === 'pickup' 
        ? Math.max(0, cartSubtotal - discountAmount) 
        : cartTotal,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestConfirmedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const generateWhatsAppOrderUrl = (overrideCustomer?: Partial<OrderCustomer>): string => {
    const businessPhone = '923004936594';
    let text = `*New Food Order - Azhar Chiniot Pakwan (Al Mashoor Model Town Wala)*\n\n`;

    if (cart.length === 0) {
      text += `Hello! I would like to inquire about your catering / pakwan menu and today's specials.\n`;
    } else {
      text += `*ITEMS ORDERED:*\n`;
      cart.forEach((item, index) => {
        const portionText = item.selectedPortion ? ` (${item.selectedPortion.name})` : '';
        text += `${index + 1}. ${item.menuItem.nameEn}${portionText} x ${item.quantity} = Rs. ${(item.unitPrice * item.quantity).toLocaleString()}\n`;
      });
      text += `\n*Subtotal:* Rs. ${cartSubtotal.toLocaleString()}\n`;
      if (discountAmount > 0) {
        text += `*Discount (${appliedOffer?.code}):* -Rs. ${discountAmount.toLocaleString()}\n`;
      }
      text += `*Delivery Fee:* Rs. ${deliveryFee.toLocaleString()}\n`;
      text += `*Total Bill:* Rs. ${cartTotal.toLocaleString()}\n\n`;

      if (overrideCustomer?.name) {
        text += `*CUSTOMER DETAILS:*\n`;
        text += `• Name: ${overrideCustomer.name}\n`;
        text += `• Phone: ${overrideCustomer.phone || 'N/A'}\n`;
        text += `• Order Type: ${overrideCustomer.deliveryType === 'pickup' ? 'Self Pickup' : 'Home Delivery'}\n`;
        if (overrideCustomer.address) {
          text += `• Address: ${overrideCustomer.address}\n`;
        }
        if (overrideCustomer.notes) {
          text += `• Instructions: ${overrideCustomer.notes}\n`;
        }
      }
    }

    text += `\nPlease confirm my order and share preparation time. Shukriya!`;
    return `https://wa.me/${businessPhone}?text=${encodeURIComponent(text)}`;
  };

  // Admin operations
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `dish-${Date.now()}`,
    };
    setMenuItems((prev) => [newItem, ...prev]);
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => prev.map((m) => (m.id === item.id ? item : m)));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((m) => m.id !== id));
  };

  const toggleItemAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isAvailable: !m.isAvailable } : m))
    );
  };

  const toggleItemPopular = (id: string) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isPopular: !m.isPopular } : m))
    );
  };

  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
  };

  const addSpecialOffer = (offer: SpecialOffer) => {
    setOffers((prev) => [offer, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const resetToDefaults = () => {
    setMenuItems(INITIAL_MENU_ITEMS);
    setCategories(INITIAL_CATEGORIES);
    setOffers(INITIAL_OFFERS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.MENU);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.OFFERS);
  };

  return (
    <FoodContext.Provider
      value={{
        menuItems,
        categories,
        offers,
        cart,
        orders,
        selectedDish,
        setSelectedDish,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAdminOpen,
        setIsAdminOpen,
        latestConfirmedOrder,
        setLatestConfirmedOrder,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        popularOnly,
        setPopularOnly,
        language,
        setLanguage,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        deliveryFee,
        discountAmount,
        cartTotal,
        appliedOffer,
        applyPromoCode,
        removePromoCode,
        placeOrder,
        generateWhatsAppOrderUrl,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleItemAvailability,
        toggleItemPopular,
        addCategory,
        addSpecialOffer,
        updateOrderStatus,
        resetToDefaults,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useFood must be used within a FoodProvider');
  }
  return context;
};
