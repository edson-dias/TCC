import { Component, OnInit} from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Lunch, Promotion, LunchPromotion } from 'src/app/shared/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-insert-promotion',
  templateUrl: './insert-promotion.component.html',
  styleUrls: ['./insert-promotion.component.css']
})
export class PromotionInsertComponent implements OnInit {

  promotion!: any
  uploadForm!: FormGroup;
  lunchs!: Lunch[];
  lunchPromotion!: LunchPromotion[];

  
  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    
    this.uploadForm = this.formBuilder.group({
      image: ['']
    });
    
    this.promotion = new Promotion();
    this.adminService.getLunchs().subscribe({
      next: (lunchs: Lunch[]) => {
        if(lunchs){
          this.lunchs = lunchs;
        }else{
          this.lunchs = [];
        }
      },
      error: err => console.log(err),
      complete: () => {
        this.lunchPromotion = [];
        this.lunchs.forEach(lunch => {
          this.lunchPromotion.push(new LunchPromotion(lunch.id, lunch.name, 0));
        });
      }
    })
  }
  
  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('image')!.setValue(file);
    }
  }

  insert() {
    
    let lunchs = this.lunchPromotion.filter(lunch => lunch.quantity! > 0);

    const formData = new FormData();
    formData.append('image', this.uploadForm.get('image')!.value);
    formData.append('name', this.promotion.name);
    formData.append('value', this.promotion.value)
    formData.append('lunchs', JSON.stringify(lunchs));
    this.adminService.setPromotion(formData).subscribe({
      next: () => {
        this.router.navigate(["/admin/ofertas/listar"])
      },
      error: err => console.log(err)
      }
    );
  }
}

  
