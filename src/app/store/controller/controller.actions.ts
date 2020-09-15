import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from './createAction';
import { AppState } from '../app-store';
import { Hero } from 'src/app/classes/hero';
import { Weapon } from 'src/app/classes/weapon';
import { take } from 'rxjs/operators';
import { EnemyState } from '../reducers/store-enemy.reducer';
import { HeroState } from '../reducers/store-hero.reducer';
import { User } from 'src/app/auth/user.model';
import { AuthState } from '../reducers/store-auth.reducer';
import { Ratings, RatingsDB } from '../../components/ratings/ratings.model';
import { RatingsState } from '../reducers/store-ratings.reducer';
import { UserDataInfo } from 'src/app/classes/userDataInfo';
import { UserDataInfoState } from '../reducers/store-userDataInfo.reducer';
import { GlobalSettings } from 'src/app/global-settings';
import { WeapondDatabaseData } from 'src/app/databaseSharedData/weaponsData';
import { WeaponState } from '../reducers/store-weapon.reducer';
import { WeaponService } from 'src/app/services/weapon.service';
// import {AppState} from '../../models/appState';

@Injectable({
  providedIn: 'root'
})
export class ControllerActions {

  static ENEMY_GENERATE = 'ENEMY_GENERATE';
  static ENEMY_LOAD_NEW = 'ENEMY_LOAD_NEW';
  static ENEMY_IS_DAMAGED = 'ENEMY_IS_DAMAGED';
  // static ENEMY_IS_HIT = 'ENEMY_IS_HIT';
  static ENEMY_IS_KILLED = 'ENEMY_IS_KILLED';
  static ENEMY_SET_LEVEL = 'ENEMY_SET_LEVEL';

  static HERO_LOAD = 'HERO_LOAD';
  static HERO_ADD_GOLD = 'HERO_ADD_GOLD';
  static HERO_ADD_GOLD_BONUS = 'HERO_ADD_GOLD_BONUS';
  static HERO_ADD_DPS_MULTIPLIER = 'HERO_ADD_DPS_MULTIPLIER';
  static HERO_ADD_LEVEL = 'HERO_ADD_LEVEL';
  static HERO_ADD_CURRENT_LEVEL = 'HERO_ADD_CURRENT_LEVEL';
  static HERO_SET_MAX_MONSTER_ON_LEVEL = 'HERO_SET_MAX_MONSTER_ON_LEVEL';
  static HERO_MONSTER_DOWN_ON_CURRENT_LEVEL = 'HERO_MONSTER_DOWN_ON_CURRENT_LEVEL';
  static HERO_WEAPON_LEVEL_UP = 'HERO_WEAPON_LEVEL_UP';

  static WEAPON_LOAD_FRON_DB_BY_ID = 'WEAPON_LOAD_FRON_DB_BY_ID';
  static WEAPON_LOAD_ALL_COLLECTIONS = 'WEAPON_LOAD_ALL_COLLECTIONS';
  static WEAPON_NEXT_ASSIGNS_TO_BUY = 'WEAPON_NEXT_ASSIGNS_TO_BUY';

  static USER_LOGIN = 'USER_LOGIN';
  static USER_LOGOUT = 'USER_LOGOUT';

  static USER_DATA_INFO_CHANGE_NAME = 'USER_DATA_INFO_CHANGE_NAME';
  static USER_DATA_INFO_LOAD = 'USER_DATA_INFO_LOAD';
  static USER_DATA_INFO_SET_LAST_DATE_LOGIN = 'USER_DATA_INFO_SET_LAST_DATE_LOGIN';

  static RATINGS_LOAD = 'RATINGS_LOAD';
  static RATINGS_CHNAGED = 'RATINGS_CHNAGED';
  static RATINGS_GLOBAL_LOAD = 'RATINGS_GLOBAL_LOAD';

  constructor(
    private store: Store<AppState>) {

  }


  // ----------------------------------------------HERO------------------------------------------------------------
  public HeroLoad(loadedHero: Hero) {
    this.store.dispatch(createAction(ControllerActions.HERO_LOAD, loadedHero));
  }

  public HeroAddGold(additioanlGold: number) {
    this.store.dispatch(createAction(ControllerActions.HERO_ADD_GOLD, additioanlGold));
  }

  public HeroAddGoldBonus(additioanlGoldBonus: number) {
    this.store.dispatch(createAction(ControllerActions.HERO_ADD_GOLD_BONUS, additioanlGoldBonus));
  }

  public HeroAddDPSMultilier(additioanlDPSMultilier: number) {
    this.store.dispatch(createAction(ControllerActions.HERO_ADD_DPS_MULTIPLIER, additioanlDPSMultilier));
  }

  public HeroAddLevel() {
    const additionalLevel = 1;
    this.store.dispatch(createAction(ControllerActions.HERO_ADD_LEVEL, additionalLevel));
  }

  public HeroAddCurrentLevel() {
    const additionalLevel = 1;
    this.store.dispatch(createAction(ControllerActions.HERO_ADD_CURRENT_LEVEL, additionalLevel));
  }

  public HeroSetMaxMonsterOnLevel(amount: number) {
    this.store.dispatch(createAction(ControllerActions.HERO_SET_MAX_MONSTER_ON_LEVEL, amount));
  }

  public HeroAddMonsterDownOnCurrentLevel() {
    const additionalMonster = 1;
    this.store.dispatch(createAction(ControllerActions.HERO_MONSTER_DOWN_ON_CURRENT_LEVEL, additionalMonster));
  }

  public HeroWeaponLevelUp(updatedWeapon: Weapon) {
    this.store.dispatch(createAction(ControllerActions.HERO_WEAPON_LEVEL_UP, updatedWeapon));
  }
  // ----------------------------------------------WEAPON------------------------------------------------------------
  public WeaponLoadFromDBById(weapon: WeapondDatabaseData) {
    this.store.dispatch(createAction(ControllerActions.WEAPON_LOAD_FRON_DB_BY_ID, weapon));
  }

  public WeaponNextAssignToBuy(weapon: Weapon) {
    this.store.dispatch(createAction(ControllerActions.WEAPON_NEXT_ASSIGNS_TO_BUY, weapon));
  }

  public WeaponsLoadAllCollections(weaponList: WeapondDatabaseData[]) {
    this.store.dispatch(createAction(ControllerActions.WEAPON_LOAD_ALL_COLLECTIONS, weaponList));
  }
  // ----------------------------------------------ENEMY------------------------------------------------------------
  private isEnemyGenerating = false;
  private enemyGenerateTimer;

  public EnemyGenerate() {
    if (this.getEnemyState().currentEnemyLevel !== this.getEnemyState().enemy.level) {
      if (this.enemyGenerateTimer) {
        clearTimeout(this.enemyGenerateTimer);
      }
      this.store.dispatch(createAction(ControllerActions.ENEMY_GENERATE));
      this.isEnemyGenerating = false;
    } else if (!this.isEnemyGenerating) {
      this.isEnemyGenerating = true;
      setTimeout(() => {
        this.enemyGenerateTimer = this.store.dispatch(createAction(ControllerActions.ENEMY_GENERATE));
        this.isEnemyGenerating = false;
      }, GlobalSettings.gameDelayOfEnemyGereration);
    }
  }
  // public EnemyGenerate() {
  //   this.store.dispatch(createAction(ControllerActions.ENEMY_GENERATE));
  // }

  // public EnemyLoadNew(level: number) {
  //   this.store.dispatch(createAction(ControllerActions.ENEMY_LOAD_NEW, level));
  // }

  EnemyIsDamaged(damage: number) {
    this.store.dispatch(createAction(ControllerActions.ENEMY_IS_DAMAGED, damage));
  }

  // EnemyIsHit() {

  // }

  EnemyIsKilled() {
    this.store.dispatch(createAction(ControllerActions.ENEMY_IS_KILLED));
  }

  public EnemySetLevel(level: number) {
    this.store.dispatch(createAction(ControllerActions.ENEMY_SET_LEVEL, level));
  }

  // -------------------------------------------------------------USER------------------------------------------------------------
  public UserLogin(user: User) {
    this.store.dispatch(createAction(ControllerActions.USER_LOGIN, user));
    this.UserUserDataInfoSetLastDateLogin();
  }

  public UserLogout() {
    this.store.dispatch(createAction(ControllerActions.USER_LOGOUT));
    this.HeroLoad(new Hero(0));
    this.EnemyGenerate();
  }

  // -------------------------------------------------------------USER DATA INFO------------------------------------------------------------
  public UserChangeName(newUserName: string[20]) {
    this.store.dispatch(createAction(ControllerActions.USER_DATA_INFO_CHANGE_NAME, newUserName));
  }

  public UserUserDataInfoLoad(userDataInfo: UserDataInfo) {
    this.store.dispatch(createAction(ControllerActions.USER_DATA_INFO_LOAD, userDataInfo));
  }

  private UserUserDataInfoSetLastDateLogin() {
    this.store.dispatch(createAction(ControllerActions.USER_DATA_INFO_SET_LAST_DATE_LOGIN));
  }


  // ----------------------------------------------RATINGS------------------------------------------------------------
  public ratingLoad(rating: Ratings) {
    this.store.dispatch(createAction(ControllerActions.RATINGS_LOAD, rating));
  }

  public ratingsChanged(chnagedRating: Ratings) {
    const currentState = this.getRatingsState();
    for (const key of Object.keys(chnagedRating)) {
      if (currentState.rating[key] !== chnagedRating[key]) {
        this.store.dispatch(createAction(ControllerActions.RATINGS_CHNAGED, { valueName: key, newValue: chnagedRating[key] }));
      }
    }
  }
  public ratingsGlobalLoad(globalRatings: RatingsDB[]) {
    this.store.dispatch(createAction(ControllerActions.RATINGS_GLOBAL_LOAD, globalRatings));
  }

  // ----------------------------------------------GET STATES------------------------------------------------------------
  public getEnemyState(): EnemyState {
    let state: EnemyState;

    this.store.select('enemyState').pipe(take(1)).subscribe(
      s => state = s
    );
    return state;
  }

  public getHeroState(): HeroState {
    let state: HeroState;

    this.store.select('heroState').pipe(take(1)).subscribe(
      s => state = s
    );
    return state;
  }

  public getAuthState(): AuthState {
    let state: AuthState;

    this.store.select('authState').pipe(take(1)).subscribe(
      s => state = s
    );
    return state;
  }

  public getRatingsState(): RatingsState {
    let state: RatingsState;

    this.store.select('ratingsState').pipe(take(1)).subscribe(
      s => state = s
    );
    return state;
  }

  public getUserDataInfoState(): UserDataInfoState {
    let state: UserDataInfoState;

    this.store.select('userDataInfoState').pipe(take(1)).subscribe(
      s => state = s
    );
    return state;
  }

  public getWeaponState(): WeaponState {
    let state: WeaponState;

    this.store.select('weaponsState').pipe(take(1)).subscribe(
      s => state = s
    );
    return state;
  }


}
