import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RestaurantState } from '../states/restaurant.state';

/**
 * Selects the complete Restaurant feature state from the application Store.
 * @returns The current RestaurantState.
 */
export const selectRestaurantState =
  createFeatureSelector<RestaurantState>('restaurant');

/**
 * Selects all restaurants from the Restaurant state.
 * @returns The list of restaurants.
 */
export const selectRestaurants =
  createSelector(selectRestaurantState,(state) => state.restaurants);

/**
 * Selects the currently selected restaurant from the Restaurant state.
 * @returns The selected restaurant or null when no restaurant is selected.
 */
export const selectSelectedRestaurant =
  createSelector(selectRestaurantState,(state) => state.selectedRestaurant);

/**
 * Selects the loading status of the Restaurant state.
 * @returns True when a restaurant operation is in progress.
 */
export const selectRestaurantLoading =
  createSelector(selectRestaurantState,(state) => state.loading);

/**
 * Selects the current Restaurant error from the Store.
 * @returns The error message or null when there is no error.
 */
export const selectRestaurantError =
  createSelector(selectRestaurantState,(state) => state.error);