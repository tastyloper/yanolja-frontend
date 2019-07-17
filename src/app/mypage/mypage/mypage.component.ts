import { Component, OnInit } from '@angular/core';

import { SubTitleService } from '../../core/services/sub-title.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {

  constructor(
    private subTitleService: SubTitleService
  ) { }

  ngOnInit() {
    this.subTitleService.pagaTitle = '마이페이지';
    this.subTitleService.pagaDescription = '나의 정보들을 한눈에 확인하세요!';
  }

}
