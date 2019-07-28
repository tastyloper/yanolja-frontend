import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})

export class StayListService {
  appUrl = 'http://www.yanoljamvp.com/api/stay';
  constructor(private http:HttpClient) { }

  getAList() {
    // const params = new HttpParams()
    // .set('selectRegion','강남/역삼/선릉/삼성')
    // .set('category','모텔')

    return this.http.get(this.appUrl);
  }

}
