import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { SubTitleService } from 'src/app/core/services/sub-title.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private subTitleService: SubTitleService,
    private fb: FormBuilder  
  ) {}

  ngOnInit() {
    this.subTitleService.pagaTitle = '회원정보수정';
    this.subTitleService.pagaDescription = '나의 정보들을 수정하세요.';
  
    this.editForm = this.fb.group({
      userpw: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  onSubmit() {
    console.log(this.editForm);
    this.editForm.reset();
  }

  get userpw() {
    return this.editForm.get('userpw');
  }
}
