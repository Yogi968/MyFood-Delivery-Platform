import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/AuthService/auth';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCartTotalItems } from '../../store/selectors/cart.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
   private authService = inject(Auth);
   private router = inject(Router); 
   private store = inject(Store);
   cartTotalItems$ = this.store.select(selectCartTotalItems);
   logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}
}
