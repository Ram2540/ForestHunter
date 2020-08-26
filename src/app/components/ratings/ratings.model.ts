
export class Ratings {
    public maxGold: number;
    public maxLevel: number;
    public maxDPS: number;
    public toDayPoints: number;
    constructor(maxLevel = 1) {
        this.maxGold = 0;
        this.maxLevel = maxLevel;
        this.maxDPS = 0;
        this.toDayPoints = 0;
    }
}


export class RatingsDB extends Ratings {
    public userName: string[20];
    constructor(maxLevel = 1) {
        super(maxLevel);
    }
}