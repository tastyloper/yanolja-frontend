import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { SubTitleService } from '../../core/services/sub-title.service';
import { AuthService } from '../../core/services/auth.service';

import { PasswordValidator } from '../password-validator';

import { TermsOfServiceComponent } from '../../shared/terms-of-service/terms-of-service.component';
import { LocationInfoTermsComponent } from '../../shared/location-info-terms/location-info-terms.component';
import { CollectionUsePersonalInfoComponent } from '../../shared/collection-use-personal-info/collection-use-personal-info.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  bsModalRef: BsModalRef;

  constructor(
    private subTitleService: SubTitleService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: BsModalService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.subTitleService.pagaTitle = '회원가입';
    this.subTitleService.pagaDescription = '회원가입하고, 혜택받으세요!';

    this.signupForm = this.fb.group({
      userName: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      userid: ['', [
        Validators.required,
        Validators.pattern('^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$')
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern('^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$')
      ]],
      passwordGroup: this.fb.group({
        userpw: ['', [
          Validators.required,
          Validators.pattern('^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$')
        ]],
        confirmPw: ['', Validators.required]
      }, { validator: PasswordValidator.match }),
      checkGroup: this.fb.group({
        allAgree: [false],
        adult: [false, Validators.pattern('true')],
        service: [false, Validators.pattern('true')],
        privacy: [false, Validators.pattern('true')],
        location: [false],
        // privacy2: [false],
        notConnected: [false]
      })
    });
    this.allAgree.valueChanges.subscribe(v => {
      this.adult.setValue(v);
      this.service.setValue(v);
      this.privacy.setValue(v);
      this.location.setValue(v);
      // this.privacy2.setValue(v);
      this.notConnected.setValue(v);
    });
  }

  onSubmit() {
    const payload = {
      username: this.signupForm.value.userid,
      password: this.signupForm.value.passwordGroup.userpw,
      realname: this.signupForm.value.userName,
      phoneNumber: this.signupForm.value.phoneNumber,
      email: this.signupForm.value.userid
    };
    this.authService.createAccount(payload).subscribe(
      userInfo => {
        this.toastr.success('회원가입이 완료되었습니다.');
        this.signupForm.reset();
        this.router.navigate(['login']);
      },
      error => {
        const errors = error.error;
        for (const key in errors) {
          if (key === 'email') {
            this.toastr.error('이미 사용중인 이메일입니다.');
          } else if (key === 'phoneNumber') {
            this.toastr.error('이미 사용중인 핸드폰번호입니다.');
          }
        }
      }
    );
  }

  termsOfServiceOpen() {
    this.bsModalRef = this.modalService.show(TermsOfServiceComponent, { class: 'modal-lg' });
  }

  collectionUsePersonalInfoOpen() {
    this.bsModalRef = this.modalService.show(CollectionUsePersonalInfoComponent, { class: 'modal-lg' });
  }

  locationInfoTermsOpen() {
    this.bsModalRef = this.modalService.show(LocationInfoTermsComponent, { class: 'modal-lg' });
  }

  get userName() {
    return this.signupForm.get('userName');
  }

  get userid() {
    return this.signupForm.get('userid');
  }

  get phoneNumber() {
    return this.signupForm.get('phoneNumber');
  }

  get passwordGroup() {
    return this.signupForm.get('passwordGroup');
  }

  get userpw() {
    return this.passwordGroup.get('userpw');
  }

  get confirmPw() {
    return this.passwordGroup.get('confirmPw');
  }

  get checkGroup() {
    return this.signupForm.get('checkGroup');
  }

  get allAgree() {
    return this.checkGroup.get('allAgree');
  }

  get adult() {
    return this.checkGroup.get('adult');
  }

  get service() {
    return this.checkGroup.get('service');
  }

  get privacy() {
    return this.checkGroup.get('privacy');
  }

  get location() {
    return this.checkGroup.get('location');
  }

  // get privacy2() {
  //   return this.checkGroup.get('privacy2');
  // }

  get notConnected() {
    return this.checkGroup.get('notConnected');
  }
}
