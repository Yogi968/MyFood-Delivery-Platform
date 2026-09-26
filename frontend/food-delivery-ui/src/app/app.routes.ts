import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { UserDashboard } from './features/user/user-dashboard/user-dashboard';
import { AdminDashboard } from './features/admin/admin-dashboard/admin-dashboard';
import { RestaurantList } from './features/restaurant/restaurant-list/restaurant-list';
import { RestaurantDetails } from './features/restaurant/restaurant-details/restaurant-details';
import { Cart } from './features/cart/cart';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'dashboard',
    component: UserDashboard,
    canActivate: [authGuard,roleGuard],
    data: {
      role: 'USER'
    }
  },
  {
    path: 'admin',
    component: AdminDashboard,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'ADMIN'
    }
  },
  {
    path: 'restaurants',
    component: RestaurantList,
    canActivate: [authGuard]
  },
  {
    path: 'restaurants/:id',
    component: RestaurantDetails,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'cart',
    component: Cart,
    canActivate: [authGuard],
  }
];
