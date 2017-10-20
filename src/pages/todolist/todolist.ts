//
// Member area after login, Tasklist
//
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
// import { FirebaseListObservable } from 'angularfire2/database-deprecated';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireList } from 'angularfire2/database';

export interface Task { name: string; }
export interface TaskId extends Task { id: string; }

@IonicPage()
@Component({
  selector: 'page-todolist',
  templateUrl: 'todolist.html',
})
export class TodolistPage {
  username: string;
  newItem = '';
  tasksCollection: AngularFirestoreCollection<Task>;
  tasks: Observable<TaskId[]>;
  userId: string;
  tasksDbPath: string;

  constructor(
    public afs: AngularFirestore,
    public firebaseProvider: FirebaseProvider,
    public fire: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.username = this.fire.auth.currentUser.email;
    this.userId = this.fire.auth.currentUser.uid;
    this.tasksDbPath = `/tasks/${this.userId}/entries`
    this.tasksCollection = this.afs.collection<Task>(this.tasksDbPath);

    this.tasks = this.tasksCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    })
    // this.tasks = this.tasksCollection.snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c.payload.doc.id, name: c.payload.doc.data() }));
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodolistPage');
  }

  logSnapshot() {
    console.log(this.tasks[0]);
  }
  addItem() {
    this.tasksCollection.add({name: this.newItem});
  }

  removeItem(id) {
    this.tasksCollection.doc(id).delete();
  }

}
