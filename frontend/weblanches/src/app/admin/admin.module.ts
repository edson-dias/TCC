import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { LunchInsertComponent } from './insert-lunch/insert-lunch.component';
import { LunchListComponent } from './list-lunch/list-lunch.component';
import { LunchEditComponent } from './edit-lunch/edit-lunch.component';
import { AdminService } from './services/admin.service';
import { IngredientInsertComponent } from './insert-ingredient/insert-ingredient.component';
import { IngredientEditComponent } from './edit-ingredient/edit-ingredient.component';
import { IngredientListComponent } from './list-ingredient/list-ingredient.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PromotionEditComponent } from './edit-promotion/edit-promotion.component';
import { PromotionListComponent } from './list-promotion/list-promotion.component';
import { PromotionInsertComponent } from './insert-promotion/insert-promotion.component';


@NgModule({
  declarations: [
    LunchListComponent,
    LunchEditComponent,
    LunchInsertComponent,
    IngredientInsertComponent,
    IngredientEditComponent,
    IngredientListComponent,
    AdminHomeComponent,
    PromotionEditComponent,
    PromotionListComponent,
    PromotionInsertComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [
    AdminService,
  ]
})
export class AdminModule { }
