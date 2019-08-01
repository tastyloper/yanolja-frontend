import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { SubTitleService } from '../../core/services/sub-title.service';
import { AuthService } from '../../core/services/auth.service';

import { PasswordValidator } from '../../auth/password-validator';

import { User } from '../../core/types/user.interface';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {
  accountForm: FormGroup;
  account: User;

  constructor(
    private subTitleService: SubTitleService,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subTitleService.pagaTitle = '회원정보수정';
    this.subTitleService.pagaDescription = '나의 정보들을 수정하세요.';

    this.accountForm = this.fb.group({
      currentpw: ['', [
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$')
      ]],
      passwordGroup: this.fb.group({
        userpw: [{ disabled: true, value: '' }, [
          Validators.required,
          Validators.pattern('^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$')
        ]],
        confirmPw: [{ disabled: true, value: '' }]
      }, { validator: PasswordValidator.match }),
      nickName: ['', Validators.required],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern('^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$')
      ]]
    });

    this.currentpw.valueChanges.subscribe(value => {
      if (value) {
        this.userpw.enable();
        this.confirmPw.enable();
      } else {
        this.userpw.disable();
        this.confirmPw.disable();
      }
    });

    this.getData();

    this.nickName.setValue(this.account.nickname);
    this.phoneNumber.setValue(this.account.phoneNumber);
  }

  onSubmit() {
    const payload = {
      nickname: this.nickName.value,
      password: this.userpw.value,
      phoneNumber: this.phoneNumber.value,
    };
    this.authService.upadteUser(payload).subscribe(
      data => {
        this.toastr.success('성공적으로 변경하였습니다.'); // 백앤드 없을 시 이것만 뺴고 다 주석처리
        this.router.navigate(['mypage']); // 백앤드 없을 시 이것만 뺴고 다 주석처리
      },
      error => {
        console.log(error);
        this.toastr.error('에러가 발생했습니다. 다시한번 시도해주세요.');
      }
    );
  }

  getData() {
    // 가데이터
    // this.account = {
    //   nickname: '연희내꺼야',
    //   email: 'tak@gmail.com',
    //   phoneNumber: '01042221234'
    // };
    this.authService.getUser().subscribe(
      data => {
        this.account = data;
      },
      error => {
        console.log(error);
        this.authService.removeToken();
        this.toastr.error('유저 정보를 찾을 수 없습니다.');
        this.router.navigate(['login']);
      }
    );
  }

  get nickName() {
    return this.accountForm.get('nickName');
  }

  get currentpw() {
    return this.accountForm.get('currentpw');
  }

  get passwordGroup() {
    return this.accountForm.get('passwordGroup');
  }

  get userpw() {
    return this.passwordGroup.get('userpw');
  }

  get confirmPw() {
    return this.passwordGroup.get('confirmPw');
  }

  get phoneNumber() {
    return this.accountForm.get('phoneNumber');
  }
}
