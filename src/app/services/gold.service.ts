import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoldService {
  gold: number = 0;
  goldBonus: number;
  constructor() { }

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

}



