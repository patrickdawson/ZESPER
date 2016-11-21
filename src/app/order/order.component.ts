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
    this.orderForm = this.formBuilder.group({
      'foods': this.formBuilder.array([])
    });


    // new order
    this.order = new Order();

    Promise.all([
      this.mealService.getWeeklyMealName(),
      this.mealService.getFoodsOfWeeklyMeal()
    ])
      .then(results => {
        this.mealName = results[0];

        let order = this.orderService.getByCustomer(this.authService.getCurrentUserEmail());
        if (order) {
          this.order = order;
          this.foods = order.foods;
        } else {
          this.order = new Order();
          this.foods = results[1];
        }

        for (let food of this.foods) {
          (<FormArray>this.orderForm.controls['foods']).push(new FormControl(food.quantity, Validators.required));
        }

        this.updateOrder();
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
