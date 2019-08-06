import { Component, TemplateRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper/dist/lib/swiper.interfaces';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MapsAPILoader } from '@agm/core';
import { ToastrService } from 'ngx-toastr';

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
      img: 'url(/assets/img/main/super-special.jpg)'
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
    }
  ];

  constructor(
    private modalService: BsModalService,
    private mapsAPILoader: MapsAPILoader,
    private mainService: MainService,
    private toastr: ToastrService
  ) {}

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
    this.addresstext.nativeElement.value = this.address;
  }
}
