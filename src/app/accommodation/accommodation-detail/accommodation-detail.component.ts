import { Component, AfterViewInit, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

// swiper
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
// DateRangePicker
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';
// toastr
import { ToastrService } from 'ngx-toastr';
// Locales
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
// Map modal
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MapsAPILoader } from '@agm/core';
declare const google: any;

// types
import { StayDetail } from '../../core/types/stay-detail.interface';
import { Room } from '../../core/types/room.interface';
import { Review } from '../../core/types/review.interface';

// services
import { StayDetailService } from '../../core/services/stay-detail.service';
import { SubTitleService } from '../../core/services/sub-title.service';
import { AuthService } from '../../core/services/auth.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-accommodation-detail',
  templateUrl: './accommodation-detail.component.html',
  styleUrls: ['./accommodation-detail.component.scss'],
})
export class AccommodationDetailComponent implements AfterViewInit, OnInit {
  @ViewChild('galleryTop', { static: true }) galleryTop;
  @ViewChild('galleryThumbs', { static: true }) galleryThumbs;
  @ViewChild(BsDaterangepickerDirective, { static: false }) daterangepicker: BsDaterangepickerDirective;

  stayDetailLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  roomsLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  reviewsLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // datepicker
  dateCustomClasses: DatepickerDateCustomClasses[];
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
  dibStatus: boolean;
  checkPersonModalStatus: boolean;
  facilitiesStatus: boolean;
  adultCount: number;
  childrenCount: number;

  // data for server communication
  url: string;
  token: string;

  // template data
  data: StayDetail;
  rooms: Room[];
  reviews: Review[];
  stayId: number;
  // mapConfig
  zoom = 15;
  address: string;
  lat: number;
  lng: number;

  // dummy data

//   data: StayDetail = {
//     name: '역삼마레',
//     category: '모텔',
//     location: '서울특별시 강남구 테헤란로2길 33 (역삼동)',
//     directions: '강남역 초인접 위치(도로 5분 거리)',
//     route: [
//         '찾아오시는 길',
//         '찾아오시는 길'
//     ],
//     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
//     urlImage: [
//         'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
//         'https://yaimg.yanolja.com/'
//     ],
//     introduce: [
//         '역삼 마레',
//         '좋아요'
//     ],
//     serviceKinds: [
//       'park',
//       'restaurant',
//       'coffeeShop',
//       'paidLaundry',
//       'noSmoking',
//       'banquetHall',
//       'business',
//       'wifi',
//       'breakfast',
//       'spa',
//       'swimmingPool',
//       'partyRoom',
//       'unmanned',
//       'couplePC',
//       'barbecue',
//       'jokgu'

//     ],
//     serviceIntroduce: [
//         '편의시설',
//         '편의시설'
//     ],
//     serviceNotice: [
//         '이용안내',
//         '이용안내',
//         '이용안내',
//         '이용안내',
//         '이용안내',
//         '이용안내',
//         '이용안내',
//         '이용안내',
//     ],
//     pickupNotice: [
//         '픽업안내',
//         '픽업안내'
//     ],
//     like: false,
//     stayId: 1,
//     totalComments: 9,
//     averageGrade: 4.5,
//     totalGrade: [
//         4.6,
//         4.2,
//         4.4,
//         4.7
//     ],
//     ownerComments: 7
//   };
//   rooms: Room[] = [
//     {
//         name: '일반실',
//         standardPersonnel: 2,
//         maximumPersonnel: 2,
//         hoursAvailable: 4,
//         daysCheckIn: 22,
//         hoursPrice: '25000',
//         saleHoursPrice: '20000',
//         daysPrice: '50000',
//         saleDaysPrice: '20000',
//         basicInfo: [
//             '기본정보',
//             '기본정보'
//         ],
//         urlImage: [
//             'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
//             'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG'
//         ],
//         roomId: 1,
//         stayId: 1,
//         stay: '역삼마레',
//         rentalAvailable: false,
//         stayAvailable: false
//     },
//     {
//         name: '준특실',
//         standardPersonnel: 2,
//         maximumPersonnel: 3,
//         hoursAvailable: 4,
//         daysCheckIn: 22,
//         hoursPrice: '25000',
//         saleHoursPrice: '19500',
//         daysPrice: '55000',
//         saleDaysPrice: '46500',
//         basicInfo: [
//             '기본정보',
//             '기본정보'
//         ],
//         urlImage: [
//             'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
//             'https://yaimg.yanolja.com/'
//         ],
//         roomId: 2,
//         stayId: 1,
//         stay: '역삼마레',
//         rentalAvailable: false,
//         stayAvailable: false
//     },
//     {
//         name: '특실',
//         standardPersonnel: 1,
//         maximumPersonnel: 4,
//         hoursAvailable: 4,
//         daysCheckIn: 22,
//         hoursPrice: '30000',
//         saleHoursPrice: '20000',
//         daysPrice: '60000',
//         saleDaysPrice: '20000',
//         basicInfo: [
//             '기본정보',
//             '기본정보'
//         ],
//         urlImage: [
//             'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
//             'https://yaimg.yanolja.com/'
//         ],
//         roomId: 3,
//         stayId: 1,
//         stay: '역삼마레',
//         rentalAvailable: false,
//         stayAvailable: false
//     }
// ];
// reviews: Review[] = [
//   null,
//   {
//       text: '이렇게 좋나요?',
//       created: '2019-07-25T21:07:26.593486',
//       stay: '역삼마레',
//       stayId: 1,
//       reservedRoom: '특실 - 대실',
//       nickname: '해비턴스',
//       grade: [
//           1,
//           1,
//           2,
//           3
//       ],
//       'ownerComment-1': '사장입니다. 감사해요',
//       'ownerCommentCreated-1': '2019-07-25T21:07:26.593032',
//       'ownerComment-2': '두번째 댓글다는 사장입니다. 정말 감사합니다.',
//       'ownerCommentCreated-2': '2019-07-26T04:39:04.795462',
//       'ownerComment-3': '사장님 댓글',
//       'ownerCommentCreated-3': '2019-07-27T02:19:08.022662',
//       'ownerComment-4': '사장님 댓글',
//       'ownerCommentCreated-4': '2019-07-27T02:19:09.268493'
//   },
//   {
//       text: '괜찮더라',
//       created: '2019-07-26T03:25:25.425471',
//       stay: '역삼마레',
//       stayId: 1,
//       reservedRoom: '준특실 - 숙박',
//       nickname: 'sonheungmin',
//       grade: [
//           5,
//           3,
//           5,
//           5
//       ],
//       'ownerComment-1': '사장입니다. 정말 감사합니다.',
//       'ownerCommentCreated-1': '2019-07-26T03:27:59.829963',
//       'ownerComment-2': '사장님 댓글',
//       'ownerCommentCreated-2': '2019-07-27T02:18:06.092450',
//       'ownerComment-3': '사장님 댓글',
//       'ownerCommentCreated-3': '2019-07-27T02:18:59.686230'
//   },
//   null,
//   null,
//   null,
//   null,
//   null,
//   null
// ];


  constructor(
    private subTitleService: SubTitleService,
    private localeService: BsLocaleService,
    private modalService: BsModalService,
    private dataService: StayDetailService,
    private mapsAPILoader: MapsAPILoader,
    private toaster: ToastrService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngAfterViewInit() {
    this.galleryTop.nativeElement.swiper.controller.control = this.galleryThumbs.nativeElement.swiper;
    this.galleryThumbs.nativeElement.swiper.controller.control = this.galleryTop.nativeElement.swiper;
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.minDate = new Date();
    this.form = new FormGroup({
      dateYMD: new FormControl(new Date())
    });


    this.locale = 'ko';
    this.locales = listLocales();
    this.localeService.use(this.locale);

    this.maxDate.setDate(this.maxDate.getDate() + 90);
    this.minDate.setDate(this.minDate.getDate());
    this.bsRangeValue = [
      new Date(),
      new Date(new Date().setDate(new Date().getDate() + 1))
    ];
    this.form.get('dateYMD').setValue(this.bsRangeValue);

    this.galleryTopConfig = {
      spaceBetween: 10,
      effect: 'fade',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      observer: true,
    };
    this.galleryThumbsConfig = {
      spaceBetween: 10,
      slidesPerView: 9,
      centeredSlides: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
      observer: true,
    };

    this.checkPersonModalStatus = false;
    this.facilitiesStatus = false;
    this.url = environment.appUrl;
    this.token = environment.tokenName;
    this.adultCount = 2;
    this.childrenCount = 0;


    this.route.paramMap
      .subscribe(param => {
        this.stayId = +param.get('id');
      });
    this.route.queryParamMap
      .subscribe(queryParam => {
        if (!queryParam.get('minDate') || queryParam.get('maxDate')) { return; }
        const bsRangeValue =
        [
          new Date(Date.parse(queryParam.get('minDate'))),
          new Date(Date.parse(queryParam.get('maxDate')))
        ];
        this.form.get('dateYMD').setValue(bsRangeValue);
      });


    this.stayDetailLoading$.next(true);
    this.dataService.getStayDetail(this.stayId).subscribe(
      data => {
        this.data = data;
        this.address = data.location;
        this.mapsAPILoader.load().then(() => {
          this.getLocationAddress();
        });

        this.subTitleService.pagaTitle = this.data.name;
        this.subTitleService.grade = this.data.averageGrade;
        this.subTitleService.recommendation = this.evaluationText();
        this.subTitleService.review = `${this.data.totalComments}개의 이용 후기`;
        this.filterCategory();
      },
      error => {
        console.log(error);
      },
      () => {
        this.stayDetailLoading$.next(false);
    });
    this.roomsLoading$.next(true);
    this.dataService.getRoomList(
      this.stayId,
      `${this.formatDate(this.bsRangeValue[0])}+17:00:00`,
      `${this.formatDate(this.bsRangeValue[1])}+00:00:00`
    ).subscribe(
      data => {
        this.rooms = data;
      },
      error => {
        console.log(error);
      },
      () => {
        this.roomsLoading$.next(false);
    });
    this.reviewsLoading$.next(true);
    this.dataService.getReviewList(this.stayId).subscribe(
      data => {
        this.reviews = data;
      },
      error => {
        console.log(error);
      },
      () => {
        this.reviewsLoading$.next(false);
    });
    this.filterGetDibStay();
  }
  requestRoom() {
    this.roomsLoading$.next(true);
    this.dataService.getRoomList(
      this.stayId,
      `${this.formatDate(this.bsRangeValue[0])}+17:00:00`,
      `${this.formatDate(this.bsRangeValue[1])}+00:00:00`
    ).subscribe(
      data => {
        this.rooms = data;
      },
      error => {
        console.log(error);
      },
      () => {
        this.roomsLoading$.next(false);
    });
  }

  filterCategory() {
    this.subTitleService.pagaDescription = this.data.location;
    if (this.data.category === '호텔/리조트') {
      this.subTitleService.pagaDescription = `4성급 · ${this.data.location}`;
    }
  }

  openMore() {
    this.facilitiesStatus = !this.facilitiesStatus;
  }

  modalToggle() {
    this.checkPersonModalStatus = !this.checkPersonModalStatus;
  }

  modalHide() {
    this.checkPersonModalStatus = false;
  }

  copyText() {
    // document.execCommand('copy', true, this.address);
    const text = document.createElement('textarea');
    document.body.appendChild(text);
    text.value = this.address;
    text.select();
    document.execCommand('copy');
    document.body.removeChild(text);

    this.toaster.success('주소가 클립보드에 복사되었어요!');
  }


  evaluationText() {
    if (this.data.averageGrade >= 4.5) { return '우수함'; }
    if (this.data.averageGrade >= 3.5 && this.data.averageGrade < 4.5) { return '좋음'; }
    if (this.data.averageGrade >= 2.5 && this.data.averageGrade < 3.5) { return '보통'; }
    if (this.data.averageGrade < 2.5) { return '별로'; }
  }

  serviceText(serviceKind: string) {
    if (serviceKind === 'park') { return '주차'; }
    if (serviceKind === 'restaurant') { return '레스토랑'; }
    if (serviceKind === 'coffeeShop') { return '카페'; }
    if (serviceKind === 'paidLaundry') { return '유료 세탁'; }
    if (serviceKind === 'noSmoking') { return '금연'; }
    if (serviceKind === 'banquetHall') { return '연회장'; }
    if (serviceKind === 'business') { return '비즈니스'; }
    if (serviceKind === 'wifi') { return '와이파이'; }
    if (serviceKind === 'breakfast') { return '조식 제공'; }
    if (serviceKind === 'spa') { return '스파'; }
    if (serviceKind === 'swimmingPool') { return '수영장'; }
    if (serviceKind === 'partyRoom') { return '파티룸'; }
    if (serviceKind === 'unmanned') { return '무인텔'; }
    if (serviceKind === 'couplePC') { return '커플pc'; }
    if (serviceKind === 'barbecue') { return '바베큐'; }
    if (serviceKind === 'jokgu') { return '족구장'; }
  }

  gradeText(index: number) {
    if (index === 0) { return '친절도'; }
    if (index === 1) { return '청결도'; }
    if (index === 2) { return '편의성'; }
    if (index === 3) { return '서비스 만족도'; }
  }



  getGrade(grades: number[]) {
    return grades.reduce((pre, val, idx, arr) => idx === arr.length - 1 ? (pre + val) / arr.length : pre + val).toFixed(1);
  }
  splitDate(date: string) {
    return date.split('T')[0];
  }
  onValueChange(value: Date[]) {
    if (!(value[0] || value[1])) { return; }
    this.bsRangeValue = value;
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

  dibStay() {
    if (!this.authService.getToken()) {
      this.router.navigate(['login']);
      return;
    }
    this.dataService.postDibStay(this.stayId).subscribe(
      data => {
        this.dibStatus = data.like;
      }
    );
  }
  filterGetDibStay() {
    if (!this.authService.getToken()) { return; }
    this.dataService.getDibStay().subscribe(
      stays => {
        stays.forEach(stay => {
          if (stay.stayId !== this.data.stayId) { return; }
          this.dibStatus = true;
        });
      }
    );
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
  formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [year, month, day].join('-');
  }
}
