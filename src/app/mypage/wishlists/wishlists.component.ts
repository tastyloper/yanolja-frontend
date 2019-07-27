import { Component, OnInit } from '@angular/core';

import { SubTitleService } from '../../core/services/sub-title.service';

import { Stay } from '../../core/types/stay.interface';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.scss']
})
export class WishlistsComponent implements OnInit {
  likes: Stay[];

  constructor(private subTitleService: SubTitleService) {}

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
        name: '역삼 리치웰',
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
        name: '역삼 리치웰',
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
        name: '역삼 리치웰',
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
      // },
      // {
      //   id: 4,
      //   category: 1,
      //   name: '역삼 리치웰',
      //   averageGrade: 4.7,
      //   totalComments: 21,
      //   ownerComments: 14,
      //   hoursAvailable: 6,
      //   daysCheckIn: 16,
      //   hoursPrice: '25000',
      //   daysPrice: '25000',
      //   saleHoursPrice: '25000',
      //   saleDaysPrice: '25000',
      //   directions: '선릉역 4번출구 도보10분',
      //   mainImage: 'https://yaimg.yanolja.com/resize/place/v4/2017/08/24/06/640/599df9c8524630.94491845.jpg'
      // },
      // {
      //   id: 5,
      //   category: 1,
      //   name: '역삼 리치웰',
      //   averageGrade: 4.7,
      //   totalComments: 21,
      //   ownerComments: 14,
      //   hoursAvailable: 6,
      //   daysCheckIn: 16,
      //   hoursPrice: '25000',
      //   daysPrice: '25000',
      //   saleHoursPrice: '25000',
      //   saleDaysPrice: '25000',
      //   directions: '선릉역 4번출구 도보10분',
      //   mainImage: 'https://yaimg.yanolja.com/resize/place/v4/2017/08/24/06/640/599df9c8524630.94491845.jpg'
      }
    ];
  }

  likeAction(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('123');
  }
}
