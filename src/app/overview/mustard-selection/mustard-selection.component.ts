import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Food } from '../../shared/food';
import { MealService } from '../../services/meal.service';

@Component({
  selector: 'ze-mustard-selection',
  templateUrl: './mustard-selection.component.html',
  styleUrls: ['./mustard-selection.component.css']
})
export class MustardSelectionComponent implements OnInit {
  private mustard: Food;

  constructor(private mealService: MealService,
              private orderService: OrderService) {
    this.mustard = new Food('Default Senf');
  }

  ngOnInit() {
    this.mealService.getMustardType()
      .then(mustard => {
        this.mustard = mustard;
        this.orderService.getMustardOrder()
          .then(mustard => {
            if (mustard) {
              this.mustard.quantity = mustard.quantity;
            }
          });
      });
  }

  orderMustard() {
    this.orderService.placeMustardOrder(this.mustard);
  }

  mustardCountChange(count: number) {
    this.mustard.quantity = count;
  }

}
