import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { SharedDataGold } from './gold';

// update data in firebase for weapons and enemy rewards

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  public goldPath = 'sharedData/enemyRewards';
  public weaponsPath = 'sharedData/weapons';
  constructor() { }

  public UpdateAllSharedDataToDB() {
    this.setEnemyRewardsToDB();
    //this.setWeaponsToDB();
  }

  public getRefForEnemyRewards() {
    return this.getRef(this.goldPath);
  }

  private setEnemyRewardsToDB() {
    this.getRef(this.goldPath)
      .set(SharedDataGold.enemyRewards);
  }

  // private setWeaponsToDB() {
  //   this.getRef(this.weaponsPath)
  //     .set(StaticDataWeaponStore.Instance.getWeaponList);
  //   // const firstInit = new SharedDataWeapons();
  //   // this.getRef(this.weaponsPath)
  //   //   .set(SharedDataWeapons.getWeaponData);
  // }

  private getRef(ref: string): firebase.database.Reference {
    return firebase
      .database()
      .ref(ref);
  }
}
