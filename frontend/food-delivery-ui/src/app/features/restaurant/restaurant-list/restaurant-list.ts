import { Component, inject, OnInit } from '@angular/core';
import { Restaurant } from '../../../models/restaurant.models';
import { RestaurantService } from '../../../core/services/restaurant';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  imports: [AsyncPipe,RouterLink],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.scss',
})
export class RestaurantList implements OnInit  {
   private restaurantService = inject(RestaurantService);

  restaurants$!: Observable<Restaurant[]>;

  ngOnInit(): void {
    this.restaurants$ = this.restaurantService.getRestaurants();
  }
}
