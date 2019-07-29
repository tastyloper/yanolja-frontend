import { Component, OnInit } from '@angular/core';

import { SubTitleService } from '../../core/services/sub-title.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  constructor(private subTitleService: SubTitleService) {}

  ngOnInit() {
    this.subTitleService.pagaTitle = '후기';
    this.subTitleService.pagaDescription = '후기를 한눈에 확인하세요!';
  }
}
