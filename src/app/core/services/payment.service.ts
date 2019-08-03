import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { AuthService } from './auth.service';

import { ReservationInfo, GetReservation, ReservationCreate, ReservationComplete } from '../types/reservation.interface';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private appUrl = environment.appUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getReservationInfo(roomId: string, payload: GetReservation) {
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${this.authService.getToken().token}`);
    let params: HttpParams;
    if (payload.requestHours) {
      params = new HttpParams()
      .set('requestCheckIn', payload.requestCheckIn)
      .set('requestCheckOut', payload.requestCheckOut)
      .set('requestHours', payload.requestHours);
    } else {
      params = new HttpParams()
      .set('requestCheckIn', payload.requestCheckIn)
      .set('requestCheckOut', payload.requestCheckOut)
      .set('requestDays', payload.requestDays);
    }
    return this.http.get<ReservationInfo>(`${this.appUrl}stay/room/${roomId}/reservation/`, { headers, params });
  }

  createReservation(roomId: string, payload: ReservationCreate) {
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${this.authService.getToken().token}`);
    return this.http.post<ReservationComplete>(`${this.appUrl}stay/room/${roomId}/reservation/create/`, payload, { headers });
  }
}
