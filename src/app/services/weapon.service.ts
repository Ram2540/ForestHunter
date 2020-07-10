import { Injectable } from '@angular/core';
import { Weapon } from '../classes/weapon';
import { ElementTypes } from '../enums/elementTypes';
import { weaponUrls } from '../enums/imageUrls';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  private weaponList: Weapon[] = [];
  private firstWeaponStages: Weapon[] = [];
  private maxWeaponLevel = 100;
  private priceFactor = 0.1; // 10% increase of price for each new level of weapon
  private damageFactor = 1.1; //  1.1 - 110% increase of damage for each new level of weapon
  public get getWeaponData(): Weapon[] {
    return this.weaponList.slice();
  }

  public get getFirstWeaponStates(): Weapon[] {
    return this.firstWeaponStages.slice();
  }

  constructor() {
    this.generateDataForDB();
  }

  public getWeaponByIDandLevel(id: number, level: number): Weapon {
    const foundWeapon = this.weaponList.find(w => w.id === id && w.level === level);
    if (foundWeapon) {
        return foundWeapon;
    }
    return null;
}

  private generateDataForDB() {
    if (this.weaponList.length === 0) {
      if (this.firstWeaponStages.length === 0) {
        this.fillStaticDataForWeaponStages();
      }
      this.weaponList = [];
      this.firstWeaponStages.forEach(
          weapon => {
              let UpdatedWeapon: Weapon = { ...weapon };
              this.weaponList.push(UpdatedWeapon);
              for (let i = 1; i <= this.maxWeaponLevel; i++) {
                  UpdatedWeapon = this.addUpdatedWeapon(UpdatedWeapon);
              }
          }
      )

    }
  }
  private addUpdatedWeapon(weapon: Weapon): Weapon {
    const UpdatedWeapon: Weapon = { ...weapon };
    // calculate values
    UpdatedWeapon.level++;
    UpdatedWeapon.price = weapon.price + Math.round(weapon.price * this.priceFactor);
    UpdatedWeapon.damage = weapon.damage + this.firstWeaponStages.find(w => w.id === weapon.id).damage/* * this.damageFactor*/;
    this.weaponList.push(UpdatedWeapon);
    return UpdatedWeapon;
}

  private fillStaticDataForWeaponStages(): void {
    this.firstWeaponStages = [];
    this.firstWeaponStages.push(new Weapon(1, 0, 1, 10, 1, ElementTypes.Earth, true, weaponUrls.weapon1));
    this.firstWeaponStages.push(new Weapon(2, 0, 5, 50, 1, ElementTypes.Fire, true, weaponUrls.weapon2));
    this.firstWeaponStages.push(new Weapon(3, 0, 24, 250, 1, ElementTypes.Water, true, weaponUrls.weapon3));
    this.firstWeaponStages.push(new Weapon(4, 0, 120, 1250, 1, ElementTypes.Wind, true, weaponUrls.weapon4));
    this.firstWeaponStages.push(new Weapon(5, 0, 450, 5500, 1, ElementTypes.Wind, true, weaponUrls.weapon5));
    this.firstWeaponStages.push(new Weapon(6, 0, 1600, 25000, 1, ElementTypes.Wind, true, weaponUrls.weapon6));
    this.firstWeaponStages.push(new Weapon(7, 0, 6000, 125000, 1, ElementTypes.Wind, true, weaponUrls.weapon7));
  }
}
