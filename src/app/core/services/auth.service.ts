import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User, Login } from '../types/user.interface';

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
    return this.http.post<Login>(`${this.appUrl}email/get_token/`, payload);
  }

  getUser() {
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${this.getToken().token}`);
    return this.http.get<User>(`${this.appUrl}mypage/`, { headers });
  }

  upadteUser(payload: object) {
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${this.getToken().token}`);
    return this.http.patch(`${this.appUrl}mypage/update/`, payload, { headers });
  }

  getToken(): Login {
    return JSON.parse(localStorage.getItem(this.TOKEN_NAME));
  }

  setToken(loginInfo: object): void {
    localStorage.setItem(this.TOKEN_NAME, JSON.stringify(loginInfo));
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }
}
