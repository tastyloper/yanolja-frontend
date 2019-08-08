import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Stay, StayList } from '../types/stay.interface';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StayListService {
  appUrl = `${environment.appUrl}stay/`;

  constructor(private http: HttpClient) { }

  getAList(payload: StayList) {
    const params = new HttpParams()
      .set('selectRegion', payload.selectRegion)
      .set('category', payload.category)
      .set('personnel', payload.personnel)
      .set('requestCheckIn', payload.requestCheckIn)
      .set('requestCheckOut', payload.requestCheckOut)
      .set('popularKeyword', payload.popularKeyword ? payload.popularKeyword : '')
      .set('searchKeyword', payload.searchKeyword)
      .set('currentAddress', payload.currentAddress)
      .set('review', payload.review)
      .set('wish', payload.wish)
      .set('priceLow', payload.priceLow)
      .set('priceHigh', payload.priceHigh);

    return this.http.get<Stay[]>(this.appUrl, { params });
  }

  getAListPopular(payload: StayList) {
    const params = new HttpParams()
      .set('selectRegion', payload.selectRegion)
      .set('category', payload.category)
      .set('personnel', payload.personnel)
      .set('requestCheckIn', payload.requestCheckIn)
      .set('requestCheckOut', payload.requestCheckOut)
      .set('popularKeyword', payload.popularKeyword)
      .set('currentAddress', payload.currentAddress);

    return this.http.get<Stay[]>(this.appUrl, { params });
  }

  getAListReview(payload: StayList) {
    const params = new HttpParams()
      .set('selectRegion', payload.selectRegion)
      .set('category', payload.category)
      .set('personnel', payload.personnel)
      .set('requestCheckIn', payload.requestCheckIn)
      .set('requestCheckOut', payload.requestCheckOut)
      .set('popularKeyword', payload.popularKeyword ? payload.popularKeyword : '')
      .set('searchKeyword', payload.searchKeyword)
      .set('currentAddress', payload.currentAddress)
      .set('review', payload.review);

    return this.http.get<Stay[]>(this.appUrl, { params });
  }

  getAListPriceLow(payload: StayList) {
    const params = new HttpParams()
      .set('selectRegion', payload.selectRegion)
      .set('category', payload.category)
      .set('personnel', payload.personnel)
      .set('requestCheckIn', payload.requestCheckIn)
      .set('requestCheckOut', payload.requestCheckOut)
      .set('popularKeyword', payload.popularKeyword ? payload.popularKeyword : '')
      .set('searchKeyword', payload.searchKeyword)
      .set('currentAddress', payload.currentAddress)
      .set('priceLow', payload.priceLow);
    return this.http.get<Stay[]>(this.appUrl, { params });
  }

  getAListPriceHigh(payload: StayList) {
    const params = new HttpParams()
      .set('selectRegion', payload.selectRegion)
      .set('category', payload.category)
      .set('personnel', payload.personnel)
      .set('requestCheckIn', payload.requestCheckIn)
      .set('requestCheckOut', payload.requestCheckOut)
      .set('popularKeyword', payload.popularKeyword ? payload.popularKeyword : '')
      .set('searchKeyword', payload.searchKeyword)
      .set('currentAddress', payload.currentAddress)
      .set('priceHigh', payload.priceHigh);
    return this.http.get<Stay[]>(this.appUrl, { params });
  }
}
