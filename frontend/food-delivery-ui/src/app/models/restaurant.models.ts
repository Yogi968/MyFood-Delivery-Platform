export interface Restaurant {
  id: number;
  name: string;
  description: string | null;
  address: string;
  imageUrl: string | null;
  isActive: boolean;
}

export interface RestaurantRequest {
  name: string;
  description: string;
  address: string;
  imageUrl: string;
}

export interface RestaurantUpdateRequest {
  name: string;
  description: string;
  address: string;
  imageUrl: string;
  isActive: boolean;
}

export interface FoodCategory {
  id: number;
  text: string;
  imageUrl: string;
}

/**
 * Represents restaurant information displayed on listing cards.
 * Matches the restaurant API response.
 */
export interface DisplayRestaurants {
  id: number;
  name: string;
  description: string | null;
  address: string;
  imageUrl: string | null;
  imageAlt: string | null;
  cuisine: string | null;
  rating: number | null;
  deliveryTime: string | null;
  distance: string | null;
  priceForOne: number | null;
  badge?: string | null;
  discount: string | null;
  isActive: boolean;
}


/**
 * Defines the search, filtering and sorting options
 * used to display restaurants.
 */
export interface RestaurantFilterOptions {
  /** Search text used to match restaurant names and cuisines. */
  searchQuery: string;

  /** Selected cuisine category. */
  selectedCuisine: string;

  /** List of active restaurant filters. */
  selectedFilters: string[];

  /** Selected restaurant sorting option. */
  sortOption: string;
}
