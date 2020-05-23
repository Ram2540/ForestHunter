import { Weapon } from './weapon';
import { getWeaponsList } from '../services/fixed-data';

export class Hero {
    private id: number;
    gold: number;
    goldBonus: number;
    DPSMultiplier: number;
    avaliableWeapons: Weapon[];
    weapons: Weapon[];
    level: number;
    currentLevel: number;
    maxMosterOnLevel: number;
    mostersDownOnCurrentLevel: number;

    constructor(id: number) {
        this.id = id;
        this.avaliableWeapons = [];
        this.weapons = [];
        this.level = 1;
        this.gold = 1000999;
        this.goldBonus = 0;

        this.currentLevel = 1;
        this.maxMosterOnLevel = 10;
        this.mostersDownOnCurrentLevel = 0;
        this.DPSMultiplier = 0;
        this.weapons = getWeaponsList();
    }
}