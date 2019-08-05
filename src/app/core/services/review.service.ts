import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';

import { Review } from '../types/review.interface';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private appUrl = environment.appUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getReviews(stayId: string) {
    return this.http.get<Review[]>(`${this.appUrl}/stay/${stayId}/comments/`);
  }
}
