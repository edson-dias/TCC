import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Lunch, Ingredient } from '../../shared';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-insert-lunch',
  templateUrl: './insert-lunch.component.html',
  styleUrls: ['./insert-lunch.component.css']
})
export class LunchInsertComponent implements OnInit {

  lunch!: Lunch;
  ingredients!: Ingredient[]

  @ViewChild('formLunch') formLunch!: NgForm;  
  
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.lunch = new Lunch();
    this.adminService.getIngredients().subscribe({
      next: (ingredients: Ingredient[]) => {
        if(ingredients){
          this.ingredients = ingredients;
        }
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  
  insert(): void{
    if(this.formLunch.form.valid){
      this.adminService.setLunch(this.lunch)
      this.router.navigate(["/admin/lanches/listar"])
    }
  }

}

  
