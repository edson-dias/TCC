import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './home/homepage/homepage.component';
import { ListMenuComponent } from './menu/list-menu/list-menu.component';
import { MenuFilterComponent } from './menu/menu-filter/menu-filter.component';
import { PromotionsPageComponent } from './promotions/promotions-page/promotions-page.component';

import { LunchListComponent } from './admin/list-lunch/list-lunch.component';
import { LunchEditComponent } from './admin/edit-lunch/edit-lunch.component';
import { LunchInsertComponent } from './admin/insert-lunch/insert-lunch.component';
import { IngredientListComponent } from './admin/list-ingredient/list-ingredient.component';
import { IngredientEditComponent } from './admin/edit-ingredient/edit-ingredient.component';
import { IngredientInsertComponent } from './admin/insert-ingredient/insert-ingredient.component';
import { PromotionListComponent } from './admin/list-promotion/list-promotion.component';
import { PromotionEditComponent } from './admin/edit-promotion/edit-promotion.component';
import { PromotionInsertComponent } from './admin/insert-promotion/insert-promotion.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: 'cardapio', redirectTo: 'cardapio/listar'},
  {path: 'cardapio/listar', component: ListMenuComponent},
  {path: 'cardapio/filtrar', component: MenuFilterComponent},
  {path: 'ofertas', component: PromotionsPageComponent},
  {path: 'admin', redirectTo: 'admin/home'},
  {path: 'admin/home', component: AdminHomeComponent},
  {path: 'admin/lanches/listar', component: LunchListComponent},
  {path: 'admin/lanches/novo', component: LunchInsertComponent},
  {path: 'admin/lanches/editar/:id', component: LunchEditComponent},
  {path: 'admin/ingredientes/listar', component: IngredientListComponent},
  {path: 'admin/ingredientes/novo', component: IngredientInsertComponent},
  {path: 'admin/ingredientes/editar/:id', component: IngredientEditComponent},
  {path: 'admin/ofertas/listar', component: PromotionListComponent},
  {path: 'admin/ofertas/novo', component: PromotionInsertComponent},
  {path: 'admin/ofertas/editar/:id', component: PromotionEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
