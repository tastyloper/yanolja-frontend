import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private appUrl = environment.appUrl;
  private TOKEN_NAME = environment.tokenName;

  constructor(private http: HttpClient) {}

  createAccount(payload: object) {
    return this.http.post(`${this.appUrl}accounts/signup/`, payload);
  }

  login(payload: object) {
    return this.http.post(`${this.appUrl}email/get_token/`, payload);
  }

  getUser() {
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${this.getToken()}`);

    return this.http.get(`${this.appUrl}mypage/`, { headers });
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
