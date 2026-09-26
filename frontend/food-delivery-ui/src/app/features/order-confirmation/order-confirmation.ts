import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectCartTotalAmount } from '../../store/selectors/cart.selectors';

@Component({
  selector: 'app-order-confirmation',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './order-confirmation.html',
  styleUrl: './order-confirmation.scss',
})
export class OrderConfirmation {

  private readonly store = inject(Store);

  totalAmount$ = this.store.select(selectCartTotalAmount);
}