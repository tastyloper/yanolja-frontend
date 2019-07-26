import { Component } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-personal-info-third-party',
  templateUrl: './personal-info-third-party.component.html'
})
export class PersonalInfoThirdPartyComponent {
  stayName: string;

  constructor(public bsModalRef: BsModalRef) {}
}