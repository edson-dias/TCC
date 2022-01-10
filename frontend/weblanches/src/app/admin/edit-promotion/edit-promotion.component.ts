import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lunch, Promotion } from '../../shared/models';
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.css']
})
export class PromotionEditComponent implements OnInit {

  lunchs!: Lunch[]
  promotion!: any
  id!: number
  uploadForm!: FormGroup;

  
  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      image: ['']
    });

    this.promotion = []

    this.id = +this.route.snapshot.params['id']
    this.adminService.getPromotionById(this.id).subscribe({
      next: (promotion: Promotion) => {
        if (promotion) {
          this.promotion = promotion
        }
        else{
          this.router.navigate(['/admin/ofertas'])
        }
      },
      error: (err: any) => {
        console.log(err)
      },
      complete: () => {
        if(this.promotion){
          this.lunchs = this.promotion.lunchs
        }
      }
    })
  }
  
  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('image')!.setValue(file);
    }
  }

  update(): void{
    const formData = new FormData();
    formData.append('image', this.uploadForm.get('image')!.value);
    formData.append('name', this.promotion.name);
    formData.append('value', this.promotion.value)
    formData.append('lunchs', JSON.stringify(this.promotion.lunchs));
    this.adminService.updatePromotion(this.id, formData).subscribe({
      next: () => {
        this.router.navigate(["/admin/ofertas/listar"])
      },
      error: err => console.log(err)
      }
    );
  }
}
