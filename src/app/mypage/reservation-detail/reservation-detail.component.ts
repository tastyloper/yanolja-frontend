import { Component, OnInit } from '@angular/core';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { SubTitleService } from '../../core/services/sub-title.service';
import { ReservationService } from '../../core/services/reservation.service';

import { ReservationDetail } from '../../core/types/reservation.interface';

import { CancellationPolicyComponent } from '../../shared/cancellation-policy/cancellation-policy.component';


@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  modalRef: BsModalRef;
  isCheck: false;
  bookData: ReservationDetail;
  reservationId: string;
  stayId: string;

  constructor(
    private subTitleService: SubTitleService,
    private modalService: BsModalService,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.subTitleService.pagaTitle = '예약상세';
    this.subTitleService.pagaDescription = '내역을 확인해보세요!';
    // original code getting reservationId
    this.reservationId = (this.router.url).split('/')[3].split('?')[0];

    // another code getting reservationId
    // this.activatedRoute.paramMap.subscribe(
    //   param => {
    //     this.reservationId =  param.get('id');
    //   }
    // );
    this.activatedRoute.queryParamMap.subscribe(
      data => {
        this.stayId = data.get('stayId');
      }
    );

    this.getData();
  }

  getData() {
    this.isLoading$.next(true);
    this.reservationService.getDetailReservation(this.reservationId).subscribe(
      data => {
        this.bookData = data;
      },
      error => {
        console.log(error);
        this.toastr.error('해당 데이터를 불러올 수 없습니다. 다시 요청해주세요.');
        this.router.navigate(['mypage/reservation/']);
      },
      () => {
        this.isLoading$.next(false);
      }
    );

    // this.bookData = {
    //   checkIn: '2019-08-01T15:00:00',
    //   checkOut: '2019-08-02T12:00:00',
    //   booker: '조현근대리인',
    //   phoneNumber: '01086075857',
    //   created: '2019-07-30T20:37:30.837850',
    //   finalPrice: '55,000',
    //   stay: '역삼마레',
    //   room: '준특실 - 숙박'
    // };
  }

  splitDate(date: string) {
    return `${date.split('T')[0]} ${date.split('T')[1].split(':')[0]}:${date.split('T')[1].split(':')[1]}`;
  }

  cancellationPolicyOpen() {
    this.modalRef = this.modalService.show(CancellationPolicyComponent, { class: 'modal-lg' });
  }

  cancelConfirm(template: Template) {
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    this.reservationService.canclelReservation(this.reservationId).subscribe(
      data => {
        if (data.reservationRemoved) {
          this.toastr.success('예약을 취소하였습니다.');
          this.modalRef.hide();
          this.router.navigate(['mypage/reservation/']);
        }
      },
      error => {
        console.log(error);
        this.toastr.error('삭제하는데 오류가 발생했습니다. 다시 요청해주세요.');
        this.router.navigate(['mypage/reservation/']);
      }
    );
  }
}
