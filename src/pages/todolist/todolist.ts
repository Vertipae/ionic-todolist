//
// Member area after login, Tasklist
//
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
// import { FirebaseListObservable } from 'angularfire2/database-deprecated';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireList } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-todolist',
  templateUrl: 'todolist.html',
})
export class TodolistPage {
  username: string;
  // todoItems: FirebaseListObservable<any[]>;
  newItem = '';

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(
    public firebaseProvider: FirebaseProvider,
    public fire: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.username = this.fire.auth.currentUser.email;
    // this.itemsRef = this.firebaseProvider.getTodoItems();
    this.itemsRef = this.firebaseProvider.getTodoItems();
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    console.log(this.items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodolistPage');
  }

  // addItem() {
  //   this.firebaseProvider.addItem(this.newItem);
  // }
  //
  // removeItem(id) {
  //   this.firebaseProvider.removeItem(id);
  // }

}
