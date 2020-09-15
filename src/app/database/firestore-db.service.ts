import { identifierModuleUrl, verifyHostBindings } from '@angular/compiler';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { get } from 'jquery';
import { Weapon } from '../classes/weapon';
import { SharedDataWeapons, WeapondDatabaseData } from '../databaseSharedData/weaponsData';
import { ControllerActions } from '../store/controller/controller.actions';
@Injectable({
  providedIn: 'root'
})
export class FirestoreDBService {
  private db: firebase.firestore.Firestore;
  private weaponsRef; // : firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  constructor(private controllerActions: ControllerActions) {
    this.db = firebase.firestore();
    this.weaponsRef = this.db.collection('weapons');
  }

  public postWeaponsCollections() {
    let x = new SharedDataWeapons();
    const weaponsDB = SharedDataWeapons.getWeaponData;

    weaponsDB.forEach(weapon => {
      this.weaponsRef.doc(weapon.id.toString()).set({ ...weapon });
    });
  }

  public loadWeaponCollectionByID(id: number) {
    this.weaponsRef.doc(id.toString()).get().then((weaponDB) => {
      const weapon: WeapondDatabaseData = weaponDB.data();
      this.controllerActions.WeaponLoadFromDBById(weapon);
  }).catch((error) => {
      console.log('Error getting cached document:', error);
  });
  }

  public loadAllWeaponCollections() {
    this.weaponsRef
    .onSnapshot((querySnapshot) => {
        const weaponCollections: WeapondDatabaseData[] = [];
        querySnapshot.forEach((doc) => {
          const weapon = doc.data() as WeapondDatabaseData;
          if (weapon) {
            weaponCollections.push(weapon);
          }
        });
        this.controllerActions.WeaponsLoadAllCollections(weaponCollections);
    });
  }

 
}
