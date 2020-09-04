import { Weapon } from '../classes/weapon';
import { weaponUrls } from '../enums/imageUrls';
import { ElementTypes } from '../enums/elementTypes';


interface WeapondDatabaseData {
    readonly id: number;
    damageList: number[];
    priceList: number[];
    attackFrequencyList: number[];
    readonly element: ElementTypes;
    availability: boolean;
    UrlImg: string;
}

export class SharedDataWeapons {
    private static weaponList: WeapondDatabaseData[] = [];
    private firstWeaponStages: Weapon[] = [];
    private maxWeaponLevel = 1000;
    private priceFactor = 0.1; // 10% increase of price for each new level of weapon
    private damageFactor = 1.1; //  1.1 - 110% increase of damage for each new level of weapon
    public static get getWeaponData(): WeapondDatabaseData[] {
        return this.weaponList.slice();
    }


    constructor() {
            this.generateWeaponListForDB();
    }

    public static getWeaponByIDandLevel(id: number, level: number) {
        console.log('dsfsdfsd');
        console.log(this.weaponList);
        const foundWeapon = this.weaponList.find(w => w.id === id);
        console.log(foundWeapon);
        if (foundWeapon) {
            const updatedWeapon = new Weapon(foundWeapon.id,
                level,
                foundWeapon.damageList[level],
                foundWeapon.priceList[level],
                foundWeapon.attackFrequencyList[level],
                foundWeapon.element,
                foundWeapon.availability,
                foundWeapon.UrlImg);
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
                for (let i = 1; i <= this.maxWeaponLevel; i++) {
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
        UpdatedWeapon.price = weapon.price + Math.round(weapon.price * this.priceFactor);
        UpdatedWeapon.damage = weapon.damage + this.getFirstStateOfWeapon(weapon.id).damage/* * this.damageFactor*/;
        // add values
        this.getDatabaseWeaponById(UpdatedWeapon.id).damageList.splice(UpdatedWeapon.level, 1, UpdatedWeapon.damage);
        this.getDatabaseWeaponById(UpdatedWeapon.id).priceList.splice(UpdatedWeapon.level, 1, UpdatedWeapon.price);
        this.getDatabaseWeaponById(UpdatedWeapon.id).attackFrequencyList.splice(UpdatedWeapon.level, 1, UpdatedWeapon.attackFrequency);
        return UpdatedWeapon;
    }

    private getFirstStateOfWeapon(id: number): Weapon {
        return this.firstWeaponStages.filter(w => w.id === id)[0];
    }

    private fillStaticDataForWeaponStages(): void {
        this.firstWeaponStages = [];
        this.firstWeaponStages.push(new Weapon(1, 0, 1, 10, 1, ElementTypes.Earth, true, weaponUrls.weapon1));
        this.firstWeaponStages.push(new Weapon(2, 0, 5, 50, 1, ElementTypes.Fire, true, weaponUrls.weapon2));
        this.firstWeaponStages.push(new Weapon(3, 0, 24, 250, 1, ElementTypes.Water, true, weaponUrls.weapon3));
        this.firstWeaponStages.push(new Weapon(4, 0, 120, 1250, 1, ElementTypes.Wind, true, weaponUrls.weapon4));
        this.firstWeaponStages.push(new Weapon(5, 0, 450, 5500, 1, ElementTypes.Wind, true, weaponUrls.weapon5));
        this.firstWeaponStages.push(new Weapon(6, 0, 1600, 25000, 1, ElementTypes.Wind, true, weaponUrls.weapon6));
        this.firstWeaponStages.push(new Weapon(7, 0, 6000, 125000, 1, ElementTypes.Wind, true, weaponUrls.weapon7));
        // this.firstWeaponStages.push(new Weapon(8, 0, 23500, 690000, 1, ElementTypes.Wind, true, weaponUrls.weapon7));
        // this.firstWeaponStages.push(new Weapon(9, 0, 90000, 3000000, 1, ElementTypes.Wind, true, weaponUrls.weapon7));
        // this.firstWeaponStages.push(new Weapon(10, 0, 375000, 12500000, 1, ElementTypes.Wind, true, weaponUrls.weapon7));
    }

    private getDatabaseWeaponFromWeapon(weapon: Weapon): WeapondDatabaseData {
        const weapondDatabaseData: WeapondDatabaseData = {
            id: weapon.id,
            //level: [weapon.id],
            damageList: [weapon.damage],
            priceList: [weapon.price],
            attackFrequencyList: [weapon.attackFrequency],
            element: weapon.element,
            availability: weapon.availability,
            UrlImg: weapon.UrlImg
        };
        return weapondDatabaseData;
    }

    private getDatabaseWeaponById(id: number) {
        return SharedDataWeapons.weaponList.filter(w => w.id === id)[0];
    }
}