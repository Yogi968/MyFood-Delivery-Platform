import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCartFromStorage } from '../../../store/actions/cart.actions';
import { Cart } from '../../../models/cart.models';
import {saveCartToStorage, loadCartFromStorage as readCartFromStorage,clearCartFromStorage} from '../../../utils/cart-storage.utils';

@Injectable({
  providedIn: 'root',
})
export class CartStorageService {

  private readonly store = inject(Store);

  /**
   * Loads the saved cart from localStorage and restores it into NgRx.
   */
  initializeCart(): void {
    const cart = readCartFromStorage();

    if (cart) {
      this.store.dispatch(loadCartFromStorage({ cart }));
    }
  }

  /**
   * Saves the current cart to localStorage.
   *
   * @param cart Current cart state
   */
  saveCart(cart: Cart): void {
    saveCartToStorage(cart);
  }

  /**
   * Clears the persisted cart from localStorage.
   */
  clearCart(): void {
    clearCartFromStorage();
  }
}