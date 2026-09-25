import { restaurantReducer } from './reducers/restaurant.reducer';
import { RestaurantEffects } from './effects/restaurant.effects';
import { MenuItemEffects } from './effects/menu-item.effects';
import { menuItemReducer } from './reducers/menu-item.reducer';

export const applicationReducers = {
  restaurant: restaurantReducer,
  menuItem: menuItemReducer,
};

export const applicationEffects = [
  RestaurantEffects,
  MenuItemEffects,
];

export const storeProviders ={
  applicationReducers:applicationReducers,
  applicationEffects:applicationEffects,};