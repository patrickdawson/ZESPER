import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MealService } from '../services/meal.service';
import { IMeal } from '../shared';

@Component({
  selector: 'ze-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  private meal: IMeal;
  private totalCost = 0;

  constructor(private mealService: MealService) {
  }

  ngOnInit() {
    this.orderForm = new FormGroup({
      'mainDishCount': new FormControl(),
      'sideDishCount': new FormControl()
    });

    this.meal = this.mealService.getMealOfTheWeek();
  }

  onMainDishCountChange() {
    this.totalCost = this.orderForm.value.mainDishCount * this.meal.cost;
  }

  onOrder() {
    console.log(this.orderForm);
  }

}
