import { Component } from '@angular/core';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper/dist/lib/swiper.interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
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

  likeAction(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('123');
  }
}
