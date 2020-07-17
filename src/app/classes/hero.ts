import { Weapon } from './weapon';
import { StaticDataWeaponStore } from '../databaseSharedData/StaticDataWeaponStore';

export class Hero {
    id: number;
    gold: number;
    goldBonus: number;
    DPSMultiplier: number;
    avaliableWeapons: Weapon[];
    weapons: Weapon[];
    level: number;
    currentLevel: number;
    maxMosterOnLevel: number;
    mostersDownOnCurrentLevel: number;

    //constructor(id: number, avaliableWeapons?: Weapon[], weapons?: Weapon[], lvl?: number, gold?: number, ) {
    constructor() {
        this.id = 1;

        this.avaliableWeapons = [];
        this.weapons = [];
        this.level = 1;
        this.gold = 10;
        this.goldBonus = 0;

        this.currentLevel = 1;
        this.maxMosterOnLevel = 10;
        this.mostersDownOnCurrentLevel = 0;
        this.DPSMultiplier = 0;
        this.weapons = StaticDataWeaponStore.Instance.getFirstWeapons;
    }
}