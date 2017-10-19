import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FirebaseProvider {
  userId: string;
  dbPath: string;

  constructor(public afd: AngularFireDatabase, public fireAuth: AngularFireAuth) {
    this.userId = fireAuth.auth.currentUser.uid;
    this.dbPath = `/shoppingItems/${this.userId}`;
  }

  getShoppingItems() {
    return this.afd.list(this.dbPath);
  }

  addItem(name) {
    this.afd.list(this.dbPath).push(name);
    console.log(this.userId);
  }

  removeItem(id) {
    this.afd.list(this.dbPath).remove(id);
  }

}

// poss logout:

// logout(){
//     this.afA.auth.signOut().then(() => {
//        ---this.router.navigate(['']);---
//     });
// }
