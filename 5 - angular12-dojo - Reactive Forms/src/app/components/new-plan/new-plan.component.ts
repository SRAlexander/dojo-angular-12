import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.component.html',
  styleUrls: ['./new-plan.component.css']
})
export class NewPlanComponent implements OnInit {

  newPlanForm: FormGroup;
  submitted = false;
  categories: any[] = [];

  constructor() { }

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
  }

  onSubmit() {
    this.submitted = true;
    console.log('Submitted');
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