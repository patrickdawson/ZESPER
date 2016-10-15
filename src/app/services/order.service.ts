import { Injectable, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { Order } from '../shared';
import { AuthService } from './auth.service';

declare var firebase;

@Injectable()
export class OrderService {
  private _ordersInDatabase = [];
  private _orders: Order[] = [];

  public ordersChanged = new EventEmitter<Order[]>();

  constructor(private http: Http,
              private authService: AuthService) {
  }

  getAllOrders() {
    return this._orders;
  }

  placeOrder(order: Order) {
    // Get a key for a new Post.
    let newPostKey = firebase.database().ref().child('orders').push().key;
    let updateData = {};
    updateData[`/orders/${newPostKey}`] = order;

    firebase.database().ref().update(updateData);
  }

  listenForOrders() {
    firebase.database().ref('/orders').off('value');
    firebase.database().ref('/orders').on('value', (snapshot) => {
      this._ordersInDatabase = snapshot.val();
      this._orders = [];

      _.forOwn(this._ordersInDatabase, orderData => {
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
          this.listenForOrders();
        });
    }
  }

}
