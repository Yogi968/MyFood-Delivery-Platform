import { createAction, props } from '@ngrx/store';

import { MenuItem } from '../../models/menu-item.models';
import { MENU_ITEM_ACTION_TYPES } from '../constants/menu-item-action.constants';

/**
 * Dispatches an action to load available menu items for a restaurant.
 */
export const loadMenuItems = createAction(
  MENU_ITEM_ACTION_TYPES.LOAD_MENU_ITEMS,
  props<{ restaurantId: number }>()
);

/**
 * Dispatches an action when menu items are loaded successfully.
 */
export const loadMenuItemsSuccess = createAction(
  MENU_ITEM_ACTION_TYPES.LOAD_MENU_ITEMS_SUCCESS,
  props<{ menuItems: MenuItem[] }>()
);

/**
 * Dispatches an action when loading menu items fails.
 */
export const loadMenuItemsFailure = createAction(
  MENU_ITEM_ACTION_TYPES.LOAD_MENU_ITEMS_FAILURE,
  props<{ error: string }>()
);

/**
 * Dispatches an action to load a menu item by its ID.
 */
export const loadMenuItemById = createAction(
  MENU_ITEM_ACTION_TYPES.LOAD_MENU_ITEM_BY_ID,
  props<{ menuItemId: number }>()
);

/**
 * Dispatches an action when a menu item is loaded successfully.
 */
export const loadMenuItemByIdSuccess = createAction(
  MENU_ITEM_ACTION_TYPES.LOAD_MENU_ITEM_BY_ID_SUCCESS,
  props<{ menuItem: MenuItem }>()
);

/**
 * Dispatches an action when loading a menu item fails.
 */
export const loadMenuItemByIdFailure = createAction(
  MENU_ITEM_ACTION_TYPES.LOAD_MENU_ITEM_BY_ID_FAILURE,
  props<{ error: string }>()
);