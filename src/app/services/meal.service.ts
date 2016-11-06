import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Food } from '../shared/food';

declare var firebase;

@Injectable()
export class MealService {

  constructor() {
  }

  getFoodsOfWeeklyMeal(): Promise<Food[]> {
    return this.getWeeklyMealName()
      .then(mealOfTheWeek => {
        return firebase.database().ref('meals').child(mealOfTheWeek).child('personal').once('value').then(snapshot => {
          const foodObjectsData = snapshot.val();
          return _.map(foodObjectsData, foodData => {
            let food = new Food();
            food.import(foodData);
            return food;
          });
        });
      });
  }

  getMustardType(): Promise<Food> {
    return this.getWeeklyMealName()
      .then(mealOfTheWeek => {
        return firebase.database().ref('meals').child(mealOfTheWeek).child('mustard').once('value').then(snapshot => {
          let food = new Food();
          food.import(snapshot.val());
          return food;
        });
      });
  }

  getWeeklyMealName(): Promise<string> {
    return firebase.database().ref('mealOfTheWeek').once('value').then(snapshot => {
      return snapshot.val();
    });
  }

  getPossibleMeals() {
    return firebase.database().ref('meals').once('value').then(snapshot => {
      return snapshot.val();
    });
  }

  setWeeklyMeal(meal: string) {
    firebase.database().ref('mealOfTheWeek').set(meal);
  }

}
