import { Component, OnInit } from '@angular/core';

import { SubTitleService } from '../../core/services/sub-title.service';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {

  constructor(
    private subTitleService: SubTitleService
  ) {}
  
  ngOnInit() {
    this.subTitleService.pagaTitle = '예약상세';
    this.subTitleService.pagaDescription = '내역을 확인해보세요!';
    }

}
