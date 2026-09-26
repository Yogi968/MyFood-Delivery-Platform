import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalAmount,
} from '../../store/selectors/cart.selectors';
import { Router } from '@angular/router';

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
  cartItems$ = this.store.select(selectCartItems);
  totalItems$ = this.store.select(selectCartTotalItems);
  totalAmount$ = this.store.select(selectCartTotalAmount);

  addressForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    phoneNumber: ['', [
      Validators.required,
      Validators.pattern(/^[6-9]\d{9}$/),
    ]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    pincode: ['', [
      Validators.required,
      Validators.pattern(/^\d{6}$/),
    ]],
    paymentMethod: ['COD', Validators.required],
  });

  /**
   * Validates the delivery address before proceeding to payment.
   */
  proceedToPayment(): void {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }
    
    const paymentMethod = this.addressForm.value.paymentMethod;

  if (paymentMethod === 'ONLINE') {
    this.router.navigate(['/payment']);
    return;
  }
    console.log('Delivery address:', this.addressForm.value);
  }
}
