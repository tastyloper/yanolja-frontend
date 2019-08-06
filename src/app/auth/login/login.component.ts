import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { SubTitleService } from '../../core/services/sub-title.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private subTitleService: SubTitleService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.subTitleService.pagaTitle = '로그인';
    this.subTitleService.pagaDescription = '로그인하고, 혜택받으세요!';

    this.loginForm = this.fb.group({
      userid: ['', [
        Validators.required,
        Validators.pattern('^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$')
      ]],
      userpw: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$')
      ]]
    });
  }

  onSubmit() {
    const payload = {
      email: this.loginForm.value.userid,
      password: this.loginForm.value.userpw,
    };
    this.authService.login(payload).subscribe(
      login => {
        // this.authService.setToken('93acbdfa37f88c816f3db85f38870d31e642d0e3); // 백엔드 없을 떄 이것만 살리고 다 주석처리
        this.authService.setToken(login);
        this.toastr.success('로그인되었습니다.');
        this.loginForm.reset();
        this.router.navigate(['']);
      },
      error => {
        const errors = error.error;
        for (const key in errors) {
          if (key === 'non_field_errors') {
            this.toastr.error('회원정보가 존재하지 않습니다.');
          }
        }
      }
    );
  }

  get userid() {
    return this.loginForm.get('userid');
  }

  get userpw() {
    return this.loginForm.get('userpw');
  }
}
