import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { OrderService } from '../services/order.service';
import { MealService } from '../services/meal.service';
import { Order, Food } from '../shared';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ze-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {
  private mealName: string;
  private areOrdersAllowed: boolean = false;
  private subscription: Subscription;

  constructor(private mealService: MealService,
              private orderService: OrderService,
              private router: Router) {
  }

  ngOnInit() {
    this.mealService.getWeeklyMealName()
      .then(mealName => this.mealName = mealName);

    this.subscription = this.orderService.canOrder().subscribe(canOrder => this.areOrdersAllowed = canOrder);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
