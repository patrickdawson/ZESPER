import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MealService } from '../services/meal.service';
import { OrderService } from '../services/order.service';
import { Order } from '../shared';
import { Router } from '@angular/router';
import { Food } from '../shared/food';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'ze-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  private foods: Food[];
  private order: Order;
  private mealName: string;

  constructor(private mealService: MealService,
              private orderService: OrderService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.order = new Order();
    Promise.all([
      this.mealService.getFoodsOfWeeklyMeal(),
      this.mealService.getWeeklyMealName()
    ])
    .then(results => {
      this.foods = results[0];
      this.mealName = results[1];

      for (let food of this.foods) {
        (<FormArray>this.orderForm.controls['foods']).push(new FormControl(food.quantity, Validators.required));
      }

      this.updateOrder();
    });


    this.orderForm = this.formBuilder.group({
      'foods': this.formBuilder.array([])
    });
  }

  onOrderInputChange() {
    this.updateOrder();
  }

  private updateOrder() {
    this.order.removeAll();

    for (let i = 0; i < this.foods.length; ++i) {
      let quantity = this.orderForm.controls['foods'].value[i];
      this.foods[i].quantity = quantity;
      this.order.addFood(this.foods[i]);
    }
  }

  onOrder() {
    const userEmail = this.authService.getCurrentUserEmail();

    // Check if the user already has an existing order.
    this.orderService.deleteOrder(userEmail);

    this.order.customer = userEmail;
    this.orderService.placeOrder(this.order);

    this.router.navigate(['/']);
  }
}
