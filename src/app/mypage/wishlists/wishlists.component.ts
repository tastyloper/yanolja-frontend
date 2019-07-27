import { Component, OnInit } from '@angular/core';

import { SubTitleService } from '../../core/services/sub-title.service';

import { Stay } from '../../core/types/stay.interface';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.scss']
})
export class WishlistsComponent implements OnInit {
  private likes: Stay[];
  pager: any = {};
  pagedItems: any[];

  constructor(
    private subTitleService: SubTitleService
  ) {}

  ngOnInit() {
    this.subTitleService.pagaTitle = '찜목록';
    this.subTitleService.pagaDescription = '찜한 숙소를 한 눈에!';

    this.getLike();
  }

  getLike() {
    this.likes = [
      {
        id: 1,
        category: 1,
        name: '역삼 리치웰1',
        averageGrade: 4.7,
        totalComments: 21,
        ownerComments: 14,
        hoursAvailable: 6,
        daysCheckIn: 16,
        hoursPrice: '25000',
        daysPrice: '25000',
        saleHoursPrice: '25000',
        saleDaysPrice: '25000',
        directions: '선릉역 4번출구 도보10분',
        mainImage: 'https://yaimg.yanolja.com/resize/place/v4/2017/08/24/06/640/599df9c8524630.94491845.jpg'
      },
      {
        id: 2,
        category: 1,
        name: '역삼 리치웰2',
        averageGrade: 4.7,
        totalComments: 21,
        ownerComments: 14,
        hoursAvailable: 6,
        daysCheckIn: 16,
        hoursPrice: '25000',
        daysPrice: '25000',
        saleHoursPrice: '25000',
        saleDaysPrice: '25000',
        directions: '선릉역 4번출구 도보10분',
        mainImage: 'https://yaimg.yanolja.com/resize/place/v4/2017/08/24/06/640/599df9c8524630.94491845.jpg'
      },
      {
        id: 3,
        category: 1,
        name: '역삼 리치웰3',
        averageGrade: 4.7,
        totalComments: 21,
        ownerComments: 14,
        hoursAvailable: 6,
        daysCheckIn: 16,
        hoursPrice: '25000',
        daysPrice: '25000',
        saleHoursPrice: '25000',
        saleDaysPrice: '25000',
        directions: '선릉역 4번출구 도보10분',
        mainImage: 'https://yaimg.yanolja.com/resize/place/v4/2017/08/24/06/640/599df9c8524630.94491845.jpg'
      },
      {
        id: 4,
        category: 1,
        name: '역삼 리치웰4',
        averageGrade: 4.7,
        totalComments: 21,
        ownerComments: 14,
        hoursAvailable: 6,
        daysCheckIn: 16,
        hoursPrice: '25000',
        daysPrice: '25000',
        saleHoursPrice: '25000',
        saleDaysPrice: '25000',
        directions: '선릉역 4번출구 도보10분',
        mainImage: 'https://yaimg.yanolja.com/resize/place/v4/2017/08/24/06/640/599df9c8524630.94491845.jpg'
      },
      {
        id: 5,
        category: 1,
        name: '역삼 리치웰5',
        averageGrade: 4.7,
        totalComments: 21,
        ownerComments: 14,
        hoursAvailable: 6,
        daysCheckIn: 16,
        hoursPrice: '25000',
        daysPrice: '25000',
        saleHoursPrice: '25000',
        saleDaysPrice: '25000',
        directions: '선릉역 4번출구 도보10분',
        mainImage: 'https://yaimg.yanolja.com/resize/place/v4/2017/08/24/06/640/599df9c8524630.94491845.jpg'
      }
    ];

    this.setPage(1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.getPager(this.likes.length, page);
    this.pagedItems = this.likes.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 3) {
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number;
    let endPage: number;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages = [...Array(endPage).keys()].map(i => i + startPage);

    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }

  likeAction(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('123');
  }
}
