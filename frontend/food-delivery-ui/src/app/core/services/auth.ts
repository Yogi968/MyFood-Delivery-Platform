import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  LoginRequest,
  LoginResponse
} from '../../models/auth.models';
import { TokenStorage } from './token-storage';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient,private tokenStorage: TokenStorage) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      request
    );
  }

  getCurrentUser(): Observable<any> {
  return this.http.get<any>(
    `${this.apiUrl}/api/users/me`
  );
}

  logout(): void {
  this.tokenStorage.removeToken();
}
}