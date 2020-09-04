const maxShiftForClick = 6;

export class EnemyHit {
    state: number;
    xShift: number;
    yShift: number;

    constructor(public x: number, public y: number, public text: string) {
        this.state = 0;
        this.xShift = Math.floor(Math.random() * maxShiftForClick * 2) - maxShiftForClick;
        this.yShift = Math.floor(Math.random() * maxShiftForClick * 2) - maxShiftForClick;
    }

    nextState() {
        this.state++;
        this.x += this.xShift;
        this.y += this.yShift;
    }
}
