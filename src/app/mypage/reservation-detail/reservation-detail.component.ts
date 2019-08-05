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
  bookData = {};
  Date: string;

  constructor(
    private subTitleService: SubTitleService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.subTitleService.pagaTitle = '예약상세';
    this.subTitleService.pagaDescription = '내역을 확인해보세요!';

    this.getData();
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

  splitDate(date: string) {
    return `${date.split('T')[0]} ${date.split('T')[1].split(':')[0]}:${date.split('T')[1].split(':')[1]}`
  }

  getData() {
    this.bookData = {
      checkIn: '2019-08-01T15:00:00',
      checkOut: '2019-08-02T12:00:00',
      booker: '조현근대리인',
      phoneNumber: '01086075857',
      created: '2019-07-30T20:37:30.837850',
      finalPrice: '55,000',
      stay: '역삼마레',
      room: '준특실 - 숙박'
    }
  }
}
