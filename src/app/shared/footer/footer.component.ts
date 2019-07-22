import { Component } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { YouthProtectionPolicyComponent } from '../youth-protection-policy/youth-protection-policy.component';
import { LocationInfoTermsComponent } from '../location-info-terms/location-info-terms.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) {}

  termsOfServiceOpen() {
    this.bsModalRef = this.modalService.show(TermsOfServiceComponent, { class: 'modal-lg' });
  }

  privacyPolicyOpen() {
    this.bsModalRef = this.modalService.show(PrivacyPolicyComponent, { class: 'modal-lg' });
  }

  youthProtectionPolicyOpen() {
    this.bsModalRef = this.modalService.show(YouthProtectionPolicyComponent, { class: 'modal-lg' });
  }

  locationInfoTermsOpen() {
    this.bsModalRef = this.modalService.show(LocationInfoTermsComponent, { class: 'modal-lg' });
  }
}
