import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuModule } from './menu/menu.module';
import { AdminModule } from './admin/admin.module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeModule } from './home/home.module';
import { FooterComponent } from './footer/footer.component';
import { PromotionsModule } from './promotions/promotions.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModule,
    AdminModule,
    HomeModule,
    PromotionsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
