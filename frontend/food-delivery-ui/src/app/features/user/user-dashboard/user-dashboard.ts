import { Component, inject } from '@angular/core';
import { Auth } from '../../../core/services/AuthService/auth';
import { Router, RouterLink } from '@angular/router';
import { selectCartTotalItems } from '../../../store/selectors/cart.selectors';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss',
})
export class UserDashboard {
  private authService = inject(Auth);
  private router = inject(Router);
  private store = inject(Store);
  cartTotalItems$ = this.store.select(selectCartTotalItems);
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
