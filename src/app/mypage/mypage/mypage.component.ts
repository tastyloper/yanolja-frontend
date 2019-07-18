import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { SubTitleService } from '../../core/services/sub-title.service';


@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {
  secessionForm: FormGroup;
  modalRef: BsModalRef;

  constructor(
    private subTitleService: SubTitleService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.subTitleService.pagaTitle = '마이페이지';
    this.subTitleService.pagaDescription = '나의 정보들을 한눈에 확인하세요!';

    this.secessionForm = this.fb.group({
      userpw: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
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
