import { Component, inject, OnInit } from '@angular/core';
import { Restaurant } from '../../../models/restaurant.models';
import { RestaurantService } from '../../../core/services/restaurant/restaurant';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectRestaurantError, selectRestaurantLoading, selectRestaurants } from '../../../store/selectors/restaurant.selectors';
import { loadRestaurants } from '../../../store/actions/restaurant.actions';

@Component({
  selector: 'app-restaurant-list',
  imports: [AsyncPipe,RouterLink],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.scss',
})
export class RestaurantList implements OnInit  {
  private readonly store = inject(Store);

  restaurants$ = this.store.select(selectRestaurants);

  loading$ = this.store.select(selectRestaurantLoading);

  error$ = this.store.select(selectRestaurantError);

  ngOnInit(): void {
    this.store.dispatch(loadRestaurants());
  }
}
