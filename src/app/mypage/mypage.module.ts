import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MypageRoutingModule } from './mypage-routing.module';

import { MypageComponent } from './mypage/mypage.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { ReservationCancelComponent } from './reservation-cancel/reservation-cancel.component';
import { MemberUpdateComponent } from './member-update/member-update.component';

@NgModule({
  declarations: [
    MypageComponent,
    ReservationListComponent,
    ReservationDetailComponent,
    ReservationCancelComponent,
    MemberUpdateComponent
  ],
  imports: [
    CommonModule,
    MypageRoutingModule
  ]
})
export class MypageModule {}
