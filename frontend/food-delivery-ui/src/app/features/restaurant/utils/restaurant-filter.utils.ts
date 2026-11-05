
import {
  DisplayRestaurants,
  RestaurantFilterOptions,
} from '../../../models/restaurant.models';

/**
 * Filters and sorts restaurants based on the provided options.
 *
 * @param restaurants - Original restaurant collection.
 * @param options - Search, filter and sorting selections.
 * @returns A new array containing the filtered and sorted restaurants.
 */
export function filterRestaurants(
  restaurants: DisplayRestaurants[],
  options: RestaurantFilterOptions,
): DisplayRestaurants[] {
  const query = options.searchQuery.trim().toLowerCase();

  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Match the search query against restaurant name and cuisine.
    const matchesSearch =
      !query ||
      restaurant.name.toLowerCase().includes(query) ||
      (restaurant.cuisine ?? '').toLowerCase().includes(query);

    // Match the selected cuisine category.
    const matchesSelectedCuisine =
      options.selectedCuisine === 'All' ||
      matchesCuisine(restaurant, options.selectedCuisine);

    // Apply all selected restaurant filters.
    const matchesSelectedFilters = options.selectedFilters.every(
      (filter) => matchesFilter(restaurant, filter),
    );

    return (
      matchesSearch &&
      matchesSelectedCuisine &&
      matchesSelectedFilters
    );
  });

  return sortRestaurants(filteredRestaurants, options.sortOption);
}

/**
 * Checks whether a restaurant belongs to the selected cuisine.
 *
 * Cuisine values are stored as comma-separated strings.
 *
 * @param restaurant - Restaurant to check.
 * @param cuisine - Selected cuisine category.
 * @returns True when the restaurant matches the cuisine.
 */
export function matchesCuisine(
  restaurant: DisplayRestaurants,
  cuisine: string,
): boolean {
  return (restaurant.cuisine ?? '')
    .split(',')
    .some(
      (item) =>
        item.trim().toLowerCase() === cuisine.trim().toLowerCase(),
    );
}

/**
 * Checks whether a restaurant satisfies a selected filter.
 *
 * @param restaurant - Restaurant to evaluate.
 * @param filter - Selected filter name.
 * @returns True when the restaurant satisfies the filter.
 */
function matchesFilter(
  restaurant: DisplayRestaurants,
  filter: string,
): boolean {
  switch (filter) {
    case 'Rating 4.0+':
      return restaurant.rating !== null && restaurant.rating >= 4;

    case 'Under ₹300':
      return (
        restaurant.priceForOne !== null &&
        restaurant.priceForOne < 300
      );

    case 'Offers':
      return (restaurant.discount ?? '').trim().length > 0;

    case 'Fast Delivery':
      return getMaxDeliveryTime(restaurant.deliveryTime) <= 30;

    case 'Pure Veg':
      return restaurant.badge?.toLowerCase() === 'pure veg';

    default:
      return true;
  }
}

/**
 * Extracts the maximum delivery time from a delivery-time range.
 *
 * Example: "25–30 min" returns 30.
 *
 * @param deliveryTime - Restaurant delivery-time range.
 * @returns Maximum delivery time in minutes.
 */
export function getMaxDeliveryTime(
  deliveryTime: string | null,
): number {
  if (!deliveryTime) {
    return Number.POSITIVE_INFINITY;
  }

  const deliveryTimes = deliveryTime.match(/\d+/g);

  if (!deliveryTimes?.length) {
    return Number.POSITIVE_INFINITY;
  }

  return Math.max(...deliveryTimes.map(Number));
}

/**
 * Sorts restaurants according to the selected sorting option.
 *
 * Restaurants with missing values are placed last for rating
 * and price sorting. Uses a copied array to avoid mutating
 * the original collection.
 *
 * @param restaurants - Restaurants to sort.
 * @param sortOption - Selected sorting option.
 * @returns A newly sorted restaurant array.
 */
export function sortRestaurants(
  restaurants: DisplayRestaurants[],
  sortOption: string,
): DisplayRestaurants[] {
  const sortedRestaurants = [...restaurants];

  switch (sortOption) {
    case 'rating':
      return sortedRestaurants.sort((a, b) => {
        if (a.rating === null) return 1;
        if (b.rating === null) return -1;

        return b.rating - a.rating;
      });

    case 'deliveryTime':
      return sortedRestaurants.sort(
        (a, b) =>
          getMaxDeliveryTime(a.deliveryTime) -
          getMaxDeliveryTime(b.deliveryTime),
      );

    case 'priceLowToHigh':
      return sortedRestaurants.sort((a, b) => {
        if (a.priceForOne === null) return 1;
        if (b.priceForOne === null) return -1;

        return a.priceForOne - b.priceForOne;
      });

    case 'priceHighToLow':
      return sortedRestaurants.sort((a, b) => {
        if (a.priceForOne === null) return 1;
        if (b.priceForOne === null) return -1;

        return b.priceForOne - a.priceForOne;
      });

    case 'recommended':
    default:
      return sortedRestaurants;
  }
}
