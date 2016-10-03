import * as _ from 'lodash';
import { Food } from './food';
import { Serializeable } from './serializeable';

export class Order extends Serializeable {
  private _foods: Food[];

  public customer: string;

  constructor() {
    super();
  }

  get foods() {
    return this._foods;
  }

  get totalCost() {
    return _.sumBy(this.foods, function(food) { return food.cost; });
  }

  addFood(food: Food) {
    this._foods.push(food);
  }

  removeFood(name: string) {
    _.remove(this._foods, food => food.name === name);
  }

  removeAll() {
    this._foods = [];
  }

  import(data: Object): any {
    this.removeAll();
    _.forOwn(data, (value, key) => {
      if ('_foods' === key) {
        _.forOwn(value, foodData => {
          let food = new Food('', 0, 0);
          food.import(foodData);
          this._foods.push(food);
        });
      } else {
        this[key] = value;
      }
    });
  }
}
