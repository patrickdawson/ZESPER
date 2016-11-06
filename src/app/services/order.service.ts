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

  placeCommonFoodOrder(food: Food) {
    firebase.database().ref('orders/common').child(food.name).set(food);
  }

  getCommonFoods(): Promise<Food[]> {
    return firebase.database().ref('orders/common').once('value').then(snapshot => {
      const commonFoodsData = snapshot.val();
      let foods: Food[] = [];
      _.forOwn(commonFoodsData, foodData => {
        const food = new Food();
        food.import(foodData);
        foods.push(food);
      });
      return foods;
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
      const orderCount =  Object.keys(this._ordersInDatabase).length;
      if (orderCount > 0) {
        const commonFoodsData = orders? orders.common : {};
        const commonFoods: Food[] = [];
        _.forOwn(commonFoodsData, commonFoodData => {
          let commonFood = new Food();
          commonFood.import(commonFoodData);
          commonFoods.push(commonFood);
        });
        const commonCost = _.sumBy(commonFoods, 'cost');
        const additionalCostPerCustomer = commonCost / Object.keys(this._ordersInDatabase).length;

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
