import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
   private authService = inject(Auth);
   private router = inject(Router); 

   logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}
}
