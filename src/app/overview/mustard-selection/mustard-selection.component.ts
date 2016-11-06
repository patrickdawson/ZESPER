import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Food } from '../../shared/food';

@Component({
  selector: 'ze-mustard-selection',
  templateUrl: './mustard-selection.component.html',
  styleUrls: ['./mustard-selection.component.css']
})
export class MustardSelectionComponent implements OnInit {
  private name = "Senf";
  private currentMustardCount = 1;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getCommonFoods().then(foods => {
      let mustardFood = _.find(foods, {name: 'Senf'}) as Food;
      if (mustardFood) {
        this.currentMustardCount = mustardFood.quantity;
      }
    });
  }

  orderMustard() {
    const mustard = new Food("Senf", 1.5, this.currentMustardCount);
    this.orderService.placeCommonFoodOrder(mustard);
  }

  mustardCountChange(count: number) {
    this.currentMustardCount = count;
  }

}
