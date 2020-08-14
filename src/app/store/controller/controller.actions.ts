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
import { Ratings } from 'src/app/classes/ratings';
import { RatingsState } from '../reducers/store-ratings.reducer';
// import {AppState} from '../../models/appState';

@Injectable({
  providedIn: 'root'
})
export class ControllerActions {

  static ENEMY_GENERATE = 'ENEMY_GENERATE';
  static ENEMY_LOAD_NEW = 'ENEMY_LOAD_NEW';
  static ENEMY_IS_DAMAGED = 'ENEMY_IS_DAMAGED';
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

  static USER_LOGIN = 'USER_LOGIN';
  static USER_LOGOUT = 'USER_LOGOUT';

  static RATINGS_LOAD = 'RATINGS_LOAD';
  static RATINGS_CHNAGED = 'RATINGS_CHNAGED';

  constructor(private store: Store<AppState>) {

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

  public HeroWeaponLevelUp(weapon: Weapon) {
    this.store.dispatch(createAction(ControllerActions.HERO_WEAPON_LEVEL_UP, weapon));
  }

  // ----------------------------------------------ENEMY------------------------------------------------------------
  public EnemyGenerate(level: number) {
    this.store.dispatch(createAction(ControllerActions.ENEMY_GENERATE, level));
  }

  public EnemyLoadNew(level: number) {
    this.store.dispatch(createAction(ControllerActions.ENEMY_LOAD_NEW, level));
  }

  EnemyIsDamaged(damage: number) {
    this.store.dispatch(createAction(ControllerActions.ENEMY_IS_DAMAGED, damage));
  }

  EnemyIsKilled() {
    this.store.dispatch(createAction(ControllerActions.ENEMY_IS_KILLED));
  }

  public EnemySetLevel(level: number) {
    this.store.dispatch(createAction(ControllerActions.ENEMY_SET_LEVEL, level));
  }

// -------------------------------------------------------------USER------------------------------------------------------------
public UserLogin(user: User) {
  this.store.dispatch(createAction(ControllerActions.USER_LOGIN, user));
}

public UserLogout() {
  this.store.dispatch(createAction(ControllerActions.USER_LOGOUT));
  this.HeroLoad(new Hero(0));
  this.EnemyGenerate(1);
}

// ----------------------------------------------RATINGS------------------------------------------------------------
public ratingsLoad(ratings: Ratings) {
    this.store.dispatch(createAction(ControllerActions.RATINGS_LOAD, ratings));
}

public ratingsChanged(ratings: Ratings) {
  const currentState = this.geRatingsState();
  for (const key of Object.keys(ratings)) {
    if (currentState.ratings[key] !== ratings[key]) {
      this.store.dispatch(createAction(ControllerActions.RATINGS_CHNAGED, {valueName: key, newValue: ratings[key]}));
    }
  }
}


  // ----------------------------------------------GET STATES------------------------------------------------------------
  public getEnemyState(): EnemyState {
    let state: EnemyState;

    this.store.select('enemyState').pipe(take(1)).subscribe(
      s => state = s
    );
    return state;
  }

  public geHeroState(): HeroState {
    let state: HeroState;

    this.store.select('heroState').pipe(take(1)).subscribe(
      s => state = s
    );
    return state;
  }

  public geAuthState(): AuthState {
    let state: AuthState;

    this.store.select('authState').pipe(take(1)).subscribe(
      s => state = s
    );
    return state;
  }

  public geRatingsState(): RatingsState {
    let state: RatingsState;

    this.store.select('ratingsState').pipe(take(1)).subscribe(
      s => state = s
    );
    return state;
  }


}
