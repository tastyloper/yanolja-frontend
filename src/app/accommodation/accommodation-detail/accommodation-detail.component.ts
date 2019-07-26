import { Component, AfterViewInit, ViewChild, OnInit, HostListener } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';

import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-accommodation-detail',
  templateUrl: './accommodation-detail.component.html',
  styleUrls: ['./accommodation-detail.component.scss']
})
export class AccommodationDetailComponent implements AfterViewInit, OnInit {
  @ViewChild('galleryTop', { static: true }) galleryTop;
  @ViewChild('galleryThumbs', { static: true }) galleryThumbs;
  @ViewChild(BsDaterangepickerDirective, { static: false }) daterangepicker: BsDaterangepickerDirective;

  locale = 'ko';
  locales = listLocales();
  dateCustomClasses: DatepickerDateCustomClasses[];
  checkPersonModalState = false;

  constructor(private http: HttpClient, private localeService: BsLocaleService) {  }

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  form = new FormGroup({
    dateYMD: new FormControl(new Date()),
    dateFull: new FormControl(new Date()),
    dateMDY: new FormControl(new Date()),
    dateRange: new FormControl([new Date(), new Date()])
  });
  minDate = new Date();
  // bsConfig: Partial<BsDatepickerConfig>;

  galleryTopConfig: SwiperConfigInterface = {
    spaceBetween: 10,
    effect: 'fade',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  };
  galleryThumbsConfig: SwiperConfigInterface = {
    spaceBetween: 10,
    slidesPerView: 9,
    centeredSlides: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
  };

  facilitiesStatus = false;
  info = '\r\n1. 객실요금은 2인 입실 기준이며, 파티룸 등 특수객실의 경우, 직접 입실 인원 확인이 필요합니다.\r\n2. 미성년자의 입실 가능여부는 직접 제휴점에 확인 후 예약 진행하시기 바랍니다. \r\n2. 미성년자의 입실 가능여부는 직접 제휴점에 확인 후 예약 진행하시기 바랍니다. \r\n';
  address = '강남구 봉은사로 134';

  ngAfterViewInit() {
    this.galleryTop.nativeElement.swiper.controller.control = this.galleryThumbs.nativeElement.swiper;
    this.galleryThumbs.nativeElement.swiper.controller.control = this.galleryTop.nativeElement.swiper;
  }

  ngOnInit() {
    const headers = new HttpHeaders()
    .set('Authorization', 'Token ad0ffa732e4bad6d27606fcb250a7923a6f13f0b');

    this.http.get('http://13.125.164.121/stay/api/stay/', { headers }).subscribe(v => console.log(v));
    this.localeService.use(this.locale);
    this.maxDate.setDate(this.maxDate.getDate() + 1);
    this.minDate.setDate(this.minDate.getDate());
    this.bsRangeValue = [this.bsValue, this.maxDate];

  }
  @HostListener('window:scroll')
  onScrollEvent() {
    this.daterangepicker.hide();
  }
  openMore() {
    this.facilitiesStatus = !this.facilitiesStatus;
  }
  modalToggle() {
    this.checkPersonModalState = !this.checkPersonModalState;
  }
  copyText() {
    // document.execCommand('copy', true, this.address);
    alert('주소가 클립보드에 저장되었어요!');
    const text = document.createElement('textarea');
    document.body.appendChild(text);
    text.value = this.address;
    text.select();
    document.execCommand('copy');
    document.body.removeChild(text);
  }
  // trigger(e) {
  //   this.datepicker = e;
  // }
}
