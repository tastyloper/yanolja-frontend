import { Component, OnInit } from '@angular/core';

import { SubTitleService } from '../../core/services/sub-title.service';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.scss']
})
export class WishlistsComponent implements OnInit {

  constructor(private subTitleService: SubTitleService) {}

  ngOnInit() {
    this.subTitleService.pagaTitle = '찜목록';
    this.subTitleService.pagaDescription = '찜한 숙소를 한 눈에!';
  }

  likeAction(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('123');
  }
}
