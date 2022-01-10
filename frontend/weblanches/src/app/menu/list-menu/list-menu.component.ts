import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuFilterComponent } from '../menu-filter/menu-filter.component';
import { AdminService } from 'src/app/admin/services/admin.service';
import { MenuFilter, Ingredient, Lunch } from '../../shared';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent implements OnInit {

  filters!: any
  ingredients !: Ingredient[]

  constructor(private menuService : MenuService, private adminService: AdminService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.filters = this.filterHandler()
    this.menuService.lunchsData = this.getLunchsWithFilters(this.filters)
  }
  
  get lunchs() {
    return this.menuService.lunchsData.lunchs
  }

  filterHandler(){
    this.adminService.getIngredients().subscribe({
      next: (ingredients: Ingredient[]) => {
        if(ingredients){
          this.ingredients = ingredients
        }else{
          this.ingredients = []
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
    let filter :any = {
      'minValue': null,
      'maxValue': null,
      'veggie': false,
      'ingredients': []
    }
    let ingredientList = []
    for (let ingredient of this.ingredients){
      let ing !: any
      
      ing = {
        'nome': ingredient.name,
        'status': true
      }
      ingredientList.push(ing)  
    } 
    filter.ingredients = ingredientList
    return filter
  }

  getLunchsWithFilters(filters: any): MenuFilter {
    let lunchsList!: MenuFilter
    let lunchs!: Lunch[]

    this.menuService.getAllLunchs().subscribe({
      next: (lunch: Lunch[]) => {
        if (lunch) {
          lunchs = lunch
        }
        else{
          lunchs = []
        }
      },
      error: (err: any) => {
        console.log(err)
      },
      complete: () => {
        console.log(lunchs)
        lunchs = this.menuService.getLunchsByValue(filters.minValue, filters.maxValue, lunchs)
        lunchs = this.menuService.getLunchsByIngredients(lunchs, filters.ingredients)
        lunchs = this.menuService.getLunchsByVeggieFilter(lunchs, filters.veggie)
        lunchsList = {
          lunchs: lunchs
        }
      }
    })
    return lunchsList
  }

  openFilterModal(filters: any){
    const modalRef = this.modalService.open(MenuFilterComponent)
    modalRef.componentInstance.filters = filters;
  }
}
