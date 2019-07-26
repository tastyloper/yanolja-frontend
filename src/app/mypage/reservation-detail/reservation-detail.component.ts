import { Component, OnInit } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { SubTitleService } from '../../core/services/sub-title.service';

import { CancellationPolicyComponent } from 'src/app/shared/cancellation-policy/cancellation-policy.component';
import { Template } from '@angular/compiler/src/render3/r3_ast';


@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {
  modalRef: BsModalRef;
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
    this.modalRef = this.modalService.show(CancellationPolicyComponent, { class: 'modal-lg' });
  }
  
  cancelConfirm(template: Template) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
  }
}
