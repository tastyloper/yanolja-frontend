import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { RoomDetail } from '../types/room-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomDetailService {
  private url = environment.appUrl;

  constructor(private http: HttpClient) { }

  getRoomDetail(roomId: number, requestCheckIn: string, requestCheckOut: string) {
    const params = new HttpParams()
    .set('requestCheckIn', requestCheckIn)
    .set('requestCheckOut', requestCheckOut);
    return this.http.get<RoomDetail>(this.url + `/stay/room/detail/${roomId}/`, { params });
  }
}
