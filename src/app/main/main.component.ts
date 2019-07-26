import { Component, TemplateRef, NgZone } from '@angular/core';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper/dist/lib/swiper.interfaces';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// import { InfoWindowManager, AgmInfoWindow } from '@agm/core';
// import { ZoomControlOptions, ControlPosition, ZoomControlStyle } from '@agm/core/services/google-maps-types';

// import { GeocodeService } from '../core/services/geocode.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  modalRef: BsModalRef;
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

  // 지도관련 변수
  // latitude = 33.36995865711402;
  // longitude = 126.52811723292518;
  // selectedMarker;
  // infowindowManager: InfoWindowManager;
  // currentIW: AgmInfoWindow;
  // previousIW: AgmInfoWindow;
  // zoomControlOptions: ZoomControlOptions = {
  //   position: ControlPosition.LEFT_TOP,
  //   style: ZoomControlStyle.LARGE
  // };
  // previous: any;
  // icon = {
  //   url: 'https://i.dlpng.com/static/png/510666_thumb.png',
  //   scaledSize: { width: 50, height: 60 }
  // };
  // Glat: number;
  // Glng: number;

  constructor(
    private modalService: BsModalService,
    // private geocodeService: GeocodeService,
    private ngzone: NgZone
  ) {}

  likeAction(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('123');
  }


  openModal(template: TemplateRef<any>) {
    // this.geocodeService.getLatLan('대화2로 121').subscribe(console.log);
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg' })
    );
  }

//   selectMarker(event) {
//     this.selectedMarker = {
//       lat: event.latitude,
//       lng: event.longitude
//     };
//   }
// ​
//   mapClick() {
//     if (this.previousIW) {
//       this.previousIW.close();
//     }
//   }
}
