/**
 * Created by Patrick Dawson on 28.09.2016.
 */

import { IFood } from './IFood';

export class OrderItem {
  constructor(public food: IFood,
              public quantity: number) {
  }

  get totalCost() {
    return this.quantity * this.food.price;
  }

}
