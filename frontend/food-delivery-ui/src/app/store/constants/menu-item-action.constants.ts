/**
 * Contains action type constants used by the Menu Item NgRx store.
 */
export const MENU_ITEM_ACTION_TYPES = {
  LOAD_MENU_ITEMS: '[Menu Item] Load Menu Items',
  LOAD_MENU_ITEMS_SUCCESS: '[Menu Item] Load Menu Items Success',
  LOAD_MENU_ITEMS_FAILURE: '[Menu Item] Load Menu Items Failure',

  LOAD_MENU_ITEM_BY_ID: '[Menu Item] Load Menu Item By Id',
  LOAD_MENU_ITEM_BY_ID_SUCCESS: '[Menu Item] Load Menu Item By Id Success',
  LOAD_MENU_ITEM_BY_ID_FAILURE: '[Menu Item] Load Menu Item By Id Failure',
} as const;