import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { SubTitleService } from 'src/app/core/services/sub-title.service';

import { PasswordValidator } from '../../auth/password-validator';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {
  accountForm: FormGroup;

  constructor(
    private subTitleService: SubTitleService,                                                        e: SubTitleService,
    private fb: FormBuilder  
  ) {}

  ngOnInit() {
    this.subTitleService.pagaTitle = '회원정보수정';
    this.subTitleService.pagaDescription = '나의 정보들을 수정하세요.';
    
    this.accountForm = this.fb.group({
      nickName: ['', Validators.required],
      currentpw: ['',[
        Validators.required,
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$')
      ]],
      passwordGroup:this.fb.group({
        userpw: ['',[
          Validators.required,
          Validators.pattern('^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$')
        ]],
        confirmPw:['', Validators.required]
      }, { validator: PasswordValidator.match })
      })
    
  }

  onSubmit() {
  
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
}
