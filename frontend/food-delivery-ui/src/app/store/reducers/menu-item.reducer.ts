import { createReducer, on } from '@ngrx/store';

import {
  loadMenuItems,
  loadMenuItemsSuccess,
  loadMenuItemsFailure,
  loadMenuItemById,
  loadMenuItemByIdSuccess,
  loadMenuItemByIdFailure,
} from '../actions/menu-item.actions';

import {
  initialMenuItemState,
  MenuItemState,
} from '../states/menu-item.state';

/**
 * Manages state changes for Menu Item actions.
 */
export const menuItemReducer = createReducer(
  initialMenuItemState,

  on(loadMenuItems, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadMenuItemsSuccess, (state, { menuItems }) => ({
    ...state,
    menuItems,
    loading: false,
    error: null,
  })),

  on(loadMenuItemsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(loadMenuItemById, (state) => ({
    ...state,
    selectedMenuItem: null,
    loading: true,
    error: null,
  })),

  on(loadMenuItemByIdSuccess, (state, { menuItem }) => ({
    ...state,
    selectedMenuItem: menuItem,
    loading: false,
    error: null,
  })),

  on(loadMenuItemByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);