import { restaurantReducer } from './reducers/restaurant.reducer';
import { RestaurantEffects } from './effects/restaurant.effects';

export const applicationReducers = {
  restaurant: restaurantReducer,
};

export const applicationEffects = [
  RestaurantEffects,
];

export const storeProviders ={
  applicationReducers:applicationReducers,
  applicationEffects:applicationEffects,};