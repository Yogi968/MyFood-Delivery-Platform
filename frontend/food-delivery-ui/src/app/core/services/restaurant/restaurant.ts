import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of, throwError } from 'rxjs';

import { DisplayRestaurants, Restaurant, RestaurantRequest, RestaurantUpdateRequest } from '../../../models/restaurant.models';
import { BaseApiService } from '../http/base-apiservice';
import { mockRestaurantsData } from '../../../mock/restaurants.mock';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private readonly baseApi = inject(BaseApiService);

  private readonly apiUrl =
    'http://localhost:8080/api/restaurants';

  // getRestaurants(): Observable<Restaurant[]> {
  //   return this.baseApi.get<Restaurant[]>(
  //     this.apiUrl
  //   );
  // }
  getRestaurants(): Observable<DisplayRestaurants[]> {
  return of(mockRestaurantsData).pipe(delay(500));
}

  // getRestaurantById(id: number): Observable<Restaurant> {
  //   return this.baseApi.get<Restaurant>(
  //     `${this.apiUrl}/${id}`
  //   );
  // }

  getRestaurantById(id: number): Observable<Restaurant> {
    const restaurant = mockRestaurantsData.find(
      (item) => item.id === id
    );

    if (!restaurant) {
      return throwError(
        () => new Error(`Restaurant with ID ${id} not found`)
      );
    }

    return of(restaurant as unknown as Restaurant).pipe(delay(500));
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