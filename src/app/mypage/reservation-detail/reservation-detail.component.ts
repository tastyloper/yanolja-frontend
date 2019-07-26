import { Component, OnInit } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { SubTitleService } from '../../core/services/sub-title.service';

import { CancellationPolicyComponent } from 'src/app/shared/cancellation-policy/cancellation-policy.component';


@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {
  bsModalRef: BsModalRef;
  isCheck: false;
 
  constructor(
    private subTitleService: SubTitleService,
    private modalService: BsModalService
  ) {}
  
  ngOnInit() {
    this.subTitleService.pagaTitle = '예약상세';
    this.subTitleService.pagaDescription = '내역을 확인해보세요!';
  }

  cancellationPolicyOpen() {
    this.bsModalRef = this.modalService.show(CancellationPolicyComponent, { class: 'modal-lg' });
  }
}
  