import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: Dashboard,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'ADMIN'
    }
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
