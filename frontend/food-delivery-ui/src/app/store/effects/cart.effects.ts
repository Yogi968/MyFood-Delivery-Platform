import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs';
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../actions/cart.actions';
import { selectCartState } from '../selectors/cart.selectors';
import { CartStorageService } from '../../core/services/cartStorageService/cart-storage';

@Injectable()
export class CartEffects {

  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly cartStorageService: CartStorageService =
  inject(CartStorageService);

  /**
   * Saves the latest Cart state to localStorage whenever
   * a Cart modification action is dispatched.
   */
  saveCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          addToCart,
          removeFromCart,
          increaseQuantity,
          decreaseQuantity,
          clearCart
        ),
        withLatestFrom(this.store.select(selectCartState)),
        tap(([, cart]) => {
          this.cartStorageService.saveCart(cart);
        })
      ),
    { dispatch: false }
  );
}