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
        // Maria 'https://www.vippng.com/png/full/107-1072867_classdojo-monsters-class-dojo-avatar-red.png'
const mostersURL = ['https://xgm.guru/files/649/130131/screenshot2.png',
'https://pngimage.net/wp-content/uploads/2018/05/evolve-png-2.png',
'https://vignette.wikia.nocookie.net/creaturequest/images/d/dc/235_SwampCreature.png/revision/latest/top-crop/width/360/height/450?cb=20170316001734',
'https://static.wikia.nocookie.net/monster-legends-epic-guide/images/6/69/Cthulhu_3.png',
// 'https://i.imgur.com/gaavGzq.png',
'https://cdn.donmai.us/original/92/8f/__hakurei_reimu_and_onimiko_touhou_and_1_more_drawn_by_mazeran__928f716d0ee26804a2ef4a1de2e52d5d.png',
'https://cdn.donmai.us/original/34/fa/__nyarlathotep_original_and_1_more_drawn_by_mazeran__34fa8bda010ec8c0a1b73a6d3c0393ee.png',
'https://artfiles.alphacoders.com/130/thumb-1920-130643.png',
'https://pbs.twimg.com/media/DOOCaOFX0AA_NZ2.png',
'https://pbs.twimg.com/media/DOOFKOyXkAET3tS.png',
'https://i.kym-cdn.com/photos/images/original/000/428/043/c28.png',
'https://vignette.wikia.nocookie.net/legendsofthemultiuniverse/images/9/9e/Cthulhu.png/revision/latest/scale-to-width-down/340?cb=20200526073159',
// BOSS
'https://bigmemes.funnyjunk.com/comments/Ops+are+now+nicer+than+before+its+honestly+_34db25b8224c8dc8f920c6d4747957c1.png',
'https://pbs.twimg.com/media/CrsUu6dXgAArQ13?format=png&name=small',
'https://bigmemes.funnyjunk.com/comments/Sounds+like+a+cool+person+_be2af0f99c2c7e5fb76eac83c102a6be.png',
'https://hg1.funnyjunk.com/comments/Theyre+a+personatouhou+crossover+gimme+a+sec+and+ill+find+_4b189f5999ea04717e7c080790ca20f3.png',
'https://hg1.funnyjunk.com/comments/Found+it+the+artist+goes+by+the+name+of+quotmazeranquot+_0325cc941d69b48dc61b32fb521be05d.png',
        ]
        this.url = mostersURL[Math.floor(Math.random() * mostersURL.length)];
        //this.url = 'https://i7.pngflow.com/pngimage/293/775/png-evolve-monster-behemoth-kraken-legendary-creature-monster-purple-game-dragon-video-game-clipart.png'


    }
}
