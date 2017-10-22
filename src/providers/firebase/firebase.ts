import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseProvider {
  userId: string;

  constructor(public fireAuth: AngularFireAuth) {

    this.userId = fireAuth.auth.currentUser.uid;
  }
}
