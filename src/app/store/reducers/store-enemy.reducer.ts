import { Enemy } from 'src/app/classes/enemy';
//import * as StoreEnemyActions from './store-enemy.actions';
import { Store } from '@ngrx/store';
import { appActions } from '../app-store';
import { ControllerActions } from '../controller/controller.actions';

export interface EnemyState {
    enemy: Enemy;
    isEnemyAlive: boolean;
}

const initialEnemyState: EnemyState = {
    enemy: new Enemy(1, 1),
    isEnemyAlive: true
}

export function enemyReducer(state = initialEnemyState, action: appActions) {
    switch (action.type) {
        case ControllerActions.ENEMY_GENERATE:
            return {
                ...state,
                //enemy: state.enemy ? state.enemy : new Enemy(1, action.payload)
                enemy: state.enemy.HP <= 0 ? new Enemy(1, action.payload) : state.enemy,
                isEnemyAlive: true
            };
        case ControllerActions.ENEMY_IS_DAMAGED:
            return {
                ...state,
                enemy: {
                    ...state.enemy,
                    HP: state.enemy.HP > action.payload ? state.enemy.HP - action.payload : 0
                }
            };
        case ControllerActions.ENEMY_IS_KILLED:
            return {
                ...state,
                // enemy: state.enemy.HP <= 0 ? null : state.enemy,
                isEnemyAlive: false
            };
        case ControllerActions.ENEMY_SET_LEVEL:
            return {
                ...state,
                enemy: {
                    ...state.enemy,
                    level: action.payload
                }
            };
        default: return state;
    }
}
