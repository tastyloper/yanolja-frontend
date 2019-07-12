import { Component } from '@angular/core';

import { fadeAnimation } from './core/animation/fade.animation';

@Component({
  selector: 'app-root',
  animations: [fadeAnimation],
  template: `
    <app-header></app-header>
    <main [@fadeAnimation]="getRouterOutletState(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </main>
  `,
  styleUrls: ['./app.components.scss']
})
export class AppComponent {
  getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
