import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DisplayRestaurants } from '../../../../models/restaurant.models';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.scss',
})
export class RestaurantCard {
  /** Restaurant data received from the parent dashboard. */
  @Input({ required: true }) restaurant!: DisplayRestaurants;
}