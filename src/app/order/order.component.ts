import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MealService } from '../services/meal.service';
import { OrderService } from '../services/order.service';
import { Order } from '../shared';
import { IFood } from '../shared/IFood';
import { Router } from '@angular/router';

@Component({
  selector: 'ze-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  private foods: [IFood];
  private order: Order;

  constructor(private mealService: MealService,
              private orderService: OrderService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.order = new Order();
    this.foods = this.mealService.getMealOfTheWeek();

    this.orderForm = this.formBuilder.group({
      'customer': ['', Validators.required],
      'foods': this.formBuilder.array([])
    });

    for (let food of this.foods) {
      (<FormArray>this.orderForm.controls['foods']).push(new FormControl(0, Validators.required));
    }

    this.updateOrder();

  }

  onOrderInputChange() {
    this.updateOrder();
  }

  private updateOrder() {
    this.order.removeAll();

    for (let i = 0; i < this.foods.length; ++i) {
      let quantity = this.orderForm.controls['foods'].value[i];
      if (quantity > 0) {
        this.order.orderFood(this.foods[i], quantity);
      }
    }
  }

  onOrder() {
    console.log(JSON.stringify(this.order));

    this.order.customer = this.orderForm.controls['customer'].value;
    this.orderService.placeOrder(this.order);

    this.router.navigate(['/']);
  }

}
