import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../shared';
import { MealService } from '../../services/meal.service';
import { Food } from '../../shared/food';

@Component({
  selector: 'ze-overview-list',
  templateUrl: 'overview-list.component.html',
  styleUrls: ['overview-list.component.css']
})
export class OverviewListComponent implements OnInit, OnDestroy {
  private orders: Order[] = [];
  private mealOfTheWeek: Food[] = [];
  private subscription;
  private totalCost = 0;

  constructor(private orderService: OrderService,
              private mealService: MealService) {
  }

  ngOnInit() {
    this.mealOfTheWeek = this.mealService.getMealOfTheWeek();

    this.subscription = this.orderService.ordersChanged.subscribe((orders: Order[]) => {
      this.orders = orders;
      this.updateSummary();
    });
    this.orderService.listenForOrders();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateSummary() {
    this.totalCost = 0;
    for (let food of this.mealOfTheWeek) {
      food.quantity = 0;
    }

    _.forOwn(this.orders, order => {
      this.totalCost += order.totalCost;
      _.forOwn(order.foods, (food, index) => {
        this.mealOfTheWeek[index].quantity += food.quantity;
      });
    });
  }

}
