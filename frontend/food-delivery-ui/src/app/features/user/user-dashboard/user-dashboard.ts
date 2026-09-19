import { Component, inject } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterLink],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss',
})
export class UserDashboard {
     private authService = inject(Auth);
   private router = inject(Router); 

   logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}
}
