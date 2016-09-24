import * as _ from 'lodash';
import { IFood } from './IFood';
import { OrderItem } from './OrderItem';


export class Order {
  private _entries: OrderItem[] = [];
  public customer: string;


  constructor() {
  }

  orderFood(food: IFood, quantity: number) {
    let foundEntry = <OrderItem>(_.find(this._entries, (entry) => {
      return entry.name === food.name;
    }));

    if (!foundEntry) {
      this._entries.push(new OrderItem(food, quantity));
    } else {
      foundEntry.quantity = quantity;
    }
  }

  removeAll() {
    this._entries = [];
  }

  get totalCost() {
    return _.sumBy(this._entries, function(o) { return o.totalCost; });
  }

  get entries() {
    return this._entries;
  }

}
