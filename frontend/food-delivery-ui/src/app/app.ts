
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { CartSummaryBar } from './features/cart/components/cart-summary-bar/cart-summary-bar';
import { selectCartTotalItems } from './store/selectors/cart.selectors';
import { AppFooter } from './components/footer/footer';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AppFooter,
    Header,
    CartSummaryBar
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

  protected readonly title = signal('food-delivery-ui');

  private readonly router = inject(Router);
  private readonly store = inject(Store);

  /** Tracks the total number of items in the cart. */
  readonly cartTotalItems = this.store.selectSignal(selectCartTotalItems);

  /**
   * Tracks the current URL after every successful navigation.
   */
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd =>
        event instanceof NavigationEnd
      ),
      map(event => event.urlAfterRedirects),
      startWith(this.router.url)
    ),
    { initialValue: this.router.url }
  );

  /**
   * Determines whether the current page is a restaurant details page.
   */
  readonly isRestaurantDetailsPage = computed(() =>
    /^\/restaurant\/[^/]+(?:[?#].*)?$/.test(this.currentUrl())
  );

 /**
 * Determines whether the current route is the cart details page.
 *
 * @returns True when the current URL is /cart
 */
readonly isCartDetailsPage = computed(() =>
  this.currentUrl() === '/cart'
);

  /**
   * Determines whether the common application layout should be displayed.
   */
  protected readonly showMainLayout = computed(() =>
    !this.currentUrl().startsWith('/login')
  );

  /**
   * Determines whether the full header should be displayed.
   */
  readonly showFullHeader = computed(() => {
    const url = this.currentUrl();

    return (
      url.startsWith('/dashboard') ||
      url === '/restaurants'
    );
  });

  /**
   * Determines whether the cart summary bar is supported on the current page.
   */
  readonly showCartFooter = computed(() => {
    const url = this.currentUrl();

    return (
      url.startsWith('/dashboard') ||
      url === '/restaurants' ||
      this.isRestaurantDetailsPage()
    );
  });

  /**
   * Determines whether the minimal checkout header should be displayed.
   */
  readonly showCheckoutHeader = computed(() => {
    const url = this.currentUrl();

    return [
      '/cart',
      '/checkout',
      '/payment',
      '/order-confirmation',
    ].some(route => url.startsWith(route));
  });

  /**
   * Returns the contextual action label for checkout pages.
   */
  readonly checkoutActionLabel = computed(() => {
    const url = this.currentUrl();

    if (url.startsWith('/cart')) {
      return 'Continue shopping';
    }

    if (url.startsWith('/checkout')) {
      return 'Back to cart';
    }

    if (url.startsWith('/payment')) {
      return 'Back to checkout';
    }

    if (url.startsWith('/order-confirmation')) {
      return 'Continue shopping';
    }

    return '';
  });

  /**
   * Returns the destination route for contextual checkout navigation.
   */
  readonly checkoutActionRoute = computed(() => {
    const url = this.currentUrl();

    if (url.startsWith('/checkout')) {
      return '/cart';
    }

    if (url.startsWith('/payment')) {
      return '/checkout';
    }

    return '/dashboard';
  });
}
