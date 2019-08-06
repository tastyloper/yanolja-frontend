import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Stay } from '../types/stay.interface';



@Injectable({
  providedIn: 'root'
})

export class StayListService {
  appUrl = `${environment.appUrl}stay/`;

  constructor(private http:HttpClient) { }
  getAList(payload: object){
    // const params = new HttpParams()
    // .set('selectRegion','강남/역삼/선릉/삼성')
    // .set('category','모텔')

    return this.http.get(this.appUrl, payload);
  }

}
