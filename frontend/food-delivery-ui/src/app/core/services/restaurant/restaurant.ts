
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  DisplayRestaurants,
  Restaurant,
  RestaurantRequest,
  RestaurantUpdateRequest
} from '../../../models/restaurant.models';

import { BaseApiService } from '../http/base-apiservice';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private readonly baseApi = inject(BaseApiService);

  private readonly apiUrl = `${environment.apiUrl}/api/restaurants`;

  /**
   * Retrieves all active restaurants from the backend.
   */
  getRestaurants(): Observable<DisplayRestaurants[]> {
    return this.baseApi.get<DisplayRestaurants[]>(
      this.apiUrl
    );
  }

  /**
   * Retrieves a restaurant by its unique ID.
   */
  getRestaurantById(id: number): Observable<Restaurant> {
    return this.baseApi.get<Restaurant>(
      `${this.apiUrl}/${id}`
    );
  }

  /**
   * Creates a new restaurant.
   */
  createRestaurant(
    request: RestaurantRequest
  ): Observable<Restaurant> {
    return this.baseApi.post<Restaurant>(
      this.apiUrl,
      request
    );
  }

  /**
   * Updates an existing restaurant.
   */
  updateRestaurant(
    id: number,
    request: RestaurantUpdateRequest
  ): Observable<Restaurant> {
    return this.baseApi.put<Restaurant>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  /**
   * Deactivates a restaurant.
   */
  deleteRestaurant(id: number): Observable<Restaurant> {
    return this.baseApi.delete<Restaurant>(
      `${this.apiUrl}/${id}`
    );
  }
}
