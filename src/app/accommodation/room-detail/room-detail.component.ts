import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// modal
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// swiper
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

// DateRangePicker
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';

// Locales
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
// component
import { CancellationPolicyComponent } from '../../shared/cancellation-policy/cancellation-policy.component';

// interface
import { RoomDetail } from 'src/app/core/types/room-detail.interface';

// service
import { RoomDetailService } from 'src/app/core/services/room-detail.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit, AfterViewInit {

  @ViewChild('galleryTop', { static: true }) galleryTop;
  @ViewChild('galleryThumbs', { static: true }) galleryThumbs;

  @ViewChild(BsDaterangepickerDirective, { static: false }) daterangepicker: BsDaterangepickerDirective;

  bsModalRef: BsModalRef;

  galleryTopConfig: SwiperConfigInterface;
  galleryThumbsConfig: SwiperConfigInterface;

  // datepicker
  dateCustomClasses: DatepickerDateCustomClasses[];
  checkIn: Date;
  checkOut: Date;
  bsRangeValue: Date[];
  maxDate: Date;
  minDate: Date;
  form: FormGroup;
    // for using locale-chronos
    locale: string;
    locales: string[];

  // template Data
  data: RoomDetail;
  roomId: number;

  // server Communication
  url: string;

  constructor(
    private modalService: BsModalService,
    private localeService: BsLocaleService,
    private dataService: RoomDetailService,
    private route: ActivatedRoute,
    ) { }
  //   data = {
  //     stay: '역삼마레',
  //     name: '일반실',
  //     hoursUntil: 21,
  //     hoursAvailable: 4,
  //     hoursPrice: '25000',
  //     saleHoursPrice: '',
  //     daysCheckIn: 22,
  //     daysCheckOut: 11,
  //     daysPrice: '50000',
  //     saleDaysPrice: '30000',
  //     basicInfo: [
  //         '기본정보',
  //         '기본정보'
  //     ],
  //     reservationNotice: [
  //         '예약공지',
  //         '예약공지'
  //     ],
  //     cancelRegulation: [
  //         '취소공지',
  //         '취소공지'
  //     ],
  //     urlImage: [
  //         'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
  //         'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
  //     ],
  //     stayId: 1,
  //     roomId: 1
  // };


  ngAfterViewInit() {
    this.galleryTop.nativeElement.swiper.controller.control = this.galleryThumbs.nativeElement.swiper;
    this.galleryThumbs.nativeElement.swiper.controller.control = this.galleryTop.nativeElement.swiper;
  }

  ngOnInit() {
    this.checkIn = new Date();
    this.checkOut = new Date();
    this.maxDate = new Date();
    this.minDate = new Date();
    this.form = new FormGroup({
      dateYMD: new FormControl(new Date())
    });
    this.locale = 'ko';
    this.locales = listLocales();

    this.localeService.use(this.locale);

    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 90);

    this.checkOut.setDate(this.checkIn.getDate() + 1);

    this.bsRangeValue = [this.checkIn, this.checkOut];
    this.form.get('dateYMD').setValue(this.bsRangeValue);
    this.galleryTopConfig = {
      spaceBetween: 10,
      effect: 'fade',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      observer: true
    };
    this.galleryThumbsConfig  = {
      spaceBetween: 10,
      slidesPerView: 9,
      centeredSlides: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
      observer: true,
    };
    this.route.paramMap
      .subscribe(param => this.roomId = +param.get('id'));

    this.route.queryParamMap
    .subscribe(queryParam => {
      const bsRangeValue =
      [
        new Date(Date.parse(queryParam.get('checkIn'))),
        new Date(Date.parse(queryParam.get('checkOut')))
      ];
      this.form.get('dateYMD').setValue(bsRangeValue);
    });

    this.dataService.getRoomDetail(
      this.roomId,
      `${this.formatDate(this.bsRangeValue[0])}+17:00:00`,
      `${this.formatDate(this.bsRangeValue[1])}+00:00:00`)
      .subscribe(
      data => {
        this.data = data;
      }
    );
  }

  requestRoom() {
    this.dataService.getRoomDetail(
    this.roomId,
    `${this.formatDate(this.bsRangeValue[0])}+17:00:00`,
    `${this.formatDate(this.bsRangeValue[1])}+00:00:00`)
    .subscribe(
      data => {
        this.data = data;
      }
    );
  }


  openPolicy() {
    this.bsModalRef = this.modalService.show(CancellationPolicyComponent, { class: 'modal-lg' });
  }
  onValueChange(value: Date[]) {
    this.bsRangeValue = value;
    this.requestRoom();
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [year, month, day].join('-');
  }
  formatReservedList(): string[] {
    let reservedList = [];
    this.data.reservedList.map(reserved => {
      reservedList = [...reservedList, new Date(reserved)];
    });
    return reservedList;
  }
}
