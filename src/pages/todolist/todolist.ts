//
// Member area after login, Tasklist
//
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';

@IonicPage()
@Component({
  selector: 'page-todolist',
  templateUrl: 'todolist.html',
})
export class TodolistPage {
  username: string;
  todoItems: FirebaseListObservable<any[]>;
  newItem = '';

  constructor(
    public firebaseProvider: FirebaseProvider,
    public fire: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.username = this.fire.auth.currentUser.email;
    this.todoItems = this.firebaseProvider.getTodoItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodolistPage');
  }

  addItem() {
    this.firebaseProvider.addItem(this.newItem);
  }

  removeItem(id) {
    this.firebaseProvider.removeItem(id);
  }

}
