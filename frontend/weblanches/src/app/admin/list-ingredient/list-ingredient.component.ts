import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Ingredient } from '../../shared';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-ingredient',
  templateUrl: './list-ingredient.component.html',
  styleUrls: ['./list-ingredient.component.css']
})
export class IngredientListComponent implements OnInit {
  ingredients!: Ingredient[]
  newIngredient!: Ingredient

  @ViewChild('formIngredient') formIngredient!: NgForm;  
  
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.newIngredient = new Ingredient();
    this.adminService.getIngredients().subscribe({
      next: (ingredients: Ingredient[]) => {
        if(ingredients){
          this.ingredients = ingredients;
        }else{
          this.ingredients = [];
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  
  insert(): void{
    if(this.formIngredient.form.valid){
      this.adminService.setIngredient(this.newIngredient)
      this.router.navigate(["/admin/ingredientes/listar"])
    }
  }
  
  remove($event: any, ingredient: Ingredient): void{
    $event.preventDefault()
    if(confirm('Deseja realmente remover o ingrediente "' + ingredient.name + '"?')){
      this.adminService.deleteIngredient(ingredient.id!)
      this.adminService.getIngredients().subscribe({
        next: (ingredients: Ingredient[]) => {
          if(ingredients){
            this.ingredients = ingredients;
          }else{
            this.ingredients = [];
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }
}