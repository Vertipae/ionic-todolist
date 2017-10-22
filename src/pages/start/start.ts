import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {
  @ViewChild('username') username;
  @ViewChild('password') password;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController) {
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

}
