import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../http/base-apiservice';
import { MenuItem } from '../../../models/menu-item.models';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {

  private readonly baseApiService = inject(BaseApiService);
  private readonly apiUrl =
    'http://localhost:8080/api/restaurants';
  /**
   * Retrieves all available menu items for a restaurant.
   *
   * @param restaurantId ID of the restaurant
   * @returns Observable containing the available menu items
   */
  getMenuItems(restaurantId: number): Observable<MenuItem[]> {
    return this.baseApiService.get<MenuItem[]>(
      `${this.apiUrl}/${restaurantId}/menu-items`
    );
  }

  /**
   * Retrieves a menu item by its ID.
   *
   * @param menuItemId ID of the menu item
   * @returns Observable containing the requested menu item
   */
  getMenuItemById(menuItemId: number): Observable<MenuItem> {
    return this.baseApiService.get<MenuItem>(
      `/menu-items/${menuItemId}`
    );
  }
}