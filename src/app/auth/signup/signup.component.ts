import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { SubTitleService } from 'src/app/core/services/sub-title.service';

import { PasswordValidator } from '../password-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private subTitleService: SubTitleService,
    private fb: FormBuilder,
    private router: Router
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
      passwordGroup: this.fb.group({
        userpw: ['', [
          Validators.required,
          Validators.minLength(6)
        ]],
        confirmPw: ['', Validators.required]
      }, { validator: PasswordValidator.match }),
      checkGroup: this.fb.group({
        allAgree: [false],
        adult: [false, Validators.requiredTrue],
        service: [false, Validators.requiredTrue],
        privacy: [false, Validators.requiredTrue],
        location: [false],
        privacy2: [false],
        notConnected: [false]
      })
    });
    this.allAgree.valueChanges.subscribe(v => {
      this.adult.setValue(v);
      this.service.setValue(v);
      this.privacy.setValue(v);
      this.location.setValue(v);
      this.privacy2.setValue(v);
      this.notConnected.setValue(v);
    });
    console.dir(this.signupForm);
  }

  onSubmit() {
    console.dir(this.signupForm);
    // this.signupForm.reset();
    this.router.navigate(['login']);
  }

  get userName() {
    return this.signupForm.get('userName');
  }

  get userid() {
    return this.signupForm.get('userid');
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

  get privacy2() {
    return this.checkGroup.get('privacy2');
  }

  get notConnected() {
    return this.checkGroup.get('notConnected');
  }
}
