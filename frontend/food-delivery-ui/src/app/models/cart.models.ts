import { MenuItem } from './menu-item.models';

/**
 * Represents a menu item added to the shopping cart.
 */
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

/**
 * Represents the current shopping cart.
 */
export interface Cart {
  restaurantId: number | null;
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}