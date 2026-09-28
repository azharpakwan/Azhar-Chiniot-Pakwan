export interface PortionOption {
  name: string;
  price: number;
  serving: string;
}

export interface MenuItem {
  id: string;
  nameEn: string;
  nameUrdu: string;
  categoryId: string;
  descriptionEn: string;
  descriptionUrdu: string;
  price: number;
  portionLabel: string;
  portions?: PortionOption[];
  ingredientsEn: string[];
  ingredientsUrdu: string[];
  servingSize: string;
  image: string;
  isPopular?: boolean;
  isAvailable: boolean;
  spiceLevel?: 'Mild' | 'Medium' | 'Spicy' | 'Royal Deg Masala';
  prepTime?: string;
  discountPercent?: number;
  tag?: string;
}

export interface Category {
  id: string;
  nameEn: string;
  nameUrdu: string;
  description: string;
  icon: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  selectedPortion?: PortionOption;
  unitPrice: number;
  quantity: number;
  specialInstructions?: string;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  deliveryType: 'delivery' | 'pickup';
  address?: string;
  notes?: string;
  guestCount?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  customer: OrderCustomer;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'cod' | 'jazzcash' | 'easypaisa' | 'bank_transfer';
  status: 'pending' | 'cooking' | 'out_for_delivery' | 'completed';
  createdAt: string;
}

export interface SpecialOffer {
  id: string;
  titleEn: string;
  titleUrdu: string;
  descriptionEn: string;
  descriptionUrdu: string;
  code: string;
  discountPercent: number;
  minOrder: number;
  badge: string;
  validity: string;
}
