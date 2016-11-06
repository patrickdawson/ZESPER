import { Component, OnInit } from '@angular/core';
import {} from 'ng2-bootstrap/ng2-bootstrap';
import { OrderService } from '../../services/order.service';
import { MealService } from '../../services/meal.service';

@Component({
  selector: 'ze-meal-of-week-selector',
  templateUrl: './meal-of-week-selector.component.html',
  styleUrls: ['./meal-of-week-selector.component.css']
})
export class MealOfWeekSelectorComponent implements OnInit {
  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};
  public items: string[];
  mealOfTheWeek: string;

  constructor(private mealService: MealService) {

  }

  ngOnInit() {
    Promise
      .all([
        this.mealService.getPossibleMeals(),
        this.mealService.getWeeklyMealName()
      ])
      .then(results => {
        this.items = [];
        this.items.push.apply(this.items, Object.keys(results[0]));
        this.mealOfTheWeek = results[1];
      });
  }

  mealSelected(item: string) {
    this.mealOfTheWeek = item;
    this.mealService.setWeeklyMeal(item);
  }
}
