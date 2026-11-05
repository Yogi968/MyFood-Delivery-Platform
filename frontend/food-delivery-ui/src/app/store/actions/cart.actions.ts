import { createAction, props } from '@ngrx/store';

import { Cart, CartItem } from '../../models/cart.models';
import { CART_ACTION_TYPES } from '../constants/cart-action.constants';

/**
 * Adds a menu item to the cart.
 */
export const addToCart = createAction(
  CART_ACTION_TYPES.ADD_TO_CART,
  props<{ item: CartItem; restaurantId: number }>()
);

/**
 * Removes a menu item completely from the cart.
 */
export const removeFromCart = createAction(
  CART_ACTION_TYPES.REMOVE_FROM_CART,
  props<{ menuItemId: number }>()
);

/**
 * Increases the quantity of a cart item by one.
 */
export const increaseQuantity = createAction(
  CART_ACTION_TYPES.INCREASE_QUANTITY,
  props<{ menuItemId: number }>()
);

/**
 * Decreases the quantity of a cart item by one.
 */
export const decreaseQuantity = createAction(
  CART_ACTION_TYPES.DECREASE_QUANTITY,
  props<{ menuItemId: number }>()
);

/**
 * Removes all items from the cart.
 */
export const clearCart = createAction(
  CART_ACTION_TYPES.CLEAR_CART
);

/**
 * Restores the previously saved cart into the NgRx store.
 *
 * @param cart Previously saved cart
 */
export const loadCartFromStorage = createAction(
  CART_ACTION_TYPES.LOAD_CART_FROM_STORAGE,
  props<{ cart: Cart }>()
);