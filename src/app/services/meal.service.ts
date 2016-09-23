import { Injectable } from '@angular/core';
import { IMeal } from '../shared';

@Injectable()
export class MealService {

  constructor() { }

  getMealOfTheWeek(): IMeal {
    return {
      name: 'Leberkäse',
      cost: 1.60
    };
  }

}
