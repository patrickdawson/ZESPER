/* tslint:disable:no-unused-variable */

import {Order} from './order';
import { OrderItem } from './OrderItem';

describe('Order', () => {
  const testFood1 = {name: 'food1', price: 1.2};
  const testFood2 = {name: 'food2', price: 2.3};

  it('should create an instance', () => {
    expect(new Order()).toBeTruthy();
  });

  describe('orderFood', () => {
    let testObject;

    beforeEach(() => {
      testObject = new Order();
    });

    it('stores the food', () => {
      testObject.orderFood(testFood1, 1);
      testObject.orderFood(testFood2, 1);
      console.log(JSON.stringify(testObject.entries));
      expect(testObject.entries).toContain(new OrderItem(testFood1, 1));
      expect(testObject.entries).toContain(new OrderItem(testFood2, 1));
    });

    it('uses the price of the food in its totalCost', () => {
      testObject.orderFood(testFood1, 1);
      testObject.orderFood(testFood2, 1);
      expect(testObject.totalCost).toEqual(3.5);
    });
  });

  describe('removeAll', () => {
    it('removes all entries', () => {
      let testObject = new Order();
      testObject.orderFood(testFood1, 1);

      testObject.removeAll();

      expect(testObject.entries.length).toEqual(0);
    });
  });
});
