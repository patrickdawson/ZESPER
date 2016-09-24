import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { MealService } from '../services/meal.service';
import { IFood } from '../shared';
import { Order } from '../shared/order';

@Component({
  selector: 'ze-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  private selectedItem = -1;
  private meal: IFood;
  private orders: Order[] = [];
  private totalCost: number = 0;

  constructor(private orderService: OrderService, private mealService: MealService) { }

  ngOnInit() {
    this.meal = this.mealService.getMealOfTheWeek()[0];
    this.orders = this.orderService.getAllOrders();

    this.totalCost = 0;
    for (let order of this.orders) {
      this.totalCost = order.totalCost;
    }
  }

  onSelect(index: number) {
    this.selectedItem = index;
  }

  deleteSelected() {
    this.orders.splice(this.selectedItem, 1);
    this.selectedItem = -1;
  }
}
