import { createReducer, on } from '@ngrx/store';
import {loadRestaurants, loadRestaurantsSuccess,loadRestaurantsFailure, loadRestaurantById, loadRestaurantByIdSuccess, loadRestaurantByIdFailure } from '../actions/restaurant.actions';

import {initialRestaurantState} from '../states/restaurant.state';

/**
 * Handles Restaurant-related actions and produces the next Restaurant state.
 */
export const restaurantReducer = createReducer(
  initialRestaurantState,

  /**
   * Handles the request to load all restaurants.
   * Sets loading to true and clears any previous error.
   */
  on(loadRestaurants, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  /**
   * Handles a successful request for all restaurants.
   * Stores the restaurants returned by the API and marks the loading operation as completed.
   */
  on(loadRestaurantsSuccess, (state, { restaurants }) => ({
    ...state,
    restaurants,
    loading: false,
    error: null,
  })),

  /**
   * Handles a failed request for all restaurants.
   * Stores the error message and marks the loading operation as completed.
   */
  on(loadRestaurantsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  /**
   * Handles the request to load a single restaurant by ID.
   * clears the previous selected restaurant data not to interupt in current progress
   * Sets loading to true and clears any previous error.
   */
  on(loadRestaurantById, (state) => ({
    ...state,
    selectedRestaurant: null,
    loading: true,
    error: null,
  })),

  /**
   * Handles a successful request for a single restaurant.
   * Stores the returned restaurant as the selected restaurant.
   */
  on(loadRestaurantByIdSuccess, (state, { restaurant }) => ({
    ...state,
    selectedRestaurant: restaurant,
    loading: false,
    error: null,
  })),

  /**
   * Handles a failed request for a single restaurant.
   * Clears the loading state and stores the error message.
   */
  on(loadRestaurantByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);