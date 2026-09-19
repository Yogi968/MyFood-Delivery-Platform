import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class TokenStorage {

  private readonly tokenKey = 'access_token';

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    const decodedToken = jwtDecode<JwtPayload>(token);

    return decodedToken.role;
  }
}