export interface enemyReward {

    level: number;
    gold: number;

}

export abstract class SharedDataGold {
    private static enemyRewardsArray: enemyReward[] = [];
    private static startGoldReward = 2;
    private static multiplier = 1.8;
    private static finalLevel = 1000;

    //get array data for enemyRewards
    public static get enemyRewards() {
        if (this.enemyRewardsArray.length < this.finalLevel) {
            let reward = this.startGoldReward;
            for (let i = 0; i <= this.finalLevel; i++) {
                const currentEnemyReward: enemyReward = { level: i, gold: reward };
                this.enemyRewardsArray.push(currentEnemyReward);
                reward = Math.round(reward * this.multiplier);
            }
            return this.enemyRewardsArray;
        }
    }
};
