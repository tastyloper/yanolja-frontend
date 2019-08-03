import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';

import { Stay } from '../types/stay.interface';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistsService {
  private appUrl = environment.appUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getWishlist() {
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${this.authService.getToken().token}`);
    return this.http.get<Stay[]>(`${this.appUrl}mypage/like/`, { headers });
  }
}
