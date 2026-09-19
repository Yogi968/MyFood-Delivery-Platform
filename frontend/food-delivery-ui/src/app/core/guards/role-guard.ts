import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorage } from '../services/token-storage';

export const roleGuard: CanActivateFn = (route, state) => {

  const tokenStorage = inject(TokenStorage);
  const router = inject(Router);

  const requiredRole = route.data['role'] as string;
  const currentRole = tokenStorage.getRole();

  if (currentRole === requiredRole) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};