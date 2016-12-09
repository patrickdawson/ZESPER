import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../shared';
import { MealService } from '../../services/meal.service';
import { Food } from '../../shared/food';
import * as _ from 'lodash';

@Component({
  selector: 'ze-overview-list',
  templateUrl: 'overview-list.component.html',
  styleUrls: ['overview-list.component.css']
})
export class OverviewListComponent implements OnInit, OnDestroy {
  private orders: Order[] = [];
  private foods: Food[] = [];
  private subscription;
  private totalCost = 0;
  private hasReceivedData = false;

  constructor(private orderService: OrderService,
              private mealService: MealService) {
  }

  ngOnInit() {
    this.foods = [];
    this.mealService.getFoodsOfWeeklyMeal()
      .then(foods => {
        this.foods = foods;
        this.updateSummary();
        this.subscription = this.orderService.getOrders().subscribe((orders: Order[]) => {
          this.hasReceivedData = true;
          this.orders = orders;
          this.updateSummary();
        });
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateSummary() {
    this.totalCost = 0;
    for (let food of this.foods) {
      food.quantity = 0;
    }

    _.forOwn(this.orders, order => {
      this.totalCost += order.totalCost;
      _.forOwn(order.foods, (food, index) => {
        this.foods[index].quantity += food.quantity;
      });
    });
  }

}
