import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PromotionsPageComponent } from './promotions-page/promotions-page.component';
import { PromotionsCardComponent } from './promotions-card/promotions-card.component';


@NgModule({
  declarations: [
    PromotionsPageComponent,
    PromotionsCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class PromotionsModule { }
