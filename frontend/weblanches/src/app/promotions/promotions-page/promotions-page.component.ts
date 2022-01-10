import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/services/admin.service';
import { Promotion } from 'src/app/shared';

@Component({
  selector: 'app-promotionspage',
  templateUrl: './promotions-page.component.html',
  styleUrls: ['./promotions-page.component.css']
})
export class PromotionsPageComponent implements OnInit {

  cardData!: Promotion[]
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getPromotions().subscribe({
      next: (promotions: Promotion[]) => {
        if(promotions){
          this.cardData = promotions
        }else{
          this.cardData = []
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  
  addToCart(){
    alert('Not Implemented')
  }
}
