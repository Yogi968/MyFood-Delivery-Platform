import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Restaurant, RestaurantRequest, RestaurantUpdateRequest } from '../../../models/restaurant.models';
import { BaseApiService } from '../http/base-apiservice';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private readonly baseApi = inject(BaseApiService);

  private readonly apiUrl =
    'http://localhost:8080/api/restaurants';

  getRestaurants(): Observable<Restaurant[]> {
    return this.baseApi.get<Restaurant[]>(
      this.apiUrl
    );
  }

  getRestaurantById(id: number): Observable<Restaurant> {
    return this.baseApi.get<Restaurant>(
      `${this.apiUrl}/${id}`
    );
  }

  createRestaurant(
    request: RestaurantRequest
  ): Observable<Restaurant> {
    return this.baseApi.post<Restaurant>(
      this.apiUrl,
      request
    );
  }

  updateRestaurant(
    id: number,
    request: RestaurantUpdateRequest
  ): Observable<Restaurant> {
    return this.baseApi.put<Restaurant>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  deleteRestaurant(id: number): Observable<void> {
    return this.baseApi.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}