
import { createAction, props } from '@ngrx/store';
import { AUTH_ACTION_TYPES } from '../constants/auth-ation.constants';

/**
 * Dispatched when the user submits the login form.
 */
export const login = createAction(
  AUTH_ACTION_TYPES.LOGIN,
  props<{ email: string; password: string }>()
);

/**
 * Dispatched when the login API returns a successful response.
 */
export const loginSuccess = createAction(
  AUTH_ACTION_TYPES.LOGIN_SUCCESS,
  props<{ token: string; role: string }>()
);

/**
 * Dispatched when the login API request fails.
 */
export const loginFailure = createAction(
  AUTH_ACTION_TYPES.LOGIN_FAILURE,
  props<{ error: string }>()
);

/**
 * Dispatched when the user submits the registration form.
 */
export const register = createAction(
  AUTH_ACTION_TYPES.CREATE_ACCOUNT,
  props<{ firstName: string; lastName: string; email: string;password: string; confirmPassword:string}>()
);

/**
 * Dispatched when the registration API returns a successful response.
 */
export const registerSuccess = createAction(
  AUTH_ACTION_TYPES.CREATE_ACCOUNT_SUCCESS,
  props<{ message: string }>()
);

/**
 * Dispatched when the registration API request fails.
 */
export const registerFailure = createAction(
  AUTH_ACTION_TYPES.CREATE_ACCOUNT_FAILURE,
  props<{ error: string }>()
);
