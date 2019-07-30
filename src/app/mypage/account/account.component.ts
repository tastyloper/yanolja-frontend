import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { SubTitleService } from '../../core/services/sub-title.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  secessionForm: FormGroup;
  modalRef: BsModalRef;
  accountdata = {};

  constructor(
    private subTitleService: SubTitleService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.subTitleService.pagaTitle = '마이페이지';
    this.subTitleService.pagaDescription = '나의 정보들을 한눈에 확인하세요!';

    this.secessionForm = this.fb.group({
      userpw: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
    this.getData();
  }

  getData() {
    this.authService.getUser().subscribe(
      success => {
        this.accountdata = success;
      },
      error => {
        this.authService.removeToken();
        this.toastr.error('유저 정보를 찾을 수 없습니다.');
        this.router.navigate(['login']);
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit() {
    console.log(this.secessionForm);
    this.secessionForm.reset();
  }

  get userpw() {
    return this.secessionForm.get('userpw');
  }
}
