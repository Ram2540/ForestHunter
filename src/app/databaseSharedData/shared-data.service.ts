import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { SharedDataGold, enemyReward } from './gold';
import { SharedDataWeapons } from './weaponsData';
import { pipe } from 'rxjs';
import { WeaponService } from '../services/weapon.service';

// update data in firebase for weapons and enemy rewards

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  public goldPath = 'sharedData/enemyRewards';
  public weaponsPath = 'sharedData/weapons';
  constructor(private weaponService: WeaponService) { }

  public UpdateAllSharedDataToDB() {
    this.setEnemyRewardsToDB();
    this.setWeaponsToDB();
  }

  public getRefForEnemyRewards() {
    return this.getRef(this.goldPath);
  }

  private setEnemyRewardsToDB() {
    this.getRef(this.goldPath)
      .set(SharedDataGold.enemyRewards);
  }

  private setWeaponsToDB() {
    this.getRef(this.weaponsPath)
      .set(this.weaponService.getWeaponData);
    // const firstInit = new SharedDataWeapons();
    // this.getRef(this.weaponsPath)
    //   .set(SharedDataWeapons.getWeaponData);
  }

  private getRef(ref: string): firebase.database.Reference {
    return firebase
      .database()
      .ref(ref);
  }
}
