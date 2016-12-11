import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable, ReplaySubject } from 'rxjs';

declare var firebase: any;

@Injectable()
export class AuthService {

  constructor() {
  }

  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signout() {
    return firebase.auth().signOut();
  }

  onAuthStateChanged(callback: (user) => any) {
    firebase.auth().onAuthStateChanged(user => {
      callback(user);
    });
  }

  getAuthState(): Observable<boolean> {
    let result = new ReplaySubject<boolean>(1);
    firebase.auth().onAuthStateChanged(result);
    return result;
  }

  getCurrentUserEmail() {
    let email = '';
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      email = currentUser.email;
    }
    return email;
  }

  isAuthenticated() {
    if (this.getCurrentUserEmail()) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(user) {
    return firebase.database().ref('admins').once('value').then(snapshot => {
      let adminsObject = snapshot.val();

      if (adminsObject && adminsObject.hasOwnProperty(user.uid)) {
        return true;
      } else {
        return false;
      }
    });
  }
}

