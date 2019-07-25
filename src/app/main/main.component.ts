import { Component } from '@angular/core';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper/dist/lib/swiper.interfaces';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { MapComponent } from '../shared/map/map.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  bsModalRef: BsModalRef;
  headerConfig: SwiperConfigInterface = {
    slidesPerView: 6,
    spaceBetween: 20,
    navigation: {
      nextEl: '.main-swiper-button-next',
      prevEl: '.main-swiper-button-prev',
    }
  };
  contentConfig: SwiperConfigInterface = {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.content-swiper-button-next',
      prevEl: '.content-swiper-button-prev',
    }
  };

  constructor(private modalService: BsModalService) {}

  likeAction(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('123');
  }

  mapOpen() {
    this.bsModalRef = this.modalService.show(MapComponent, { class: 'modal-lg' });
  }
}
