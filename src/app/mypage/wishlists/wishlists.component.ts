import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { SubTitleService } from '../../core/services/sub-title.service';
import { WishlistsService } from '../../core/services/wishlists.service';

import { Stay } from '../../core/types/stay.interface';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.scss']
})
export class WishlistsComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private likes: Stay[];
  pager: any = {};
  pagedItems: any[];

  constructor(
    private subTitleService: SubTitleService,
    private wishlistsService: WishlistsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.subTitleService.pagaTitle = '찜목록';
    this.subTitleService.pagaDescription = '찜한 숙소를 한 눈에!';

    this.getLike();
  }

  getLike() {
    // this.likes = [
    //   {
    //     directions: '강남역 초인접 위치(도로 5분 거리)',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼마레',
    //     stayId: 1,
    //     totalComments: 9,
    //     averageGrade: 4.5,
    //     ownerComments: 7,
    //     hoursPrice: '25000',
    //     hoursAvailable: 4,
    //     saleHoursPrice: '10000',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '역삼역 도보 10분 거리',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼 호텔 The Artist',
    //     stayId: 3,
    //     totalComments: 0,
    //     averageGrade: 0,
    //     ownerComments: 0,
    //     hoursPrice: '30000',
    //     hoursAvailable: 3,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '',
    //     saleDaysPrice: ''
    //   },
    //   {
    //     directions: '강남역 초인접 위치(도로 5분 거리)',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼마레1',
    //     stayId: 4,
    //     totalComments: 9,
    //     averageGrade: 4.5,
    //     ownerComments: 7,
    //     hoursPrice: '',
    //     hoursAvailable: 4,
    //     saleHoursPrice: '',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '역삼역 도보 10분 거리',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼 호텔 The Artist2',
    //     stayId: 5,
    //     totalComments: 0,
    //     averageGrade: 0,
    //     ownerComments: 0,
    //     hoursPrice: '30000',
    //     hoursAvailable: 3,
    //     saleHoursPrice: '',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: '41200'
    //   },
    //   {
    //     directions: '역삼역 도보 10분 거리',
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     category: '모텔',
    //     stay: '역삼 호텔 The Artist3',
    //     stayId: 6,
    //     totalComments: 0,
    //     averageGrade: 0,
    //     ownerComments: 0,
    //     hoursPrice: '30000',
    //     hoursAvailable: 3,
    //     saleHoursPrice: '18500',
    //     daysCheckIn: 22,
    //     daysPrice: '50000',
    //     saleDaysPrice: ''
    //   }
    // ];

    this.isLoading$.next(true);
    this.wishlistsService.getWishlist().subscribe(
      data => {
        this.likes = data;
        this.setPage(1);
      },
      error => {
        console.log(error);
        this.toastr.error('치명적인 오류가 발생했습니다. 관리자에게 문의하세요.');
      },
      () => {
        this.isLoading$.next(false);
      }
    );
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
    const pages = Array.from({ length: endPage }, (v, i) => i + startPage);
    // const pages = [...Array(endPage).keys()].map(i => i + startPage);
    // https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n

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
}
