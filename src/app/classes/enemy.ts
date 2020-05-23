import { Enemies } from '../services/fixed-data';

export class Enemy {
    private id: number;
    name: string;
    HP: number;
    FullHP: number;
    gold?: number;
    url: string;
    level: number;

    constructor(id: number, level: number) {
        this.id = id;
        this.HP = 250 * level;
        this.FullHP = this.HP;

        const r = Math.floor(Math.random() * 3);
        switch (r) {
            case (0): this.url = "https://www.vippng.com/png/full/107-1072867_classdojo-monsters-class-dojo-avatar-red.png";
                break;
            case (1): this.url = "https://xgm.guru/files/649/130131/screenshot2.png";
                break;
            default: "https://forums.wesnoth.org/download/file.php?id=23653&mode=view";
        }
        console.log(r + "enemy");

        // if (Math.random()>0.5)
        // {
        // this.url = "https://xgm.guru/files/649/130131/screenshot2.png";
        // console.log ("take 1 pesant");
        // }
        // else 
        // {
        //     this.url = "https://forums.wesnoth.org/download/file.php?id=23653&mode=view";
        //     console.log ("take 2 pesant");
        // }
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