/**
 * Represents a menu item returned by the backend API.
 */
export interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  vegetarian: boolean;
  available: boolean;
}