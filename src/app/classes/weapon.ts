import { ElementTypes } from '../enums/elementTypes'
//import { weaponUrls } from './enums/imageUrls'


export class Weapon {
    readonly id: number;
    level: number;
    damage: number;
    price: number;
    attackFrequency: number;
    readonly element: ElementTypes;
    availability: boolean;
    UrlImg: string;

    constructor(
        id: number,
        level: number,
        damage: number,
        price: number,
        attackFrequency: number,
        element: ElementTypes,
        availability: boolean,
        UrlImg: string
    ) {
        this.id = id;
        this.level = level;
        this.damage = damage;
        this.price = price;
        this.attackFrequency = attackFrequency;
        this.element = element;
        this.availability = availability;
        this.UrlImg = UrlImg;

    }
    // getWeaponsList() {
    //     const weapons: Weapon[] = [];
    //     weapons.push(new Weapon(1, 0, 1, 10, 1, ElementTypes.Earth, true, weaponUrls.weapon1));
    //     weapons.push(new Weapon(2, 0, 5, 50, 1, ElementTypes.Fire, true, weaponUrls.weapon2));
    //     weapons.push(new Weapon(3, 0, 10, 100, 1, ElementTypes.Water, true, weaponUrls.weapon3));
    //     weapons.push(new Weapon(4, 0, 20, 500, 1, ElementTypes.Wind, true, weaponUrls.weapon4));
    //     return weapons;
    //}

}

