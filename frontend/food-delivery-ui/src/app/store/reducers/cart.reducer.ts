import { createReducer, on } from '@ngrx/store';

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  addToCart,
  loadCartFromStorage,
} from '../actions/cart.actions';

import {
  CartState,
  initialCartState,
} from '../states/cart.state';
import { calculateCartTotals } from '../../utils/cart.utils';


/**
 * Manages state changes for Cart actions.
 */
export const cartReducer = createReducer(
  initialCartState,

  on(addToCart, (state, { item, restaurantId }) => {

    /**
     * Prevents items from different restaurants
     * from being added to the same cart.
     */
    if (
      state.restaurantId !== null &&
      state.restaurantId !== restaurantId
    ) {
      return state;
    }

    const existingItem = state.items.find(
      (cartItem) => cartItem.menuItem.id === item.menuItem.id
    );

    let updatedItems;

    if (existingItem) {
      updatedItems = state.items.map((cartItem) =>
        cartItem.menuItem.id === item.menuItem.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + item.quantity,
            }
          : cartItem
      );
    } else {
      updatedItems = [...state.items, item];
    }

    const totals = calculateCartTotals(updatedItems);

    return {
      ...state,
      restaurantId,
      items: updatedItems,
      ...totals,
    };
  }),

  on(removeFromCart, (state, { menuItemId }) => {
    const updatedItems = state.items.filter(
      (cartItem) => cartItem.menuItem.id !== menuItemId
    );

    const totals = calculateCartTotals(updatedItems);

    return {
      ...state,
      restaurantId:
        updatedItems.length > 0 ? state.restaurantId : null,
      items: updatedItems,
      ...totals,
    };
  }),

  on(increaseQuantity, (state, { menuItemId }) => {
    const updatedItems = state.items.map((cartItem) =>
      cartItem.menuItem.id === menuItemId
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        : cartItem
    );

    const totals = calculateCartTotals(updatedItems);

    return {
      ...state,
      items: updatedItems,
      ...totals,
    };
  }),

  on(decreaseQuantity, (state, { menuItemId }) => {
    const updatedItems = state.items
      .map((cartItem) =>
        cartItem.menuItem.id === menuItemId
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            }
          : cartItem
      )
      .filter((cartItem) => cartItem.quantity > 0);

    const totals = calculateCartTotals(updatedItems);

    return {
      ...state,
      restaurantId:
        updatedItems.length > 0 ? state.restaurantId : null,
      items: updatedItems,
      ...totals,
    };
  }),

  /**
 * Restores the saved cart from localStorage into the NgRx state.
 */
  on(loadCartFromStorage, (state, { cart }) => ({
    ...state,
    restaurantId: cart.restaurantId,
    items: cart.items,
    totalItems: cart.totalItems,
    totalAmount: cart.totalAmount,
  })),

  on(clearCart, () => ({
    ...initialCartState,
  }))
);