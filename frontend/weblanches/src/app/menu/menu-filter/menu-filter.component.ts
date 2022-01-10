import { Component, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuFilter} from 'src/app/shared';
import { Lunch } from 'src/app/shared';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu-filter',
  templateUrl: './menu-filter.component.html',
  styleUrls: ['./menu-filter.component.css']
})
export class MenuFilterComponent{
  @Input() filters!: any

  constructor(public activeModal: NgbActiveModal, private menuService: MenuService) { }
  
  ngOnInit(): void {}
  
  filterLunchs(){
    this.menuService.lunchsData = this.getLunchsWithFilters(this.filters)
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
}


