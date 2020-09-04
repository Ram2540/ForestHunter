export class Enemy {
    id: number;
    name: string;
    HP: number;
    FullHP: number;
    url: string;
    level: number;

    constructor(id: number, level: number) {
        this.id = id;
        this.HP = 10 * 2 ** level;
        this.FullHP = this.HP;
        this.level = level;

        const r = Math.floor(Math.random() * 5);
        switch (r) {
            case (0): this.url = 'https://www.vippng.com/png/full/107-1072867_classdojo-monsters-class-dojo-avatar-red.png';
                      break;
            case (1): this.url = 'https://xgm.guru/files/649/130131/screenshot2.png';
                      break;
            case (2): this.url = 'https://pngimage.net/wp-content/uploads/2018/05/evolve-png-2.png';
                      break;
            case (3): this.url = 'https://vignette.wikia.nocookie.net/creaturequest/images/d/dc/235_SwampCreature.png/revision/latest/top-crop/width/360/height/450?cb=20170316001734';
                      break;
            // case (4): this.url = 'https://i.dlpng.com/static/png/6686966_preview.png';
            //           break;
            default: this.url  = 'https://xgm.guru/files/649/130131/screenshot2.png';

        }
    }
}
