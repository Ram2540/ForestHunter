import { Injectable } from '@angular/core';
import { ControllerActions } from '../store/controller/controller.actions';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../store/app-store';
import { map, tap } from 'rxjs/operators';
import { DataStorageService } from './data-storage/data-storage.service';

@Injectable({
    providedIn: 'root'
})

export class GameService {
    private damageInterval: any;
    private heroDamage = 0;
    public get getHeroDamage(): number {
        return this.heroDamage;
    }

    constructor(private controllerActions: ControllerActions,
                private store: Store<fromAppStore.AppState>,
                private dataStorageService: DataStorageService) {
        // ------------------------------DAMAGE------------------------------
        this.damageInterval = setInterval(() => {
            console.log('this.controllerActions.EnemyIsDamaged(100);');
            this.controllerActions.EnemyIsDamaged(this.heroDamage);
        }, 1000);
        // ------------------------------ENEMY------------------------------
        this.store.select('enemyState').pipe(
            map((enemyState) => {
                if (enemyState.enemy && enemyState.enemy.HP <= 0 && enemyState.isEnemyAlive) {
                    // -------------ALL LOGIC ENEMY DEAD APLLY HERE------------------
                    this.controllerActions.EnemyIsKilled();
                    this.controllerActions.HeroAddMonsterDownOnCurrentLevel();
                    // this.dataStorageService.enemyRewards.getValue().find((e) => e.level === enemyState.enemy.level).gold;
                    const goldReward = 1000;
                    if (goldReward) {
                        this.controllerActions.HeroAddGold(goldReward);
                    }
                    // generate new enemy
                    this.controllerActions.EnemyGenerate(enemyState.enemy.level);
                    }
                return null;
            })).subscribe((value) => {
                return value;
            });
        // -------------------------------HERO-------------------------------
        this.store.select('heroState').pipe(
            map((heroState) => {
                if (heroState.hero.currentLevel !== this.controllerActions.getEnemyState().enemy.level) {
                    // change enemy level
                    this.controllerActions.EnemySetLevel(heroState.hero.currentLevel);
                }
                // hero Damage
                this.heroDamage  = heroState.hero.weapons.filter(w => w.level > 0).reduce((prev, curr) => prev + curr.damage, 0);
            })
        ).subscribe(
            (value) => {
                return value;
            });
    }
}

