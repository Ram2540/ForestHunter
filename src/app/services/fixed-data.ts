import { Weapon } from '../classes/weapon';
import { ElementTypes } from '../enums/elementTypes';
import { weaponUrls } from '../enums/imageUrls';

export const Enemies: [{ HP: number, gold: number }] = getRewards();

export function getRewards(): [{ HP: number, gold: number }] {
    let revard: [{ HP: number; gold: number; }] = [,];
    let HPmultiplier: number = 1.2;
    let Goldmultiplier: number = 1.4;
    // let DowngradeHPmultiplier: number;
    // let DowngradeGoldmultiplier: number;

    let HP: number = 10;
    let gold: number = 1;


    for (let i = 0; i < 100; i++) {
        revard.push({ HP, gold });
        HP *= HPmultiplier;
        gold *= Goldmultiplier;
    }

    return revard;
}

export function getWeaponsList() {
    const weapons: Weapon[] = [];


weapons.push(new Weapon(7, 0, 6000, 125000,  1,  ElementTypes.Wind,  true,  weaponUrls.weapon7));
    weapons.push(new Weapon( 6,  0,  1600,  25000,  1,  ElementTypes.Wind,  true,  weaponUrls.weapon6 ));
    weapons.push(new Weapon(5,  0,  450,  5500,  1,  ElementTypes.Wind,  true,  weaponUrls.weapon5 ));
    weapons.push(new Weapon( 4,  0,  120,  1250,  1,  ElementTypes.Wind,  true,  weaponUrls.weapon4 ));
    weapons.push(new Weapon(3,  0,  24,  250,  1,  ElementTypes.Water,  true,  weaponUrls.weapon3 ));
    weapons.push(new Weapon( 2,  0,  5,  50,  1,  ElementTypes.Fire,  true,  weaponUrls.weapon2 ));
  weapons.push(new Weapon( 1,  0,  1,  10,  1,  ElementTypes.Earth,  true,  weaponUrls.weapon1 ));


//let x = new Weapon( id: 1, level: 0, damage: 1, price: 10, attackFrequency: 1, element: ElementTypes.Earth, availability: true, UrlImg: weaponUrls.weapon1 );

//let t = new Weapon(1,0,1,1,1,ElementTypes.Earth,true, weaponUrls.weapon1);

    // weapons.push(new Weapon({id: 7, level: 0, damage: 6000, price: 125000, attackFrequency: 1, element: ElementTypes.Wind, availability: true, UrlImg: weaponUrls.weapon7}));
    // weapons.push(new Weapon({ id: 6, level: 0, damage: 1600, price: 25000, attackFrequency: 1, element: ElementTypes.Wind, availability: true, UrlImg: weaponUrls.weapon6 }));
    // weapons.push(new Weapon({ id: 5, level: 0, damage: 450, price: 5500, attackFrequency: 1, element: ElementTypes.Wind, availability: true, UrlImg: weaponUrls.weapon5 }));
    // weapons.push(new Weapon({ id: 4, level: 0, damage: 120, price: 1250, attackFrequency: 1, element: ElementTypes.Wind, availability: true, UrlImg: weaponUrls.weapon4 }));
    // weapons.push(new Weapon({ id: 3, level: 0, damage: 24, price: 250, attackFrequency: 1, element: ElementTypes.Water, availability: true, UrlImg: weaponUrls.weapon3 }));
    // weapons.push(new Weapon({ id: 2, level: 0, damage: 5, price: 50, attackFrequency: 1, element: ElementTypes.Fire, availability: true, UrlImg: weaponUrls.weapon2 }));
  //weapons.push(new Weapon({ id: 1, level: 0, damage: 1, price: 10, attackFrequency: 1, element: ElementTypes.Earth, availability: true, UrlImg: weaponUrls.weapon1 }));




    return weapons;
}

// import { Weapon } from './weapon'
// import { ElementTypes } from './enums/elementTypes'
// import { weaponUrls } from './enums/imageUrls'


// export const FixedWeapons: Weapon[] = getRandomnSetOfWeapons();

// function getRandomnSetOfWeapons(): Weapon[] {
//   let weapons: Weapon[] = [];
//   let n = Math.random() * 25;
//   for (let i = 0; i < n; i++) {
//     weapons.push({ id: Math.floor(Math.random() * 100),level: Math.floor(Math.random() * 100), damage: Math.floor(Math.random() * 999), attackFrequency: Math.floor(Math.random() * 1000), element: randomEnum(ElementTypes), UrlImg: gerRandomWeaponUrls() });
//   }

//   return weapons;
// }


// function gerRandomWeaponUrls(): string {
//   let value = Math.floor(Math.random() * 3);
//   switch (value) {
//     case 0: return weaponUrls.weapon1;
//     case 1: return weaponUrls.weapon2;
//     case 2: return weaponUrls.weapon3;
//     default: return weaponUrls.weapon1;
//   }


// }

// function randomEnum<T>(anEnum: T): T[keyof T] {
//   const enumValues = Object.keys(anEnum)
//     .map(n => Number.parseInt(n))
//     .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
//   const randomIndex = Math.floor(Math.random() * enumValues.length)
//   const randomEnumValue = enumValues[randomIndex]
//   return randomEnumValue;
// }


