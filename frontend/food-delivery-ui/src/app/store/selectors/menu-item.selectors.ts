import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MenuItemState } from '../states/menu-item.state';

/**
 * Selects the Menu Item feature state from the global store.
 */
export const selectMenuItemState =
  createFeatureSelector<MenuItemState>('menuItem');

/**
 * Selects all menu items from the Menu Item state.
 */
export const selectMenuItems =
  createSelector(
    selectMenuItemState,
    (state) => state.menuItems
  );

/**
 * Selects the currently selected menu item.
 */
export const selectSelectedMenuItem =
  createSelector(
    selectMenuItemState,
    (state) => state.selectedMenuItem
  );

/**
 * Selects the loading status of the Menu Item state.
 */
export const selectMenuItemLoading =
  createSelector(
    selectMenuItemState,
    (state) => state.loading
  );

/**
 * Selects the current Menu Item error.
 */
export const selectMenuItemError =
  createSelector(
    selectMenuItemState,
    (state) => state.error
  );