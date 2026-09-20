import { createAction, props } from '@ngrx/store';
import { Restaurant } from '../../models/restaurant.models';
import { RESTAURANT_ACTION_TYPES } from '../constants/restaurant-actions.constants';

export const loadRestaurants = createAction(
  RESTAURANT_ACTION_TYPES.LOAD_RESTAURANTS
);

export const loadRestaurantsSuccess = createAction(
  RESTAURANT_ACTION_TYPES.LOAD_RESTAURANTS_SUCCESS,
  props<{ restaurants: Restaurant[] }>()
);

export const loadRestaurantsFailure = createAction(
  RESTAURANT_ACTION_TYPES.LOAD_RESTAURANTS_FAILURE,
  props<{ error: string }>()
);

export const loadRestaurantById = createAction(
  RESTAURANT_ACTION_TYPES.LOAD_RESTAURANT_BY_ID,
  props<{ id: number }>()
);

export const loadRestaurantByIdSuccess = createAction(
  RESTAURANT_ACTION_TYPES.LOAD_RESTAURANT_BY_ID_SUCCESS,
  props<{ restaurant: Restaurant }>()
);

export const loadRestaurantByIdFailure = createAction(
  RESTAURANT_ACTION_TYPES.LOAD_RESTAURANT_BY_ID_FAILURE,
  props<{ error: string }>()
);