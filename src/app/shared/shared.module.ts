import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SubTitleComponent } from './sub-title/sub-title.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { YouthProtectionPolicyComponent } from './youth-protection-policy/youth-protection-policy.component';
import { LocationInfoTermsComponent } from './location-info-terms/location-info-terms.component';
import { CancellationPolicyComponent } from './cancellation-policy/cancellation-policy.component';
import { PersonalInfoThirdPartyComponent } from './personal-info-third-party/personal-info-third-party.component';
import { CollectionUsePersonalInfoComponent } from './collection-use-personal-info/collection-use-personal-info.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SubTitleComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    YouthProtectionPolicyComponent,
    LocationInfoTermsComponent,
    CancellationPolicyComponent,
    PersonalInfoThirdPartyComponent,
    CollectionUsePersonalInfoComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CommonModule,
    RouterModule,
    ToastrModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SubTitleComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    YouthProtectionPolicyComponent,
    LocationInfoTermsComponent,
    CancellationPolicyComponent,
    PersonalInfoThirdPartyComponent
  ]
})
export class SharedModule {}
