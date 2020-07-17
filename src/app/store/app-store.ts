import { ActionReducerMap } from '@ngrx/store';
import * as fromStoreHeroReducer from './hero/store-hero.reducer';
import * as fromStoreEnemyReducer  from './enemy/store-enemy.reducer';
//import { HeroActions } from './hero/store-hero.actiobs';
//import { EnemyActions } from './enemy/store-enemy.actions';
import { Action } from '@ngrx/store';


export interface AppState {
    heroState: fromStoreHeroReducer.HeroState;
    enemyState: fromStoreEnemyReducer.EnemyState;
}
//export type appActions = HeroActions | EnemyActions;
export interface appActions {
    type: string;
    payload? : any;
}



export const appReducer: ActionReducerMap<AppState>  = {
    heroState : fromStoreHeroReducer.heroReducer,
    enemyState : fromStoreEnemyReducer.enemyReducer
}

