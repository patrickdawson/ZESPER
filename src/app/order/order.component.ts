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
  private foods: [Food];
  private order: Order;
  private meal: Food;

  constructor(private mealService: MealService,
              private orderService: OrderService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.onAuthStateChanged((user) => {
      if (!user) {
        this.router.navigate(['/signin']);
      }
    });

    this.order = new Order();
    this.foods = this.mealService.getMealOfTheWeek();
    this.meal = this.foods[0];

    this.orderForm = this.formBuilder.group({
      'customer': ['', Validators.required],
      'foods': this.formBuilder.array([])
    });

    for (let food of this.foods) {
      (<FormArray>this.orderForm.controls['foods']).push(new FormControl(food.quantity, Validators.required));
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
        this.foods[i].quantity = quantity;
        this.order.addFood(this.foods[i]);
      }
    }
  }

  onOrder() {
    this.order.customer = this.orderForm.controls['customer'].value;
    this.orderService.placeOrder(this.order);

    this.router.navigate(['/']);
  }
}
