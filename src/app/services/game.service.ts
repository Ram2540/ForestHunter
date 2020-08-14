import { Injectable } from '@angular/core';
import { ControllerActions } from '../store/controller/controller.actions';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../store/app-store';
import { map, tap, debounceTime, take } from 'rxjs/operators';
import { DataStorageService } from './data-storage/data-storage.service';
import { SharedDataGold } from '../databaseSharedData/gold';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Ratings } from '../classes/ratings';

@Injectable({
    providedIn: 'root'
})

export class GameService {
    private damageInterval: any;
    private heroDamage = 0;
    private numberOfDamagesPerSecond = 1;
    private isUserLoginedIn = false;
    private currentRatings: Ratings;
    public get getHeroDamage(): number {
        return this.heroDamage;
    }

    constructor(private controllerActions: ControllerActions,
                private store: Store<fromAppStore.AppState>,
                private dataStorageService: DataStorageService) {
        // ------------------------------DAMAGE------------------------------
        this.damageInterval = setInterval(() => {
            // console.log("this.isUserLoginedIn ", this.isUserLoginedIn);
            if (this.isUserLoginedIn) {
                this.controllerActions.EnemyIsDamaged(Math.floor(this.heroDamage / this.numberOfDamagesPerSecond));
            }
        }, (1000 / this.numberOfDamagesPerSecond));
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
        this.store.select('authState').subscribe(value => {
            this.isUserLoginedIn = value.isLoginedIn;
            this.updateHeroOnDB();
            return value;
        });
// --------------------------------------------------------------RATINGS--------------------------------------------------------------
        this.store.select('ratingsState').subscribe((ratingState) => {
            if (ratingState.ratings) {
                this.currentRatings = { ...ratingState.ratings };
            }
            if (ratingState.ratings && ratingState.ratings.maxLevel > 0) {
                this.dataStorageService.postRatings({ ...ratingState.ratings }); // don't post default value for Redux
            }
        });


        this.store.select('heroState').subscribe((heroState) => {
            if (this.currentRatings && this.currentRatings.maxLevel > 0) { // don't post default value for Redux
                let ratingsChnaged = false;
                if (heroState.hero.currentLevel > this.currentRatings.maxLevel) {
                    this.currentRatings.maxLevel = heroState.hero.currentLevel;
                    ratingsChnaged = true;
                }
                if (heroState.hero.gold > this.currentRatings.maxGold) {
                    this.currentRatings.maxGold = heroState.hero.gold;
                    ratingsChnaged = true;
                }
                if (this.heroDamage > 0 && this.heroDamage > this.currentRatings.maxDPS) {
                    this.currentRatings.maxDPS = this.heroDamage;
                    ratingsChnaged = true;
                }
                if (ratingsChnaged) {
                    this.controllerActions.ratingsChanged(this.currentRatings);
                }
            }
        });

    }

    private updateHeroOnDB() {

        this.store.select('heroState').pipe(debounceTime(2000)).subscribe(heroState => {
            if (this.isUserLoginedIn) {
                if (heroState.hero && heroState.hero.id > 0) {
                    this.dataStorageService.postHero(heroState.hero);
                }
            }
        });
    }
}

