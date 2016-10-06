import { Injectable } from '@angular/core';

declare var firebase: any;

@Injectable()
export class AuthService {

  constructor() {
  }

  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }
}

