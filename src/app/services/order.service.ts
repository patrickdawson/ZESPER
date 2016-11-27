import { Injectable, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import 'rxjs/Rx';
import { Order } from '../shared/order';
import { Food } from '../shared/food';
import { Observable } from 'rxjs';


declare var firebase;

@Injectable()
export class OrderService {
  constructor() {
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

  getOrders(): Observable<Order[]> {
    return Observable.create(observer => {
      let dbRef = firebase.database().ref('orders');

      let changeHandler = snapshot => {
        const ordersVal = snapshot.val();
        if (ordersVal && ordersVal.personal) {
          let personalOrdersData = ordersVal.personal;
          const ordersCount = Object.keys(personalOrdersData).length;
          if (ordersCount > 0) {
            let additionalCostPerCustomer = 0;
            if (ordersVal && ordersVal.mustard) {
              let mustard = new Food();
              mustard.import(ordersVal.mustard);
              additionalCostPerCustomer = mustard.cost / ordersCount;
            }
            let orders: Order[] = [];
            _.forOwn(personalOrdersData, orderData => {
              let order = new Order();
              order.import(orderData);
              order.setAdditionalCost(additionalCostPerCustomer);
              orders.push(order);
            });
            observer.next(orders);
          }
        }
      };

      dbRef.on('value', changeHandler);

      return () => {
        dbRef.off('value', changeHandler);
      };
    });
  }

  getByCustomer(customer: string) {
    return firebase.database().ref('orders/personal').once('value').then(snapshot => {
      const orders = <{customer: String}[]>(snapshot.val());
      const result = _.find(orders, order => order.customer === customer);
      if (!result) {
        console.error(`Order for customer ${customer} not found!`);
      }

      const order = new Order();
      order.import(result);

      return order;
    });
  }

  deleteOrder(customer: string) {
    return firebase.database().ref('orders/personal').once('value').then(snapshot => {
      const orders = <{customer: String}[]>(snapshot.val());
      let idToDelete = _.findKey(orders, item => (<Order>item).customer === customer);
      firebase.database().ref(`orders/personal/${idToDelete}`).remove();
    });
  }

  deleteAllOrders() {
    return firebase.database().ref('orders').remove();
  }

  canOrder(once = false): Observable<boolean> {
    return Observable.create(observer => {
      let areOrdersAllowedRef = firebase.database().ref('areOrdersAllowed');
      let valueChangedHandler = snapshot => {
        observer.next(snapshot.val());
      };
      if (once) {
        areOrdersAllowedRef.once('value').then(snapshot => {
          observer.next(snapshot.val());
          observer.complete();
        });
      } else {
        areOrdersAllowedRef.on('value', valueChangedHandler);
      }

      return () => {
        if (!once) {
          areOrdersAllowedRef.off('value', valueChangedHandler);
        }
      };

    });
  }

  allowOrders(val: boolean) {
    console.log(`Setting allowOrders to: ${val}`);
    firebase.database().ref('areOrdersAllowed').set(val);
  }

}
