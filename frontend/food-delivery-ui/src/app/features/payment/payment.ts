import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectCartTotalAmount } from '../../store/selectors/cart.selectors';

@Component({
  selector: 'app-payment',
  imports: [AsyncPipe],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment {

  private readonly store = inject(Store);
  private readonly router = inject(Router);

  totalAmount$ = this.store.select(selectCartTotalAmount);

  /**
   * Simulates the online payment process.
   */
  pay(): void {
    console.log('Payment initiated.');

    this.router.navigate(['/order-confirmation']);
  }
}