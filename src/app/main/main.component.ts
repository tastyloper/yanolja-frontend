import { Component, OnInit } from '@angular/core';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper/dist/lib/swiper.interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  headerConfig: SwiperConfigInterface = {
    slidesPerView: 6,
    spaceBetween: 20
  };

  constructor() { }

  ngOnInit() {
  }

}
