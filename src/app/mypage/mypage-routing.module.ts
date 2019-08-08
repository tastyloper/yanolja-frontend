import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MypageComponent } from './mypage.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { AccountComponent } from './account/account.component';
import { WishlistsComponent } from './wishlists/wishlists.component';
import { AccountEditComponent } from './account-edit/account-edit.component';

import { AuthGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  { path: 'mypage', component: MypageComponent, canActivate: [ AuthGuard ],
    children: [
    { path: '', redirectTo: 'account', pathMatch: 'full' },
    { path: 'account', component: AccountComponent },
    { path: 'accountEdit', component: AccountEditComponent },
    { path: 'reservation', component: ReservationListComponent },
    { path: 'reservation/:id', component: ReservationDetailComponent },
    { path: 'wishlists', component: WishlistsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MypageRoutingModule {}
