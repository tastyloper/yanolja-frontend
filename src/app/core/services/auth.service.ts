import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  appUrl = `${environment.appUrl}`;
  TOKEN_NAME = 'yanolja_token';

  constructor(private http: HttpClient) {}

  createAccount(payload: object) {
    return this.http.post(`${this.appUrl}accounts/signup/`, payload);
  }

  login(payload: object) {
    return this.http.post(`${this.appUrl}email/get_token/`, payload);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }
}
