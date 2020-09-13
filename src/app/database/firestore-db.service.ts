import { verifyHostBindings } from '@angular/compiler';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class FirestoreDBService {
  private db: firebase.firestore.Firestore;
  private weaponsRef;
  constructor() {
    this.db = firebase.firestore();
    this.weaponsRef = this.db.collection('weapons');
  }

  getWeaponsCollection() {
    //console.log(this.weaponsRef.get());

    this.weaponsRef.get().then((doc) => {
      // Document was found in the cache. If no cached document exists,
      // an error will be returned to the 'catch' block below.
      console.log("Cached document data:", doc.data());
  }).catch(function(error) {
      console.log("Error getting cached document:", error);
  });
  }
}
