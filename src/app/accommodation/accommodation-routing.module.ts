import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccommodationDetailComponent } from './accommodation-detail/accommodation-detail.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: 'accommodation', component: AccommodationListComponent },
  { path: 'accommodation/:id', component: AccommodationDetailComponent },
  { path: 'accommodation/:id/:id', component: RoomDetailComponent },
  { path: 'accommodation/:id/:id/payment', component: PaymentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccommodationRoutingModule {}
