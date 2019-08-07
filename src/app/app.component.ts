import { Component } from '@angular/core';

import { fadeAnimation } from './core/animation/fade.animation';

import { SubTitleService } from './core/services/sub-title.service';

@Component({
  selector: 'app-root',
  animations: [fadeAnimation],
  template: `
    <app-header></app-header>
    <main [@fadeAnimation]="getRouterOutletState(outlet)">
      <router-outlet #outlet="outlet" (activate)="currentRouter($event)"></router-outlet>
    </main>
  `,
  styleUrls: ['./app.components.scss']
})
export class AppComponent {

  constructor(private subTitleService: SubTitleService) {}
  getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  currentRouter(e) {
    if (e.route && e.route.component.name === 'AccommodationDetailComponent') {
      this.subTitleService.isDetail = true;
    } else {
      this.subTitleService.isDetail = false;
    }
  }
}
