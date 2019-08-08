import { Component, TemplateRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper/dist/lib/swiper.interfaces';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MapsAPILoader } from '@agm/core';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';

import { Stay } from '../core/types/stay.interface';

import { MainService } from '../core/services/main.service';

declare const google: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('addresstext', { static: false }) addresstext: ElementRef;
  bigSaleIsLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  partyRoomIsLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  swimmingPoolIsLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  spaIsLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  modalRef: BsModalRef;
  headerConfig: SwiperConfigInterface = {
    slidesPerView: 6,
    spaceBetween: 20,
    navigation: {
      nextEl: '.main-swiper-button-next',
      prevEl: '.main-swiper-button-prev',
    }
  };
  contentConfig1: SwiperConfigInterface = {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.content1-swiper-button-next',
      prevEl: '.content1-swiper-button-prev',
    }
  };
  contentConfig2: SwiperConfigInterface = {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.content2-swiper-button-next',
      prevEl: '.content2-swiper-button-prev',
    }
  };
  contentConfig3: SwiperConfigInterface = {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.content3-swiper-button-next',
      prevEl: '.content3-swiper-button-prev',
    }
  };
  contentConfig4: SwiperConfigInterface = {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.content4-swiper-button-next',
      prevEl: '.content4-swiper-button-prev',
    }
  };
  lat = 37.543934;
  lng = 127.061167;
  zoom = 15;
  address = '서울특별시 성동구 성수동2가 277-43';
  bigSales: Stay[];
  partyRooms: Stay[];
  swimmingPools: Stay[];
  spas: Stay[];
  popularKeywords = [
    {
      name: '프랜차이즈',
      img: 'url(/assets/img/main/franchise.jpg)'
    },
    {
      name: '신축/리모델링',
      img: 'url(/assets/img/main/remodeling.jpg)'
    },
    {
      name: '초특가 할인',
      img: 'url(/assets/img/main/bigSale.jpg)'
    },
    {
      name: '인기숙소',
      img: 'url(/assets/img/main/popular.jpg)'
    },
    {
      name: '파티룸',
      img: 'url(/assets/img/main/party.jpg)'
    },
    {
      name: '무료영화',
      img: 'url(/assets/img/main/movie.jpg)'
    },
    {
      name: '스파펜션',
      img: 'url(/assets/img/main/spa.jpg)'
    },
    {
      name: '수영장호텔',
      img: 'url(/assets/img/main/pool.jpg)'
    },
    {
      name: '오션뷰호텔',
      img: 'url(/assets/img/main/ocean.jpg)'
    },
    {
      name: '개별바베큐',
      img: 'url(/assets/img/main/bbq.jpg)'
    },
    {
      name: '추천리조트',
      img: 'url(/assets/img/main/resort.jpg)'
    },
    {
      name: '초특가호텔',
      img: 'url(/assets/img/main/hotel.jpg)'
    },
    {
      name: '독채펜션',
      img: 'url(/assets/img/main/pension.jpg)'
    },
    {
      name: '조식제공',
      img: 'url(/assets/img/main/breakfast.jpg)'
    },
    {
      name: '투어/체험',
      img: 'url(/assets/img/main/experience.jpg)'
    },
    {
      name: '커플룸',
      img: 'url(/assets/img/main/coupleroom.jpg)'
    },
    {
      name: '파티가능',
      img: 'url(/assets/img/main/partyAvailable.jpg)'
    }
  ];
  person = false;
  type = false;
  location = false;
  searchBarShow = '숙박종류';
  searchBarLocShow = '지역을 고르세요';
  searchBarDateShow: string;
  searchBarMemberShow: string;
  locationArr = [
    {
      val: '서울',
      active: true,
      arr: [
        '강남/역삼/삼성/논현',
        '서초/신사/방배',
        '잠실/신천(잠실새내)',
        '영등포/여의도',
        '신림/서울대/사당/동작',
        '천호/길동/둔촌',
        '화곡/까치산/양천/목동',
        '구로/금천/오류/신도림',
        '신촌/홍대/합정',
        '연신내/불광/응암',
        '종로/대학로',
        '성신여대/성북/월곡',
        '이태원/용산/서울역/명동/회현',
        '동대문/동묘/신당/충무로/약수',
        '회기/고려대/청량리/신설동',
        '장안동/답십리',
        '건대/군자/구의',
        '왕십리/성수/금호',
        '수유/미아',
        '상봉/중랑/면목',
        '태릉/노원/도봉/창동'
      ]
    },
    {
      val: '경기',
      active: false,
      arr: [
        '수원 인계',
        '수원 권선/영통',
        '수원역/구운/장안/세류',
        '안양/평촌/인덕원/과천',
        '성남/분당/위례',
        '용인',
        '동탄/오산/병점',
        '하남/광주/여주/이천',
        '안산',
        '군포/의왕/금정/산본',
        '시흥/광명',
        '평택/송탄/화성/안성',
        '부천',
        '일산/고양',
        '파주',
        '김포',
        '의정부',
        '구리',
        '남양주',
        '포천',
        '양주/동두천/연천',
        '양평',
        '가평/청평',
        '제부도/대부도'
      ],
    },
    {
      val: '인천',
      active: false,
      arr: [
        '부평',
        '구월',
        '서구(석남,서구청,검단)',
        '계양(작전,경인교대)',
        '주안',
        '송도/연수',
        '인천공항/을왕리',
        '중구(월미도/차이나타운/신포/동인천)',
        '강화/옹진',
        '동암/간석',
        '남동구(소래/만수)',
        '용현/숭의/도화/동구'
      ],
    },
    {
      val: '강원',
      active: false,
      arr: [
        '춘천/강촌',
        '원주',
        '경포대/사천/주문진',
        '강릉역/교동/옥계/정동진',
        '영월/정선',
        '속초/양양/고성',
        '동해/삼척/태백',
        '평창',
        '홍천/횡성',
        '화천/철원/인제/양구'
      ],
    },
    {
      val: '제주',
      active: false,
      arr: [
        '제주시',
        '서귀포시',
        '하귀/애월/한림/협재'
      ],
    },
    {
      val: '대전',
      active: false,
      arr: [
        '유성구',
        '중구(은행/대흥/선화)',
        '동구(용전/복합터미널)',
        '서구(둔산/용문)',
        '대덕구(중리/신탄진)'
      ],
    },
    {
      val: '충북',
      active: false,
      arr: [
        '청주 흥덕구/서원구(청주 터미널)',
        '청주 상당구/청원구(청주국제공항)',
        '충주/수안보',
        '제천/진천/음성/단양',
        '보은/옥천/괴산/증평/영동'
      ],
    },
    {
      val: '충남/세종',
      active: false,
      arr: [
        '천안 서북구',
        '천안 동남구',
        '아산',
        '공주/동학사/세종',
        '계룡/금산/논산/청양',
        '예산/홍성',
        '태안/안면도/서산',
        '당진',
        '보령/대천',
        '서천/부여'
      ],
    },
    {
      val: '부산',
      active: false,
      arr: [
        '해운대/센텀시티/재송',
        '송정/기장/정관',
        '서면/양정/초읍/부산시민공원',
        '남포동/중앙동/태종대/송도/영도',
        '부산역/범일동/부산진역',
        '광안리/수영',
        '경성대/대연/용호동/문현',
        '연산/토곡',
        '동래/사직/온천장/부산대/구서',
        '사상(경전철)/엄궁/학장',
        '덕천/화명/만덕/구포(구포역/KTX역)',
        '하단/명지/괴정/다대포/신호/지사/김해공항'
      ],
    },
    {
      val: '울산',
      active: false,
      arr: [
        '남구/중구(삼산/성남/무거/신정)',
        '동구/북구/울주군(일산/진장/진하/KTX역/영남알프스)'
      ],
    },
    {
      val: '경남',
      active: false,
      arr: [
        '창원 상남동/용호동/중앙동/창원시청',
        '창원 명서동/봉곡동/팔용동/북면온천/창원종합버스터미널',
        '마산/진해',
        '김해/장유',
        '양산/밀양',
        '진주',
        '거제/통영/고성',
        '사천/남해',
        '하동/산청/함양',
        '거창/함안/창녕/합천/의령'
      ],
    },
    {
      val: '대구',
      active: false,
      arr: [
        '동성로/서문시장/대구역/경북대/엑스코/칠곡지구/태전동',
        '동대구역/신천동/혁신도시/동촌유원지/대구공항/팔공산',
        '수성못/황금동/들안길/두산동/범어',
        '북부정류장/평리동/원대동/대명동/봉덕동/안지랑',
        '두류공원/본리/죽전/광장코아/서부정류장',
        '성서/성서공단/계명대/상인동/달성군'
      ],
    },
    {
      val: '경북',
      active: false,
      arr: [
        '포항/남구(시청/시외버스터미널/구룡포/쌍사/문덕/오천)',
        '포항/북구(영일대/죽도시장/여객터미널/송도)',
        '경주',
        '구미',
        '경산',
        '안동',
        '영천/청도',
        '김천/칠곡/성주',
        '문경/상주/영주/예천/군위/의성/봉화',
        '울진/영덕/청송',
        '울릉도'
      ],
    },
    {
      val: '광주',
      active: false,
      arr: [
        '상무지구/금호지구/유스퀘어/서구',
        '첨단지구/하남지구/송정역/광산구',
        '충장로/대인시장/국립아시아문화전당/동구/남구',
        '광주역/기아챔피언스필드/전대사거리/북구'
      ],
    },
    {
      val: '전남',
      active: false,
      arr: [
        '여수',
        '순천',
        '광양',
        '목포/무안/영암/신안',
        '나주/함평/영광/장성',
        '담양/곡성/화순/구례',
        '해남/완도/진도/강진/장흥/보성/고흥'
      ],
    },
    {
      val: '전주/전북',
      active: false,
      arr: [
        '전주/완주',
        '군산',
        '익산',
        '남원/임실/순창/무주/진안/장수',
        '정읍/부안/김제/고창'
      ]
    }
  ];
  locationSelect = '서울';
  detailLocationArr = this.locationArr.find(v => v.val === this.locationSelect).arr;
  bsValue = new Date();
  bsRangeValue: Date[];
  datePickerConfig: Partial<BsDatepickerConfig>;
  locale = 'ko';
  locales = listLocales();
  minDate: Date;
  maxDate: Date;
  numberAdult = 2;
  numberChildren = 0;

  constructor(
    private modalService: BsModalService,
    private mapsAPILoader: MapsAPILoader,
    private mainService: MainService,
    private localeService: BsLocaleService,
    private toastr: ToastrService
  ) {
    this.localeService.use(this.locale);
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 14);

    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-yanolja',
      dateInputFormat: 'YYYY-MM-DD',
      rangeInputFormat: 'YYYY-MM-DD',
      showWeekNumbers: false,
      minDate : this.minDate,
      maxDate : this.maxDate
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    // this.bigSales = [
    //   {
    //     directions: '강남역 초인접 위치(도로 5분 거리)',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼마레',
    //     stayId: 1,
    //     totalComments: 9,
    //     averageGrade: 4.5,
    //     ownerComments: 7,
    //     hoursPrice: '25000',
    //     hoursAvailable: 4,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '역삼역 도보 10분 거리',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼 호텔 The Artist',
    //     stayId: 3,
    //     totalComments: 0,
    //     averageGrade: 0,
    //     ownerComments: 0,
    //     hoursPrice: '30000',
    //     hoursAvailable: 3,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '강남역 초인접 위치(도로 5분 거리)',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼마레1',
    //     stayId: 4,
    //     totalComments: 9,
    //     averageGrade: 4.5,
    //     ownerComments: 7,
    //     hoursPrice: '25000',
    //     hoursAvailable: 4,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '역삼역 도보 10분 거리',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼 호텔 The Artist2',
    //     stayId: 5,
    //     totalComments: 0,
    //     averageGrade: 0,
    //     ownerComments: 0,
    //     hoursPrice: '30000',
    //     hoursAvailable: 3,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '역삼역 도보 10분 거리',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼 호텔 The Artist3',
    //     stayId: 6,
    //     totalComments: 0,
    //     averageGrade: 0,
    //     ownerComments: 0,
    //     hoursPrice: '30000',
    //     hoursAvailable: 3,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   }
    // ];

    // this.partyRooms = [
    //   {
    //     directions: '강남역 초인접 위치(도로 5분 거리)',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼마레',
    //     stayId: 1,
    //     totalComments: 9,
    //     averageGrade: 4.5,
    //     ownerComments: 7,
    //     hoursPrice: '25000',
    //     hoursAvailable: 4,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '역삼역 도보 10분 거리',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼 호텔 The Artist',
    //     stayId: 3,
    //     totalComments: 0,
    //     averageGrade: 0,
    //     ownerComments: 0,
    //     hoursPrice: '30000',
    //     hoursAvailable: 3,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '강남역 초인접 위치(도로 5분 거리)',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼마레1',
    //     stayId: 4,
    //     totalComments: 9,
    //     averageGrade: 4.5,
    //     ownerComments: 7,
    //     hoursPrice: '25000',
    //     hoursAvailable: 4,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '역삼역 도보 10분 거리',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼 호텔 The Artist2',
    //     stayId: 5,
    //     totalComments: 0,
    //     averageGrade: 0,
    //     ownerComments: 0,
    //     hoursPrice: '30000',
    //     hoursAvailable: 3,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '역삼역 도보 10분 거리',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼 호텔 The Artist3',
    //     stayId: 6,
    //     totalComments: 0,
    //     averageGrade: 0,
    //     ownerComments: 0,
    //     hoursPrice: '30000',
    //     hoursAvailable: 3,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   }
    // ];

    // this.swimmingPools = [
    //   {
    //     directions: '강남역 초인접 위치(도로 5분 거리)',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼마레',
    //     stayId: 1,
    //     totalComments: 9,
    //     averageGrade: 4.5,
    //     ownerComments: 7,
    //     hoursPrice: '25000',
    //     hoursAvailable: 4,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '역삼역 도보 10분 거리',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼 호텔 The Artist',
    //     stayId: 3,
    //     totalComments: 0,
    //     averageGrade: 0,
    //     ownerComments: 0,
    //     hoursPrice: '30000',
    //     hoursAvailable: 3,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '강남역 초인접 위치(도로 5분 거리)',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼마레1',
    //     stayId: 4,
    //     totalComments: 9,
    //     averageGrade: 4.5,
    //     ownerComments: 7,
    //     hoursPrice: '25000',
    //     hoursAvailable: 4,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '역삼역 도보 10분 거리',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼 호텔 The Artist2',
    //     stayId: 5,
    //     totalComments: 0,
    //     averageGrade: 0,
    //     ownerComments: 0,
    //     hoursPrice: '30000',
    //     hoursAvailable: 3,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '역삼역 도보 10분 거리',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼 호텔 The Artist3',
    //     stayId: 6,
    //     totalComments: 0,
    //     averageGrade: 0,
    //     ownerComments: 0,
    //     hoursPrice: '30000',
    //     hoursAvailable: 3,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   }
    // ];

    // this.spas = [
    //   {
    //     directions: '강남역 초인접 위치(도로 5분 거리)',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼마레',
    //     stayId: 1,
    //     totalComments: 9,
    //     averageGrade: 4.5,
    //     ownerComments: 7,
    //     hoursPrice: '25000',
    //     hoursAvailable: 4,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '역삼역 도보 10분 거리',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼 호텔 The Artist',
    //     stayId: 3,
    //     totalComments: 0,
    //     averageGrade: 0,
    //     ownerComments: 0,
    //     hoursPrice: '30000',
    //     hoursAvailable: 3,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '강남역 초인접 위치(도로 5분 거리)',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼마레1',
    //     stayId: 4,
    //     totalComments: 9,
    //     averageGrade: 4.5,
    //     ownerComments: 7,
    //     hoursPrice: '25000',
    //     hoursAvailable: 4,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '역삼역 도보 10분 거리',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼 호텔 The Artist2',
    //     stayId: 5,
    //     totalComments: 0,
    //     averageGrade: 0,
    //     ownerComments: 0,
    //     hoursPrice: '30000',
    //     hoursAvailable: 3,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '역삼역 도보 10분 거리',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼 호텔 The Artist3',
    //     stayId: 6,
    //     totalComments: 0,
    //     averageGrade: 0,
    //     ownerComments: 0,
    //     hoursPrice: '30000',
    //     hoursAvailable: 3,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   }
    // ];

    this.bigSaleIsLoading$.next(true);
    this.mainService.getBigSales().subscribe(
      data => {
        this.bigSales = data;
      },
      error => {
        console.log(error);
        this.toastr.error('치명적인 오류가 발생했습니다. 관리자에게 문의하세요.');
      },
      () => {
        this.bigSaleIsLoading$.next(false);
      }
    );

    this.partyRoomIsLoading$.next(true);
    this.mainService.getPartyRooms().subscribe(
      data => {
        this.partyRooms = data;
      },
      error => {
        console.log(error);
      },
      () => {
        this.partyRoomIsLoading$.next(false);
      }
    );

    this.swimmingPoolIsLoading$.next(true);
    this.mainService.getSpas().subscribe(
      data => {
        this.swimmingPools = data;
      },
      error => {
        console.log(error);
      },
      () => {
        this.swimmingPoolIsLoading$.next(false);
      }
    );

    this.spaIsLoading$.next(true);
    this.mainService.getBigSales().subscribe(
      data => {
        this.spas = data;
      },
      error => {
        console.log(error);
      },
      () => {
        this.spaIsLoading$.next(false);
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg' })
    );
    this.mapsAPILoader.load().then(() => {
      this.findCurrentLocation();
    });
  }

  findCurrentLocation() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
        this.getCurrentAddress(+pos.coords.latitude, +pos.coords.longitude);
      });
    }
  }

  getCurrentAddress(lat: number, lng: number) {
    if (navigator.geolocation) {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(lat, lng);
      const request = { latLng: latlng };
      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          if (result != null) {
            const splitAddress = (result.formatted_address).split('대한민국 ');
            this.address = splitAddress[1];
          } else {
            alert('No address available!');
          }
        }
      });
    }
  }

  positionChange(e) {
    this.lng = e.coords.lng;
    this.lat = e.coords.lat;
    this.getCurrentAddress(e.coords.lat, e.coords.lng);
  }

  locationComplete() {
    this.modalRef.hide();
    this.searchBarLocShow = this.address;
  }

  toggle(option: string) {
    if (option === 'member') {
      this.type = false;
      this.location = false;
      this.person = this.person ? false : true;
    } else if (option === 'type') {
      this.person = false;
      this.location = false;
      this.type = this.type  ? false : true;
    } else if (option === 'location') {
      this.person = false;
      this.type = false;
      this.location = this.location  ? false : true;
      this.mapsAPILoader.load().then(() => {
        this.findCurrentLocation();
      });
    } else if (option === 'calendar') {
      this.person = false;
      this.type = false;
      this.location = false;
    }
  }

  selectType(type: string) {
    this.toggle('type');
    this.searchBarShow = type === '모텔' ? '모텔' : (type === '호텔/리조트' ?  '호텔/리조트' : (type === '게스트하우스' ?  '게스트하우스' : (type === '펜션/풀빌라' ? '펜션/풀빌라' : '숙박종류')));
  }

  locationChange(e, val: string) {
    e.preventDefault();
    e.stopPropagation();
    this.locationArr = this.locationArr.map(v => {
      if (v.val === val) {
        this.locationSelect = v.val;
        this.detailLocationArr = this.locationArr.find(item => item.val === this.locationSelect).arr;
      }
      return v.val === val ? { ...v, active: !v.active } : { ...v, active: false };
    });
  }

  selectLoc(item: string) {
    this.toggle('location');
    this.searchBarLocShow = item;
  }

  submitNav() {
    this.person = false;
    this.location = false;
    this.type = false;
  }

  minus(person: string) {
    if ((person === 'adult' && this.numberAdult === 0) || (person === 'children' && this.numberChildren === 0)) {
      return;
    }
    if (person === 'adult') {
      this.numberAdult = this.numberAdult - 1;
    } else if (person === 'children') {
      this.numberChildren = this.numberChildren - 1;
    }
  }

  plus(person: string) {
    if (person === 'adult') {
      this.numberAdult = this.numberAdult + 1;
    } else if (person === 'children') {
      this.numberChildren = this.numberChildren + 1;
    }
  }
}
