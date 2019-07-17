import { Component, OnInit } from '@angular/core';
import { SubTitleService } from '../../core/services/sub-title.service';

@Component({
  selector: 'app-sub-title',
  templateUrl: './sub-title.component.html',
  styleUrls: ['./sub-title.component.scss']
})
export class SubTitleComponent implements OnInit {

  constructor(public subTitleService: SubTitleService) {}

  ngOnInit() {
  }

}
