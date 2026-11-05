import { DisplayRestaurants, Restaurant } from '../../models/restaurant.models';

export interface RestaurantState {
  restaurants: DisplayRestaurants[];
  selectedRestaurant: Restaurant | null;
  loading: boolean;
  error: string | null;
}

export const initialRestaurantState: RestaurantState = {
  restaurants: [],
  selectedRestaurant: null,
  loading: false,
  error: null,
};