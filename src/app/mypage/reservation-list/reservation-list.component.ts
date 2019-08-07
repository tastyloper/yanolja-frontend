import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { SubTitleService } from '../../core/services/sub-title.service';
import { ReservationService } from '../../core/services/reservation.service';

import { Reservation } from '../../core/types/reservation.interface';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
  lists: Reservation[];
  pager: any = {};
  pagedItems: any[];

  constructor(
    private subTitleService: SubTitleService,
    private reservationService: ReservationService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.subTitleService.pagaTitle = '예약내역';
    this.subTitleService.pagaDescription = '내가 예약/사용한 목록';

    this.getData();
  }

  splitDate(date: string) {
    return `${date.split('T')[0]}`;
  }

  getData() {
    this.reservationService.getListReservation().subscribe(
      data => {
        this.lists = data;
        this.setPage(1);
      },
      error => {
        console.log(error);
        this.toastr.error('치명적인 오류가 발생했습니다. 관리자에게 문의하세요.');
      }
    );

    // this.lists = [
    //   {
    //     stay: '역삼마레',
    //     room: '특실',
    //     checkIn: '2019-07-01T02:27:46',
    //     checkOut: '2019-07-01T05:00:00',
    //     reservationId: 5,
    //     stayId: 1,
    //     roomId: 3,
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     commentLeaved: true
    //   },
    //   {
    //     stay: '삼성캘리포니아',
    //     room: '특실',
    //     checkIn: '2019-07-01T02:27:46',
    //     checkOut: '2019-07-01T05:00:00',
    //     reservationId: 5,
    //     stayId: 1,
    //     roomId: 3,
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     commentLeaved: true
    //   },
    //   {
    //     stay: '선릉호텔스타',
    //     room: '특실',
    //     checkIn: '2019-07-01T02:27:46',
    //     checkOut: '2019-07-01T05:00:00',
    //     reservationId: 5,
    //     stayId: 1,
    //     roomId: 3,
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     commentLeaved: true
    //   },
    //   {
    //     stay: '선릉호텔스타',
    //     room: '특실',
    //     checkIn: '2019-07-01T02:27:46',
    //     checkOut: '2019-07-01T05:00:00',
    //     reservationId: 5,
    //     stayId: 1,
    //     roomId: 3,
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     commentLeaved: true
    //   },
    //   {
    //     stay: '선릉호텔스타',
    //     room: '특실',
    //     checkIn: '2019-07-01T02:27:46',
    //     checkOut: '2019-07-01T05:00:00',
    //     reservationId: 5,
    //     stayId: 1,
    //     roomId: 3,
    //     mainImage: 'https://yaimg.yanolja.com/v5/2018/10/04/11/1280/5bb577c8ad2cb3.53607180.JPG',
    //     commentLeaved: true
    //   }
    // ];
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.getPager(this.lists.length, page);
    this.pagedItems = this.lists.slice(this.pager.startIndex, this.pager.endIndex + 1);
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
