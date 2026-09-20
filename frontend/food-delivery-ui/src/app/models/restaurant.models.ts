export interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  imageUrl: string;
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