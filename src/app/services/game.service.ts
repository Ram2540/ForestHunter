import { Injectable } from '@angular/core';
import { ControllerActions } from '../store/controller/controller.actions';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../store/app-store';
import { map, tap, debounceTime, take } from 'rxjs/operators';
import { DataStorageService } from './data-storage/data-storage.service';
import { SharedDataGold } from '../databaseSharedData/gold';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
            this.controllerActions.EnemyIsDamaged(this.heroDamage);
        }, 1000);
        // ------------------------------ENEMY------------------------------
        this.store.select('enemyState').pipe(
            map((enemyState) => {
                if (enemyState.enemy && enemyState.enemy.HP <= 0 && enemyState.isEnemyAlive) {
                    // -------------ALL LOGIC ENEMY DEAD APLLY HERE------------------
                    this.controllerActions.EnemyIsKilled();
                    this.controllerActions.HeroAddMonsterDownOnCurrentLevel();
                    const goldReward = SharedDataGold.enemyRewards.find((e) => e.level === enemyState.enemy.level).gold;
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
                const DPSmodefier = (1 + heroState.hero.DPSMultiplier / 100);
                this.heroDamage = heroState.hero.weapons.filter(w => w.level > 0)
                    .reduce((prev, curr) => prev + curr.damage, 0) * DPSmodefier;
            })
        ).subscribe(
            (value) => {
                return value;
            });
        this.store.select('authState').pipe(take(1)).subscribe(value => {
            this.updateHeroOnDB();
            return value;
            });
        
    }

    private updateHeroOnDB() {
        this.store.select('heroState').pipe(debounceTime(2000)).subscribe(heroState => {
            // heroState.hero.id   >= 0  not default Hero
            if (heroState.hero && heroState.hero.id > 0) {
                this.dataStorageService.postHero(heroState.hero);
            }
        });
    }
}

