import { Restaurant } from '../../models/restaurant.models';

export interface RestaurantState {
  restaurants: Restaurant[];
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