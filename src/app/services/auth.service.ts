import { Injectable } from '@angular/core';

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

  onAuthStateChanged(callback: (user)=>any) {
    firebase.auth().onAuthStateChanged(callback);
  }

  getToken() {
    return firebase.auth().currentUser.getToken();
  }
}

