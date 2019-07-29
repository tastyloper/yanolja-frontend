import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CancellationPolicyComponent } from '../../shared/cancellation-policy/cancellation-policy.component';

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

  constructor(private modalService: BsModalService) { }

  bsModalRef: BsModalRef;

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

  ngAfterViewInit() {
    this.galleryTop.nativeElement.swiper.controller.control = this.galleryThumbs.nativeElement.swiper;
    this.galleryThumbs.nativeElement.swiper.controller.control = this.galleryTop.nativeElement.swiper;
  }

  ngOnInit() {
  }

  openPolicy() {
    this.bsModalRef = this.modalService.show(CancellationPolicyComponent, { class: 'modal-lg' });
  }
}
