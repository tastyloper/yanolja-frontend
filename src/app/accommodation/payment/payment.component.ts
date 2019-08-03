import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { SubTitleService } from '../../core/services/sub-title.service';
import { PaymentService } from '../../core/services/payment.service';

import { ReservationInfo, GetReservation, ReservationCreate, Hour } from '../../core/types/reservation.interface';

import { CancellationPolicyComponent } from '../../shared/cancellation-policy/cancellation-policy.component';
import { TermsOfServiceComponent } from '../../shared/terms-of-service/terms-of-service.component';
import { PersonalInfoThirdPartyComponent } from '../../shared/personal-info-third-party/personal-info-third-party.component';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  reservationForm: FormGroup;
  bsModalRef: BsModalRef;
  reservationInfo: ReservationInfo;
  stay = '';
  hoursUntil: number;
  hoursAvailable: number;
  daysCheckIn: number;
  daysCheckOut: number;
  checkIn: string;
  checkOut: string;
  CHECK_OUT_STORED_VALUE: string;
  type: number;
  hoursCheckIn: number;
  hoursCheckOut: number;
  hours: Hour[] = [];
  radioModel = '';
  roomId: string;

  constructor(
    private subTitleService: SubTitleService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private paymentService: PaymentService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.subTitleService.pagaTitle = '예약/결제';
    this.subTitleService.pagaDescription = '간편하게 예약하고 졀제하세요!';

    this.roomId = (this.router.url).split('/')[3];

    this.activatedRoute.queryParams.subscribe(params => {
      this.stay = params.stay;
      this.hoursUntil = params.hoursUntil;
      this.hoursAvailable = +params.hoursAvailable;
      this.daysCheckIn = params.daysCheckIn;
      this.daysCheckOut = params.daysCheckOut;
      this.checkIn = params.checkIn;
      this.checkOut = params.checkOut;
      this.CHECK_OUT_STORED_VALUE = params.checkOut;
      this.type = params.type;

      if (!+params.type) {
        this.dateCalc();
      } else {
        this.hoursCheckIn = this.daysCheckIn;
        this.hoursCheckOut = this.daysCheckOut;
      }
    });

    this.reservationForm = this.fb.group({
      bookerName: ['', Validators.required],
      bookerPhoneNum: ['', [
        Validators.required,
        Validators.pattern('(^01[0-9]{1})([0-9]{3,4})([0-9]{4})')
      ]],
      howToVisit: [this.radioModel, Validators.required],
      billing: ['신용카드 결제', Validators.required],
      checkGroup: this.fb.group({
        allAgree: [false],
        termsOfUse: [false, Validators.pattern('true')],
        cancelPolicy: [false, Validators.pattern('true')],
        thirdParty: [false, Validators.pattern('true')]
      })
    });
    this.allAgree.valueChanges.subscribe(v => {
      this.termsOfUse.setValue(v);
      this.cancelPolicy.setValue(v);
      this.thirdParty.setValue(v);
    });

    this.getReservationInfo();
  }

  dateCalc() {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1 + '';
    const todayFullMonth = todayMonth.length === 1 ? '0' + todayMonth : todayMonth;
    const todayDate = today.getDate() + '';
    const todayFullDate = todayDate.length === 1 ? '0' + todayDate : todayDate;
    const todayFull = `${todayYear}-${todayFullMonth}-${todayFullDate}`;
    const todayHours = today.getHours();

    this.checkOut = this.checkIn;

    if (todayFull === this.checkIn && todayHours < (this.hoursUntil - 2)) {
      this.hoursCheckIn = todayHours < 10 ? 10 : todayHours + 1;
      const checkout = this.hoursCheckIn + this.hoursAvailable;
      this.hoursCheckOut = checkout < this.hoursUntil ? checkout : this.hoursUntil;
    } else if (new Date(todayFull) < new Date(this.checkIn)) {
      this.hoursCheckIn = 10;
      this.hoursCheckOut = this.hoursCheckIn + this.hoursAvailable;
    }

    for (let i = this.hoursCheckIn; i <= this.hoursUntil; i++) {
      this.hours = [
        ...this.hours,
        {
          value: i,
          active: (this.hoursCheckIn <= i && this.hoursCheckOut > i) ? true : false,
          disabled: (this.hoursUntil - 1 <= i) ? true : false
        }
      ];
    }

    this.hoursNextDay();
  }

  hoursSelect(item: Hour) {
    if (item.disabled) { return; }
    this.hours = this.hours.map(hour => {
      let active = false;
      if (hour.value >= item.value && hour.value < item.value + this.hoursAvailable && hour.value !== +this.hoursUntil) {
        active = true;
      } else {
        active = false;
      }

      return { ...hour, active };
    });

    this.hoursCheckIn = item.value;
    const checkout = item.value + this.hoursAvailable;
    this.hoursCheckOut = checkout <= this.hoursUntil ? checkout : +this.hoursUntil;

    this.hoursNextDay();
  }

  hoursNextDay() {
    if (this.hoursCheckOut === 24) {
      this.checkOut = this.CHECK_OUT_STORED_VALUE;
      this.hoursCheckOut = 0;
    } else {
      this.checkOut = this.checkIn;
    }
  }

  getReservationInfo() {
    const checkOutHour = (this.hoursCheckOut + '').length === 1 ? '0' + this.hoursCheckOut : this.hoursCheckOut;
    const requestCheckIn = `${this.checkIn}+${this.hoursCheckIn}:00:00`;
    const requestCheckOut = `${this.checkOut}+${checkOutHour}:00:00`;
    let payload: GetReservation;
    if (+this.type) {
      payload = { requestCheckIn, requestCheckOut, requestDays: 'True'};
    } else {
      payload = { requestCheckIn, requestCheckOut, requestHours: 'True'};
    }

    this.isLoading$.next(true);
    this.paymentService.getReservationInfo(this.roomId, payload).subscribe(
      data => {
        // this.reservationInfo = {
        //   id: 5,
        //   urlImage: [
        //     'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
        //     'https://yaimg.yanolja.com/resize/place/v4/2017/08/23/14/1280/599d0c8f87c5e4.00486075.jpg'
        //   ],
        //   room: '일반실B',
        //   booker: '홍길동',
        //   phoneNumber: '01012345678',
        //   finalPrice: '50000'
        // };
        // if (data.error) {
        //   this.toastr.error(data.error);
        //   this.location.back();
        //   this.isLoading$.next(false);
        // } else {
          // console.log(data);
          this.reservationInfo = data;
          this.bookerName.setValue(this.reservationInfo.booker);
          this.bookerPhoneNum.setValue(this.reservationInfo.phoneNumber);
        // }
      },
      error => {
        if (error.error.detail && error.error.detail === '찾을 수 없습니다.') {
          this.toastr.error('해당 숙소를 예약할 수 없습니다. 다시 예약해주세요.');
          this.location.back();
        }
        console.log(error);
      },
      () => {
        this.isLoading$.next(false);
      }
    );
  }

  onSubmit() {
    const checkOutHour = (this.hoursCheckOut + '').length === 1 ? '0' + this.hoursCheckOut : this.hoursCheckOut;
    const booker = this.bookerName.value;
    const phoneNumber = this.bookerPhoneNum.value;
    const wayToGo = this.howToVisit.value;
    const requestCheckIn = `${this.checkIn}+${this.hoursCheckIn}:00:00`;
    const requestCheckOut = `${this.checkOut}+${checkOutHour}:00:00`;
    const finalPrice = this.reservationInfo.finalPrice;
    let payload: ReservationCreate;
    if (+this.type) {
      payload = {
        booker,
        phoneNumber,
        wayToGo,
        requestCheckIn,
        requestCheckOut,
        finalPrice,
        requestDays: 'True'
      };
    } else {
      payload = {
        booker,
        phoneNumber,
        wayToGo,
        requestCheckIn,
        requestCheckOut,
        finalPrice,
        requestHours: 'True'
      };
    }
    this.paymentService.createReservation(this.roomId, payload).subscribe(
      data => {
        if (data.reserved) {
          this.reservationForm.reset();
          this.toastr.success('예약/결제가 완료되었습니다!');
          this.router.navigate(['mypage/reservation']);
        }
      },
      err => {
        console.log(err);
        this.toastr.error('해당 숙소를 예약할 수 없습니다. 다시 예약해주세요.');
        this.location.back();
      }
    );
  }

  termsOfServiceOpen() {
    this.bsModalRef = this.modalService.show(TermsOfServiceComponent, { class: 'modal-lg' });
  }

  cancellationPolicyOpen() {
    this.bsModalRef = this.modalService.show(CancellationPolicyComponent, { class: 'modal-lg' });
  }

  personalInfoThirdPartyOpen() {
    const initialState = {
      stayName: this.stay
    };
    this.bsModalRef = this.modalService.show(PersonalInfoThirdPartyComponent, { class: 'modal-lg', initialState });
  }

  get bookerName() {
    return this.reservationForm.get('bookerName');
  }

  get bookerPhoneNum() {
    return this.reservationForm.get('bookerPhoneNum');
  }

  get howToVisit() {
    return this.reservationForm.get('howToVisit');
  }

  get billing() {
    return this.reservationForm.get('billing');
  }

  get checkGroup() {
    return this.reservationForm.get('checkGroup');
  }

  get allAgree() {
    return this.checkGroup.get('allAgree');
  }

  get termsOfUse() {
    return this.checkGroup.get('termsOfUse');
  }

  get cancelPolicy() {
    return this.checkGroup.get('cancelPolicy');
  }

  get thirdParty() {
    return this.checkGroup.get('thirdParty');
  }
}
