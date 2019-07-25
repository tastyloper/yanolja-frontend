import { Component } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-collection-use-personal-info',
  templateUrl: './collection-use-personal-info.component.html'
})
export class CollectionUsePersonalInfoComponent {
  constructor(public bsModalRef: BsModalRef) {}
}
