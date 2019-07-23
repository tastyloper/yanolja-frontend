import { Component } from '@angular/core';

import { fadeAnimation } from '../core/animation/fade.animation';

@Component({
  selector: 'app-mypage',
  animations: [fadeAnimation],
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent {
  getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
