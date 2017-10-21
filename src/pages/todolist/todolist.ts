import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
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
  newItem = '';
  tasksCollection: AngularFirestoreCollection<Task>;
  tasks: Observable<TaskId[]>;
  userId: string;
  tasksDbPath: string;

  constructor(
    public afs: AngularFirestore,
    public firebaseProvider: FirebaseProvider,
    public fire: AngularFireAuth,
    public alertCtrl: AlertController) {

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodolistPage');
  }

  addItem() {
    this.tasksCollection.add({ name: this.newItem });
  }

  removeItem(id) {
    this.tasksCollection.doc(id).delete();
  }

  showEditPrompt(taskId, taskName) {
    let prompt = this.alertCtrl.create({
      title: 'Edit task',
      inputs: [
        {
          name: 'title',
          value: taskName
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.tasksCollection.doc(taskId).update({ name: data.title});
          }
        }
      ]
    });
    prompt.present();
  }
}
