import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubTitleService {
  pagaTitle: string;
  pagaDescription: string;
  grade: number;
  recommendation: string;
  review: string;
  isDetail: boolean;
}
