
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import {
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalAmount,
  selectCartRestaurantId,
} from '../../store/selectors/cart.selectors';

import { OrderService } from '../../core/services/orders/order.service';
import { PaymentService } from '../../core/services/paymentService/payment.service';

import { OrderRequest } from '../../models/order.models';
import { PaymentRequest } from '../../models/payment.models';

@Component({
  selector: 'app-checkout',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private readonly store = inject(Store);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly orderService = inject(OrderService);
  private readonly paymentService = inject(PaymentService);

  readonly cartItems$ = this.store.select(selectCartItems);
  readonly totalItems$ = this.store.select(selectCartTotalItems);
  readonly totalAmount$ = this.store.select(selectCartTotalAmount);
  readonly restaurantId$ = this.store.select(selectCartRestaurantId);

  isSubmitting = false;
  errorMessage = '';

  readonly addressForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    phoneNumber: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/),
      ],
    ],
    address: ['', Validators.required],
    city: ['', Validators.required],
    pincode: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d{6}$/),
      ],
    ],
    paymentMethod: ['COD', Validators.required],
  });

  /**
   * Creates an order and handles the next step according
   * to the selected payment method.
   */
  proceedToPayment(): void {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.store.select(selectCartItems).pipe(take(1)).subscribe((cartItems) => {
      this.store.select(selectCartRestaurantId).pipe(take(1)).subscribe((restaurantId) => {
        if (!restaurantId || cartItems.length === 0) {
          this.errorMessage = 'Your cart is empty. Please add items before checkout.';
          this.isSubmitting = false;
          return;
        }

        const formValue = this.addressForm.getRawValue();
        const paymentMethod = formValue.paymentMethod === 'ONLINE'
          ? 'ONLINE'
          : 'COD';

        const orderRequest: OrderRequest = {
          restaurantId,
          fullName: formValue.fullName ?? '',
          phoneNumber: formValue.phoneNumber ?? '',
          address: formValue.address ?? '',
          city: formValue.city ?? '',
          pincode: formValue.pincode ?? '',
          paymentMethod,
          items: cartItems.map((cartItem) => ({
            menuItemId: cartItem.menuItem.id,
            quantity: cartItem.quantity,
          })),
        };

        this.orderService.createOrder(orderRequest).pipe(take(1)).subscribe({
          next: (order) => {
            if (paymentMethod === 'COD') {
              this.handleCashOnDelivery(order.id);
              return;
            }

            this.initiateOnlinePayment(order.id);
          },
          error: (error) => {
            console.error('Order creation failed:', error);
            this.errorMessage = 'Unable to place your order. Please try again.';
            this.isSubmitting = false;
          },
        });
      });
    });
  }

  /**
   * Navigates to order confirmation after successfully
   * creating a Cash on Delivery order.
   *
   * @param orderId ID of the created order
   */
  private handleCashOnDelivery(orderId: number): void {
    this.router.navigate(['/order-confirmation'], {
      queryParams: {
        orderId,
        status: 'cod',
      },
    });
  }

  /**
   * Initiates PayU payment for the created order and
   * redirects the customer to the hosted checkout page.
   *
   * @param orderId ID of the created order
   */
  private initiateOnlinePayment(orderId: number): void {
    const paymentRequest: PaymentRequest = {
      orderId,
      paymentMethod: 'ONLINE',
      idempotencyKey: `PAYU_ORDER_${orderId}_${Date.now()}`,
    };

    this.paymentService.createPayment(paymentRequest).pipe(take(1)).subscribe({
      next: (response) => {
        const checkoutUrl = response.result?.checkoutUrl;

        if (!checkoutUrl) {
          this.errorMessage = 'Unable to start online payment. Please try again.';
          this.isSubmitting = false;
          return;
        }

        window.location.href = checkoutUrl;
      },
      error: (error) => {
        console.error('PayU payment initiation failed:', error);
        this.errorMessage = 'Unable to initiate payment. Please try again.';
        this.isSubmitting = false;
      },
    });
  }
}
