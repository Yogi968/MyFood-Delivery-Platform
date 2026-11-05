
import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalAmount,
} from '../../../../store/selectors/cart.selectors';

@Component({
  selector: 'app-cart-summary-bar',
  imports: [AsyncPipe, CurrencyPipe, RouterLink],
  templateUrl: './cart-summary-bar.html',
  styleUrl: './cart-summary-bar.scss',
})
export class CartSummaryBar {
  private readonly store = inject(Store);

 /** Controls whether cart item details are expanded. */
readonly isExpanded = signal(false);

  /** Retrieves the current cart items from NgRx. */
  readonly cartItems$ = this.store.select(selectCartItems);

  /** Retrieves the total quantity of cart items. */
  readonly totalItems$ = this.store.select(selectCartTotalItems);

  /** Retrieves the total cart amount. */
  readonly totalAmount$ = this.store.select(selectCartTotalAmount);

  /**
   * Toggles the cart item preview.
   */
  toggleCartDetails(): void {
    this.isExpanded.update((expanded) => !expanded);
  }
}
