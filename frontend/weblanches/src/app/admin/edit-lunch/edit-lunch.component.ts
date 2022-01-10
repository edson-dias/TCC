import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lunch, Ingredient } from '../../shared/models';
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-edit-lunch',
  templateUrl: './edit-lunch.component.html',
  styleUrls: ['./edit-lunch.component.css']
})
export class LunchEditComponent implements OnInit {

  lunch!: Lunch
  ingredients!: Ingredient[]
  id!: number

  @ViewChild("formLunch") formLunch!: NgForm

  constructor( private adminService: AdminService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id']
    
    this.adminService.getLunchById(this.id).subscribe({
      next: (lunch: Lunch) => {
        if (lunch) {
          this.lunch = lunch
        }
        else{
          this.router.navigate(['/admin/lunchs'])
        }
      },
      error: (err: any) => {
        console.log(err)
      },
      complete: () => {
        if(this.lunch){
          this.ingredients = this.lunch.ingredients!
        }
      }
    })
  }

  update(): void{
    if(this.formLunch.form.valid){
      this.adminService.updateLunch(this.id, this.lunch)
      this.router.navigate(['admin/lanches/'])
    }
  }
}
