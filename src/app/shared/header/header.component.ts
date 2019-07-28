import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMain = false;
  isLogin = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.router.events.subscribe(_ => {
      if ((this.router.url).split('/')[1] === '') {
        this.isMain = true;
      } else {
        this.isMain = false;
      }

      if (this.authService.getToken()) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }

  logout() {
    this.isLogin = false;
    this.authService.removeToken();
    this.toastr.success('성공적으로 로그아웃 되었습니다.');
    this.router.navigate(['']);
  }
}
