import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectRestaurantError, selectRestaurantLoading, selectSelectedRestaurant } from '../../../store/selectors/restaurant.selectors';
import { loadRestaurantById } from '../../../store/actions/restaurant.actions';
import { loadMenuItems } from '../../../store/actions/menu-item.actions';
import { selectMenuItemError, selectMenuItemLoading, selectMenuItems } from '../../../store/selectors/menu-item.selectors';
import { MenuItem } from '../../../models/menu-item.models';
import { addToCart } from '../../../store/actions/cart.actions';

@Component({
  selector: 'app-restaurant-details',
  imports: [AsyncPipe,RouterLink],
  templateUrl: './restaurant-details.html',
  styleUrl: './restaurant-details.scss'
})
export class RestaurantDetails implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  restaurant$ = this.store.select(selectSelectedRestaurant);
  loading$ = this.store.select(selectRestaurantLoading);
  error$ = this.store.select(selectRestaurantError);
  menuItems$ = this.store.select(selectMenuItems);
  menuItemsLoading$ = this.store.select(selectMenuItemLoading);
  menuItemsError$ = this.store.select(selectMenuItemError);

  /**
   * Reads the restaurant ID from the route and dispatches
   * an action to load the restaurant details through NgRx Store.
   */
  ngOnInit(): void {
    const restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(loadRestaurantById({ id: restaurantId }));
    this.store.dispatch(loadMenuItems({ restaurantId }));
  }

  /**
 * Adds the selected menu item to the shopping cart.
 *
 * @param menuItem Menu item selected by the user
 * @param restaurantId ID of the restaurant that owns the menu item
 */
addMenuItemToCart(
  menuItem: MenuItem,
  restaurantId: number
): void {
  this.store.dispatch(
    addToCart({
      item: {
        menuItem,
        quantity: 1,
      },
      restaurantId,
    })
  );
}
}