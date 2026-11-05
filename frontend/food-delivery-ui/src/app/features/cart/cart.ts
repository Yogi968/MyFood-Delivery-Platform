
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from '../../store/actions/cart.actions';

import {
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalAmount,
} from '../../store/selectors/cart.selectors';

import {
  selectSelectedRestaurant,
} from '../../store/selectors/restaurant.selectors';

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  private readonly store = inject(Store);

  /** Observable containing the current cart items. */
  readonly cartItems$ = this.store.select(selectCartItems);

  /** Observable containing the total quantity of cart items. */
  readonly totalItems$ = this.store.select(selectCartTotalItems);

  /** Observable containing the cart subtotal. */
  readonly totalAmount$ = this.store.select(selectCartTotalAmount);

  /** Observable containing the currently selected restaurant. */
  readonly restaurant$ = this.store.select(selectSelectedRestaurant);

  /**
   * Increases the quantity of a cart item.
   *
   * @param menuItemId ID of the menu item
   */
  increaseQuantity(menuItemId: number): void {
    this.store.dispatch(increaseQuantity({ menuItemId }));
  }

  /**
   * Decreases the quantity of a cart item.
   *
   * @param menuItemId ID of the menu item
   */
  decreaseQuantity(menuItemId: number): void {
    this.store.dispatch(decreaseQuantity({ menuItemId }));
  }

  /**
   * Removes a menu item completely from the cart.
   *
   * @param menuItemId ID of the menu item
   */
  removeItem(menuItemId: number): void {
    this.store.dispatch(removeFromCart({ menuItemId }));
  }

  /**
   * Removes all items from the cart.
   */
  clearCart(): void {
    this.store.dispatch(clearCart());
  }
}
