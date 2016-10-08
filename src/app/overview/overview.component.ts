import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { OrderService } from '../services/order.service';
import { MealService } from '../services/meal.service';
import { Order, Food } from '../shared';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ze-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  private meal: Food;
  private orders: Order[] = [];
  private totalCost: number = 0;
  private authenticated: boolean = false;

  constructor(private orderService: OrderService,
              private mealService: MealService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.meal = this.mealService.getMealOfTheWeek()[0];

    this.orderService.fetchOrders();
    this.orders = this.orderService.getAllOrders();
    this.orderService.ordersChanged.subscribe((orders: Order[]) => {
      this.orders = orders;
      this.updateCost();
    });

    this.authService.onAuthStateChanged((user) => {
      if (!user) {
        this.authenticated = false;
        this.router.navigate(['/signin']);
      } else {
        this.authenticated = true;
      }
    })
  }

  updateCost() {
    this.totalCost = 0;
    _.forOwn(this.orders, order => {
      this.totalCost += order.totalCost;
    });
  }
}
