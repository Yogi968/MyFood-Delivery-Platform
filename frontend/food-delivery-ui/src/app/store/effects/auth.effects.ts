
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { Auth } from '../../core/services/AuthService/auth';
import { TokenStorage } from '../../core/services/TokenStorageService/token-storage';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Handles asynchronous authentication operations triggered by NgRx actions.
 */
@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(Auth);
    private tokenStorage = inject(TokenStorage);

    /**
     * Calls the login API and dispatches a success or failure action.
     */
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),

            exhaustMap(({ email, password }) =>
                this.authService.login({ email, password }).pipe(
                    tap((response) => {
                        if (response.token) {
                            this.tokenStorage.setToken(response.token);
                        }
                    }),

                    map((response) => {
                        if (!response.token) {
                            throw new Error('The login response did not contain a token.');
                        }

                        const role = this.tokenStorage.getRole();

                        return AuthActions.loginSuccess({
                            token: response.token,
                            role: role ?? '',
                        });
                    }),

                    catchError((error: unknown) => {
                        const message =
                            error instanceof Error
                                ? error.message
                                : 'Login failed. Please check your credentials and try again.';

                        return of(AuthActions.loginFailure({ error: message }));
                    }),
                ),
            ),
        ),
    );


    /**
     * Calls the registration API and dispatches a success or failure action.
     */
    createAccount$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.register),

            exhaustMap(({ firstName, lastName, email, password, confirmPassword }) =>
                this.authService
                    .createAccount({ firstName, lastName, email, password, confirmPassword })
                    .pipe(
                        map((response) =>
                            AuthActions.registerSuccess({
                                message: response.message,
                            })
                        ),

                        catchError((error: unknown) => {
                            let message = 'Registration failed. Please try again.';
                            console.log("error :" , error)
                            if (error instanceof HttpErrorResponse) {
                                message =
                                    error.error?.message ??
                                    'Registration failed. Please try again.';
                            }

                            return of(
                                AuthActions.registerFailure({ error: message })
                            );
                        })
                    )
            )
        )
    );
}
