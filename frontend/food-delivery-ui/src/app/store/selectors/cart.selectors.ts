import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CartState } from '../states/cart.state';

/**
 * Selects the Cart feature state from the global store.
 */
export const selectCartState =
  createFeatureSelector<CartState>('cart');

/**
 * Selects all items currently present in the cart.
 */
export const selectCartItems =
  createSelector(
    selectCartState,
    (state) => state.items
  );

/**
 * Selects the restaurant associated with the current cart.
 */
export const selectCartRestaurantId =
  createSelector(
    selectCartState,
    (state) => state.restaurantId
  );

/**
 * Selects the total number of items in the cart.
 */
export const selectCartTotalItems =
  createSelector(
    selectCartState,
    (state) => state.totalItems
  );

/**
 * Selects the total amount of the cart.
 */
export const selectCartTotalAmount =
  createSelector(
    selectCartState,
    (state) => state.totalAmount
  );