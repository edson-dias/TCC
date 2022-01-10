import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Lunch } from '../../shared';


@Component({
  selector: 'app-list-lunch',
  templateUrl: './list-lunch.component.html',
  styleUrls: ['./list-lunch.component.css']
})
export class LunchListComponent implements OnInit {

  lunchs!: Lunch[];
  constructor(private adminService : AdminService) { }

  ngOnInit(): void {
    this.getLunchs()  
  }

  getLunchs(): any {
    this.adminService.getLunchs().subscribe({
      next: (lunchs: Lunch[]) => {
        if(lunchs){
          this.lunchs = lunchs;
        }else{
          this.lunchs = [];
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  remove($event: any, lunch: Lunch): void{
    $event.preventDefault()
    if(confirm('Deseja realmente remover o lanche "' + lunch.name + '"?')){
      this.adminService.deleteLunch(lunch.id!)
      this.lunchs = this.getLunchs()
    }
  }

}
