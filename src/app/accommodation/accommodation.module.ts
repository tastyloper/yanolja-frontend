import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccommodationRoutingModule } from './accommodation-routing.module';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccommodationDetailComponent } from './accommodation-detail/accommodation-detail.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AccommodationListComponent,
    AccommodationDetailComponent,
    RoomDetailComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    AccommodationRoutingModule
  ]
})
export class AccommodationModule {}
