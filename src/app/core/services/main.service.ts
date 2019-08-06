import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Stay } from '../types/stay.interface';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private appUrl = environment.appUrl;

  constructor(private http: HttpClient) {}

  getBigSales() {
    const params = new HttpParams().set('bigSale', 'True');
    return this.http.get<Stay[]>(`${this.appUrl}`, { params });
  }

  getPartyRooms() {
    const params = new HttpParams().set('partyRoom', 'True');
    return this.http.get<Stay[]>(`${this.appUrl}`, { params });
  }

  getSwimmingPools() {
    const params = new HttpParams().set('swimmingPool', 'True');
    return this.http.get<Stay[]>(`${this.appUrl}`, { params });
  }

  getSpas() {
    const params = new HttpParams().set('spa', 'True');
    return this.http.get<Stay[]>(`${this.appUrl}`, { params });
  }
}
