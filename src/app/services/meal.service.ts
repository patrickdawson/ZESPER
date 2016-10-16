import { Injectable } from '@angular/core';
import { Food } from '../shared/food';

@Injectable()
export class MealService {

  constructor() { }

  getMealOfTheWeek(): [Food] {
    return [
      new Food('Leberkäse', 1.60, 1),
      new Food('Wasserwecken', 0.80, 1),
      new Food('Normaler Wecken', 0.40, 0)
    ];
  }

}
