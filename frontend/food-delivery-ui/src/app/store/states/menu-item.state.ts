import { MenuItem } from '../../models/menu-item.models';

/**
 * Represents the Menu Item state managed by NgRx.
 */
export interface MenuItemState {
  menuItems: MenuItem[];
  selectedMenuItem: MenuItem | null;
  loading: boolean;
  error: string | null;
}

/**
 * Provides the initial state for the Menu Item store.
 */
export const initialMenuItemState: MenuItemState = {
  menuItems: [],
  selectedMenuItem: null,
  loading: false,
  error: null,
};