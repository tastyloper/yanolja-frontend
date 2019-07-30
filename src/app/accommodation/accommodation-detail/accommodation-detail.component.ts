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
import { AuthService } from 'src/app/core/services/auth.service';

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

  // mapConfig
  zoom = 15;

  // dummy data
  data = {
    id: 1, // 숙소 고유 아이디
    name: '역삼 리치웰', // 숙소 이름
    location: '서울특별시 강남구 테헤란로37길 13-10 (역삼동)', // 숙소 위치
    builtDate: '2019-07-17', // 숙소 설립 일
    remodeledDate: '2019-07-17', // 숙소 리모델링 날짜
    introduce: // 숙소 소개
    '고품격 비지니스 리치웰 호텔도심 속의 휴식공간.\r\n리치웰 호텔은 고객님들의 편한한 쉼터가 되기위해\r\n최선을 다하고 있으며, 고객님께서 들어오는 순간 A부터\r\nZ까지의 서비스를 제공하고 있습니다.',
    serviceKinds: [ // 편의시설 및 서비스
      'park',
      'restaurant',
      'spa',
      'partyRoom',
      'couplePC',
      'unmanned',
      'jokgu'
    ],
    serviceIntroduce: // 기본규정
    '1. 객실은 부티크 호텔 특성상 이미지와 다른 객실이 배정될 수 있습니다\r\n2. 객실 지정은 불가 합니다(체크인시 랜덤 배정)\r\n3. 전 객실 2인기준 (인원추가 1인당 2만원)\r\n4. 연박 불가(연박시 추가요금 발생)\r\n5. 자세한 문의는 프런트 부탁드리겠습니다\r\n6. 회원혜택은 제휴점 내규에 따라 적용됩니다',
    serviceNotice: // 공지사항
    '1. 리치웰 호텔 파티룸 오픈파티 가능한 객실을 준비해 두었습니다.\r\n2. 객실당 차량 1대 가능',
    pickupNotice: // 찾아오시는 길 or 픽업 안내 ???
    '2호선 역삼역 8번출구, 하나은행 왼쪽 골목에 위치',
    directions: '', // 숙소 상대위치
    searchTag: '', // ???
    // "created": "2019-07-17T06:51:52.448742",
    // "updated": "2019-07-17T06:51:52.448761",
    category: 2, // 카테고리 1: 모텔, 2: 호텔, 3: 팬션, 4: 게스트하우스
    // "username": 1,
    like: [ '11', '15'], // 이 숙소를 찜한 유저의 아이디값들
    grade: 4.7, // 종합평점
    reviewCount : 3345, // 후기 개수
    images : [ // 상단 이미지들
      'https://yaimg.yanolja.com/v5/2019/07/03/16/640/5d1c5f72e0fbd2.46663769.jpg',
      'https://yaimg.yanolja.com/v5/2019/07/03/16/640/5d1c5f72e0fbd2.46663769.jpg',
      'https://yaimg.yanolja.com/v5/2019/07/03/16/640/5d1c5f72e0fbd2.46663769.jpg',
      'https://yaimg.yanolja.com/v5/2019/07/03/16/640/5d1c5f72e0fbd2.46663769.jpg',
    ],
    rooms : [ // 룸 들
      {
        id: 1, // 룸 고유 아이디
        name: 'superial', // 룸 이름
        hoursAvailable: 4, // 대실 가능 시간
        hoursUntil: 24, // 대실 마지막 이용시각 예) 밤 12시까지만 이용가능
        daysCheckIn: 17, // 체크인 가능 시각
        daysCheckOut: 12, // 체크아웃 시각
        standardPersonnel: 2, // 기본 이용 인원
        maximumPersonnel: 4, // 최대 이용 인원
        hoursPrice: '40000', // 대실 요금
        daysPrice: '110000', // 숙박 요금
        checkHours: true, // 대실 예약 가능 여부
        checkDays: true, // 숙박 예약 가능 여부
        saleHoursPrice: '31500', // 대실 할인 가격
        saleDaysPrice: '62800', // 숙박 할인 가격
        // "basicInfo": "", // 룸 소개
        // "reservationNotice": // 이용안내
        // "1. 객실요금은 2인 입실 기준이며, 파티룸 등 특수객실의 경우, 직접 입실 인원 확인이 필요합니다.\r\n2. 미성년자의 입실 가능여부는 직접 제휴점에 확인 후 예약 진행하시기 바랍니다.\r\n3. 미성년자 혼숙예약으로 인해 발생하는 입실 거부에 대해서는 취소/환불이 불가합니다.\r\n4. 제휴점 사정에 의한 취소 발생 시 100% 환불 처리됩니다.\r\n5. 제휴점 사정으로 객실 정보가 수시로 변경될 수 있습니다. 이로 인한 불이익은 당사가 책임지지 않습니다.",
        // "cancelRegulation": // 취소 규정
        // "1. 입실 1일 전 24시 전까지: 없음\r\n2. 당일 취소 및 No-Show, 입실시간 경과.실제 입실 후: 환불불가\r\n3. 모텔 예약의 경우 예약 완료 시각으로부터 1시간 이내 야놀자 앱/웹을 통해 전액 취소가 가능합니다.",
        stay: 1, // 숙소 고유 아이디(부모)
        reserved: [], // 예약한 날짜???,
        image : 'https://yaimg.yanolja.com/v5/2019/07/03/16/640/5d1c5f72e0fbd2.46663769.jpg' // 룸 썸네일 이미지
      },
    ],
    review : { // 리뷰
      grade : 4.4, // 전체평점
      evaluation_items1 : 4.4, // 청결도
      evaluation_items2 : 4.4, // 편의성
      evaluation_items3 : 4.4, // 위치만족도
      evaluation_items4 : 4.4, // 친절도
      count : 224, // 후기 개수
      // "ownerComment": 221, // 사장님 댓글
      previews : [ // 2개만 보여주는 후기
        {
          stay : 12345, // 숙소 고유 아이디(부모)
          id : 12345, // 숙소 아이디
          grade : 4, // 평점
          userid : '용용22222', // 글쓴 유저 아이디
          date : '2019-07-01', // 글쓴 날짜
          roomName : '혼성 4인 도미 (1인기준)', // 룸 이름
          roomKind : '숙박', // 숙박 형태
          contents : '야경뷰가 좋았어요!' // 리뷰 내용
        },
        {
          stay : 12345, // 숙소 고유 아이디(부모)
          id : 12345, // 숙소 아이디
          grade : 4, // 평점
          userid : '용용22222', // 글쓴 유저 아이디
          date : '2019-07-01', // 글쓴 날짜
          roomName : '혼성 4인 도미 (1인기준)', // 룸 이름
          roomKind : '대실', // 숙박 형태
          contents : '야경뷰가 좋았어요!' // 리뷰 내용
        }
      ]
    }
  };
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
