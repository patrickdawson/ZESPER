import { Injectable, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import 'rxjs/Rx';
import { Order, Food } from '../shared';

declare var firebase;

@Injectable()
export class OrderService {
  private _ordersInDatabase = [];
  private _orders: Order[] = [];

  public ordersChanged = new EventEmitter<Order[]>();

  constructor() {
  }

  getAllOrders() {
    return this._orders;
  }

  placeOrder(order: Order) {
    // Get a key for a new Post.
    let newPostKey = firebase.database().ref().child('orders').push().key;
    let updateData = {};
    updateData[`orders/personal/${newPostKey}`] = order;

    firebase.database().ref().update(updateData);
  }

  placeMustardOrder(food: Food) {
    firebase.database().ref('orders/mustard').set(food);
  }

  getMustardOrder(): Promise<Food> {
    return firebase.database().ref('orders/mustard').once('value').then(snapshot => {
      const mustardData = snapshot.val();
      if (mustardData) {
        const mustard = new Food();
        mustard.import(mustardData);
        return mustard;
      } else {
        return null;
      }

    });
  }

  listenForOrders() {
    firebase.database().ref('orders').off('value');
    firebase.database().ref('orders').on('value', (snapshot) => {
      const orders = snapshot.val();
      this._ordersInDatabase = [];
      if (orders && orders.personal) {
        this._ordersInDatabase = orders.personal;
      }
      const orderCount = Object.keys(this._ordersInDatabase).length;
      if (orderCount > 0) {
        let additionalCostPerCustomer = 0;
        if (orders && orders.mustard) {
          let mustard = new Food();
          mustard.import(orders.mustard);
          additionalCostPerCustomer = mustard.cost / Object.keys(this._ordersInDatabase).length;
        }

        this._orders = [];
        _.forOwn(this._ordersInDatabase, orderData => {
          let order = new Order();
          order.import(orderData);
          order.setAdditionalCost(additionalCostPerCustomer);
          this._orders.push(order);
        });
        this.ordersChanged.emit(this._orders);
      }
    });
  }

  getByCustomer(customer: string) {
    const result = _.find(this._orders, order => order.customer === customer);
    if (!result) {
      console.error(`Order for customer ${customer} not found!`);
    }

    return result;
  }

  deleteOrder(customer: string) {
    let idToDelete = _.findKey(this._ordersInDatabase, item => (<Order>item).customer === customer);

    firebase.database().ref(`orders/personal/${idToDelete}`).remove();
  }

  deleteAllOrders() {
    return firebase.database().ref('orders').remove();
  }

}
