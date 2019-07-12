import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MypageComponent } from './mypage/mypage.component';
import { MemberUpdateComponent } from './member-update/member-update.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { ReservationCancelComponent } from './reservation-cancel/reservation-cancel.component';

const routes: Routes = [
  { path: 'mypage', component: MypageComponent },
  { path: 'member/update', component: MemberUpdateComponent },
  { path: 'reservation', component: ReservationListComponent },
  { path: 'reservation/:id', component: ReservationDetailComponent },
  { path: 'reservation/:id/cancel', component: ReservationCancelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MypageRoutingModule {}
