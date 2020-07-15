import { ActionReducerMap } from '@ngrx/store';
import * as fromStoreHeroReducer from './hero/store-hero.reducer';
import * as fromStoreEnemyReducer  from './enemy/store-enemy.reducer';


export interface AppState {
    heroState: fromStoreHeroReducer.HeroState;
    enemyState: fromStoreEnemyReducer.EnemyState;
}

export const appReducer: ActionReducerMap<AppState>  = {
    heroState : fromStoreHeroReducer.heroReducer,
    enemyState : fromStoreEnemyReducer.enemyReducer
}