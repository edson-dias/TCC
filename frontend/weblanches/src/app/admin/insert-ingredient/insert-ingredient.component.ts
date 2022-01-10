import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Ingredient } from '../../shared';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-insert-ingredient',
  templateUrl: './insert-ingredient.component.html',
  styleUrls: ['./insert-ingredient.component.css']
})
export class IngredientInsertComponent implements OnInit {
  
  ingredients!: Ingredient

  @ViewChild('formIngredient') formIngredient!: NgForm;  
  
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.ingredients = new Ingredient();
  }
  
  inserir(): void{
    if(this.formIngredient.form.valid){
      this.adminService.setIngredient(this.ingredients)
      this.router.navigate(["/admin/ingredientes/listar"])
    }
  }

}



  
