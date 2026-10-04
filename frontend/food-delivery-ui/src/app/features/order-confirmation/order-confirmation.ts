import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderResponse } from '../../models/order.models';
import { Store } from '@ngrx/store';
import { clearCart } from '../../store/actions/cart.actions';
import { OrderService } from '../../core/services/orders/order.service';

@Component({
  selector: 'app-order-confirmation',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './order-confirmation.html',
  styleUrl: './order-confirmation.scss',
})
export class OrderConfirmation implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);
  private readonly store = inject(Store);

  order$: Observable<OrderResponse> | null = null;

  paymentStatus = '';
  paymentResult = '';

  /**
   * Loads the order and determines the payment result
   * received from the backend payment callback.
   */
  ngOnInit(): void {

    const orderIdParam =
      this.route.snapshot.queryParamMap.get('orderId');

    this.paymentResult =
      this.route.snapshot.queryParamMap.get('status') ?? '';

    if (!orderIdParam) {
      console.error('Order ID is missing from the URL.');
      return;
    }

    const orderId = Number(orderIdParam);

    if (Number.isNaN(orderId)) {
      console.error('Invalid order ID:', orderIdParam);
      return;
    }

    this.order$ =
      this.orderService.getOrderById(orderId);

    /*
     * Clear the cart only after a successful payment.
     * Failed or cancelled payments should not clear the cart.
     */
    if (this.paymentResult === 'success') {
      this.store.dispatch(clearCart());
    }
  }
}