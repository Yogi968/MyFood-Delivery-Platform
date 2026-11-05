
import {
  Component,
  inject,
  ElementRef,
  ViewChild,
  OnInit
} from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { BehaviorSubject, combineLatest, map, take } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

import { MatIconModule } from '@angular/material/icon';

import { Auth } from '../../../core/services/AuthService/auth';

import { DisplayRestaurants, FoodCategory, RestaurantFilterOptions } from '../../../models/restaurant.models';

import { FoodCategories } from '../../../components/food-categories/food-categories';
import { RestaurantCard } from '../../restaurant/components/restaurant-card/restaurant-card';
import { RestaurantSearchFilter } from '../../restaurant/components/restaurant-search-filter/restaurant-search-filter';

import { SearchState } from '../../../shared/services/search-state/search-state';

import { filterRestaurants } from '../../restaurant/utils/restaurant-filter.utils';

import { loadRestaurants } from '../../../store/actions/restaurant.actions';
import {
  selectRestaurants
} from '../../../store/selectors/restaurant.selectors';

import {
  selectCartTotalItems
} from '../../../store/selectors/cart.selectors';

@Component({
  selector: 'app-user-dashboard',
  imports: [
    AsyncPipe,
    RouterLink,
    MatIconModule,
    FoodCategories,
    RestaurantCard,
    RestaurantSearchFilter
  ],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss',
})
export class UserDashboard implements OnInit {

  private readonly authService = inject(Auth);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly searchState = inject(SearchState);

  readonly Math = Math;

  /** Cart item count displayed on the dashboard. */
  readonly cartTotalItems$ = this.store.select(selectCartTotalItems);

  /** Restaurant records retrieved from the NgRx store. */
  readonly restaurants$ = this.store.select(selectRestaurants);

  /** Number of restaurants displayed on each page. */
  readonly pageSize = 8;

  /** Current pagination page. */
  private readonly currentPageSubject = new BehaviorSubject<number>(1);

  /** Currently selected pagination page. */
  readonly currentPage$ = this.currentPageSubject.asObservable();

  /** Restaurant filter configuration. */
  private readonly filterOptionsSubject =
    new BehaviorSubject<RestaurantFilterOptions>({
      searchQuery: '',
      selectedCuisine: 'All',
      selectedFilters: [],
      sortOption: 'recommended'
    });

  /** Observable containing the current restaurant filter configuration. */
  private readonly filterOptions$ =
    this.filterOptionsSubject.asObservable();

  /** Cuisine options displayed in the restaurant filter component. */
  readonly cuisineOptions = [
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
   * Food categories displayed in the dashboard category section.
   */
  readonly foodCategories: FoodCategory[] = [
    {
      id: 1,
      text: 'Pizza',
      imageUrl: 'https://res.cloudinary.com/gzafbake/image/upload/v1792307498/pizza.png'
    },
    {
      id: 2,
      text: 'Burgers',
      imageUrl: 'https://res.cloudinary.com/gzafbake/image/upload/v1792307516/burgers.png'
    },
    {
      id: 3,
      text: 'Biryani',
      imageUrl: 'https://res.cloudinary.com/gzafbake/image/upload/v1792307517/biryani.png'
    },
    {
      id: 4,
      text: 'Chinese',
      imageUrl: 'https://res.cloudinary.com/gzafbake/image/upload/v1792307517/noodles.png'
    },
    {
      id: 5,
      text: 'South Indian',
      imageUrl: 'https://res.cloudinary.com/gzafbake/image/upload/v1792307515/dosa.png'
    },
    {
      id: 6,
      text: 'Desserts',
      imageUrl: 'https://res.cloudinary.com/gzafbake/image/upload/v1792307516/desserts.png'
    },
    {
      id: 7,
      text: 'Healthy Food',
      imageUrl: 'https://res.cloudinary.com/gzafbake/image/upload/v1792307515/salad.png'
    }
  ];

  /** Reference to the Popular Restaurants section. */
  @ViewChild('restaurantsSection')
  restaurantsSection!: ElementRef<HTMLElement>;

  /** Shared search query converted from the SearchState signal. */
  private readonly searchQuery$ =
    toObservable(this.searchState.searchQuery);

  /**
   * Combines backend restaurant data with search and filter selections.
   */
  readonly filteredRestaurants$ = combineLatest([
    this.restaurants$,
    this.searchQuery$,
    this.filterOptions$
  ]).pipe(
    map(([restaurants, searchQuery, filterOptions]) => {

      const options: RestaurantFilterOptions = {
        ...filterOptions,
        searchQuery
      };

      return filterRestaurants(restaurants, options);
    })
  );

  /** Total number of restaurants after applying filters. */
  readonly restaurantCount$ = this.filteredRestaurants$.pipe(
    map(restaurants => restaurants.length)
  );

  /** Total number of pagination pages. */
  readonly totalPages$ = this.restaurantCount$.pipe(
    map(count => Math.ceil(count / this.pageSize))
  );

  /**
   * Restaurants belonging to the currently selected page.
   */
  readonly paginatedRestaurants$ = combineLatest([
    this.filteredRestaurants$,
    this.currentPage$
  ]).pipe(
    map(([restaurants, currentPage]) => {

      const startIndex = (currentPage - 1) * this.pageSize;

      return restaurants.slice(
        startIndex,
        startIndex + this.pageSize
      );
    })
  );

  /** Generates pagination page numbers. */
  readonly pageNumbers$ = this.totalPages$.pipe(
    map(totalPages =>
      Array.from(
        { length: totalPages },
        (_, index) => index + 1
      )
    )
  );

  /** Currently selected cuisine. */
  get selectedCuisine(): string {
    return this.filterOptionsSubject.value.selectedCuisine;
  }

  /** Currently selected restaurant filters. */
  get selectedFilters(): string[] {
    return this.filterOptionsSubject.value.selectedFilters;
  }

  /** Currently selected sorting option. */
  get sortOption(): string {
    return this.filterOptionsSubject.value.sortOption;
  }

  /** Currently selected pagination page. */
  get currentPage(): number {
    return this.currentPageSubject.value;
  }

  /**
   * Loads restaurants from the backend when the dashboard initializes.
   */
  ngOnInit(): void {
    this.store.dispatch(loadRestaurants());
  }

  /**
   * Smoothly scrolls the user to the Popular Restaurants section.
   */
  scrollToRestaurants(): void {
    this.restaurantsSection.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  /**
   * Logs out the current user and navigates to the login page.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Updates restaurant filter options and resets pagination.
   */
  private updateFilterOptions(
    updates: Partial<RestaurantFilterOptions>
  ): void {

    this.filterOptionsSubject.next({
      ...this.filterOptionsSubject.value,
      ...updates
    });

    this.currentPageSubject.next(1);
  }

/**
 * Navigates to the selected pagination page when it is valid.
 *
 * @param page - Target pagination page number.
 */
goToPage(page: number): void {
  if (page < 1) {
    return;
  }

  this.totalPages$.pipe(take(1)).subscribe(totalPages => {
    if (page <= totalPages) {
      this.currentPageSubject.next(page);
    }
  });
}

  /**
   * Navigates to the next pagination page.
   */
  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  /**
   * Navigates to the previous pagination page.
   */
  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  /**
   * Updates the shared search query and resets pagination.
   */
  updateSearch(query: string): void {
    this.searchState.updateSearchQuery(query);
    this.currentPageSubject.next(1);
  }

  /**
   * Updates the selected cuisine category.
   */
  updateCuisine(cuisine: string): void {
    this.updateFilterOptions({
      selectedCuisine: cuisine
    });
  }

  /**
   * Updates the selected restaurant filters.
   */
  updateFilters(filters: string[]): void {
    this.updateFilterOptions({
      selectedFilters: filters
    });
  }

  /**
   * Updates the restaurant sorting option.
   */
  updateSort(option: string): void {
    this.updateFilterOptions({
      sortOption: option
    });
  }

  /**
   * Resets search, filters, sorting and pagination.
   */
  clearFilters(): void {
    this.searchState.clearSearchQuery();

    this.filterOptionsSubject.next({
      searchQuery: '',
      selectedCuisine: 'All',
      selectedFilters: [],
      sortOption: 'recommended'
    });

    this.currentPageSubject.next(1);
  }
}
