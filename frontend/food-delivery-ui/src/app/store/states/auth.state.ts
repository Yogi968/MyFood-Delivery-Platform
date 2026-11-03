
/**
 * Defines the data maintained by the authentication feature in NgRx.
 */
export interface AuthState {
  /** Indicates whether a login or registration request is in progress. */
  loading: boolean;

  /** Indicates whether the user is authenticated. */
  isAuthenticated: boolean;

  /** Stores the authentication token after a successful login. */
  token: string | null;

  /** Stores the authenticated user's role. */
  role: string | null;

  /** Stores an authentication error message, if any. */
  error: string | null;

  /** Stores a registration success message, if any. */
  successMessage: string | null;
}

/**
 * Provides the initial authentication state before any auth action occurs.
 */
export const initialAuthState: AuthState = {
  loading: false,
  isAuthenticated: false,
  token: null,
  role: null,
  error: null,
  successMessage: null,
};
