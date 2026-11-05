
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

import {
  selectRestaurantError,
  selectRestaurantLoading,
  selectSelectedRestaurant
} from '../../../store/selectors/restaurant.selectors';

import { loadRestaurantById } from '../../../store/actions/restaurant.actions';
import { loadMenuItems } from '../../../store/actions/menu-item.actions';

import {
  selectMenuItemError,
  selectMenuItemLoading,
  selectMenuItems
} from '../../../store/selectors/menu-item.selectors';

import { MenuItem } from '../../../models/menu-item.models';
import { CartItem } from '../../../models/cart.models';

import {
  increaseQuantity,
  decreaseQuantity,
  addToCart,
} from '../../../store/actions/cart.actions';

import { selectCartItems } from '../../../store/selectors/cart.selectors';
/**
 * Available dietary filters for restaurant menu items.
 */
type MenuFilter = 'all' | 'veg' | 'non-veg';

@Component({
  selector: 'app-restaurant-details',
  imports: [AsyncPipe],
  templateUrl: './restaurant-details.html',
  styleUrl: './restaurant-details.scss'
})
export class RestaurantDetails implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  /** Restaurant details retrieved from the NgRx store. */
  readonly restaurant$ = this.store.select(selectSelectedRestaurant);

  /** Restaurant loading state. */
  readonly loading$ = this.store.select(selectRestaurantLoading);

  /** Restaurant error state. */
  readonly error$ = this.store.select(selectRestaurantError);

  /** Menu items retrieved from the NgRx store. */
  readonly menuItems$ = this.store.select(selectMenuItems);

  /** Menu loading state. */
  readonly menuItemsLoading$ = this.store.select(selectMenuItemLoading);

  /** Menu error state. */
  readonly menuItemsError$ = this.store.select(selectMenuItemError);

  /** Search query entered by the user. */
  private readonly searchQuerySubject = new BehaviorSubject<string>('');

  /** Selected dietary filter. */
  private readonly menuFilterSubject =
    new BehaviorSubject<MenuFilter>('all');

  /** Observable containing the current search query. */
  private readonly searchQuery$ =
    this.searchQuerySubject.asObservable();

  /** Observable containing the selected dietary filter. */
  private readonly menuFilter$ =
    this.menuFilterSubject.asObservable();

  /**
   * Filters menu items based on the search query and dietary selection.
   */
  readonly filteredMenuItems$ = combineLatest([
    this.menuItems$,
    this.searchQuery$,
    this.menuFilter$
  ]).pipe(
    map(([menuItems, searchQuery, menuFilter]) => {
      const query = searchQuery.trim().toLowerCase();

      return menuItems.filter((menuItem) => {
        const matchesSearch =
          !query ||
          menuItem.name.toLowerCase().includes(query) ||
          (menuItem.description ?? '').toLowerCase().includes(query);

        const matchesDiet =
          menuFilter === 'all' ||
          (menuFilter === 'veg' && menuItem.vegetarian) ||
          (menuFilter === 'non-veg' && !menuItem.vegetarian);

        return matchesSearch && matchesDiet;
      });
    })
  );

  /** Currently selected dietary filter for template styling. */
  get selectedMenuFilter(): MenuFilter {
    return this.menuFilterSubject.value;
  }

  /**
   * Reads the restaurant ID from the route and dispatches
   * actions to load restaurant details and its menu.
   */
  ngOnInit(): void {
    const restaurantId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(restaurantId) || restaurantId <= 0) {
      return;
    }

    this.store.dispatch(loadRestaurantById({ id: restaurantId }));
    this.store.dispatch(loadMenuItems({ restaurantId }));
  }

  /**
   * Updates the menu search query.
   *
   * @param query - Search text entered by the user.
   */
  updateSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  /**
   * Updates the selected dietary filter.
   *
   * @param filter - Selected menu filter.
   */
  updateMenuFilter(filter: MenuFilter): void {
    this.menuFilterSubject.next(filter);
  }

  /**
   * Adds the selected menu item to the shopping cart.
   *
   * @param menuItem - Menu item selected by the user.
   * @param restaurantId - ID of the restaurant that owns the menu item.
   */
  addMenuItemToCart(
    menuItem: MenuItem,
    restaurantId: number
  ): void {
    this.store.dispatch(
      addToCart({
        item: {
          menuItem,
          quantity: 1
        },
        restaurantId
      })
    );
  }

  /**
 * Observable containing the current cart items from NgRx.
 */
readonly cartItems$ = this.store.select(selectCartItems);

/**
 * Returns the quantity of a menu item currently present in the cart.
 *
 * @param cartItems Current cart items
 * @param menuItemId Menu item identifier
 * @returns Current quantity, or zero when the item is not in the cart
 */
getCartItemQuantity(
  cartItems: CartItem[] | null,
  menuItemId: number
): number {
  return (
    cartItems?.find((item) => item.menuItem.id === menuItemId)?.quantity ?? 0
  );
}

/**
 * Increases the quantity of a menu item in the cart.
 *
 * @param menuItemId Menu item identifier
 */
increaseMenuItemQuantity(menuItemId: number): void {
  this.store.dispatch(increaseQuantity({ menuItemId }));
}

/**
 * Decreases the quantity of a menu item in the cart.
 *
 * @param menuItemId Menu item identifier
 */
decreaseMenuItemQuantity(menuItemId: number): void {
  this.store.dispatch(decreaseQuantity({ menuItemId }));
}
}
