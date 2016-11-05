import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class OverviewComponent implements OnInit, OnDestroy {
  private mealName: string;
  private authenticated: boolean = false;
  constructor(private mealService: MealService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.onAuthStateChanged((user) => {
      if (!user) {
        this.authenticated = false;
        this.router.navigate(['/signin']);
      } else {
        this.authenticated = true;
        this.mealService.getWeeklyMealName()
          .then(mealName => this.mealName = mealName);
      }
    });
  }

  ngOnDestroy(): void {
  }
}
