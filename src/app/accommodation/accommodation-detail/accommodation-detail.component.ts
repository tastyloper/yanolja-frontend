import { Component, AfterViewInit, ViewChild, OnInit, HostListener, Host, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

// swiper
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

// DateRangePicker
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';

// Locales
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';

// Map modal
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MapsAPILoader } from '@agm/core';
declare const google: any;

import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/core/services/auth.service';


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

  // mapConfig
  zoom = 15;

  // dummy data
  data = {
    name: '역삼마레',
    category: '모텔',
    location: '서울특별시 강남구 테헤란로2길 33 (역삼동)',
    directions: '강남역 초인접 위치(도로 5분 거리)',
    route: [
        '찾아오시는 길',
        '찾아오시는 길'
    ],
    mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    urlImage: [
        'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
        'https://yaimg.yanolja.com/'
    ],
    introduce: [
        '역삼 마레',
        '좋아요'
    ],
    serviceKinds: [
      'park',
      'restaurant',
      'coffeeShop',
      'paidLaundry',
      'noSmoking',
      'banquetHall',
      'business',
      'wifi',
      'breakfast',
      'spa',
      'swimmingPool',
      'partyRoom',
      'unmanned',
      'couplePC',
      'barbecue',
      'jokgu'

    ],
    serviceIntroduce: [
        '편의시설',
        '편의시설'
    ],
    serviceNotice: [
        '이용안내',
        '이용안내',
        '이용안내',
        '이용안내',
        '이용안내',
        '이용안내',
        '이용안내',
        '이용안내',
    ],
    pickupNotice: [
        '픽업안내',
        '픽업안내'
    ],
    like: false,
    stayId: 1,
    totalComments: 9,
    averageGrade: 4.5,
    totalGrade: [
        4.6,
        4.2,
        4.4,
        4.7
    ],
    ownerComments: 7
  };
  rooms = [
    {
        name: '일반실',
        standardPersonnel: 2,
        maximumPersonnel: 2,
        hoursAvailable: 4,
        daysCheckIn: 22,
        hoursPrice: '25000',
        saleHoursPrice: '20000',
        daysPrice: '50000',
        saleDaysPrice: '20000',
        basicInfo: [
            '기본정보',
            '기본정보'
        ],
        urlImage: [
            'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
            'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG'
        ],
        roomId: 1,
        stayId: 1,
        stay: '역삼마레'
    },
    {
        name: '준특실',
        standardPersonnel: 2,
        maximumPersonnel: 3,
        hoursAvailable: 4,
        daysCheckIn: 22,
        hoursPrice: '25000',
        saleHoursPrice: '19500',
        daysPrice: '55000',
        saleDaysPrice: '46500',
        basicInfo: [
            '기본정보',
            '기본정보'
        ],
        urlImage: [
            'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
            'https://yaimg.yanolja.com/'
        ],
        roomId: 2,
        stayId: 1,
        stay: '역삼마레'
    },
    {
        name: '특실',
        standardPersonnel: 1,
        maximumPersonnel: 4,
        hoursAvailable: 4,
        daysCheckIn: 22,
        hoursPrice: '30000',
        saleHoursPrice: '20000',
        daysPrice: '60000',
        saleDaysPrice: '20000',
        basicInfo: [
            '기본정보',
            '기본정보'
        ],
        urlImage: [
            'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
            'https://yaimg.yanolja.com/'
        ],
        roomId: 3,
        stayId: 1,
        stay: '역삼마레'
    }
];
reviews = [
  null,
  {
      text: '이렇게 좋나요?',
      created: '2019-07-25T21:07:26.593486',
      stay: '역삼마레',
      stayId: 1,
      reservedRoom: '특실 - 대실',
      nickname: '해비턴스',
      grade: [
          1,
          1,
          2,
          3
      ],
      'ownerComment-1': '사장입니다. 감사해요',
      'ownerCommentCreated-1': '2019-07-25T21:07:26.593032',
      'ownerComment-2': '두번째 댓글다는 사장입니다. 정말 감사합니다.',
      'ownerCommentCreated-2': '2019-07-26T04:39:04.795462',
      'ownerComment-3': '사장님 댓글',
      'ownerCommentCreated-3': '2019-07-27T02:19:08.022662',
      'ownerComment-4': '사장님 댓글',
      'ownerCommentCreated-4': '2019-07-27T02:19:09.268493'
  },
  {
      text: '괜찮더라',
      created: '2019-07-26T03:25:25.425471',
      stay: '역삼마레',
      stayId: 1,
      reservedRoom: '준특실 - 숙박',
      nickname: 'sonheungmin',
      grade: [
          5,
          3,
          5,
          5
      ],
      'ownerComment-1': '사장입니다. 정말 감사합니다.',
      'ownerCommentCreated-1': '2019-07-26T03:27:59.829963',
      'ownerComment-2': '사장님 댓글',
      'ownerCommentCreated-2': '2019-07-27T02:18:06.092450',
      'ownerComment-3': '사장님 댓글',
      'ownerCommentCreated-3': '2019-07-27T02:18:59.686230'
  },
  null,
  null,
  null,
  null,
  null,
  null
];
  info = '\r\n1. 객실요금은 2인 입실 기준이며, 파티룸 등 특수객실의 경우, 직접 입실 인원 확인이 필요합니다.\r\n2. 미성년자의 입실 가능여부는 직접 제휴점에 확인 후 예약 진행하시기 바랍니다. \r\n2. 미성년자의 입실 가능여부는 직접 제휴점에 확인 후 예약 진행하시기 바랍니다. \r\n';
  address = this.data.location;
  lat: number;
  lng: number;
  totalComments: number;
  averageGrade: number;
  totalGrade1: number;
  totalGrade2: number;
  totalGrade3: number;
  totalGrade4: number;


  constructor(
    private http: HttpClient,
    private localeService: BsLocaleService,
    private modalService: BsModalService,
    private mapsAPILoader: MapsAPILoader,
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

    this.totalComments = 1000;
    this.totalGrade1 = 4;
    this.totalGrade2 = 4;
    this.totalGrade3 = 4;
    this.totalGrade4 = 4;
    this.averageGrade = 4;

    // const headers = new HttpHeaders()
    // .set('Authorization', this.token);

    // this.http.get(this.url + 'stay/detail/1/').subscribe(v => console.log(v));
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

  getGrade(grades: number[]) {
    return grades.reduce((pre, val, idx, arr) => idx === arr.length - 1 ? (pre + val) / arr.length : pre + val).toFixed(1);
  }
  splitDate(date: string) {
    return date.split('T')[0];
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
