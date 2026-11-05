/**
 * Contains action type constants used by the Cart NgRx store.
 */
export const CART_ACTION_TYPES = {
  ADD_TO_CART: '[Cart] Add To Cart',
  REMOVE_FROM_CART: '[Cart] Remove From Cart',
  INCREASE_QUANTITY: '[Cart] Increase Quantity',
  DECREASE_QUANTITY: '[Cart] Decrease Quantity',
  CLEAR_CART: '[Cart] Clear Cart',
  LOAD_CART_FROM_STORAGE: '[Cart] Load Cart From Storage',
} as const;