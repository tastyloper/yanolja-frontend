import { Component, TemplateRef, ViewChild, ElementRef } from '@angular/core';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper/dist/lib/swiper.interfaces';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MapsAPILoader } from '@agm/core';

declare const google: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent{
  @ViewChild('addresstext', { static: false }) addresstext: ElementRef;
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
  lat = 37.543934;
  lng = 127.061167;
  zoom = 15;
  address = '서울특별시 성동구 성수동2가 277-43';

  constructor(
    private modalService: BsModalService,
    private mapsAPILoader: MapsAPILoader
  ) {}

  likeAction(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('123');
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
