import { ActionReducerMap } from '@ngrx/store';
import * as fromStoreHeroReducer from './reducers/store-hero.reducer';
import * as fromStoreEnemyReducer  from './reducers/store-enemy.reducer';
import * as fromStoreAuthReducer  from './reducers/store-auth.reducer';
import * as fromStoreRatingsReducer from './reducers/store-ratings.reducer';
import * as fromStoreUserDataInfoStateReducer from './reducers/store-userDataInfo.reducer';


export interface AppState {
    heroState: fromStoreHeroReducer.HeroState;
    enemyState: fromStoreEnemyReducer.EnemyState;
    authState: fromStoreAuthReducer.AuthState;
    ratingsState: fromStoreRatingsReducer.RatingsState;
    userDataInfoState: fromStoreUserDataInfoStateReducer.UserDataInfoState;
}
//export type appActions = HeroActions | EnemyActions;
export interface appActions {
    type: string;
    payload?: any;
}



export const appReducer: ActionReducerMap<AppState>  = {
    heroState : fromStoreHeroReducer.heroReducer,
    enemyState : fromStoreEnemyReducer.enemyReducer,
    authState : fromStoreAuthReducer.userReducer,
    ratingsState : fromStoreRatingsReducer.ratingsReducer,
    userDataInfoState : fromStoreUserDataInfoStateReducer.userDataInfoStateReducer
}

