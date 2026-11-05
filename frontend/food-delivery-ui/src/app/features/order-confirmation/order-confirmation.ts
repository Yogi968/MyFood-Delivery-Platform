
import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { OrderResponse } from '../../models/order.models';
import { clearCart } from '../../store/actions/cart.actions';
import { OrderService } from '../../core/services/orders/order.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink, CurrencyPipe,
  ],
  templateUrl: './order-confirmation.html',
  styleUrl: './order-confirmation.scss',
})
export class OrderConfirmation implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);
  private readonly store = inject(Store);

  /** Observable containing the order details retrieved from the backend. */
  order$: Observable<OrderResponse> | null = null;

  /** Stores the payment status returned through the URL query parameter. */
  paymentResult = '';

  /**
   * Loads the order ID and payment result from the URL,
   * then retrieves the corresponding order from the backend.
   */
  ngOnInit(): void {
    const orderIdParam =
      this.route.snapshot.queryParamMap.get('orderId');

    this.paymentResult =
      (this.route.snapshot.queryParamMap.get('status') ?? '').toLowerCase();

    if (!orderIdParam) {
      console.error('Order ID is missing from the URL.');
      return;
    }

    const orderId = Number(orderIdParam);

    if (!Number.isInteger(orderId) || orderId <= 0) {
      console.error('Invalid order ID:', orderIdParam);
      return;
    }

    this.order$ = this.orderService.getOrderById(orderId);

    /**
     * Clear the cart for successful online payments and COD orders.
     * Failed and cancelled payments must preserve the cart.
     *
     * Note: For production, verify the backend order/payment status
     * before clearing the cart instead of relying only on URL status.
     */
    if (
      this.paymentResult === 'success' ||
      this.paymentResult === 'cod'
    ) {
      this.store.dispatch(clearCart());
    }
  }
}
