import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { SharedDataGold } from './gold';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  goldPath = 'sharedData/enemyRewards';
  constructor() { }

  setEnemyRewards() {
    this.getRef(this.goldPath)
      .set(SharedDataGold.enemyRewards);
  }

  private getRef(ref: string): firebase.database.Reference {
    return firebase
      .database()
      .ref(ref);
  }
}
