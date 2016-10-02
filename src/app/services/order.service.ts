import { Injectable, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { Order } from '../shared';

@Injectable()
export class OrderService {
  private _ordersInDatabase = [];
  private _orders: Order[] = [];

  public ordersChanged = new EventEmitter<Order[]>();

  constructor(private http: Http) {
  }


  placeOrder(order: Order) {
    const body = order.export();
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.http.post('https://zesper-3300e.firebaseio.com/orders.json', body, headers).subscribe(
      data => {
        console.log(data);
        this._orders.push(order);
      },
      error => {
        console.error(error);
      }
    );
  }

  getAllOrders() {
    return this._orders;
  }

  fetchOrders() {
    return this.http.get('https://zesper-3300e.firebaseio.com/orders.json')
      .map((response: Response) => response.json())
      .subscribe((data) => {
        this._ordersInDatabase = data;

        this._orders = [];
        _.forOwn(data, orderData => {
          let order = new Order();
          order.import(orderData);
          this._orders.push(order);
        });
        this.ordersChanged.emit(this._orders);
      });
  }

  getByCustomer(customer: string) {
    const result = _.find(this._ordersInDatabase, order => order.customer === customer);
    if (!result) {
      console.error(`Order for customer ${customer} not found!`);
    }

    return result;
  }

  deleteOrder(order: Order) {
    let idToDelete = _.findKey(this._ordersInDatabase, item => (<Order>item).customer === order.customer);

    if (idToDelete) {
      this.http.delete(`https://zesper-3300e.firebaseio.com/orders/${idToDelete}.json`)
        .subscribe(data => {
          console.log(data);
          this.fetchOrders():
        });
    }
  }

}
