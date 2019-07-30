import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AccommodationRoutingModule } from './accommodation-routing.module';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccommodationDetailComponent } from './accommodation-detail/accommodation-detail.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { PaymentComponent } from './payment/payment.component';

import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { koLocale } from 'ngx-bootstrap/locale';
import { ReviewComponent } from './review/review.component';
import { PersonCheckDirective } from './accommodation-detail/person-check.directive';

import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
defineLocale('ko', koLocale);


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AccommodationListComponent,
    AccommodationDetailComponent,
    RoomDetailComponent,
    PaymentComponent,
    ReviewComponent,
    PersonCheckDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    SwiperModule,
    HttpClientModule,
    AccommodationRoutingModule,
    ButtonsModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKey
    }),
    AccommodationRoutingModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class AccommodationModule {}
