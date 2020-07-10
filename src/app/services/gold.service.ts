import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GoldService {
  gold: number = 0;
  goldBonus: number;
  constructor(private dataStorageService: DataStorageService) { }



  public getGold(): number {
    const tempGold = this.gold;
    this.gold = 0;
    return tempGold;
  }

  public addGoldBonus(): number {
    const tempGoldBonus = this.goldBonus;
    this.goldBonus = 0;
    return tempGoldBonus;
  }

  public getRewardForEnemy(enemyLevel: number): number {
    if (this.dataStorageService.enemyRewards) {
      return this.dataStorageService.enemyRewards.value.find((e) => e.level === enemyLevel).gold;
    }
    return 0;
  }

}



