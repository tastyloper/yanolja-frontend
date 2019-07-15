import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { SubTitleComponent } from './sub-title/sub-title.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SubTitleComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SubTitleComponent
  ]
})
export class SharedModule {}
