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
      .set('poplularKeyword', payload.poplularKeyword ? payload.poplularKeyword : '')
      .set('review', payload.review)
      .set('wish', payload.wish)
      .set('priceLow', payload.priceLow)
      .set('priceHigh', payload.priceHigh);
    console.log(params, '::', payload);
    
    return this.http.get<Stay[]>(this.appUrl, { params });
  }

}
