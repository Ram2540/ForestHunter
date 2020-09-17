import { Weapon } from '../classes/weapon';
import { weaponUrls } from '../enums/imageUrls';
import { ElementTypes } from '../enums/elementTypes';
import { GlobalSettings } from '../global-settings';
import { weaponReducer } from '../store/reducers/store-weapon.reducer';


export interface WeapondDatabaseData {
    readonly id: number;
    damageList: number[];
    priceList: number[];
    attackFrequencyList: number[];
    readonly element: ElementTypes;
    availability: boolean;
    UrlImg: string;
    adaptationRation: number;
}

export class SharedDataWeapons {
    private static _instance: SharedDataWeapons;
    private static weaponList: WeapondDatabaseData[] = [];
    private firstWeaponStages: Weapon[] = [];
    private lastAdaptedWeaponStages: Weapon[] = [];
    public static get getWeaponData(): WeapondDatabaseData[] {
        return this.weaponList.slice();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
    constructor() {
        this.generateWeaponListForDB();
    }


    public static getWeaponByIDandLevel(id: number, level: number) {
        const foundWeapon = this.weaponList.find(w => w.id === id);
        if (foundWeapon) {
            const updatedWeapon = new Weapon(foundWeapon.id,
                level,
                foundWeapon.damageList[level],
                foundWeapon.priceList[level],
                foundWeapon.attackFrequencyList[level],
                foundWeapon.element,
                foundWeapon.availability,
                foundWeapon.UrlImg,
                foundWeapon.adaptationRation);
            return updatedWeapon;
        }
        return null;
    }

    private generateWeaponListForDB() {
        if (SharedDataWeapons.weaponList.length === 0) {
            if (this.firstWeaponStages.length === 0) {
                this.fillStaticDataForWeaponStages();
            }
            SharedDataWeapons.weaponList = [];
            this.firstWeaponStages.forEach(
                weapon => {
                    let UpdatedWeapon: Weapon = { ...weapon };
                    SharedDataWeapons.weaponList.push(this.getDatabaseWeaponFromWeapon(UpdatedWeapon));
                    for (let i = 1; i <= GlobalSettings.maxWeaponLevel; i++) {
                        UpdatedWeapon = this.addUpdatedWeapon(UpdatedWeapon);
                    }
                }
            )
        }
    }

    private addUpdatedWeapon(weapon: Weapon): Weapon {
        const UpdatedWeapon: Weapon = { ...weapon };
        // calculate values
        UpdatedWeapon.level++;
        UpdatedWeapon.price = weapon.price + Math.round(weapon.price * GlobalSettings.weaponPriceFactor);
        UpdatedWeapon.damage = weapon.damage + this.getLastAdaptedWeaponStages(weapon.id).damage/* * this.damageFactor*/;
        if (UpdatedWeapon.level % GlobalSettings.everyAmountLevelAdaptationIsApplied === 0) {
            const adaptedDamage = UpdatedWeapon.price / UpdatedWeapon.adaptationRation;
            if (adaptedDamage > UpdatedWeapon.damage) {
                UpdatedWeapon.damage = adaptedDamage;
                this.changeDamageInLastAdaptedWeaponStages(UpdatedWeapon.id, UpdatedWeapon.damage);
            }
        }
        // add values
        this.getDatabaseWeaponById(UpdatedWeapon.id).damageList.splice(UpdatedWeapon.level, 1, UpdatedWeapon.damage);
        this.getDatabaseWeaponById(UpdatedWeapon.id).priceList.splice(UpdatedWeapon.level, 1, UpdatedWeapon.price);
        this.getDatabaseWeaponById(UpdatedWeapon.id).attackFrequencyList.splice(UpdatedWeapon.level, 1, UpdatedWeapon.attackFrequency);
        return UpdatedWeapon;
    }

    private getLastAdaptedWeaponStages(id: number): Weapon {
        return this.lastAdaptedWeaponStages.filter(w => w.id === id)[0];
    }

    private changeDamageInLastAdaptedWeaponStages(id: number, newDamage: number) {
        this.lastAdaptedWeaponStages.find(w => w.id === id).damage = newDamage;
    }

    private fillStaticDataForWeaponStages(): void {
        this.firstWeaponStages = [];
        for (let i = 1; i <= GlobalSettings.amountOfDifferentWeapons; i++) {
            this.firstWeaponStages.push(this.generateNextWeapon());
        }
        // this.firstWeaponStages.push(new Weapon(1, 0, 1, 10, 1, ElementTypes.Earth, true, weaponUrls.weapon1));
        // this.firstWeaponStages.push(new Weapon(2, 0, 5, 50, 1, ElementTypes.Fire, true, weaponUrls.weapon2));
        // this.firstWeaponStages.push(new Weapon(3, 0, 20, 221, 1, ElementTypes.Water, true, weaponUrls.weapon3));
        // this.firstWeaponStages.push(new Weapon(4, 0, 80, 990, 1, ElementTypes.Wind, true, weaponUrls.weapon4));
        // this.firstWeaponStages.push(new Weapon(5, 0, 320, 4450, 1, ElementTypes.Wind, true, weaponUrls.weapon5));
        // this.firstWeaponStages.push(new Weapon(6, 0, 1280, 20000, 1, ElementTypes.Wind, true, weaponUrls.weapon6));
        // this.firstWeaponStages.push(new Weapon(7, 0, 5120, 90000, 1, ElementTypes.Wind, true, weaponUrls.weapon7));
        // this.firstWeaponStages.push(new Weapon(8, 0, 20480, 406885, 1, ElementTypes.Water, true, weaponUrls.weapon8));
        // this.firstWeaponStages.push(new Weapon(9, 0, 81920, 1830980, 1, ElementTypes.Earth, true, weaponUrls.weapon9));
        // this.firstWeaponStages.push(new Weapon(10, 0, 327680, 8239411, 1, ElementTypes.Fire, true, weaponUrls.weapon10));
        // this.firstWeaponStages.push(new Weapon(11, 0, 1310720, 37077351, 1, ElementTypes.Water, true, weaponUrls.weapon11));
        // this.firstWeaponStages.push(new Weapon(12, 0, 5242880, 166848082, 1, ElementTypes.Water, true, weaponUrls.weapon12));
        // this.firstWeaponStages.push(new Weapon(13, 0, 20971520, 750816368, 1, ElementTypes.Water, true, weaponUrls.weapon13));
        // this.firstWeaponStages.push(new Weapon(14, 0, 83886080, 3378673654, 1, ElementTypes.Water, true, weaponUrls.weapon14));
        // this.firstWeaponStages.push(new Weapon(15, 0, 335544320, 15204031444, 1, ElementTypes.Water, true, weaponUrls.weapon15));
        // this.firstWeaponStages.push(new Weapon(16, 0, 1342177280, 68418141497, 1, ElementTypes.Water, true, weaponUrls.weapon16));
        // this.firstWeaponStages.push(new Weapon(17, 0, 5368709120, 307881636738, 1, ElementTypes.Water, true, weaponUrls.weapon17));
        // this.firstWeaponStages.push(new Weapon(18, 0, 21474836480, 1385467365322, 1, ElementTypes.Water, true, weaponUrls.weapon18));
        // this.firstWeaponStages.push(new Weapon(19, 0, 85899345920, 6234603143949, 1, ElementTypes.Water, true, weaponUrls.weapon19));
        // this.firstWeaponStages.push(new Weapon(20, 0, 343597383680, 28055714147770, 1, ElementTypes.Water, true, weaponUrls.weapon20));
        // this.firstWeaponStages.push(new Weapon(21, 0, 1374389534720, 126250713664964, 1, ElementTypes.Water, true, weaponUrls.weapon21));
        // this.firstWeaponStages.push(new Weapon(22, 0, 5497558138880, 568128211492338, 1, ElementTypes.Water, true, weaponUrls.weapon22));
        // this.firstWeaponStages.push(new Weapon(23, 0, 21990232555520, 2556576951715520, 1, ElementTypes.Water, true, weaponUrls.weapon23));
        // this.firstWeaponStages.push(new Weapon(24, 0, 87960930222080, 11504596282719800, 1, ElementTypes.Water, true, weaponUrls.weapon24));
        // this.firstWeaponStages.push(new Weapon(25, 0, 351843720888320, 51770683272239300, 1, ElementTypes.Water, true, weaponUrls.weapon25));
        // this.firstWeaponStages.push(new Weapon(26, 0, 1407374883553280, 232968074725077000, 1, ElementTypes.Water, true, weaponUrls.weapon26));
        // this.firstWeaponStages.push(new Weapon(27, 0, 5629499534213120, 1048356336262850000, 1, ElementTypes.Water, true, weaponUrls.weapon27));
        // this.firstWeaponStages.push(new Weapon(28, 0, 22517998136852500, 4717603513182800000, 1, ElementTypes.Water, true, weaponUrls.weapon28));
        this.lastAdaptedWeaponStages = [...this.firstWeaponStages];
    }

    private getDatabaseWeaponFromWeapon(weapon: Weapon): WeapondDatabaseData {
        const weapondDatabaseData: WeapondDatabaseData = {
            id: weapon.id,
            damageList: [weapon.damage],
            priceList: [weapon.price],
            attackFrequencyList: [weapon.attackFrequency],
            element: weapon.element,
            availability: weapon.availability,
            UrlImg: weapon.UrlImg,
            adaptationRation: weapon.adaptationRation
        };
        return weapondDatabaseData;
    }

    private getDatabaseWeaponById(id: number) {
        return SharedDataWeapons.weaponList.filter(w => w.id === id)[0];
    }

    private generateNextWeapon(): Weapon {
        let id = 1;
        const level = 0;
        let damage = 1;
        let price = 10;
        const attackFrequency = 1;
        let element: ElementTypes = ElementTypes.Water;
        const availability = true;
        let WeaponUrl = 'weapon' + id.toString();
        let UrlImg: string = weaponUrls[WeaponUrl];

        if (this.firstWeaponStages.length > 0) {
            const latestWeapon = this.firstWeaponStages.sort((a, b) => a.id - b.id)[this.firstWeaponStages.length - 1];
            id = latestWeapon.id + 1;
            damage = latestWeapon.damage * GlobalSettings.increasingDamageOfNextWeapon;
            price = latestWeapon.price * GlobalSettings.increasingPriceOfNextWeapon;
            element = ElementTypes.Water;
            WeaponUrl = 'weapon' + id.toString();
            UrlImg = weaponUrls[WeaponUrl];
        }
        return new Weapon(id, level,
            damage,
            price,
            attackFrequency,
            element,
            availability,
            UrlImg,
            GlobalSettings.adaptationRationForWeapons);
    }
}