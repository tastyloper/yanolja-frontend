import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core/services/auth.service';

import { fadeAnimation } from '../core/animation/fade.animation';

@Component({
  selector: 'app-mypage',
  animations: [fadeAnimation],
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {
  nickname: string;
  reservedCount: number;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.nickname = this.authService.getToken().nickname;
    this.reservedCount = this.authService.getToken().reservedCount;
  }

  getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
