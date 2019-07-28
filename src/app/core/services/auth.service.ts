import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  appUrl = `${environment.appUrl}accounts/signup/`;

  constructor(private http: HttpClient) {}

  createAccount(payload: object) {
    return this.http.post(this.appUrl, payload);
  }
}
