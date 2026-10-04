import { AsyncPipe } from '@angular/common';
import { Component, DOCUMENT, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectCartTotalAmount } from '../../store/selectors/cart.selectors';
import { PaymentService } from '../../core/services/paymentService/payment.service';
import {PaymentInitiationResponse, PaymentRequest} from '../../models/payment.models';

@Component({
  selector: 'app-payment',
  imports: [AsyncPipe],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment implements OnInit {

  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly paymentService = inject(PaymentService);
  private readonly document = inject(DOCUMENT);
  totalAmount$ = this.store.select(selectCartTotalAmount);
  orderId: number | null = null;
  paymentFailed = false;

/**
 * Initializes the payment page and checks whether the user
 * was redirected here after a failed PayU transaction.
 */
ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.paymentFailed = params['status'] === 'failure';

    const orderId = Number(params['orderId']);

    if (this.paymentFailed) {
      console.log('Payment failed for order:', orderId);
      return;
    }

    if (orderId) {
      this.initiatePayment(orderId);
    }
  });
}

  /**
   * Simulates the online payment process.
   */
  pay(): void {
    console.log('Payment initiated.');

    this.router.navigate(['/order-confirmation']);
  }

  /**
 * Creates a payment request through the backend and receives
 * the PayU hosted checkout information.
 *
 * @param orderId ID of the order for which payment is being initiated
 */
initiatePayment(orderId: number): void {
  if (!orderId) {
    console.error('Order ID is missing.');
    return;
  }

  const request: PaymentRequest = {
    orderId,
    paymentMethod: 'ONLINE',
    idempotencyKey: `PAYU_ORDER_${orderId}_${Date.now()}`,
  };

  this.paymentService.createPayment(request).subscribe({
    next: (response) => {
  console.log('PayU v2 Payment Initiation Response:', response);

  const checkoutUrl = response.result?.checkoutUrl;

  if (!checkoutUrl) {
    console.error('PayU checkout URL is missing.');
    return;
  }

  window.location.href = checkoutUrl;
},
    error: (error) => {
      console.error('Payment initiation failed:', error);
    },
  });
}

/**
 * Retries the payment for the current order.
 */
retryPayment(): void {
  const orderId = Number(
    this.route.snapshot.queryParamMap.get('orderId')
  );

  if (!orderId) {
    return;
  }

  this.paymentFailed = false;
  this.initiatePayment(orderId);
}
}