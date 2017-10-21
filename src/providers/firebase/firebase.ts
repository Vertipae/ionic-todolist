import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseProvider {
  userId: string;

  constructor(
    public afd: AngularFireDatabase,
    public fireAuth: AngularFireAuth) {

    this.userId = fireAuth.auth.currentUser.uid;
  }
}
