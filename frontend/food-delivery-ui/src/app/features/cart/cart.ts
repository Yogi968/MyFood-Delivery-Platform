import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe,RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {

  private readonly store = inject(Store);

  cartItems$ = this.store.select(selectCartItems);
  totalItems$ = this.store.select(selectCartTotalItems);
  totalAmount$ = this.store.select(selectCartTotalAmount);

  /**
   * Increases the quantity of a cart item.
   *
   * @param menuItemId ID of the menu item
   */
  increaseQuantity(menuItemId: number): void {
    this.store.dispatch(
      increaseQuantity({ menuItemId })
    );
  }

  /**
   * Decreases the quantity of a cart item.
   *
   * @param menuItemId ID of the menu item
   */
  decreaseQuantity(menuItemId: number): void {
    this.store.dispatch(
      decreaseQuantity({ menuItemId })
    );
  }

  /**
   * Removes a menu item completely from the cart.
   *
   * @param menuItemId ID of the menu item
   */
  removeItem(menuItemId: number): void {
    this.store.dispatch(
      removeFromCart({ menuItemId })
    );
  }

  /**
   * Removes all items from the cart.
   */
  clearCart(): void {
    this.store.dispatch(clearCart());
  }
}