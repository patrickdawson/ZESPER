import { Serializeable } from './serializeable';

export class Food extends Serializeable{
  constructor(public name: string,
              public price: number,
              public quantity: number) {
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
