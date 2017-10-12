import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('username') username;
  @ViewChild('password') password;

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn() {
    this.fire.auth.signInWithEmailAndPassword(this.username.value, this.password.value)
    .then(data => {
      this.showAlert(this.fire.auth.currentUser.email);
    })
    .catch(error => {
      console.log("error: ", error);
    });
  }

  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Welcome',
      subTitle: 'You are logged in as ' + msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
