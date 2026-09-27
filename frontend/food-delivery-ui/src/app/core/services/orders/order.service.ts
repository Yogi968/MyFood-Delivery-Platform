import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../http/base-apiservice';
import { OrderRequest, OrderResponse } from '../../../models/order.models';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly baseApiService = inject(BaseApiService);
  private readonly apiUrl = 'http://localhost:8080/api';

  /**
   * Creates a new order for the authenticated user.
   *
   * @param request order details to be submitted
   * @returns observable containing the created order
   */
  createOrder(request: OrderRequest): Observable<OrderResponse> {
    return this.baseApiService.post<OrderResponse>(
      `${this.apiUrl}/orders`,
      request
    );
  }

  /**
   * Retrieves an order by its ID.
   *
   * @param orderId ID of the order
   * @returns observable containing the requested order
   */
  getOrderById(orderId: number): Observable<OrderResponse> {
    return this.baseApiService.get<OrderResponse>(
      `${this.apiUrl}/orders/${orderId}`
    );
  }

  /**
   * Retrieves all orders belonging to the authenticated user.
   *
   * @returns observable containing the user's orders
   */
  getMyOrders(): Observable<OrderResponse[]> {
    return this.baseApiService.get<OrderResponse[]>(
      `${this.apiUrl}/orders/my-orders`
    );
  }
}