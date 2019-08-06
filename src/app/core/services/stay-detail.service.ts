import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { StayDetail } from '../types/stay-detail.interface';
import { Room } from '../types/room.interface';
import { Review } from '../types/review.interface';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StayDetailService {

  private url = environment.appUrl;


  constructor(private http: HttpClient) { }

  getStayDetail(stayId: number) {
    return this.http.get<StayDetail>(this.url + `stay/detail/${stayId}/`);
  }
  getRoomList(stayId: number, requestCheckIn: string, requestCheckOut: string) {
    const params = new HttpParams()
    .set('requestCheckIn', requestCheckIn)
    .set('requestCheckOut', requestCheckOut);
    return this.http.get<Room[]>(this.url + `stay/${stayId}/room/`, { params });
  }
  getReviewList(stayId: number) {
    return this.http.get<Review[]>(this.url + `stay/${stayId}/comments/`);
  }
}
