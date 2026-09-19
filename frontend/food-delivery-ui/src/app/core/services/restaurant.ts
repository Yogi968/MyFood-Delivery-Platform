import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Restaurant } from '../../models/restaurant.models';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private readonly apiUrl = 'http://localhost:8080/api/restaurants';

  private http = inject(HttpClient);

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }

  getRestaurantById(id: number): Observable<Restaurant> {
  return this.http.get<Restaurant>(`${this.apiUrl}/${id}`);
}
}