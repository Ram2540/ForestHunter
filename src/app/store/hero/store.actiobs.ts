import { Hero } from '../../classes/hero';
import { Action } from '@ngrx/store'
import { Weapon } from 'src/app/classes/weapon';

export const ADD_GOLD = 'ADD_GOLD';
export const ADD_GOLD_BONUS = 'ADD_GOLD_BONUS';
export const ADD_DPS_MULTIPLIER = 'ADD_DPS_MULTIPLIER';
export const WEAPON = 'WEAPON';
export const ADD_LEVEL = 'ADD_LEVEL';
export const ADD_CURRENT_LEVEL = 'ADD_CURRENT_LEVEL';
export const SET_MAX_MONSTER_ON_LEVEL = 'SET_MAX_MONSTER_ON_LEVEL';
export const MONSTER_DOWN_ON_CURRENT_LEVEL = 'MONSTER_DOWN_ON_CURRENT_LEVEL';
export const WEAPON_LEVEL_UP = 'WEAPON_LEVEL_UP';


// avaliableWeapons: Weapon[];
// weapons: Weapon[];

export class AddGold implements Action {
    readonly type = ADD_GOLD;
    constructor(public payload: number) { }
}

export class AddGoldBonus implements Action {
    readonly type = ADD_GOLD_BONUS;
    constructor(public payload: number) { }
}

export class AddDPSMultilier implements Action {
    readonly type = ADD_DPS_MULTIPLIER;
    constructor(public payload: number) { }
}
export class AddLevel implements Action {
    readonly type = ADD_LEVEL;
    constructor(public payload: 1) { }
}

export class AddCurrentLevel implements Action {
    readonly type = ADD_CURRENT_LEVEL;
    constructor(public payload: 1) { }
}

export class SetMaxMonsterOnLevel implements Action {
    readonly type = SET_MAX_MONSTER_ON_LEVEL;
    constructor(public payload: number) { }
}
export class AddMonsterDownOnCurrentLevel implements Action {
    readonly type = MONSTER_DOWN_ON_CURRENT_LEVEL;
    constructor(public payload: 1) { }
}
export class WeaponLevelUp implements Action {
    readonly type = WEAPON_LEVEL_UP;
    constructor(public payload: Weapon) { }
}

export type HeroActions = AddGold
                        | AddGoldBonus
                        | AddDPSMultilier
                        | AddLevel
                        | AddCurrentLevel
                        | SetMaxMonsterOnLevel
                        | AddMonsterDownOnCurrentLevel
                        | WeaponLevelUp;





