import { Injectable } from '@angular/core';
import { ControllerActions } from '../store/controller/controller.actions';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../store/app-store';
import { map, tap, debounceTime, take } from 'rxjs/operators';
import { DataStorageService } from './data-storage/data-storage.service';
import { SharedDataGold } from '../databaseSharedData/gold';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Ratings } from '../components/ratings/ratings.model';
import { HelperService } from './helper.service';

@Injectable({
    providedIn: 'root'
})

export class GameService {
    private damageInterval: any;
    private heroDamage = 0;
    private numberOfDamagesPerSecond = 1;
    private isUserLoginedIn = false;
    private currentRatings: Ratings;
    private tipeOfDyingEnemy = 950;
    private enemyIsGenerating = false;
    private tempDataForPost: number;

    public get getHeroDamage(): number {
        return this.heroDamage;
    }
    public get getHeroDamageConverted(): string {
        return this.healperService.getConvertedNumberToKs(this.heroDamage);
    }

    constructor(private controllerActions: ControllerActions,
        private store: Store<fromAppStore.AppState>,
        private dataStorageService: DataStorageService,
        private healperService: HelperService) {
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
                    this.controllerActions.HeroAddMonsterDownOnCurrentLevel();
                    this.controllerActions.EnemyIsKilled();
                    let goldReward = SharedDataGold.enemyRewards.find((e) => e.level === enemyState.enemy.level).gold;
                    if (goldReward) {
                        // add bonus
                        goldReward += goldReward * (this.controllerActions.getHeroState().hero.goldBonus / 100);
                        this.controllerActions.HeroAddGold(goldReward);
                    }
                }
                if (!enemyState.isEnemyAlive && !this.enemyIsGenerating) {
                    this.enemyIsGenerating = true;
                    // generate new enemy with deley
                    setTimeout(() => {
                        this.controllerActions.EnemyGenerate();
                        this.enemyIsGenerating = false;
                    }, this.tipeOfDyingEnemy);
                }
                return null;
            })).subscribe((value) => {
                return value;
            });
        // -------------------------------HERO-------------------------------
        this.store.select('heroState').pipe(
            map((heroState) => {
                if (heroState.hero.currentLevel !== this.controllerActions.getEnemyState().currentEnemyLevel) {
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
// --------------------------------------------------------------USER DATA INFO--------------------------------------------
        this.store.select('userDataInfoState').pipe(debounceTime(2000)).subscribe(userDataInfoState => {
            if (userDataInfoState.userDataInfo.userName !== 'user') { // don't post default value for Redux
                this.dataStorageService.postUserDataInfo(userDataInfoState.userDataInfo);
            }
            return userDataInfoState;
        });
// --------------------------------------------------------------RATINGS---------------------------------------------------
        this.store.select('ratingsState').subscribe((ratingState) => {
            if (ratingState.rating && ratingState.rating.maxLevel > 0) { // don't post default value for Redux
                this.currentRatings = { ...ratingState.rating };
                this.dataStorageService.postRatings({ ...ratingState.rating });
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

    hitEnemy() {
        this.controllerActions.EnemyIsDamaged(this.getHeroDamage);
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

