
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
   * Loads all active restaurants from the backend API.
   * Dispatches a success action when the request succeeds
   * or a failure action when the request fails.
   */
  loadRestaurants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRestaurants),
      switchMap(() =>
        this.restaurantService.getRestaurants().pipe(
          map(restaurants =>
            loadRestaurantsSuccess({ restaurants })
          ),
          catchError(error =>
            of(
              loadRestaurantsFailure({
                error: error.message ?? 'Failed to load restaurants'
              })
            )
          )
        )
      )
    )
  );

  /**
   * Loads a restaurant using its unique ID.
   * Dispatches a success action when the request succeeds
   * or a failure action when the request fails.
   */
  loadRestaurantById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRestaurantById),
      switchMap(({ id }) =>
        this.restaurantService.getRestaurantById(id).pipe(
          map(restaurant =>
            loadRestaurantByIdSuccess({ restaurant })
          ),
          catchError(error =>
            of(
              loadRestaurantByIdFailure({
                error: error.message ?? 'Failed to load restaurant'
              })
            )
          )
        )
      )
    )
  );
}
