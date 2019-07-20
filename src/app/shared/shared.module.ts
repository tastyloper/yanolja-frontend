import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { SubTitleComponent } from './sub-title/sub-title.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { YouthProtectionPolicyComponent } from './youth-protection-policy/youth-protection-policy.component';
import { LocationInfoTermsComponent } from './location-info-terms/location-info-terms.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SubTitleComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    YouthProtectionPolicyComponent,
    LocationInfoTermsComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SubTitleComponent,
    TermsOfServiceComponent
  ]
})
export class SharedModule {}
