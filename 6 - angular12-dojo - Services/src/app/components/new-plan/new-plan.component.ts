import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { PlansService } from 'src/app/shared/services/plans.service';

@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.component.html',
  styleUrls: ['./new-plan.component.css']
})
export class NewPlanComponent implements OnInit {

  newPlanForm: FormGroup;
  submitted = false;
  categories: any[] = [];

  constructor(private _myPlansService : PlansService) { }

  ngOnInit(): void {
    this.newPlanForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),
      'startingTime': new FormControl(null, Validators.required),
      'finishingTime': new FormControl(null, Validators.required),
      'category': new FormControl(null),
      'location': new FormControl(null, Validators.required)
    });

    this._myPlansService.getCategories()
      .subscribe(
        data => {
          this.categories = data;
          return data;
        },
        error => {
          console.log("NewPlan getCategories: FAILED");
        }
     );
  }

  onSubmit() {
    this._myPlansService.postPlan(this.resolvePlan())
      .subscribe(
        data => {
          this.submitted = true;
          this.newPlanForm.reset();
          return true;
        },
        error => {
          console.error('Error!');
          return throwError(error);
        }
      );
  }

  resolvePlan() {
    const planStart = new Date(this.newPlanForm.value.date.setHours(
                                this.newPlanForm.value.startingTime.getHours(),
                                this.newPlanForm.value.startingTime.getMinutes(),
                                this.newPlanForm.value.startingTime.getSeconds()));
    const planFinish = new Date(this.newPlanForm.value.date.setHours(
                                this.newPlanForm.value.finishingTime.getHours(),
                                this.newPlanForm.value.finishingTime.getMinutes(),
                                this.newPlanForm.value.finishingTime.getSeconds()));

    return ({
      'name': this.newPlanForm.value.name,
      'description': this.newPlanForm.value.description,
      'date': this.newPlanForm.value.date,
      'starting': planStart,
      'finishing': planFinish,
      'category': this.newPlanForm.value.category,
      'location': this.newPlanForm.value.location
    });
  }
}