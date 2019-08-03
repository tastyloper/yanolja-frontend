import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MypageRoutingModule } from './mypage-routing.module';

import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../shared/shared.module';

import { MypageComponent } from './mypage.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { AccountComponent } from './account/account.component';
import { WishlistsComponent } from './wishlists/wishlists.component';
import { AccountEditComponent } from './account-edit/account-edit.component';

@NgModule({
  declarations: [
    MypageComponent,
    ReservationListComponent,
    ReservationDetailComponent,
    AccountComponent,
    WishlistsComponent,
    AccountEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MypageRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class MypageModule {}
