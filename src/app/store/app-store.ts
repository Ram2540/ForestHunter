import { HeroState } from './hero/store-hero.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromStoreHeroReducer from './hero/store-hero.reducer';

export interface AppState {
    heroState: HeroState;
}

export const appReducer: ActionReducerMap<AppState>  = {
    heroState : fromStoreHeroReducer.heroReducer
}