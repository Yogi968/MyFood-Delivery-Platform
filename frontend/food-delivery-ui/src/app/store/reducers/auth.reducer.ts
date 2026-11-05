
import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginSuccess,
  loginFailure,
  register,
  registerSuccess,
  registerFailure,
} from '../actions/auth.actions';
import { initialAuthState } from '../states/auth.state';

/**
 * Handles authentication actions and returns the corresponding updated state.
 */
export const authReducer = createReducer(
  initialAuthState,

  // Login request started.
  on(login, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMessage: null,
  })),

  // Login completed successfully.
  on(loginSuccess, (state, { token, role }) => ({
    ...state,
    loading: false,
    isAuthenticated: true,
    token,
    role,
    error: null,
    successMessage: null,
  })),

  // Login failed.
  on(loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    isAuthenticated: false,
    error,
  })),

  // Registration request started.
  on(register, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMessage: null,
  })),

  // Registration completed successfully.
  on(registerSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    error: null,
    successMessage: message,
  })),

  // Registration failed.
  on(registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    successMessage: null,
  })),
);
