import { SharedDataService } from './shared-data.service';
import { Injectable } from '@angular/core';
import { GlobalSettings } from '../global-settings';

export interface EnemyReward {

    level: number;
    gold: number;

}

@Injectable()
export abstract class SharedDataGold {
    private static enemyRewardsArray: EnemyReward[] = [];

    // get array data for enemyRewards
    public static get enemyRewards(): EnemyReward[] {
        if (this.enemyRewardsArray.length < GlobalSettings.finalLevel) {
            SharedDataGold.generateEnemyRewards();
        }
        return this.enemyRewardsArray;
    }

    public static generateEnemyRewards(): void {
        let reward = GlobalSettings.startGoldReward;
        for (let i = 0; i <= GlobalSettings.finalLevel; i++) {
            const currentEnemyReward: EnemyReward = { level: i, gold: reward };
            SharedDataGold.enemyRewardsArray.push(currentEnemyReward);
            reward = Math.round(reward * GlobalSettings.goldMultiplier);
        }
    }
};
