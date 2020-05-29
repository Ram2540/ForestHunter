import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { ElementTypes } from '../enums/elementTypes';
import { weaponUrls } from '../enums/imageUrls';
import { Hero } from '../classes/hero';
import { GoldService } from './gold.service';
import { Weapon } from '../classes/weapon';
import { DataStorageService } from './data-storage/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HeroService{
  private superHero: BehaviorSubject<Hero> = new BehaviorSubject<Hero>(new Hero());
  private damage = 0;
  private nextWeaponToBuy: Weapon;
  private subscriptionToUser: Subscription;
  /*----------------------*/
  weaponsChanged = new EventEmitter<Weapon[]>();


  constructor(private goldService: GoldService, private dataStorageService: DataStorageService, private authService: AuthService/*,private enemyService: EnemyService*/) {
    this.subscriptionToUser = this.authService.user.subscribe(
      () => {
        this.fetchData();
      }
    )

    setTimeout(() => {this.fetchData();},10000);

    setInterval(() => {console.log(this.superHero.getValue());},1000);

  }

  /*------------------------Gold-----------------------------*/
  public getGold(): number {
    return this.superHero.getValue().gold;
  }
  public getGoldBonus(): number {
    return this.superHero.getValue().goldBonus;
  }

  public addGold(gold: number): void {
    this.superHero.getValue().gold += gold;
    console.log(this.superHero.getValue().gold);
  }

  public addGoldBonus(bonus: number): void {
    this.superHero.getValue().goldBonus += bonus;
  }
  public isThereEnoughGold(gold: number): boolean {
    return this.superHero.getValue().gold >= gold;
  }
  /*------------------------Weapon-----------------------------*/
  private recalculateDamage() {
    this.damage = 0;
    this.damage = this.superHero.getValue().weapons.filter(w => w.level > 0).reduce((prev, curr) => prev + curr.damage, 0);
    console.log('recalculateDamage ' + this.damage);
  }
  public getDamage() {
    return this.damage;
  }

  public getDPSMultiplier() {
    return this.superHero.getValue().DPSMultiplier;
  }
  public getHeroWeapons() {
    return this.superHero.getValue().weapons.filter(w => w.level > 0);
  }
  public getNextWeaponToBuy() {
    if (this.nextWeaponToBuy && this.nextWeaponToBuy.level === 0) {
      return this.nextWeaponToBuy;
    }
    return this.superHero.getValue().weapons.filter(w => w.level === 0).sort((n1, n2) => {
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
    for (let i = 0; this.superHero.getValue().weapons.length > i; i++) {
      if (this.superHero.getValue().weapons[i].id === id) {
        if (this.isThereEnoughGold(this.superHero.getValue().weapons[i].price)) {
          this.addGold(this.superHero.getValue().weapons[i].price * -1);
          this.superHero.getValue().weapons[i].level++;
          this.superHero.getValue().weapons[i].damage = Math.floor((this.superHero.getValue().weapons[i].damage * 1.1));
          this.superHero.getValue().weapons[i].price = Math.floor(this.superHero.getValue().weapons[i].price * 1.2);
          this.emitWeaponsChanged(this.superHero.getValue().weapons);
          break;
        }
      }
    }
    this.recalculateDamage();
  }
  /*------------------------Level-----------------------------*/
  getCurrentLevel(): number {
    return this.superHero.getValue().currentLevel;
  }

  getMaxMosterOnLevel(): number {
    return this.superHero.getValue().maxMosterOnLevel;
  }

  getMostersDownOnCurrentLevel(): number {
    return this.superHero.getValue().mostersDownOnCurrentLevel;
  }

  enemyKilled() {
    this.superHero.getValue().mostersDownOnCurrentLevel++;
    if (this.superHero.getValue().mostersDownOnCurrentLevel === this.superHero.getValue().maxMosterOnLevel) {
      this.superHero.getValue().mostersDownOnCurrentLevel = 0;
      this.superHero.getValue().currentLevel++;
    }
  }
  /*-------------------------Emiters------------------------- */
  private emitWeaponsChanged(newWeapons: Weapon[]): void {
    this.weaponsChanged.emit(newWeapons);
  }

  private fetchData() {
    this.dataStorageService.getHero().subscribe(h => {
      this.superHero.next(h);
    });
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
