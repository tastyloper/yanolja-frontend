import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccommodationDetailComponent } from './accommodation-detail/accommodation-detail.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { PaymentComponent } from './payment/payment.component';
import { ReviewComponent } from './review/review.component';
import { AuthGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  { path: 'accommodation', component: AccommodationListComponent },
  { path: 'accommodation/:id', component: AccommodationDetailComponent },
  { path: 'accommodation/:id/review', component: ReviewComponent },
  { path: 'accommodation/:id/:id', component: RoomDetailComponent },
  { path: 'accommodation/:id/:id/payment', component: PaymentComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccommodationRoutingModule {}
