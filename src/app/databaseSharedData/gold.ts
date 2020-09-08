import { SharedDataService } from './shared-data.service';
import { Injectable } from '@angular/core';

export interface EnemyReward {

    level: number;
    gold: number;

}

@Injectable()
export abstract class SharedDataGold {
    private static enemyRewardsArray: EnemyReward[] = [];
    private static startGoldReward = 2;
    private static multiplier = 2.1;
    private static finalLevel = 100;

    // get array data for enemyRewards
    public static get enemyRewards(): EnemyReward[] {
        if (this.enemyRewardsArray.length < this.finalLevel) {
            SharedDataGold.generateEnemyRewards();
        }
        return this.enemyRewardsArray;
    }

    public static generateEnemyRewards(): void {
        let reward = SharedDataGold.startGoldReward;
        for (let i = 0; i <= SharedDataGold.finalLevel; i++) {
            const currentEnemyReward: EnemyReward = { level: i, gold: reward };
            SharedDataGold.enemyRewardsArray.push(currentEnemyReward);
            reward = Math.round(reward * SharedDataGold.multiplier);
        }
    }

    // private static set enemyReward(value: enemyReward[]) {
    //     SharedDataGold.enemyRewardsArray = value.slice();
    // }
};
