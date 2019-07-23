import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';

import { MainModule } from './main/main.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { AuthModule } from './auth/auth.module';
import { MypageModule } from './mypage/mypage.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { UiComponent } from './components/ui/ui.component';
import { TermsOfServiceComponent } from './shared/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './shared/privacy-policy/privacy-policy.component';
import { YouthProtectionPolicyComponent } from './shared/youth-protection-policy/youth-protection-policy.component';
import { LocationInfoTermsComponent } from './shared/location-info-terms/location-info-terms.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MainModule,
    SharedModule,
    CoreModule,
    AccommodationModule,
    AuthModule,
    MypageModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot()
  ],
  entryComponents: [
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    YouthProtectionPolicyComponent,
    LocationInfoTermsComponent
  ],
  providers: [BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule {}
