import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FirebaseProvider {
  userId: string;

  constructor(public afd: AngularFireDatabase, public fireAuth: AngularFireAuth) {
    this.userId = fireAuth.auth.currentUser.uid;
  }

  getShoppingItems() {
    return this.afd.list(`/shoppingItems/${this.userId}`);
  }

  addItem(name) {
    this.afd.list(`/shoppingItems/${this.userId}`).push(name);
    console.log(this.userId);
  }

  removeItem(id) {
    this.afd.list('/shoppingItems/').remove(id);
  }

}
