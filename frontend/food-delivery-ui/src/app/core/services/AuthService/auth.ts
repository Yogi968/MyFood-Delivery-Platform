import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorage } from '../TokenStorageService/token-storage';
import { createAccountRequest, createAccountResponse, LoginRequest, LoginResponse } from '../../../models/auth.models';
import { BaseApiService } from '../http/base-apiservice';


@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly baseApiService = inject(BaseApiService);
  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private tokenStorage: TokenStorage) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.baseApiService.post<LoginResponse>(
      `${this.apiUrl}/login`,
      request
    );
  }

  getCurrentUser(): Observable<any> {
    return this.baseApiService.get<any>(
      `${this.apiUrl}/api/users/me`
    );
  }

  logout(): void {
    this.tokenStorage.removeToken();
  }


  /**
   * Sends the registration details to the backend API.
   * @param request registration details submitted by the user
   * @returns an Observable containing the registration response
   */
  createAccount(request: createAccountRequest): Observable<createAccountResponse> {
    return this.baseApiService.post<createAccountResponse>(
      `${this.apiUrl}/register`,
      request
    );
  }
}