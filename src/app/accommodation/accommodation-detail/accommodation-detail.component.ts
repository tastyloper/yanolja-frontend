import { Component, AfterViewInit, ViewChild, OnInit, HostListener, Host, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MapsAPILoader } from '@agm/core';

declare const google: any;

@Component({
  selector: 'app-accommodation-detail',
  templateUrl: './accommodation-detail.component.html',
  styleUrls: ['./accommodation-detail.component.scss']
})
export class AccommodationDetailComponent implements AfterViewInit, OnInit {
  @ViewChild('galleryTop', { static: true }) galleryTop;
  @ViewChild('galleryThumbs', { static: true }) galleryThumbs;
  @ViewChild(BsDaterangepickerDirective, { static: false }) daterangepicker: BsDaterangepickerDirective;


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

  // modal
  modalRef: BsModalRef;

  // carousel
  galleryTopConfig: SwiperConfigInterface;
  galleryThumbsConfig: SwiperConfigInterface;

  // component status
  checkPersonModalStatus: boolean;
  facilitiesStatus: boolean;
  adultCount: number;
  childrenCount: number;

  // data for server communication
  url: string;
  token: string;


  // dummy data
  info = '\r\n1. 객실요금은 2인 입실 기준이며, 파티룸 등 특수객실의 경우, 직접 입실 인원 확인이 필요합니다.\r\n2. 미성년자의 입실 가능여부는 직접 제휴점에 확인 후 예약 진행하시기 바랍니다. \r\n2. 미성년자의 입실 가능여부는 직접 제휴점에 확인 후 예약 진행하시기 바랍니다. \r\n';
  address = '강남구 봉은사로 134';
  lat: number;
  lng: number;
  zoom = 15;

  constructor(
    private http: HttpClient,
    private localeService: BsLocaleService,
    private modalService: BsModalService,
    private mapsAPILoader: MapsAPILoader
  ) {}


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
    this.galleryThumbsConfig = {
      spaceBetween: 10,
      slidesPerView: 9,
      centeredSlides: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
    };

    this.checkPersonModalStatus = false;
    this.facilitiesStatus = false;
    this.url = environment.appUrl;
    this.token = environment.tokenName;
    this.adultCount = 0;
    this.childrenCount = 0;


    const headers = new HttpHeaders()
    .set('Authorization', this.token);

    this.http.get(this.url + 'room/', { headers }).subscribe(v => console.log(v));
    this.localeService.use(this.locale);
    this.maxDate.setDate(this.maxDate.getDate() + 1);
    this.minDate.setDate(this.minDate.getDate());
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.mapsAPILoader.load().then(() => {
      this.getLocationAddress();
    });

  }

  openMore() {
    this.facilitiesStatus = !this.facilitiesStatus;
  }
  modalToggle() {
    this.checkPersonModalStatus = !this.checkPersonModalStatus;
  }
  modalHide() {
    this.checkPersonModalStatus = false;
    console.log('a');
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

  adultCountUp() {
    this.adultCount = this.adultCount + 1;
    this.checkPersonModalStatus = true;
  }
  adultCountDown() {
    if (this.adultCount <= 0) { return; }
    this.adultCount = this.adultCount - 1;
  }

  childrenCountUp() {
    this.childrenCount = this.childrenCount + 1;
  }
  childrenCountDown() {
    if (this.childrenCount <= 0) { return; }
    this.childrenCount = this.childrenCount - 1;
  }

  openLocation(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg' })
    );
  }
  closeLocation() {
    this.modalRef.hide();
  }
  getLocationAddress() {
    if (navigator.geolocation) {
      const geocoder = new google.maps.Geocoder();
      const address = this.address;
      const request = { address };
      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          if (result != null) {
            this.lat = result.geometry.location.lat();
            this.lng = result.geometry.location.lng();
          } else {
            alert('No address available!');
          }
        }
      });
    }
  }
  test() {
    console.log('a');
  }
}
