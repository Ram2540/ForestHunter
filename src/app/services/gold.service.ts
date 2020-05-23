import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoldService {
  gold: number = 0;
  goldBonus:number;
  constructor() { 
     
  }

  public getGold(): number {
    let tempGold = this.gold;
    this.gold = 0;
    return tempGold;
  }

  public addGoldBonus(): number {
    let tempGoldBonus = this.goldBonus;
    this.goldBonus = 0;
    return tempGoldBonus;
  }

}



