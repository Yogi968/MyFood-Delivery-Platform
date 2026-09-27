import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectCartTotalAmount } from '../../store/selectors/cart.selectors';

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
  totalAmount$ = this.store.select(selectCartTotalAmount);
  orderId: number | null = null;

  /**
 * Reads the order ID passed through the payment route.
 */
ngOnInit(): void {
  const orderId = this.route.snapshot.queryParamMap.get('orderId');

  this.orderId = orderId ? Number(orderId) : null;

  console.log('Payment Order ID:', this.orderId);
}
  /**
   * Simulates the online payment process.
   */
  pay(): void {
    console.log('Payment initiated.');

    this.router.navigate(['/order-confirmation']);
  }
}