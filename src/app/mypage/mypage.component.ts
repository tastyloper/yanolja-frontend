import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { fadeAnimation } from '../core/animation/fade.animation';

import { AuthService } from '../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mypage',
  animations: [fadeAnimation],
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {
  nickname: string;
  reservedCount: number;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getUserInfo();

    this.router.events.subscribe(_ => {
      this.getUserInfo();
    });
  }

  getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  getUserInfo() {
    this.authService.getUser().subscribe(
      data => {
        this.nickname = data.nickname;
        this.reservedCount = data.reservedCount;
      },
      error => {
        this.toastr.error('회원정보를 가져오는데 에러가 났습니다.');
      }
    );
  }
}
