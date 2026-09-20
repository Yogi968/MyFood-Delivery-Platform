import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { RestaurantService } from '../../core/services/restaurant/restaurant';

import {
  loadRestaurants,
  loadRestaurantsSuccess,
  loadRestaurantsFailure,
  loadRestaurantById,
  loadRestaurantByIdSuccess,
  loadRestaurantByIdFailure,
} from '../actions/restaurant.actions';

@Injectable()
export class RestaurantEffects {

  private readonly actions$ = inject(Actions);
  private readonly restaurantService = inject(RestaurantService);

    /**
   * Loads all restaurants when the loadRestaurants action is dispatched.
   * Calls the RestaurantService and dispatches either a success
   * or failure action based on the API response.
   */
  loadRestaurants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRestaurants),
      switchMap(() =>
        this.restaurantService.getRestaurants().pipe(map((restaurants) =>loadRestaurantsSuccess({restaurants,})),
        catchError((error) => of(loadRestaurantsFailure({error: error.message ?? 'Failed to load restaurants'})))
        )
      )
    )
  );

   /**
   * Loads a single restaurant when the loadRestaurantById action is dispatched.
   * Passes the restaurant ID to the RestaurantService and dispatches
   * either a success or failure action based on the API response.
   */
  loadRestaurantById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRestaurantById),
      switchMap(({ id }) =>
        this.restaurantService.getRestaurantById(id).pipe(map((restaurant) =>loadRestaurantByIdSuccess({restaurant})),
        catchError((error) =>of(loadRestaurantByIdFailure({error: error.message ?? 'Failed to load restaurant'})))
        )
      )
    )
  );
}