import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Food } from '../shared/food';

declare var firebase;

@Injectable()
export class MealService {

  constructor() {
  }

  getFoodsOfWeeklyMeal(): Promise<[Food]> {
    return firebase.database().ref('mealOfTheWeek').once('value')
      .then(snapshot => {
        return snapshot.val() as string;
      })
      .then(mealOfTheWeek => {
        return firebase.database().ref('meals').child(mealOfTheWeek).child('personal').once('value').then(snapshot => {
          const foodObjects = snapshot.val() as Food[];
          return _.map(foodObjects, foodObject => {
            return new Food(foodObject.name, foodObject.price, foodObject.quantity);
          });
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
