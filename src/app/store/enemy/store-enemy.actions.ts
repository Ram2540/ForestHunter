import { Action } from '@ngrx/store';


export const GENERATE_ENEMY = 'GENERATE_ENEMY';
export const ENEMY_IS_DAMAGED = 'ENEMY_IS_DAMAGED';
export const ENEMY_IS_KILLED = 'ENEMY_IS_KILLED';

export class GenerateEnemy implements Action {
    readonly type = GENERATE_ENEMY;
    constructor(public payload: number) {}// enemyLevel
}

export class EnemyIsDamaged implements Action {
    readonly type = ENEMY_IS_DAMAGED;
    constructor(public payload: number) {} // damage
}

export class EnemyIsKilled implements Action {
    readonly type = ENEMY_IS_KILLED;
    constructor(public payload: number) {} // enemyLevel
}


export type EnemyActions = GenerateEnemy
                | EnemyIsDamaged
                | EnemyIsKilled;