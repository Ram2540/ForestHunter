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
        const mostersURL = [
            // 'https://xgm.guru/files/649/130131/screenshot2.png',
            'https://pngimage.net/wp-content/uploads/2018/05/evolve-png-2.png',
            'https://vignette.wikia.nocookie.net/creaturequest/images/d/dc/235_SwampCreature.png/revision/latest/top-crop/width/360/height/450?cb=20170316001734',
            'https://static.wikia.nocookie.net/monster-legends-epic-guide/images/6/69/Cthulhu_3.png',
            // 'https://i.imgur.com/gaavGzq.png',
            'https://cdn.donmai.us/original/92/8f/__hakurei_reimu_and_onimiko_touhou_and_1_more_drawn_by_mazeran__928f716d0ee26804a2ef4a1de2e52d5d.png',
            'https://cdn.donmai.us/original/34/fa/__nyarlathotep_original_and_1_more_drawn_by_mazeran__34fa8bda010ec8c0a1b73a6d3c0393ee.png',
            'https://artfiles.alphacoders.com/130/thumb-1920-130643.png',
            'https://pbs.twimg.com/media/DOOCaOFX0AA_NZ2.png',
            'https://pbs.twimg.com/media/DOOFKOyXkAET3tS.png',
            //'https://i.kym-cdn.com/photos/images/original/000/428/043/c28.png',
            'https://vignette.wikia.nocookie.net/legendsofthemultiuniverse/images/9/9e/Cthulhu.png/revision/latest/scale-to-width-down/340?cb=20200526073159',
            // BOSS
            'https://bigmemes.funnyjunk.com/comments/Ops+are+now+nicer+than+before+its+honestly+_34db25b8224c8dc8f920c6d4747957c1.png',
            'https://pbs.twimg.com/media/CrsUu6dXgAArQ13?format=png&name=small',
            'https://bigmemes.funnyjunk.com/comments/Sounds+like+a+cool+person+_be2af0f99c2c7e5fb76eac83c102a6be.png',
            'https://hg1.funnyjunk.com/comments/Theyre+a+personatouhou+crossover+gimme+a+sec+and+ill+find+_4b189f5999ea04717e7c080790ca20f3.png',
            'https://hg1.funnyjunk.com/comments/Found+it+the+artist+goes+by+the+name+of+quotmazeranquot+_0325cc941d69b48dc61b32fb521be05d.png',
            'https://cdn.donmai.us/original/f1/b6/__enemy_yari_touken_ranbu_drawn_by_ishitsu_kenzou__f1b654d992b382600420ba842731c1fc.png',
            'https://cdn.donmai.us/original/6b/e0/__enemy_nagaeyari_touken_ranbu_drawn_by_ishitsu_kenzou__6be05a24f7233128547e11a3739885fb.png',
            'https://png2.cleanpng.com/sh/7deefcd9c950b3a4c30b4af0f5995337/L0KzQYq3VcE4N5JqjZH0aYP2gLBuTgRwfZxqhp97YX7lhX7wjfFobV5AeeRyLXnvfMb6lQJifJp0hp99YXPreX7oTfFvcZ5qRdN2cD3wcbBugb1idaF2jdH9LYTrgrbohL0yPGg4T6s9Mj24c7XtUcE3a5c4fKpvND62RIq3UcYxPmI6Tao6MkK7RoGCWcg5NqFzf3==/kisspng-touken-ranbu-image-yari-illustration-tachi-a-anime-amp-manga-ampquot-thread-14737942-5cdf116cf3d8f4.3490160615581228609988.png',
            'https://cdn.donmai.us/original/f1/b6/__enemy_yari_touken_ranbu_drawn_by_ishitsu_kenzou__f1b654d992b382600420ba842731c1fc.png',
            'https://static.wikia.nocookie.net/dragons-crown/images/7/7c/Wraith.png',
            'https://i.pinimg.com/originals/8f/62/88/8f6288a5ae6975860783735a1ea1726c.png',
            'https://static.wikia.nocookie.net/iratus-lord-of-the-dead/images/8/86/Lich.png',
            'https://static.wikia.nocookie.net/iratus-lord-of-the-dead/images/2/23/Skeleton.png',
            'https://static.wikia.nocookie.net/iratus-lord-of-the-dead/images/d/dc/Shade.png',
            'https://i.pinimg.com/originals/9c/1b/3e/9c1b3e7c996105bddc4772d94abf77cd.png',
            'https://static.wikia.nocookie.net/iratus-lord-of-the-dead/images/7/7c/Wraith.png',
            'https://static.wikia.nocookie.net/dragons-crown/images/5/51/Warlock.png',
            'https://static.wikia.nocookie.net/dragons-crown/images/0/0e/Arch_Demon.png',
            'https://pngimage.net/wp-content/uploads/2018/05/blue-dragon-png-5.png',

        ]
        this.url = mostersURL[Math.floor(Math.random() * mostersURL.length)];

        //this.url = 'https://i7.pngflow.com/pngimage/293/775/png-evolve-monster-behemoth-kraken-legendary-creature-monster-purple-game-dragon-video-game-clipart.png'

        this.name = this.url.substr(8, 10);
    }
}
