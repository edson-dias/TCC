import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ListMenuComponent } from './list-menu/list-menu.component';
import { MenuFilterComponent } from './menu-filter/menu-filter.component';
import { MenuService } from './services/menu.service';


@NgModule({
  declarations: [
    ListMenuComponent,
    MenuFilterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  providers: [
    MenuService
  ]
})
export class MenuModule { }
