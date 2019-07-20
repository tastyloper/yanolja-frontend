import { Component } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-youth-protection-policy',
  templateUrl: './youth-protection-policy.component.html'
})
export class YouthProtectionPolicyComponent {
  constructor(public bsModalRef: BsModalRef) {}
}
