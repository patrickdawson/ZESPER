import { Injectable } from '@angular/core';
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
        return firebase.database().ref('meals').child(mealOfTheWeek).once('value').then(snapshot => {
          const foodObjects = snapshot.val();
          return Object.keys(foodObjects).map(itemName => {
            const foodObject = foodObjects[itemName];
            return new Food(itemName, foodObject.price, foodObject.quantity);
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
