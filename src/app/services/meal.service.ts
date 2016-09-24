import { Injectable } from '@angular/core';
import { IFood } from '../shared';

@Injectable()
export class MealService {

  constructor() { }

  getMealOfTheWeek(): [IFood] {
    return [
      {
        name: 'Leberkäse',
        price: 1.60
      },
      {
        name: 'Wasserwecken',
        price: 0.80
      },
      {
        name: 'Normaler Wecken',
        price: 0.40
      },
    ];
  }

}
