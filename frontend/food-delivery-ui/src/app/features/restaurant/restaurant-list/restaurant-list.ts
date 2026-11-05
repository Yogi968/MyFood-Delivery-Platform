import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectRestaurantError, selectRestaurantLoading, selectRestaurants } from '../../../store/selectors/restaurant.selectors';
import { loadRestaurants } from '../../../store/actions/restaurant.actions';
import { MatIconModule } from '@angular/material/icon';
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RestaurantCard } from '../components/restaurant-card/restaurant-card';
import { RestaurantSearchFilter } from '../components/restaurant-search-filter/restaurant-search-filter';
import { SearchState } from '../../../shared/services/search-state/search-state';
import { filterRestaurants } from '../utils/restaurant-filter.utils';

@Component({
  selector: 'app-restaurant-list',
  imports: [AsyncPipe, MatIconModule,RouterLink, RestaurantCard, FormsModule, RestaurantSearchFilter],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.scss',
})
export class RestaurantList implements OnInit {
  private readonly store = inject(Store);
  /** Shared search state used by the application header and dashboard. */
  readonly searchState = inject(SearchState);

  restaurants$ = this.store.select(selectRestaurants);

  loading$ = this.store.select(selectRestaurantLoading);

  error$ = this.store.select(selectRestaurantError);

  /** Uses the application-wide search query signal. */
  readonly searchQuery = this.searchState.searchQuery;

  /**
   * Stores the selected cuisine filter.
   * 'All' means no cuisine restriction.
   */
  selectedCuisine = signal('All');

  /**
   * Stores the currently selected restaurant filters.
   */
  selectedFilters = signal<string[]>([]);

  /**
   * Stores the selected sorting option.
   */
  sortOption = signal('recommended');

  /**
   * Available cuisine options for the dropdown.
   */
  cuisineOptions = [
    'All',
    'Biryani',
    'Andhra',
    'North Indian',
    'Pizza',
    'Italian',
    'Burgers',
    'American',
    'South Indian',
    'Chinese',
    'Asian',
    'Thai',
    'Breakfast',
    'Bakery',
    'Desserts',
    'Healthy',
    'Salads',
    'Continental'
  ];

  /**
  * Returns restaurants filtered and sorted using the shared utility.
  *
  * Reads restaurant data from NgRx and combines it with
  * the global search query and locally selected filters.
  */
  readonly filteredRestaurants = computed(() => {
    const restaurants = this.store.selectSignal(selectRestaurants)();

    return filterRestaurants(restaurants, {
      searchQuery: this.searchState.searchQuery(),
      selectedCuisine: this.selectedCuisine(),
      selectedFilters: this.selectedFilters(),
      sortOption: this.sortOption(),
    });
  });

  ngOnInit(): void {
    this.store.dispatch(loadRestaurants());
  }

  /** Updates the application-wide restaurant search query. */
  updateSearch(query: string): void {
    this.searchState.updateSearchQuery(query);
  }

  /**
   * Adds or removes a filter chip.
   */
  toggleFilter(filter: string): void {
    this.selectedFilters.update(current =>
      current.includes(filter)
        ? current.filter(item => item !== filter)
        : [...current, filter]
    );
  }

  /** Resets all restaurant search and filter selections. */
  clearFilters(): void {
    this.searchState.clearSearchQuery();
    this.selectedCuisine.set('All');
    this.selectedFilters.set([]);
    this.sortOption.set('recommended');
  }
}
