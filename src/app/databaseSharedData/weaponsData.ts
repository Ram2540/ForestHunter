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
    private constructor() {
        this.generateWeaponListForDB();
    }


    // public static getWeaponByIDandLevel(id: number, level: number) {
    //     const foundWeapon = this.weaponList.find(w => w.id === id);
    //     if (foundWeapon) {
    //         const updatedWeapon = new Weapon(foundWeapon.id,
    //             level,
    //             foundWeapon.damageList[level],
    //             foundWeapon.priceList[level],
    //             foundWeapon.attackFrequencyList[level],
    //             foundWeapon.element,
    //             foundWeapon.availability,
    //             foundWeapon.UrlImg,
    //             foundWeapon.adaptationRation);
    //         return updatedWeapon;
    //     }
    //     return null;
    // }

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