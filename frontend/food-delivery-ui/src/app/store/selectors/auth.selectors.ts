
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../states/auth.state';

/**
 * Selects the complete authentication feature state from the NgRx store.
 */
export const selectAuthState =
  createFeatureSelector<AuthState>('auth');

/**
 * Selects whether an authentication request is in progress.
 */
export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

/**
 * Selects whether the user is authenticated.
 */
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

/**
 * Selects the authentication token.
 */
export const selectAuthToken = createSelector(
  selectAuthState,
  (state) => state.token
);

/**
 * Selects the authenticated user's role.
 */
export const selectAuthRole = createSelector(
  selectAuthState,
  (state) => state.role
);

/**
 * Selects the current authentication error message.
 */
export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

/**
 * Selects the registration success message.
 */
export const selectAuthSuccessMessage = createSelector(
  selectAuthState,
  (state) => state.successMessage
);
