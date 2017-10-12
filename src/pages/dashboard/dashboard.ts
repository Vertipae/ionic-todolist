import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  username: string;
  shoppingItems: FirebaseListObservable<any[]>;
  newItem = '';

  constructor(public firebaseProvider: FirebaseProvider, public fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.username = this.fire.auth.currentUser.email;
    this.shoppingItems = this.firebaseProvider.getShoppingItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  addItem() {
    this.firebaseProvider.addItem(this.newItem);
  }

  removeItem(id) {
    this.firebaseProvider.removeItem(id);
  }

}
