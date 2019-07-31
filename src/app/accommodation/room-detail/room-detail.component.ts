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
  }; ;
  galleryThumbsConfig: SwiperConfigInterface;

  constructor(private modalService: BsModalService) { }
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
