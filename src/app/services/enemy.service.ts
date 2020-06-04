import { Injectable } from '@angular/core';
import { Enemy } from '../classes/enemy';
import { HeroService } from './hero.service';

@Injectable({
  providedIn: 'root'
})
export class EnemyService {
  currentEnemy: Enemy;
  private creationOfNewEnemyLaunched = false;


  constructor(private heroService: HeroService) {
    this.generateEnemy(heroService.getCurrentLevel());

    setInterval(() => { this.toDamageEnemy(); }, 1000);
  }
  public getEnemy(): Enemy {
    return this.currentEnemy;
  }
  public getEnemyHP(): number {
    return this.currentEnemy.HP;
  }

  public getPercentHP(): number {
    return this.currentEnemy.HP / this.currentEnemy.FullHP * 100;
  }
  public getFullHP(): number {
    return this.currentEnemy.FullHP;
  }


  private generateEnemy(level: number) {
    if (!this.isEnemyAlive() && !this.creationOfNewEnemyLaunched) {
      /*if (this.currentEnemy) {
        this.creationOfNewEnemyLaunched = true;
        setTimeout(() => {
          // this.currentEnemy = null;
          this.currentEnemy = new Enemy(1, level);
          this.creationOfNewEnemyLaunched = false;
        }, 1250);
      } else {
        this.currentEnemy = new Enemy(1, level);
      }
*/
      this.currentEnemy = null;
      this.currentEnemy = new Enemy(1, level);
      //console.log('generateEnemy-------------');
    }
  }

  private isEnemyAlive(): boolean {
    if (this.currentEnemy && this.currentEnemy.HP > 0) {
      return true;
    }
    return false;
  }
  public toDamageEnemy() {

    const damage: number = this.heroService.getDamage(); // Math.random() * 10;
    //console.log('toDamageEnemy ' + this.heroService.getDamage());
    this.currentEnemy.HP -= damage;
    if (this.currentEnemy.HP <= 0) {
      this.currentEnemy.HP = 0;
      this.enemyKilled();
    }
  }
  private enemyKilled() {
    // let _level = this.currentEnemy.level;
    //this.currentEnemy = null;
    this.heroService.addGold(111);
    this.heroService.enemyKilled();
    //console.log('enemyKilled-------------');
    this.generateEnemy(this.heroService.getCurrentLevel());// this.generateEnemy(_level + 1);
  }


  /*------------------------Level-----------------------------*/
  getCurrentLevel(): number {
    return this.heroService.getCurrentLevel();
  }

  getMaxMosterOnLevel(): number {
    return this.heroService.getMaxMosterOnLevel();
  }

  getMostersDownOnCurrentLevel(): number {
    return this.heroService.getMostersDownOnCurrentLevel();
  }

  // /*-----------------------------------TEST-------------------------------------- */
  //   private getRewards(): [{ HP: number, gold: number }] {
  //     let revard: [{ HP: number; gold: number; }] = [,];
  //     let HPmultiplier: number = 1.2;
  //     let Goldmultiplier: number = 1.4;

  //     let HP: number = 10;
  //     let gold: number = 1;


  //     for (let i = 0; i < 100; i++) {
  //         revard.push({ HP, gold });
  //         HP *= HPmultiplier;
  //         gold *= Goldmultiplier;
  //     }

  //     return revard;
  // }



}
