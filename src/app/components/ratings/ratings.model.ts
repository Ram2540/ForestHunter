
export class Ratings {
    public userName: string;
    public maxGold: number;
    public maxLevel: number;
    public maxDPS: number;
    public toDayPoints: number;
    constructor(maxLevel = 1) {
        this.maxGold = 0;
        this.maxLevel = maxLevel;
        this.maxDPS = 0;
        this.toDayPoints = 0;
        this.userName = 'user 12345';
    }
}
