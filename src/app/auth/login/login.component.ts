import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { SubTitleService } from '../../core/services/sub-title.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private subTitleService: SubTitleService,
    private fb: FormBuilder
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
        Validators.minLength(6)
      ]],
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    this.loginForm.reset();
  }

  get userid() {
    return this.loginForm.get('userid');
  }

  get userpw() {
    return this.loginForm.get('userpw');
  }
}
