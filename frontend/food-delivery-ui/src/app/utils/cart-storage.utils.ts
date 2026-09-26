import { Cart } from '../models/cart.models';

/**
 * Defines the storage key used to persist the cart in localStorage.
 */
const CART_STORAGE_KEY = 'myfood_cart';

/**
 * Saves the current cart to localStorage.
 *
 * @param cart Current cart state
 */
export function saveCartToStorage(cart: Cart): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

/**
 * Loads the previously saved cart from localStorage.
 *
 * @returns Saved cart or null when no cart is available
 */
export function loadCartFromStorage(): Cart | null {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) {
    return null;
  }

  return JSON.parse(storedCart) as Cart;
}

/**
 * Removes the saved cart from localStorage.
 */
export function clearCartFromStorage(): void {
  localStorage.removeItem(CART_STORAGE_KEY);
}