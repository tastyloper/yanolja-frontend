import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-accommodation-detail',
  templateUrl: './accommodation-detail.component.html',
  styleUrls: ['./accommodation-detail.component.scss']
})
export class AccommodationDetailComponent implements AfterViewInit, OnInit {
  @ViewChild('galleryTop', { static: true }) galleryTop;
  @ViewChild('galleryThumbs', { static: true }) galleryThumbs;

  constructor(private http: HttpClient) { }

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
  info = '1. 객실요금은 2인 입실 기준이며, 파티룸 등 특수객실의 경우, 직접 입실 인원 확인이 필요합니다./r/n 2. 미성년자의 입실 가능여부는 직접 제휴점에 확인 후 예약 진행하시기 바랍니다./r/n';

  ngAfterViewInit() {
    this.galleryTop.nativeElement.swiper.controller.control = this.galleryThumbs.nativeElement.swiper;
    this.galleryThumbs.nativeElement.swiper.controller.control = this.galleryTop.nativeElement.swiper;
  }

  ngOnInit() {
    // const headers = new HttpHeaders()
    // .set('Authorization', 'Token ad0ffa732e4bad6d27606fcb250a7923a6f13f0b');

    // this.http.get('http://13.125.164.121/stay/api/stay/', { headers }).subscribe(v => console.log(v));
  }
  openMore() {
    this.facilitiesStatus = !this.facilitiesStatus;
  }
}
