import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { UserDashboard } from './features/user/user-dashboard/user-dashboard';
import { AdminDashboard } from './features/admin/admin-dashboard/admin-dashboard';
import { RestaurantList } from './features/restaurant/restaurant-list/restaurant-list';
import { RestaurantDetails } from './features/restaurant/restaurant-details/restaurant-details';
import { Cart } from './features/cart/cart';
import { Checkout } from './features/checkout/checkout';
import { Payment } from './features/payment/payment';
import { OrderConfirmation } from './features/order-confirmation/order-confirmation';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'dashboard',
    component: UserDashboard,
    canActivate: [authGuard, roleGuard],
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
  },
  {
    path: 'checkout',
    component: Checkout,
    canActivate: [authGuard],
  },
  {
    path: 'payment',
    component: Payment,
    canActivate: [authGuard],
  },
  {
  path: 'order-confirmation',
  component: OrderConfirmation,
  canActivate: [authGuard],
}
];
