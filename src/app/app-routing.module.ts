import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UiComponent } from './components/ui/ui.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'ui', component: UiComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
