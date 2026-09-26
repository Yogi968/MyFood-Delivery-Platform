import { restaurantReducer } from './reducers/restaurant.reducer';
import { RestaurantEffects } from './effects/restaurant.effects';
import { MenuItemEffects } from './effects/menu-item.effects';
import { menuItemReducer } from './reducers/menu-item.reducer';
import { cartReducer } from './reducers/cart.reducer';
import { CartEffects } from './effects/cart.effects';

export const applicationReducers = {
  restaurant: restaurantReducer,
  menuItem: menuItemReducer,
  cart: cartReducer,
};

export const applicationEffects = [
  RestaurantEffects,
  MenuItemEffects,
  CartEffects,
];

export const storeProviders ={
  applicationReducers:applicationReducers,
  applicationEffects:applicationEffects,};