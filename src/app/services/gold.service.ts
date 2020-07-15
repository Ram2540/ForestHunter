import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage/data-storage.service';
import { enemyReward } from '../databaseSharedData/gold';
import * as fromHeroActions from '../store/hero/store-hero.actiobs';
import * as fromAppStore from '../store/app-store';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class GoldService {
  gold: number = 0;
  goldBonus: number;
  private enemyRewards: enemyReward[] = [];
  constructor(private dataStorageService: DataStorageService, private store: Store<fromAppStore.AppState>) { }



  public addGoldRewardForEnemy(enemyLevel: number) {
    this.addGold(this.getRewardForEnemy(enemyLevel));
    // const tempGold = this.gold;
    // this.gold = 0;
    // return tempGold;
  }

  public addGold(additionalGold: number){
    this.store.dispatch(new fromHeroActions.AddGold(additionalGold));
  }

  public addGoldBonus(): number {
    const tempGoldBonus = this.goldBonus;
    this.goldBonus = 0;
    return tempGoldBonus;
  }

  public getRewardForEnemy(enemyLevel: number): number {
    if (this.dataStorageService.enemyRewards.getValue()) {
      return this.dataStorageService.enemyRewards.getValue().find((e) => e.level === enemyLevel).gold;
    }
    return 0;
  }
  public isThereEnoughGold(price: number){
    
  } 

}



