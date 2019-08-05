import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { AuthService } from './auth.service';

import { Reservation, ReservationDetail } from '../types/reservation.interface';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private appUrl = environment.appUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getListReservation() {
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${this.authService.getToken().token}`);
    return this.http.get<Reservation[]>(`${this.appUrl}mypage/reservation/`, { headers });
  }
  getDetailReservation(reservationId: string) {
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${this.authService.getToken().token}`);
    return this.http.get<ReservationDetail>(`${this.appUrl}mypage/reservation/detail/${reservationId}`, { headers });
  }
}
