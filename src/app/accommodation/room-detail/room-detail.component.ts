import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CancellationPolicyComponent } from '../../shared/cancellation-policy/cancellation-policy.component';
import { FooterComponent } from '../../shared/footer/footer.component';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

// DateRangePicker
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';

// Locales
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { FormGroup, FormControl } from '@angular/forms';

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
  bsValue: Date;
  bsRangeValue: Date[];
  maxDate: Date;
  minDate: Date;
  form: FormGroup;
    // for using locale-chronos
    locale: string;
    locales: string[];


  constructor(
    private modalService: BsModalService,
    private localeService: BsLocaleService
    ) { }
    data = {
      stay: '역삼마레',
      name: '일반실',
      hoursUntil: 21,
      hoursAvailable: 4,
      hoursPrice: '25000',
      saleHoursPrice: '',
      daysCheckIn: 22,
      daysCheckOut: 11,
      daysPrice: '50000',
      saleDaysPrice: '30000',
      basicInfo: [
          '기본정보',
          '기본정보'
      ],
      reservationNotice: [
          '예약공지',
          '예약공지'
      ],
      cancelRegulation: [
          '취소공지',
          '취소공지'
      ],
      urlImage: [
          'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
          'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
      ],
      stayId: 1,
      roomId: 1
  };


  ngAfterViewInit() {
    this.galleryTop.nativeElement.swiper.controller.control = this.galleryThumbs.nativeElement.swiper;
    this.galleryThumbs.nativeElement.swiper.controller.control = this.galleryTop.nativeElement.swiper;
  }

  ngOnInit() {
    this.bsValue = new Date();
    this.maxDate = new Date();
    this.minDate = new Date();
    this.form = new FormGroup({
      dateYMD: new FormControl(new Date()),
      dateFull: new FormControl(new Date()),
      dateMDY: new FormControl(new Date()),
      dateRange: new FormControl([new Date(), new Date()])
    });
    this.locale = 'ko';
    this.locales = listLocales();

    this.galleryTopConfig = {
      spaceBetween: 10,
      effect: 'fade',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    };
    this.galleryThumbsConfig  = {
      spaceBetween: 10,
      slidesPerView: 9,
      centeredSlides: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
    };
    this.localeService.use(this.locale);
    this.maxDate.setDate(this.maxDate.getDate() + 1);
    this.minDate.setDate(this.minDate.getDate());
    this.bsRangeValue = [this.bsValue, this.maxDate];

  }

  openPolicy() {
    this.bsModalRef = this.modalService.show(CancellationPolicyComponent, { class: 'modal-lg' });
  }
}
