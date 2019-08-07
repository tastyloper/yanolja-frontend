import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MapsAPILoader } from '@agm/core';
import { ToastrService } from 'ngx-toastr';

// StayListService import
import { StayListService } from 'src/app/core/services/stay-list.service';
// Interface of Stay import
import { Stay, StayList } from '../../core/types/stay.interface';

declare const google: any;

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.scss']
})
export class AccommodationListComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isMapLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
//   tempList = [
//     {
//         "directions": "9호선 언주역 4번 출구",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/20/21/1280/599984973eed81.20023569.JPG",
//         "category": "모텔",
//         "stay": "YAJA 강남 논현점",
//         "stayId": 1118,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 21,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "왕십리역 1번출구에서 도보 5분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/08/14/16/1280/5b72864d91b7a0.61985021.jpg",
//         "category": "모텔",
//         "stay": "왕십리 부르네",
//         "stayId": 1161,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 23,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "2호선 5호선왕십리 1번출구",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/23/17/1280/599d3d17d442c4.13241680.jpg",
//         "category": "모텔",
//         "stay": "왕십리 썬",
//         "stayId": 1162,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 14,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/04/25/17/1280/5cc16ba7bf0215.79195338.jpg",
//         "category": "모텔",
//         "stay": "역삼 Hotel The Artist",
//         "stayId": 1115,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 21,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "신사역 1번 출구 도보 5분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/05/15/18/1280/5cdbd7e1231340.97996558.jpg",
//         "category": "모텔",
//         "stay": "논현(신사) 하이랜드",
//         "stayId": 1116,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 16,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "삼성중앙역 1번출구 도보 2",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/01/30/13/1280/5c5125307e7452.98056409.jpg",
//         "category": "모텔",
//         "stay": "삼성 베드스테이션",
//         "stayId": 1117,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "25000",
//         "hoursAvailable": 6,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "25000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "2호선 선릉역 10번출구 도보 6분",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/23/14/1280/599d0c8f87c5e4.00486075.jpg",
//         "category": "모텔",
//         "stay": "삼성 디 에이스",
//         "stayId": 1119,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 20,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "선릉역",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/21/11/1280/599a438f684a90.86764132.jpg",
//         "category": "모텔",
//         "stay": "삼성 캘리포니아",
//         "stayId": 1120,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "30000",
//         "hoursAvailable": 5,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/10/12/10/1280/5bbff58525fff2.86179701.jpg",
//         "category": "모텔",
//         "stay": "선릉 베드스테이션",
//         "stayId": 1121,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "25000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "25000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "선릉역 10번출구 도보5분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/04/03/17/1280/5ac340e4357659.17125399.jpg",
//         "category": "모텔",
//         "stay": "선릉 호텔 발리",
//         "stayId": 1122,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "25000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "25000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "선릉역 10번출구 도보5분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/04/03/17/1280/5ac340e4357659.17125399.jpg",
//         "category": "모텔",
//         "stay": "선릉 호텔 발리",
//         "stayId": 1123,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 15,
//         "daysPrice": "88800",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/06/19/18/1280/5b28cb676f5664.67686425.jpg",
//         "category": "모텔",
//         "stay": "강남 SENNE(세느)",
//         "stayId": 1124,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 21,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "르네상스호텔 사거리 인근",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/24/06/1280/599df9c8524630.94491845.jpg",
//         "category": "모텔",
//         "stay": "역삼 리치웰",
//         "stayId": 1125,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "27000",
//         "hoursAvailable": 5,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "27000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/23/17/1280/599d37334eb6f8.45590014.jpg",
//         "category": "모텔",
//         "stay": "역삼 호텔스타 프리미어",
//         "stayId": 1126,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 21,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2017/12/07/16/1280/5a28ef415629b7.55222498.jpg",
//         "category": "모텔",
//         "stay": "역삼 녹스 호텔",
//         "stayId": 1127,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 15,
//         "daysPrice": "85000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "역삼역 8번출구 도보 5분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/12/18/09/1280/5c1843eb8b3011.74210745.jpg",
//         "category": "모텔",
//         "stay": "H Avenue 역삼점",
//         "stayId": 1128,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "40000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "역삼역 7,8번출구 도보3분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/09/13/15/1280/5b9a071045c274.66663001.jpg",
//         "category": "모텔",
//         "stay": "역삼 호텔 더 뮤즈",
//         "stayId": 1129,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 23,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/04/25/17/1280/5cc16ba7bf0215.79195338.jpg",
//         "category": "모텔",
//         "stay": "역삼 Hotel The Artist",
//         "stayId": 1130,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "30000",
//         "hoursAvailable": 0,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2017/08/17/18/1280/59955e2d4f9503.94728440.jpg",
//         "category": "모텔",
//         "stay": "역삼 호텔 더 매트",
//         "stayId": 1131,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "30000",
//         "hoursAvailable": 5,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "르네상스호텔 사거리 인근",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/24/06/1280/599df9c8524630.94491845.jpg",
//         "category": "모텔",
//         "stay": "역삼 리치웰",
//         "stayId": 1114,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 14,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2017/08/17/18/1280/59955f7640ee12.68471508.jpg",
//         "category": "모텔",
//         "stay": "역삼 VERY SIX",
//         "stayId": 1132,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 20,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "선릉역 4번출구 도보10분",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/18/18/1280/5996b3a0dcd1a6.11815395.JPG",
//         "category": "모텔",
//         "stay": "역삼 컬리넌",
//         "stayId": 1133,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 21,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "역삼역 1번출구 도보 5분",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/21/11/1280/599a445240a802.32248447.jpg",
//         "category": "모텔",
//         "stay": "역삼 아나",
//         "stayId": 1134,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "35000",
//         "hoursAvailable": 6,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "35000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "역삼역 1번 출구 도보 5분",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/23/14/1280/599d160ab30c00.19752238.jpg",
//         "category": "모텔",
//         "stay": "역삼 Premier Hotel XYM",
//         "stayId": 1135,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "20000",
//         "hoursAvailable": 1,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "20000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "역삼역 1번 출구 도보 5분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/12/18/15/1280/5c189ae1e25ac5.53956176.jpg",
//         "category": "모텔",
//         "stay": "역삼 바레",
//         "stayId": 1136,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 20,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "강남, 역삼역 1번 출구 한국은행 후문 전방 100m",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/05/31/19/1280/5cf0fb5c8bb643.22412178.jpg",
//         "category": "모텔",
//         "stay": "역삼 SUNGSIM",
//         "stayId": 1137,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "30000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "역삼역 1번출구 도보 3분.",
//         "mainImage": "https://yaimg.yanolja.com/v5/2017/11/16/17/1280/5a0d5025becc08.90955197.jpg",
//         "category": "모텔",
//         "stay": "역삼 아드리게",
//         "stayId": 1138,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "35000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "35000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/01/16/13/1280/5c3eb7db551886.95052864.jpg",
//         "category": "모텔",
//         "stay": "왕십리 Remark(리마크)",
//         "stayId": 1139,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 20,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "성동구의회 건너편",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/06/22/17/1280/5b2cb337b96872.12125038.jpg",
//         "category": "모텔",
//         "stay": "왕십리 H호텔",
//         "stayId": 1140,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "30000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "왕십리역 1번출구 도보5분 ",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/10/31/11/1280/5bd910d1d29d73.66043464.jpg",
//         "category": "모텔",
//         "stay": "왕십리 컬리넌",
//         "stayId": 1141,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "25000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "25000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/01/16/13/1280/5c3eb7db551886.95052864.jpg",
//         "category": "모텔",
//         "stay": "왕십리 Remark(리마크)",
//         "stayId": 1142,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "25000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "25000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "성동구청 근처",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/24/20/1280/599eb2eb489712.95035625.jpg",
//         "category": "모텔",
//         "stay": "왕십리 The ZaZa (더 자자)",
//         "stayId": 1143,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "20000",
//         "hoursAvailable": 5,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "20000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "왕십리역 2번 출구 5분거리",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/24/18/1280/599e9fe775aeb4.14609659.jpg",
//         "category": "모텔",
//         "stay": "왕십리 비앤엘",
//         "stayId": 1144,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 20,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "왕십리역 1번출구 도보5분",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/18/15/1280/59968808ba0580.40334949.JPG",
//         "category": "모텔",
//         "stay": "왕십리 리젠트호텔",
//         "stayId": 1145,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "35000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "35000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/21/06/1280/5999fc61015017.90327887.jpg",
//         "category": "모텔",
//         "stay": "왕십리 FORESTAR (포레스타)",
//         "stayId": 1146,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "30000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "성동구의회 건너편",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/06/22/17/1280/5b2cb337b96872.12125038.jpg",
//         "category": "모텔",
//         "stay": "왕십리 H호텔",
//         "stayId": 1147,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 20,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "왕십리역 2번출구 도보 5분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/03/15/15/1280/5c8b49ec697557.58930682.jpg",
//         "category": "모텔",
//         "stay": "왕십리 스위트",
//         "stayId": 1148,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "30000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "왕십리역 1번출구 도보5분 ",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/10/31/11/1280/5bd910d1d29d73.66043464.jpg",
//         "category": "모텔",
//         "stay": "왕십리 컬리넌",
//         "stayId": 1149,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "25000",
//         "hoursAvailable": 5,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "25000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "왕십리 1번 출구 도보 3분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/07/16/10/1280/5b4bfabad70403.69940868.jpg",
//         "category": "모텔",
//         "stay": "왕십리 라테라",
//         "stayId": 1150,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "20000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "왕십리 1번출구 도보 5분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/05/18/18/1280/5afe9a55e41398.09974972.jpg",
//         "category": "모텔",
//         "stay": "왕십리 아모렉스",
//         "stayId": 1151,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "40000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "40000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "성동구청 인근 위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/06/11/10/1280/5b1dd35e6982b7.62139235.jpg",
//         "category": "모텔",
//         "stay": "왕십리 쥬방스",
//         "stayId": 1152,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "18000",
//         "hoursAvailable": 5,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "18000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "왕십리역 2번출구 도보 5분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/02/08/17/1280/5c5d3eabf2a991.20652042.jpg",
//         "category": "모텔",
//         "stay": "YAJA 왕십리역점",
//         "stayId": 1153,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "20000",
//         "hoursAvailable": 3,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "20000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/12/05/14/1280/5c07656b33ff40.96940062.JPG",
//         "category": "모텔",
//         "stay": "왕십리 메종",
//         "stayId": 1154,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "20000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "왕십리역 1번출구에서 도보 5분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/08/14/16/1280/5b72864d91b7a0.61985021.jpg",
//         "category": "모텔",
//         "stay": "왕십리 부르네",
//         "stayId": 1163,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "20000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "20000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "성동구청 인근 위치",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/20/05/1280/59989f20e47034.95725188.jpg",
//         "category": "모텔",
//         "stay": "왕십리 파레스",
//         "stayId": 1155,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "20000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "20000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "왕십리 2번출구 5분거리",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/24/13/1280/599e5c6c74b8a3.48818208.jpg",
//         "category": "모텔",
//         "stay": "왕십리 미르",
//         "stayId": 1156,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "18000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "18000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "왕십리역 1번 출구 도보8분",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/20/07/1280/5998b522077201.89833464.jpg",
//         "category": "모텔",
//         "stay": "왕십리 코림",
//         "stayId": 1157,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "18000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "18000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/18/22/1280/5996ed17a68199.98994084.JPG",
//         "category": "모텔",
//         "stay": "왕십리 버니3",
//         "stayId": 1158,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "30000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "왕십리역 1번출구 도보5분",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/20/15/1280/599925b742c049.03784933.JPG",
//         "category": "모텔",
//         "stay": "왕십리 젠",
//         "stayId": 1159,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "18000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "18000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "2호선 5호선왕십리 1번출구",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/23/17/1280/599d3d17d442c4.13241680.jpg",
//         "category": "모텔",
//         "stay": "왕십리 썬",
//         "stayId": 1160,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "hoursPrice": "30000",
//         "hoursAvailable": 4,
//         "saleHoursPrice": "0",
//         "daysCheckIn": 15,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/03/16/1280/5d1c5f08d57ac9.14728995.jpg",
//         "category": "펜션",
//         "stay": "가평 빌라지아펜션",
//         "stayId": 1185,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "99000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/07/21/1280/5d21e2d8e02267.81364851.jpg",
//         "category": "펜션",
//         "stay": "가평 카라펜션",
//         "stayId": 1186,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "158500",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/06/10/16/1280/5cfe029ac988e8.04044058.jpg",
//         "category": "펜션",
//         "stay": "가평 까사베르디펜션",
//         "stayId": 1187,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "148500",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/06/25/16/1280/5d11d438c1d3e8.60997149.jpg",
//         "category": "펜션",
//         "stay": "가평 힐앤폴하우스(키즈풀빌라,MD추천)",
//         "stayId": 1188,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 15,
//         "daysPrice": "112000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/10/20/15/1280/5bcac87df18079.34841395.jpg",
//         "category": "펜션",
//         "stay": "가평 SG베네치아펜션",
//         "stayId": 1189,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "122100",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/06/17/11/1280/5d0701adca4950.55134495.jpg",
//         "category": "펜션",
//         "stay": "가평 가둘기정원펜션(수영장3개 OPEN.온수수영장)",
//         "stayId": 1190,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "82500",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/26/12/1280/5d3a7400c09579.22659707.jpg",
//         "category": "펜션",
//         "stay": "가평 파라디소펜션 (스파펜션, MD추천)",
//         "stayId": 1191,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 15,
//         "daysPrice": "365900",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/15/19/1280/5d2c504139bfa9.22363078.jpg",
//         "category": "펜션",
//         "stay": "가평 깊은사나래 펜션(MD추천,스파펜션)",
//         "stayId": 1192,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "121000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/29/16/1280/5d3e9c9e88dc16.99973483.jpg",
//         "category": "펜션",
//         "stay": "가평 동반펜션(애견실내온수풀빌라,애견펜션)",
//         "stayId": 1193,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "160400",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/04/17/1280/5d1dbf428aa5e8.04954655.jpg",
//         "category": "펜션",
//         "stay": "가평 더베이리조트(수상레저리조트,MD추천)",
//         "stayId": 1194,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "104500",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/06/21/00/1280/5d0ba64af32c38.52772042.jpg",
//         "category": "펜션",
//         "stay": "가평 엘리에셀펜션",
//         "stayId": 1195,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "134000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/05/24/17/1280/5ce7a578b86198.83057076.jpg",
//         "category": "펜션",
//         "stay": "가평 블루펜션",
//         "stayId": 1196,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 15,
//         "daysPrice": "72000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/22/14/1280/5d354af62b3fb7.03881603.jpg",
//         "category": "펜션",
//         "stay": "가평 루체른펜션",
//         "stayId": 1197,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "104500",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/05/20/18/1280/5ce2743c08d055.22304165.jpg",
//         "category": "펜션",
//         "stay": "가평 펜션아리(온수수영장,MD추천)",
//         "stayId": 1198,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "150000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/04/04/15/1280/5ca5aab01f60b2.62062852.jpg",
//         "category": "펜션",
//         "stay": "가평 춘향이와방자펜션",
//         "stayId": 1199,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "99000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/07/21/13/1280/5b52bd73f30969.71477623.jpg",
//         "category": "펜션",
//         "stay": "가평 로렌시아펜션",
//         "stayId": 1200,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "148800",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/15/11/1280/5d2be5ad72cd63.47699661.jpg",
//         "category": "펜션",
//         "stay": "가평 리버52로드펜션 ",
//         "stayId": 1201,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "125000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/06/05/14/1280/5cf74c6b0719b0.78356488.jpg",
//         "category": "펜션",
//         "stay": "가평 에비뉴펜션",
//         "stayId": 1202,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 18,
//         "daysPrice": "105900",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/25/14/1280/5d393817273558.19473750.jpg",
//         "category": "펜션",
//         "stay": "가평 올라펜션 (수영장, MD추천펜션)",
//         "stayId": 1184,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 18,
//         "daysPrice": "105900",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/03/10/1280/5d1c073660bc92.80469754.jpg",
//         "category": "펜션",
//         "stay": "가평 초록별펜션 (스파펜션,MD추천)",
//         "stayId": 1183,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "129000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "역삼역 1번 출구 도보 8분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/05/14/17/1280/5cda80a2539716.92344717.jpg",
//         "category": "호텔",
//         "stay": "역삼 베리식스 호텔",
//         "stayId": 1181,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "189000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "삼성역 5번출구 510m",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/08/23/15/1280/5b7e530b4781f5.81206171.jpg",
//         "category": "호텔",
//         "stay": "호텔 페이토 삼성",
//         "stayId": 1164,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "309000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "역삼역 8번출구 도보 10분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/29/19/1280/5d3ec7e57a7816.55885223.jpg",
//         "category": "호텔",
//         "stay": "신라스테이 역삼",
//         "stayId": 1165,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "145000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "역삼역 4번출구 50m",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/24/09/1280/5d37a6339dc1d9.12700426.jpg",
//         "category": "호텔",
//         "stay": "머큐어 앰배서더 강남 쏘도베",
//         "stayId": 1166,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "310000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "역삼역, 언주역 도보 5분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/11/22/1280/5d2737ca91fed3.21394135.jpg",
//         "category": "호텔",
//         "stay": "호텔 세느 강남",
//         "stayId": 1167,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 15,
//         "daysPrice": "829000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "신논현역,언주역 도보 5분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/15/23/1280/5d2c8a29598be2.75386981.jpg",
//         "category": "호텔",
//         "stay": "도미인 서울 강남",
//         "stayId": 1168,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "169000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "선정릉역 3번출구 50m",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/29/10/1280/5d3e4e40134516.79633520.jpg",
//         "category": "호텔",
//         "stay": "라마다 서울 강남",
//         "stayId": 1169,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "590000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "신논현역 4번출구 도보 3분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/17/19/1280/5d2eff1321d7d1.88503790.jpg",
//         "category": "호텔",
//         "stay": "르 메르디앙 서울",
//         "stayId": 1170,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "369000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "삼성역 1번출구 도보 1분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/30/11/1280/5d3fb1d65a4460.73689570.jpg",
//         "category": "호텔",
//         "stay": "글래드 강남 코엑스 센터",
//         "stayId": 1171,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "229000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "선릉역 10번출구 도보 3분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/09/06/16/1280/5b90da81092575.29764213.jpg",
//         "category": "호텔",
//         "stay": "L7 강남 바이 롯데",
//         "stayId": 1172,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "189000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "삼성역 4번출구 500m",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/05/18/1280/5d1f140bef84a3.58937694.jpg",
//         "category": "호텔",
//         "stay": "이비스 스타일 앰배서더 강남",
//         "stayId": 1173,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 15,
//         "daysPrice": "489000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "역삼역 8번출구 300m",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/03/16/1280/5d1c5b956ff970.08675446.jpg",
//         "category": "호텔",
//         "stay": "호텔 그라모스",
//         "stayId": 1174,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "188000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "선릉역 10번출구 도보 5분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/07/16/12/1280/5b4c107b5f8c73.96352249.jpg",
//         "category": "호텔",
//         "stay": "호텔 캘리포니아 삼성",
//         "stayId": 1175,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "219000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "삼성역 5번출구 300m",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/30/11/1280/5d3fa906a22723.32146697.jpg",
//         "category": "호텔",
//         "stay": "호텔 더 디자이너스 삼성",
//         "stayId": 1176,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "149000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "선정릉역 3번출구 도보 2분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/07/23/18/1280/5d36da433392e2.08884319.jpg",
//         "category": "호텔",
//         "stay": "호텔 크레센도 서울 (구. 알코브호텔 서울)",
//         "stayId": 1177,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "269000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "삼성역 5번출구 500m",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/09/10/11/1280/5b95d2fd500ec4.71714686.jpg",
//         "category": "호텔",
//         "stay": "호텔 유리앤",
//         "stayId": 1178,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "309000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "역삼역 1번출구 도보 4분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/04/02/17/1280/5ca322186fb6b1.48367764.jpg",
//         "category": "호텔",
//         "stay": "카파스 호텔",
//         "stayId": 1179,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "195000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "역삼역 8번출구 620m",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/04/13/08/1280/5cb124d64a64d5.19321082.JPG",
//         "category": "호텔",
//         "stay": "역삼 아르누보 호텔",
//         "stayId": 1180,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "500000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "역삼역 1번 출구 도보 8분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/05/31/11/1280/5cf0977972b8b6.81685809.jpg",
//         "category": "호텔",
//         "stay": "역삼 호텔 더 매트",
//         "stayId": 1182,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "249000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "홍대놀이터 도보 10초 ",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/12/04/17/1280/5c06400b1e6489.45182079.jpg",
//         "category": "게스트하우스",
//         "stay": "홍대 컴인 여성전용 게스트하우스",
//         "stayId": 1203,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "25000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "보람1단지아파트",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/04/17/11/1280/5cb68f5e8ab0a6.59599991.jpg",
//         "category": "게스트하우스",
//         "stay": "서울 그리너리하우스",
//         "stayId": 1204,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 16,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/06/21/19/1280/5d0cb4baa16782.25114201.jpg",
//         "category": "게스트하우스",
//         "stay": "서울 풀하우스 모텔&게스트하우스",
//         "stayId": 1205,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "4호선 혜화역1, 4번 출구 88구민생활관(과학고)",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/06/13/12/1280/5d01c07111c107.57380993.jpg",
//         "category": "게스트하우스",
//         "stay": "서울 한옥유진 게스트하우스",
//         "stayId": 1206,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "200000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "명동역 1번,2번 출구",
//         "mainImage": "https://yaimg.yanolja.com/v5/2019/06/13/15/1280/5d01f0e9676ba5.03116579.jpg",
//         "category": "게스트하우스",
//         "stay": "서울 명동 게스트하우스",
//         "stayId": 1207,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 16,
//         "daysPrice": "180000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "신촌역 7번 출구 도보5분",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/19/09/1280/59978cb43dd207.71553726.jpg",
//         "category": "게스트하우스",
//         "stay": "신촌 오빠호스텔",
//         "stayId": 1208,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 15,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "동묘앞역 3번출구 도보4분",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/20/20/1280/5999772f54b659.99109525.jpg",
//         "category": "게스트하우스",
//         "stay": "호스텔 코리아 동대문점(10호점)",
//         "stayId": 1209,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 14,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "홍대입구역 근처",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/24/13/1280/599e4f8b6d7cd1.05257396.jpg",
//         "category": "게스트하우스",
//         "stay": "홍대 코쿤스테이 게스트하우스",
//         "stayId": 1210,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 15,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "순천향대학병원 도보 1분거리",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/20/19/1280/599962533bd878.82581788.jpg",
//         "category": "게스트하우스",
//         "stay": "이태원 엠버시 게스트하우스",
//         "stayId": 1211,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 14,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "북촌한옥마을 근처",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/24/22/1280/599ed7ba56b1d4.60892911.jpg",
//         "category": "게스트하우스",
//         "stay": "삼청동 코리아게스트하우스",
//         "stayId": 1212,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 14,
//         "daysPrice": "450000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "이태원역 도보 2분",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/03/06/11/1280/5a9df7675001d7.53996846.jpg",
//         "category": "게스트하우스",
//         "stay": "이태원 G게스트하우스",
//         "stayId": 1213,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 14,
//         "daysPrice": "100000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "종각 젊음의 거리 내 위치",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/20/19/1280/599967bdb774a2.49410720.jpg",
//         "category": "게스트하우스",
//         "stay": "24게스트하우스 인사동",
//         "stayId": 1214,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "50000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "망원역 1번출구 방향",
//         "mainImage": "https://yaimg.yanolja.com/v5/2018/08/06/14/1280/5b67e139c57b57.79721426.jpg",
//         "category": "게스트하우스",
//         "stay": "홍대 애플트리 게스트하우스",
//         "stayId": 1215,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "15000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "신촌역 근처",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/24/22/1280/599ed557c0dff3.71533631.jpg",
//         "category": "게스트하우스",
//         "stay": "24게스트하우스 신촌점",
//         "stayId": 1216,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 15,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "광흥창역 근처",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/24/22/1280/599ed522b8c123.50821922.jpg",
//         "category": "게스트하우스",
//         "stay": "서울 모리 게스트하우스",
//         "stayId": 1217,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 14,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "숙소위치",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/23/19/1280/599d5b91727ce4.06020838.jpg",
//         "category": "게스트하우스",
//         "stay": "홍대 나누게스트하우스 케이팝",
//         "stayId": 1218,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 15,
//         "daysPrice": "160000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "충무로역 8번 출구 도보 7분",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/20/09/1280/5998dbcf463ed7.31456123.jpg",
//         "category": "게스트하우스",
//         "stay": "달콤 명동 게스트하우스",
//         "stayId": 1219,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "145000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "공덕역 부근",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/20/19/1280/599964b07f9546.85628467.jpg",
//         "category": "게스트하우스",
//         "stay": "서울 나루 호스텔",
//         "stayId": 1220,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 15,
//         "daysPrice": "60000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "혜화역 1번 출구",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/20/11/1280/5998ed66a06485.34859030.jpg",
//         "category": "게스트하우스",
//         "stay": "서울 더프레젠트 게스트하우스",
//         "stayId": 1221,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 17,
//         "daysPrice": "65000",
//         "saleDaysPrice": "0"
//     },
//     {
//         "directions": "용산가족공원 인근",
//         "mainImage": "https://yaimg.yanolja.com/resize/place/v4/2017/08/25/00/1280/599ef3a08cd2f4.28674461.jpg",
//         "category": "게스트하우스",
//         "stay": "서울 돈키호테 게스트하우스",
//         "stayId": 1222,
//         "totalComments": 0,
//         "averageGrade": 0,
//         "ownerComments": 0,
//         "daysCheckIn": 15,
//         "daysPrice": "30000",
//         "saleDaysPrice": "0"
//     }
// ]

  locale = 'ko';
  locales = listLocales();
  bsValue = new Date();
  bsRangeValue: Date[];
  navClicked = false;
  datePickerConfig: Partial<BsDatepickerConfig>;
  category: string;
  selectRegion = `강남/역삼/선릉/삼성`;
  person = false;
  type = false;
  location = false;
  numberAdult = 2;
  numberChildren = 0;
  minDate: Date;
  maxDate: Date;
  searchBar = {
    type: '',
    location: '',
    date: '',
    member: ''
  };
  queryParams: StayList;
  searchBarShow: string ;
  searchBarLocShow: string;
  searchBarDateShow: string;
  searchBarMemberShow: string;
  pager: any = {};
  pagedItems: any[];
  allPagedItems: any[] = [];
  sstayList: any[] = [];
  scrollState = 1;
  searchParams;
  locationArr = [
    {
      val: '서울',
      active: true,
      arr: [
        '강남/역삼/삼성/논현',
        '서초/신사/방배',
        '잠실/신천(잠실새내)',
        '영등포/여의도',
        '신림/서울대/사당/동작',
        '천호/길동/둔촌',
        '화곡/까치산/양천/목동',
        '구로/금천/오류/신도림',
        '신촌/홍대/합정',
        '연신내/불광/응암',
        '종로/대학로',
        '성신여대/성북/월곡',
        '이태원/용산/서울역/명동/회현',
        '동대문/동묘/신당/충무로/약수',
        '회기/고려대/청량리/신설동',
        '장안동/답십리',
        '건대/군자/구의',
        '왕십리/성수/금호',
        '수유/미아',
        '상봉/중랑/면목',
        '태릉/노원/도봉/창동'
      ]
    },
    {
      val: '경기',
      active: false,
      arr: [
        '수원 인계',
        '수원 권선/영통',
        '수원역/구운/장안/세류',
        '안양/평촌/인덕원/과천',
        '성남/분당/위례',
        '용인',
        '동탄/오산/병점',
        '하남/광주/여주/이천',
        '안산',
        '군포/의왕/금정/산본',
        '시흥/광명',
        '평택/송탄/화성/안성',
        '부천',
        '일산/고양',
        '파주',
        '김포',
        '의정부',
        '구리',
        '남양주',
        '포천',
        '양주/동두천/연천',
        '양평',
        '가평/청평',
        '제부도/대부도'
      ],
    },
    {
      val: '인천',
      active: false,
      arr: [
        '부평',
        '구월',
        '서구(석남,서구청,검단)',
        '계양(작전,경인교대)',
        '주안',
        '송도/연수',
        '인천공항/을왕리',
        '중구(월미도/차이나타운/신포/동인천)',
        '강화/옹진',
        '동암/간석',
        '남동구(소래/만수)',
        '용현/숭의/도화/동구'
      ],
    },
    {
      val: '강원',
      active: false,
      arr: [
        '춘천/강촌',
        '원주',
        '경포대/사천/주문진',
        '강릉역/교동/옥계/정동진',
        '영월/정선',
        '속초/양양/고성',
        '동해/삼척/태백',
        '평창',
        '홍천/횡성',
        '화천/철원/인제/양구'
      ],
    },
    {
      val: '제주',
      active: false,
      arr: [
        '제주시',
        '서귀포시',
        '하귀/애월/한림/협재'
      ],
    },
    {
      val: '대전',
      active: false,
      arr: [
        '유성구',
        '중구(은행/대흥/선화)',
        '동구(용전/복합터미널)',
        '서구(둔산/용문)',
        '대덕구(중리/신탄진)'
      ],
    },
    {
      val: '충북',
      active: false,
      arr: [
        '청주 흥덕구/서원구(청주 터미널)',
        '청주 상당구/청원구(청주국제공항)',
        '충주/수안보',
        '제천/진천/음성/단양',
        '보은/옥천/괴산/증평/영동'
      ],
    },
    {
      val: '충남/세종',
      active: false,
      arr: [
        '천안 서북구',
        '천안 동남구',
        '아산',
        '공주/동학사/세종',
        '계룡/금산/논산/청양',
        '예산/홍성',
        '태안/안면도/서산',
        '당진',
        '보령/대천',
        '서천/부여'
      ],
    },
    {
      val: '부산',
      active: false,
      arr: [
        '해운대/센텀시티/재송',
        '송정/기장/정관',
        '서면/양정/초읍/부산시민공원',
        '남포동/중앙동/태종대/송도/영도',
        '부산역/범일동/부산진역',
        '광안리/수영',
        '경성대/대연/용호동/문현',
        '연산/토곡',
        '동래/사직/온천장/부산대/구서',
        '사상(경전철)/엄궁/학장',
        '덕천/화명/만덕/구포(구포역/KTX역)',
        '하단/명지/괴정/다대포/신호/지사/김해공항'
      ],
    },
    {
      val: '울산',
      active: false,
      arr: [
        '남구/중구(삼산/성남/무거/신정)',
        '동구/북구/울주군(일산/진장/진하/KTX역/영남알프스)'
      ],
    },
    {
      val: '경남',
      active: false,
      arr: [
        '창원 상남동/용호동/중앙동/창원시청',
        '창원 명서동/봉곡동/팔용동/북면온천/창원종합버스터미널',
        '마산/진해',
        '김해/장유',
        '양산/밀양',
        '진주',
        '거제/통영/고성',
        '사천/남해',
        '하동/산청/함양',
        '거창/함안/창녕/합천/의령'
      ],
    },
    {
      val: '대구',
      active: false,
      arr: [
        '동성로/서문시장/대구역/경북대/엑스코/칠곡지구/태전동',
        '동대구역/신천동/혁신도시/동촌유원지/대구공항/팔공산',
        '수성못/황금동/들안길/두산동/범어',
        '북부정류장/평리동/원대동/대명동/봉덕동/안지랑',
        '두류공원/본리/죽전/광장코아/서부정류장',
        '성서/성서공단/계명대/상인동/달성군'
      ],
    },
    {
      val: '경북',
      active: false,
      arr: [
        '포항/남구(시청/시외버스터미널/구룡포/쌍사/문덕/오천)',
        '포항/북구(영일대/죽도시장/여객터미널/송도)',
        '경주',
        '구미',
        '경산',
        '안동',
        '영천/청도',
        '김천/칠곡/성주',
        '문경/상주/영주/예천/군위/의성/봉화',
        '울진/영덕/청송',
        '울릉도'
      ],
    },
    {
      val: '광주',
      active: false,
      arr: [
        '상무지구/금호지구/유스퀘어/서구',
        '첨단지구/하남지구/송정역/광산구',
        '충장로/대인시장/국립아시아문화전당/동구/남구',
        '광주역/기아챔피언스필드/전대사거리/북구'
      ],
    },
    {
      val: '전남',
      active: false,
      arr: [
        '여수',
        '순천',
        '광양',
        '목포/무안/영암/신안',
        '나주/함평/영광/장성',
        '담양/곡성/화순/구례',
        '해남/완도/진도/강진/장흥/보성/고흥'
      ],
    },
    {
      val: '전주/전북',
      active: false,
      arr: [
        '전주/완주',
        '군산',
        '익산',
        '남원/임실/순창/무주/진안/장수',
        '정읍/부안/김제/고창'
      ]
    }
  ];
  locationSelect = '서울';
  detailLocationArr = this.locationArr.find(v => v.val === this.locationSelect).arr;
  modalRef: BsModalRef;
  lat = 37.543934;
  lng = 127.061167;
  zoom = 15;
  address = '서울특별시 성동구 성수동2가 277-43';

  constructor(
    private modalService: BsModalService,
    private mapsAPILoader: MapsAPILoader,
    private route: ActivatedRoute,
    private localeService: BsLocaleService,
    private toastr: ToastrService,
    private stayList: StayListService
  ) {

    this.localeService.use(this.locale);
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 14);

    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-yanolja',
      dateInputFormat: 'YYYY-MM-DD',
      rangeInputFormat: 'YYYY-MM-DD',
      showWeekNumbers: false,
      minDate : this.minDate,
      maxDate : this.maxDate
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectType(params.category);
      this.allPagedItems = [];
      this.sstayList = [];
      this.type = false;
      this.getList();
    });

    this.searchBarLocShow = this.searchBar.location ? this.searchBar.location : '지역을 고르세요';
  }

  getList() {
    console.log(this.selectRegion);
    this.sstayList = [];
    const payload = {
      category: this.category,
      selectRegion : this.selectRegion,
      personnel: '2',
      requestCheckIn: '2019-09-01+22:00:00',
      requestCheckOut: '2019-09-02+22:00:00',
      // popularKeyword: ''
    };
    this.isLoading$.next(true);
    this.stayList.getAList(payload).subscribe(
      list => {
        const copyList = list;
        this.sstayList = copyList;
        this.setPage(1);
      },
      error => {
        console.log(error);
      },
      () => {
        this.isLoading$.next(false);
      }
    );
  }

  toggle(option: string) {
    if (option === 'member') {
      this.type = false;
      this.location = false;
      this.person = this.person ? false : true;
    } else if (option === 'type') {
      this.person = false;
      this.location = false;
      this.type = this.type  ? false : true;
    } else if (option === 'location') {
      this.person = false;
      this.type = false;
      this.location = this.location  ? false : true;
      this.mapsAPILoader.load().then(() => {
        this.findCurrentLocation();
      });
    } else if (option === 'calendar') {
      this.person = false;
      this.type = false;
      this.location = false;
    }
  }

  minus(person: string) {
    if ((person === 'adult' && this.numberAdult === 0) || (person === 'children' && this.numberChildren === 0)) {
      return;
    }
    if (person === 'adult') {
      this.numberAdult = this.numberAdult - 1;
    } else if (person === 'children') {
      this.numberChildren = this.numberChildren - 1;
    }
  }

  plus(person: string) {
    if (person === 'adult') {
      this.numberAdult = this.numberAdult + 1;
    } else if (person === 'children') {
      this.numberChildren = this.numberChildren + 1;
    }
  }

  submitNav() {
    this.person = false;
    this.location = false;
    this.type = false;

    this.searchParams = {
      category: this.category,
      personnel: this.numberAdult,
      selectRegion: this.selectRegion
    };
  }

  selectType(type: string) {
    this.toggle('type');
    this.category = type;
    this.searchBar.type = type;
    this.searchBarShow = type === '모텔' ? '모텔' : (type === '호텔/리조트' ?  '호텔/리조트' : (type === '게스트하우스' ?  '게스트하우스' : (type === '펜션/풀빌라' ? '펜션/풀빌라' : '숙박종류')));
    return(this.searchBar);
  }

  selectLoc(item: string) {
    this.toggle('location');
    this.selectRegion = item;
    this.searchBarLocShow = item;
  }

  selectDate(dateRange) {
    // console.log(this.bsRangeValue[0]);
  }

  onScroll() {
    this.scrollState += 1;
    this.setPage(this.scrollState);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.getPager(this.sstayList.length, page);
    this.pagedItems = this.sstayList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.allPagedItems = [ ...this.allPagedItems , ...this.pagedItems];

  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
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

  locationChange(e, val: string) {
    e.preventDefault();
    e.stopPropagation();
    this.locationArr = this.locationArr.map(v => {
      if (v.val === val) {
        this.locationSelect = v.val;
        this.detailLocationArr = this.locationArr.find(item => item.val === this.locationSelect).arr;
      }
      return v.val === val ? { ...v, active: !v.active } : { ...v, active: false };
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg' })
    );
    this.mapsAPILoader.load().then(() => {
      this.findCurrentLocation();
    });
  }

  findCurrentLocation() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
        this.getCurrentAddress(+pos.coords.latitude, +pos.coords.longitude);
      });
    }
  }

  getCurrentAddress(lat: number, lng: number) {
    if (navigator.geolocation) {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(lat, lng);
      const request = { latLng: latlng };
      // this.isMapLoading$.next(true);
      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          if (result != null) {
            const splitAddress = (result.formatted_address).split('대한민국 ');
            this.address = splitAddress[1];
          } else {
            alert('No address available!');
          }
          // this.isMapLoading$.next(false);
        } else {
          this.toastr.error('google map 에러입니다. 다시 시도해주세요.');
        }
      });
    }
  }

  positionChange(e) {
    this.lng = e.coords.lng;
    this.lat = e.coords.lat;
    this.getCurrentAddress(e.coords.lat, e.coords.lng);
  }

  locationComplete() {
    this.modalRef.hide();
    this.selectLoc(this.address);
  }

  getLocationAddress() {
    if (navigator.geolocation) {
      const geocoder = new google.maps.Geocoder();
      const address = this.address;
      const request = { address };
      // this.isMapLoading$.next(true);
      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          if (result != null) {
            this.lat = result.geometry.location.lat();
            this.lng = result.geometry.location.lng();
          } else {
            alert('No address available!');
          }
          // this.isMapLoading$.next(false);
        } else {
          this.toastr.error('google map 에러입니다. 다시 시도해주세요.');
        }
      });
    }
  }

  sorting(select: string) {
    if (select === 'reviewPoint') {
      return;
    } else if (select === 'priceHigh') {
      const payload = {
        category: this.category,
        selectRegion : this.selectRegion,
        personnel: '2',
        requestCheckIn: '2019-09-01+22:00:00',
        requestCheckOut: '2019-09-02+22:00:00',
        popularKeyword: '',
        priceHigh: 'True'
      };
      this.isLoading$.next(true);
      this.stayList.getAList(payload).subscribe(
        list => {
          const copyList = list;
          this.sstayList = copyList;
          this.setPage(1);
        },
        error => {
          console.log(error);
        },
        () => {
          this.isLoading$.next(false);
        }
      );
    } else if (select === 'priceLow') {

      const payload = {
        category: this.category,
        selectRegion : this.selectRegion,
        personnel: '2',
        requestCheckIn: '2019-09-01+22:00:00',
        requestCheckOut: '2019-09-02+22:00:00',
        popularKeyword: '',
        priceLow: 'True'
      };
      this.isLoading$.next(true);
      this.stayList.getAList(payload).subscribe(
        list => {
          const copyList = list;
          this.sstayList = copyList;
          this.setPage(1);
        },
        error => {
          console.log(error);
        },
        () => {
          this.isLoading$.next(false);
        }
      );
    }

  }

  setSortingParams(sort: string) {
    this.queryParams.category = '모텔';
    this.queryParams.selectRegion = '강남';
    this.queryParams.personnel = `2`;
    this.queryParams.requestCheckIn = '2019-09-01+22:00:00';
    this.queryParams.requestCheckOut = `2019-09-02+22:00:00`;
    // this.queryParams.review = sort === 'review' ? 'True' : 'False';
    this.queryParams.review = 'True';
    this.queryParams.priceLow = sort === 'priceLow' ? 'True' : 'False';
    this.queryParams.priceHigh = sort === 'priceHigh' ? 'True' : 'False';
  }
}
