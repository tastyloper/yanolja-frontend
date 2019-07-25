import { Component } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  lat = 51.678418;
  lng = 7.809007;

  constructor(public bsModalRef: BsModalRef) {}
}
