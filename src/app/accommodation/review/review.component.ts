import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SubTitleService } from '../../core/services/sub-title.service';

import { Review } from '../../core/types/review.interface';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  comments: Review[];
  totalComments = '';
  averageGrade = '';
  totalGrade1 = '';
  totalGrade2 = '';
  totalGrade3 = '';
  totalGrade4 = '';

  constructor(
    private subTitleService: SubTitleService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.totalComments = (+params.totalComments).toLocaleString();
      this.averageGrade = (+params.averageGrade).toFixed(1);
      this.totalGrade1 = (+params.totalGrade1).toFixed(1);
      this.totalGrade2 = (+params.totalGrade2).toFixed(1);
      this.totalGrade3 = (+params.totalGrade3).toFixed(1);
      this.totalGrade4 = (+params.totalGrade4).toFixed(1);
    });
    this.subTitleService.pagaTitle = `후기(${this.totalComments}개)`;
    this.subTitleService.pagaDescription = '후기를 한눈에 확인하세요!';

    this.getData();
  }

  getData() {
    this.comments = [
      {
        text: '굳세게 그것을 위하여, 실현에 돋고, 쓸쓸하랴? 보이는 이상의 얼마나 곳이 불어 그들은 그러므로 구하기 없으면 칼이다. 인간이 않는 가치를 간에 것이다. 우는 충분히 풀이 찬미를 노래하며 밝은 목숨을 황금시대의 봄바람이다. 피고 피는 무한한 찬미를 천지는 품으며, 부패뿐이다. 무한한 인간의 되는 기관과 커다란 꽃이 아니다. 유소년에게서 용감하고 이상, 이상을 있는가? 위하여 되는 생명을 것이다. 그들은 유소년에게서 영락과 같은 원대하고, 노년에게서 사람은 것이다. 스며들어 청춘의 구할 싹이 그들은 그들의 구하기 끓는다. 가치를 동산에는 자신과 때문이다. 품었기 설레는 주는 따뜻한 싹이 뭇 바이며, 넣는 사람은 아니다. 수 맺어, 인생을 용감하고 더운지라 풀이 이 희망의 피다. 반짝이는 갑 위하여, 이것은 옷을 뛰노는 아름답고 내는 그것을 것이다. 얼음이 역사를 꽃이 천하를 이상의 따뜻한 것이다. 그들을 오직 몸이 끓는 눈이 같으며, 간에 가는 청춘의 교향악이다. 대한 이것을 넣는 인간이 오직 이상의 얼음 것이다. 살 피고 이상의 같이, 피다. 품고 못할 커다란 소금이라 듣기만 싹이 철환하였는가?',
        created: '2019-07-25T21:07:26.593486',
        stay: '역삼마레',
        stayId: 1,
        nickname: '해비턴스',
        reservedRoom: '특실 - 대실',
        grade: [1, 1, 2, 3]
      },
      {
        text: '1이렇게 좋나요?',
        created: '2019-07-25T21:07:26.593486',
        stay: '역삼마레',
        stayId: 1,
        nickname: '해비턴스',
        reservedRoom: '특실 - 대실',
        grade: [1, 1, 2, 3]
      },
      {
        text: '2이렇게 좋나요?',
        created: '2019-07-25T21:07:26.593486',
        stay: '역삼마레',
        stayId: 1,
        nickname: '해비턴스',
        reservedRoom: '특실 - 대실',
        grade: [1, 1, 2, 3]
      }
    ];
  }

  getGrade(grades: number[]) {
    return grades.reduce((pre, val, idx, arr) => idx === arr.length - 1 ? (pre + val) / arr.length : pre + val).toFixed(1);
  }

  splitDate(date: string) {
    return date.split('T')[0];
  }
}
