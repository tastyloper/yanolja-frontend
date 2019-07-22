import { Component } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-location-info-terms',
  templateUrl: './location-info-terms.component.html'
})
export class LocationInfoTermsComponent {
  constructor(public bsModalRef: BsModalRef) {}
}
