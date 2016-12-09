import { Serializeable } from './serializeable';
import * as _ from 'lodash';

export class Food extends Serializeable{
  constructor(public name: string = '',
              public price: number = 0,
              public quantity: number = 0) {
    super();
  }

  get cost() {
    return this.quantity * this.price;
  }

  import(data: Object) {
    _.forOwn(data, (value, key) => {
      this[key] = value;
    });
  }
}

