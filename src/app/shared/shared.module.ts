import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgmCoreModule } from '@agm/core';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { SubTitleComponent } from './sub-title/sub-title.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { YouthProtectionPolicyComponent } from './youth-protection-policy/youth-protection-policy.component';
import { LocationInfoTermsComponent } from './location-info-terms/location-info-terms.component';
import { MapComponent } from './map/map.component';

import { environment } from '../../environments/environment';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SubTitleComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    YouthProtectionPolicyComponent,
    LocationInfoTermsComponent,
    MapComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CommonModule,
    RouterModule,
    AgmCoreModule.forRoot({ apiKey : environment.apiKey })
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SubTitleComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    YouthProtectionPolicyComponent,
    LocationInfoTermsComponent,
    MapComponent
  ]
})
export class SharedModule {}
