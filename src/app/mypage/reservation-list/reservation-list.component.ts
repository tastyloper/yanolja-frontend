import { Component, OnInit } from '@angular/core';

import { SubTitleService } from '../../core/services/sub-title.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {

  constructor(private subTitleService: SubTitleService) { }

  ngOnInit() {
    this.subTitleService.pagaTitle = '예약내역';
    this.subTitleService.pagaDescription = '내가 예약/사용한 목록';
  }

}
