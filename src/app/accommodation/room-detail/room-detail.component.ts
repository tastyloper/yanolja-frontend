import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CancellationPolicyComponent } from '../../shared/cancellation-policy/cancellation-policy.component';
import { FooterComponent } from '../../shared/footer/footer.component';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('galleryTop', { static: true }) galleryTop;
  @ViewChild('galleryThumbs', { static: true }) galleryThumbs;

  bsModalRef: BsModalRef;
  galleryTopConfig: SwiperConfigInterface  = {
    spaceBetween: 10,
    slidesPerView: 9,
    centeredSlides: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
  };;
  galleryThumbsConfig: SwiperConfigInterface;

  constructor(private modalService: BsModalService) { }
    data = {
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
      basicInfo: '', // 룸 소개
      reservationNotice: // 이용안내
      '1. 객실요금은 2인 입실 기준이며, 파티룸 등 특수객실의 경우, 직접 입실 인원 확인이 필요합니다.\r\n2. 미성년자의 입실 가능여부는 직접 제휴점에 확인 후 예약 진행하시기 바랍니다.\r\n3. 미성년자 혼숙예약으로 인해 발생하는 입실 거부에 대해서는 취소/환불이 불가합니다.\r\n4. 제휴점 사정에 의한 취소 발생 시 100% 환불 처리됩니다.\r\n5. 제휴점 사정으로 객실 정보가 수시로 변경될 수 있습니다. 이로 인한 불이익은 당사가 책임지지 않습니다.',
      cancelRegulation: // 취소 규정
      '1. 입실 1일 전 24시 전까지: 없음\r\n2. 당일 취소 및 No-Show, 입실시간 경과.실제 입실 후: 환불불가\r\n3. 모텔 예약의 경우 예약 완료 시각으로부터 1시간 이내 야놀자 앱/웹을 통해 전액 취소가 가능합니다.',
      stay: 1, // 숙소 고유 아이디(부모)
      reserved: [], // 예약한 날짜???
      images : [ // 상단 이미지
        'https://yaimg.yanolja.com/v5/2018/03/06/11/1280/5a9df91abefe06.10588478.jpg',
        'https://yaimg.yanolja.com/v5/2018/03/06/11/1280/5a9df91abefe06.10588478.jpg',
        'https://yaimg.yanolja.com/v5/2018/03/06/11/1280/5a9df91abefe06.10588478.jpg',
        'https://yaimg.yanolja.com/v5/2018/03/06/11/1280/5a9df91abefe06.10588478.jpg'
      ]
    };


  ngAfterViewInit() {
    this.galleryTop.nativeElement.swiper.controller.control = this.galleryThumbs.nativeElement.swiper;
    this.galleryThumbs.nativeElement.swiper.controller.control = this.galleryTop.nativeElement.swiper;
  }

  ngOnInit() {
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
  }

  openPolicy() {
    this.bsModalRef = this.modalService.show(CancellationPolicyComponent, { class: 'modal-lg' });
  }
}
