import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { MainModule } from './main/main.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { AuthModule } from './auth/auth.module';
import { MypageModule } from './mypage/mypage.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UiComponent } from './components/ui/ui.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MainModule,
    SharedModule,
    CoreModule,
    AccommodationModule,
    AuthModule,
    MypageModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
