
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-restaurant-search-filter',
  imports: [FormsModule, MatIconModule],
  templateUrl: './restaurant-search-filter.html',
  styleUrl: './restaurant-search-filter.scss',
})
export class RestaurantSearchFilter {
  /** Controls whether the search input is displayed. */
@Input() showSearch = true;

  /** Current search text provided by the parent component. */
  @Input() searchQuery = '';

  /** Currently selected cuisine. */
  @Input() selectedCuisine = 'All';

  /** Currently active filters. */
  @Input() selectedFilters: string[] = [];

  /** Currently selected sorting option. */
  @Input() sortOption = 'recommended';

  /** Available cuisine options. */
  @Input() cuisineOptions: string[] = [];

  /** Emits changes to the search input. */
  @Output() searchQueryChange = new EventEmitter<string>();

  /** Emits changes to the selected cuisine. */
  @Output() selectedCuisineChange = new EventEmitter<string>();

  /** Emits changes to the active filter chips. */
  @Output() selectedFiltersChange = new EventEmitter<string[]>();

  /** Emits changes to the sorting option. */
  @Output() sortOptionChange = new EventEmitter<string>();

  /** Available filter chips. */
  readonly filters = [
    'Fast Delivery',
    'Rating 4.0+',
    'Pure Veg',
    'Offers',
    'Under ₹300'
  ];

  /**
   * Emits the updated search query.
   */
  updateSearch(query: string): void {
    this.searchQueryChange.emit(query);
  }

  /**
   * Adds or removes a filter from the selected filters.
   */
  toggleFilter(filter: string): void {
    const updatedFilters = this.selectedFilters.includes(filter)
      ? this.selectedFilters.filter(item => item !== filter)
      : [...this.selectedFilters, filter];

    this.selectedFiltersChange.emit(updatedFilters);
  }

  /**
   * Checks whether any search or filter criteria are active.
   */
  get hasActiveFilters(): boolean {
    return (
      !!this.searchQuery ||
      this.selectedCuisine !== 'All' ||
      this.selectedFilters.length > 0 ||
      this.sortOption !== 'recommended'
    );
  }

  /**
   * Emits default values to clear all search and filter selections.
   */
  clearFilters(): void {
    this.searchQueryChange.emit('');
    this.selectedCuisineChange.emit('All');
    this.selectedFiltersChange.emit([]);
    this.sortOptionChange.emit('recommended');
  }
}
