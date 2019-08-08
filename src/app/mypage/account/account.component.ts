import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { SubTitleService } from '../../core/services/sub-title.service';
import { AuthService } from '../../core/services/auth.service';

import { User } from '../../core/types/user.interface';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  secessionForm: FormGroup;
  modalRef: BsModalRef;
  accountdata: User;

  constructor(
    private subTitleService: SubTitleService,
    private modalService: BsModalService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.subTitleService.pagaTitle = '마이페이지';
    this.subTitleService.pagaDescription = '나의 정보들을 한눈에 확인하세요!';

    this.getData();
  }

  btnSecession() {
    this.authService.secession().subscribe(
      success => {
        this.toastr.success('정상적으로 탈퇴되었습니다.');
        this.router.navigate(['']);
        this.authService.removeToken();
      },
      error => {
        console.log(error);
        this.toastr.error('시스템 오류로 인해 관리자에게 문의해주세요');
        this.router.navigate(['']);
      }
    );
    this.modalRef.hide();
  }

  getData() {
    // 가데이터
    // this.account = {
    //   nickname: '연희내꺼야',
    //   email: 'tak@gmail.com',
    //   phoneNumber: '01042221234'
    // };
    this.isLoading$.next(true);
    this.authService.getUser().subscribe(
      success => {
        this.accountdata = success;
      },
      error => {
        console.log(error);
        this.authService.removeToken();
        this.toastr.error('유저 정보를 찾을 수 없습니다.');
        this.router.navigate(['login']);
      },
      () => {
        this.isLoading$.next(false);
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
