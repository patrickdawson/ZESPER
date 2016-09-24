import { Injectable } from '@angular/core';
import { Order } from '../shared';

@Injectable()
export class OrderService {
  private orders: Array<Order> = [];

  constructor() { }

  placeOrder(order: Order) {
    this.orders.push(order);
  }

  getAllOrders() {
    return this.orders;
  }

}
