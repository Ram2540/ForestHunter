import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { SharedDataGold } from './gold';
import { SharedDataWeapons } from './weaponsData';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  goldPath = 'sharedData/enemyRewards';
  weaponsPath = 'sharedData/weapons';
  constructor() { }

  setEnemyRewards() {
    this.getRef(this.goldPath)
      .set(SharedDataGold.enemyRewards);
  }

  setWeapons() {
    const firstInit = new SharedDataWeapons();
    this.getRef(this.weaponsPath)
      .set(SharedDataWeapons.getWeaponData);
  }

  private getRef(ref: string): firebase.database.Reference {
    return firebase
      .database()
      .ref(ref);
  }

  public UpdateAllSharedData() {
    this.setEnemyRewards();
    this.setWeapons();
  }
}
