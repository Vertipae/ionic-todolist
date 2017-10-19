import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('username') username;
  @ViewChild('password') password;

  constructor(
    private fire: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  createAccount() {
    this.fire.auth.createUserWithEmailAndPassword(this.username.value, this.password.value)
      .then(data => {
        this.successAlert(this.fire.auth.currentUser.email);
      })
      .catch(error => {
        this.failAlert(error);
      });

    console.log("created account:" + this.username.value + " " + this.password.value)
  }

  successAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Welcome',
      subTitle: 'Created account: ' + msg,
      buttons: ['OK']
    });
    alert.present();
  }

  failAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'FIAL',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
