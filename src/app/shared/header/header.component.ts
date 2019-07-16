import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMain = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(_ => {
      if ((this.router.url).split('/')[1] === '') {
        this.isMain = true;
      } else {
        this.isMain = false;
      }
    });
  }

}
