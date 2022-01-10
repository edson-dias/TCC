import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Promotion } from 'src/app/shared/models';

@Component({
  selector: 'app-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.css']
})
export class PromotionListComponent implements OnInit {

  promotions!: any
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.promotions = []
    this.getPromotions()
  }
  
  getPromotions(): void {
    this.adminService.getPromotions().subscribe({
      next: (promotions: Promotion[]) => {
        if(promotions){
          this.promotions = promotions
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  
  remove($event: any, promotion: Promotion): void{
    $event.preventDefault()
    if(confirm('Deseja realmente remover a oferta "' + promotion.name + '"?')){
      this.adminService.deletePromotion(promotion.id!).subscribe({
        complete: () => {
          this.getPromotions()
        }
      })
    }
  }
}
