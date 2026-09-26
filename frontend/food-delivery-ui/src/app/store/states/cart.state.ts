import { CartItem } from '../../models/cart.models';

/**
 * Represents the Cart state managed by NgRx.
 */
export interface CartState {
  restaurantId: number | null;
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

/**
 * Provides the initial state for the Cart store.
 */
export const initialCartState: CartState = {
  restaurantId: null,
  items: [],
  totalItems: 0,
  totalAmount: 0,
};