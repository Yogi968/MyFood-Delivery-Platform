export interface OrderItemRequest {
  menuItemId: number;
  quantity: number;
}

export interface OrderRequest {
  restaurantId: number;
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: 'COD' | 'ONLINE';
  items: OrderItemRequest[];
}

export interface OrderResponse {
  id: number;
  restaurantId: number;
  totalAmount: number;
  status: string;
  paymentMethod: 'COD' | 'ONLINE';
  paymentStatus: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  pincode: string;
  createdAt: string;
  updatedAt: string;
}