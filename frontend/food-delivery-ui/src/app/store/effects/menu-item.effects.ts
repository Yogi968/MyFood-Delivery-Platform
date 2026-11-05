import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import {
  loadMenuItems,
  loadMenuItemsSuccess,
  loadMenuItemsFailure,
  loadMenuItemById,
  loadMenuItemByIdSuccess,
  loadMenuItemByIdFailure,
} from '../actions/menu-item.actions';
import { MenuItemService } from '../../core/services/menuItem/menuItem';

@Injectable()
export class MenuItemEffects {

  private readonly actions$ = inject(Actions);
  private readonly menuItemService = inject(MenuItemService);

  /**
   * Loads all available menu items for a restaurant when the
   * loadMenuItems action is dispatched.
   */
  loadMenuItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMenuItems),
      switchMap(({ restaurantId }) =>
        this.menuItemService.getMenuItems(restaurantId).pipe(
          map((menuItems) =>
            loadMenuItemsSuccess({ menuItems })
          ),
          catchError((error) =>
            of(
              loadMenuItemsFailure({
                error: error.message ?? 'Failed to load menu items',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Loads a single menu item when the loadMenuItemById action
   * is dispatched.
   */
  loadMenuItemById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMenuItemById),
      switchMap(({ menuItemId }) =>
        this.menuItemService.getMenuItemById(menuItemId).pipe(
          map((menuItem) =>
            loadMenuItemByIdSuccess({ menuItem })
          ),
          catchError((error) =>
            of(
              loadMenuItemByIdFailure({
                error: error.message ?? 'Failed to load menu item',
              })
            )
          )
        )
      )
    )
  );
}