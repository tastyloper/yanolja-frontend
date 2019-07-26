import { Component } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cancellation-policy',
  templateUrl: './cancellation-policy.component.html'
})
export class CancellationPolicyComponent {
  constructor(public bsModalRef: BsModalRef) {}
}
