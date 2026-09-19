import { Component, inject } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {
     private authService = inject(Auth);
   private router = inject(Router); 

   logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}
}
