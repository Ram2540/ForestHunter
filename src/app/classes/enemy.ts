import { Enemies } from '../services/fixed-data';

export class Enemy {
    id: number;
    name: string;
    HP: number;
    FullHP: number;
    //gold?: number;
    url: string;
    level: number;

    constructor(id: number, level: number) {
        this.id = id;
        this.HP = 250 * 2 ** level;
        this.FullHP = this.HP;
        this.level = level;

        const r = Math.floor(Math.random() * 3);
        switch (r) {
            case (0): this.url = "https://www.vippng.com/png/full/107-1072867_classdojo-monsters-class-dojo-avatar-red.png";
                break;
            case (1): this.url = "https://xgm.guru/files/649/130131/screenshot2.png";
                break;
            case (2): this.url = "https://pngimage.net/wp-content/uploads/2018/05/evolve-png-2.png";
                break;
            default: "https://pngimage.net/wp-content/uploads/2018/05/evolve-png-2.png";
        }
        //console.log(r + "enemy");
    }
}


// export class Enemy {
//     id: number;
//     name: string;
//     HP: number;
//     gold?: number;
//     url: string;
//     level: number;

//     constructor(id: number,level:number) {
//         this.id = id;
//         this.HP = 100;
//     }

//     // constructor(id: number,level:number) {
//     //     this.id = id;
//     //     this.HP = this.getHP(level);
//     // }

//     // getHP(level:number) :number{
//     //     let enemies = Enemies;
//     //     return enemies[level].HP;
//     // }
// }