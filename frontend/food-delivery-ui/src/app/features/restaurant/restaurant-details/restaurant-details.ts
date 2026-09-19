import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { RestaurantService } from '../../../core/services/restaurant';
import { Restaurant } from '../../../models/restaurant.models';

@Component({
  selector: 'app-restaurant-details',
  imports: [AsyncPipe,RouterLink],
  templateUrl: './restaurant-details.html',
  styleUrl: './restaurant-details.scss'
})
export class RestaurantDetails implements OnInit {

  private route = inject(ActivatedRoute);
  private restaurantService = inject(RestaurantService);

  restaurant$!: Observable<Restaurant>;

  ngOnInit(): void {

    const restaurantId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.restaurant$ =
      this.restaurantService.getRestaurantById(restaurantId);
  }
}