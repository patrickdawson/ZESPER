import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MealService } from '../services/meal.service';
import { OrderService } from '../services/order.service';
import { Order } from '../shared';
import { Router } from '@angular/router';
import { Food } from '../shared/food';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'ze-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit, OnDestroy {
  orderForm: FormGroup;
  private currentCustomerName: string;
  private foods: Food[];
  private order: Order;
  private storedOrder: Order;
  private mealName: string;
  private orderSubscription: Subscription;

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

    this.currentCustomerName = this.authService.getCurrentUserEmail();

    // new order
    this.order = new Order();

    Promise.all([
      this.mealService.getWeeklyMealName(),
      this.mealService.getFoodsOfWeeklyMeal()])
      .then(results => {
        this.mealName = results[0];
        this.foods = results[1];

        for (let food of this.foods) {
          (<FormArray>this.orderForm.controls['foods']).push(new FormControl(food.quantity, Validators.required));
        }
        this.updateOrder();

        this.orderSubscription = this.orderService.getOrders().first().subscribe(orders => {
          const order = _.find(orders, item => item.customer === this.currentCustomerName);
          if (order) {
            this.storedOrder = order;
            this.order = order;
            this.foods = order.foods;
            for (let i = 0; i < this.foods.length; ++i) {
              (<FormArray>this.orderForm.controls['foods']).controls[i].setValue(this.foods[i].quantity);
            }
          } else {
            this.order = new Order();
          }

          this.updateOrder();
        });
      });
  }

  ngOnDestroy() {
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
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
    // Check if the user already has an existing order.
    this.orderService.deleteOrder(this.currentCustomerName).then(() => {
      this.order.customer = this.currentCustomerName;
      this.orderService.placeOrder(this.order);

      this.router.navigate(['/']);
    });
  }

  deleteOrder() {
    this.storedOrder = null;
    this.orderService.deleteOrder(this.currentCustomerName);
    this.router.navigate(['/overview']);
  }
}
