import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { ElementTypes } from '../enums/elementTypes';
import { weaponUrls } from '../enums/imageUrls';
import { Hero } from '../classes/hero';
import { GoldService } from './gold.service';
import { Weapon } from '../classes/weapon';
import { DataStorageService } from './data-storage/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription, BehaviorSubject } from 'rxjs';
//import { WeaponService } from './weapon.service';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../store/app-store';
import * as fromHeroActions from '../store/hero/store-hero.actiobs';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private superHero: BehaviorSubject<Hero> = new BehaviorSubject<Hero>(new Hero());
  private damage = 0;
  private nextWeaponToBuy: Weapon;
  private subscriptionToDataStorageHero: Subscription;
  /*----------------------*/
  weaponsChanged = new EventEmitter<Weapon[]>();

  constructor(private goldService: GoldService,
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromAppStore.AppState>) {

      this.store.select('heroState').subscribe(heroState => {
        if (heroState.hero) {

              //console.log('this.superHero.next(hero) ----------------------;');
              console.log( heroState.hero);
              this.superHero.next(heroState.hero);
              //console.log( this.superHero.getValue());
              this.emitWeaponsChanged(heroState.hero.weapons);
              this.recalculateDamage();
            }
      });
    // this.subscriptionToDataStorageHero = this.dataStorageService.loadedHero.subscribe(hero => {
    //   console.log('next(hero);');
    //   if (hero) {
    //     console.log('this.superHero.next(hero);');
    //     this.superHero.next(hero);
    //     this.emitWeaponsChanged(this.superHero.getValue().weapons);
    //     this.recalculateDamage();
    //   }
    // });

  }

  /*------------------------Gold-----------------------------*/
  public getGold(): number {
    return this.superHero.getValue().gold;
  }
  public getGoldBonus(): number {
    return this.superHero.getValue().goldBonus;
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

  // public levelUp(id: number) {
  //   const currentWeapon = this.superHero.getValue().weapons.find(w => w.id === id);
  //   console.log('levelUp(id: number)' + id);
  //   console.log('currentWeapon' );
  //   console.log(currentWeapon );
  //   const upgratedWeapon = this.weaponService.getNextWeaponByWeapon(currentWeapon);
  //   console.log('upgratedWeapon' );
  //   console.log(upgratedWeapon );
  //   if (this.isThereEnoughGold(currentWeapon.price)) {
  //     this.store.dispatch(new fromHeroActions.WeaponLevelUp(upgratedWeapon));
  //   }

  //   for (let i = 0; this.superHero.getValue().weapons.length > i; i++) {
  //     if (this.superHero.getValue().weapons[i].id === id) {
  //       if (this.isThereEnoughGold(this.superHero.getValue().weapons[i].price)) {
  //         this.goldService.addGold(this.superHero.getValue().weapons[i].price * -1);
  //         // this.superHero.getValue().weapons[i].level++;
  //         // this.superHero.getValue().weapons[i].damage = Math.floor((this.superHero.getValue().weapons[i].damage * 1.1));
  //         // this.superHero.getValue().weapons[i].price = Math.floor(this.superHero.getValue().weapons[i].price * 1.2);
  //         //this.dataStorageService.postWeaponLog(this.superHero.getValue().weapons[i]);
  //         this.emitWeaponsChanged(this.superHero.getValue().weapons);
  //         break;
  //       }
  //     }
  //   }
  //   this.recalculateDamage();

  // }
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
    this.goldService.addGoldRewardForEnemy(this.getCurrentLevel());

    this.dataStorageService.postEnemyLog({ currentLevel: this.superHero.getValue().currentLevel, text: 'enemyDied' });
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

  //  public fetchData() {
  //   this.dataStorageService.hero.subscribe(h => {
  //     if (h)
  //     {
  //       this.superHero.next(h);
  //       this.emitWeaponsChanged(this.superHero.getValue().weapons);
  //       this.recalculateDamage();
  //     }
  //   });
  //}

  // public fetchData() {
  //   this.dataStorageService.getHero().subscribe(h => {
  //       this.superHero.next(h);
  //       this.emitWeaponsChanged(this.superHero.getValue().weapons);
  //       this.recalculateDamage();
  //   });
  // }
}
