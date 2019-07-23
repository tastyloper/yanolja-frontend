import { Component, OnInit } from '@angular/core';

import { SubTitleService } from 'src/app/core/services/sub-title.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {

  constructor(private subTitleService: SubTitleService) { }

  ngOnInit() {
    this.subTitleService.pagaTitle = '회원정보수정';
    this.subTitleService.pagaDescription = '나의 정보들을 수정하세요.';
  }
}
