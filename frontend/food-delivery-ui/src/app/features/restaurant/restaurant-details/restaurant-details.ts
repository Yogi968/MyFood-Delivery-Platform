import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { RestaurantService } from '../../../core/services/restaurant/restaurant';
import { Restaurant } from '../../../models/restaurant.models';
import { Store } from '@ngrx/store';
import { selectRestaurantError, selectRestaurantLoading, selectSelectedRestaurant } from '../../../store/selectors/restaurant.selectors';
import { loadRestaurantById } from '../../../store/actions/restaurant.actions';

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

  /**
   * Reads the restaurant ID from the route and dispatches
   * an action to load the restaurant details through NgRx Store.
   */
  ngOnInit(): void {
    const restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(loadRestaurantById({ id: restaurantId }));
  }
}