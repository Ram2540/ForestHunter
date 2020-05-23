import { Injectable, EventEmitter } from '@angular/core';
import { ElementTypes } from '../enums/elementTypes';
import { weaponUrls } from '../enums/imageUrls';
import { Hero } from '../classes/hero';
import { GoldService } from './gold.service';
import { Weapon } from '../classes/weapon';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private superHero: Hero = new Hero(1);
  private damage = 0;
  private nextWeaponToBuy: Weapon;
/*----------------------*/
weaponsChanged = new EventEmitter<Weapon[]>();
  

  constructor(private goldService: GoldService/*,private enemyService: EnemyService*/) {
 
  }

  /*------------------------Gold-----------------------------*/
  public getGold(): number {
    return this.superHero.gold;
  }
  public getGoldBonus(): number {
    return this.superHero.goldBonus;
  }

  public addGold(gold: number): void {
    this.superHero.gold += gold;
    console.log(this.superHero.gold);
  }

  public addGoldBonus(bonus: number): void {
    this.superHero.goldBonus += bonus;
  }
  public isThereEnoughGold(gold: number): boolean {
    return this.superHero.gold >= gold;
  }
  /*------------------------Weapon-----------------------------*/
  private recalculateDamage() {
    this.damage = 0;
    this.damage = this.superHero.weapons.filter(w => w.level > 0).reduce((prev, curr) => prev + curr.damage, 0);
    console.log('recalculateDamage ' + this.damage);
  }
  public getDamage() {
    return this.damage;
  }

  public getDPSMultiplier() {
    return this.superHero.DPSMultiplier;
  }
  public getHeroWeapons() {
    return this.superHero.weapons.filter(w => w.level > 0);
  }
  public getNextWeaponToBuy() {
    if (this.nextWeaponToBuy && this.nextWeaponToBuy.level === 0) {
      return this.nextWeaponToBuy;
    }
    return this.superHero.weapons.filter(w => w.level === 0).sort((n1, n2) => {
      if (n1.price > n2.price) {
        return 1;
      }

      if (n1.price < n2.price) {
        return -1;
      }

      return 0;
    })[0];
  }

  public levelUp(id: number) {
    for (let i = 0; this.superHero.weapons.length > i; i++) {
      if (this.superHero.weapons[i].id === id) {
        if (this.isThereEnoughGold(this.superHero.weapons[i].price)) {
          this.addGold(this.superHero.weapons[i].price * -1);
          this.superHero.weapons[i].level++;
           this.superHero.weapons[i].damage = Math.floor((this.superHero.weapons[i].damage * 1.1));
           this.superHero.weapons[i].price = Math.floor(this.superHero.weapons[i].price * 1.2);
           this.emitWeaponsChanged(this.superHero.weapons);
          break;
        }
      }
    }
    this.recalculateDamage();
  }
 /*------------------------Level-----------------------------*/
 getCurrentLevel():number{
   return this.superHero.currentLevel;
 }

 getMaxMosterOnLevel():number{
  return this.superHero.maxMosterOnLevel;
}

getMostersDownOnCurrentLevel():number{
  return this.superHero.mostersDownOnCurrentLevel;
}

enemyKilled(){
  this.superHero.mostersDownOnCurrentLevel++;
  if (this.superHero.mostersDownOnCurrentLevel === this.superHero.maxMosterOnLevel)
  {
    this.superHero.mostersDownOnCurrentLevel=0;
    this.superHero.currentLevel++;
  }
}
/*-------------------------Emiters------------------------- */
private emitWeaponsChanged(newWeapons:Weapon[]):void
{
  this.weaponsChanged.emit(newWeapons);
}
  /*-----------------------------------------------------*/
  /*
  private gerRandomWeaponUrls(): string {
    let value = Math.floor(Math.random() * Object.keys(weaponUrls).length );
    switch (value) {
      case 0: return weaponUrls.weapon1;
      case 1: return weaponUrls.weapon2;
      case 2: return weaponUrls.weapon3;
      case 3: return weaponUrls.weapon4;
      default: return weaponUrls.weapon1;
    }
  }

  private randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
  }

  getRandomnSetOfWeapons() {
    let n = Math.random() * 5;
    for (let i = 0; i < n; i++) {
      this.superHero.weapons.push({ id: Math.floor(Math.random() * 100), level: Math.floor(Math.random() * 100), damage: Math.floor(Math.random() * 999), attackFrequency: Math.floor(Math.random() * 1000), element: this.randomEnum(ElementTypes), availability: true, UrlImg: this.gerRandomWeaponUrls() });
    }
  }
*/
}
