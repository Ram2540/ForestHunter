import { Hero } from '../../classes/hero';
import { Weapon } from 'src/app/classes/weapon';
import { appActions } from '../app-store';
import { ControllerActions } from '../controller/controller.actions';
import { Item } from 'src/app/components/item/item.model';
import { getDefaultStatValues, HeroStats } from 'src/app/components/hero-stats/hero-stats.model';

export interface HeroState {
    hero: Hero;
    weaponVersion: number; // this version means that something chnaged in weapon list
    heroStats: HeroStats[];
    heroStatsVersion: number;
    inventory: Item[];
    inventoryVersion: number;
    equipment: Item[];
    equipmentVersion: number;

}
const initialHeroState: HeroState = {
    hero: new Hero(0),  // 0 as a default hero which will not be poster
    weaponVersion: 0,
    heroStats: [],
    heroStatsVersion: 0,
    inventory: [],
    inventoryVersion: 0,
    equipment: [],
    equipmentVersion: 0,
};



export function heroReducer(state = initialHeroState, action: appActions) {
    switch (action.type) {
        case ControllerActions.HERO_LOAD:

            const newWeapon = action.payload.weapons ?? [];
            return {
                ...state,
                hero: {
                    ...action.payload,
                    weapons: [...newWeapon]
                },
                weaponVersion: state.weaponVersion + 1
            }
        case ControllerActions.HERO_ADD_GOLD:
            const updatedGold = state.hero.gold + action.payload;
            return getChnagedHeroState(state, 'gold', updatedGold);
        case ControllerActions.HERO_ADD_GOLD_BONUS:
            const updatedGoldBonus = state.hero.goldBonus + action.payload;
            return getChnagedHeroState(state, 'goldBonus', updatedGoldBonus);
        case ControllerActions.HERO_ADD_DPS_MULTIPLIER:
            const updatedDPSMultiplier = state.hero.DPSMultiplier + action.payload;
            return getChnagedHeroState(state, 'DPSMultiplier', updatedDPSMultiplier);
        case ControllerActions.HERO_ADD_LEVEL:
            const updatedlevel = state.hero.level + action.payload;
            return getChnagedHeroState(state, 'level', updatedlevel);
        case ControllerActions.HERO_ADD_CURRENT_LEVEL:
            const updatedCurrentlevel = state.hero.currentLevel + action.payload;
            return getChnagedHeroState(state, 'currentLevel', updatedCurrentlevel);
        case ControllerActions.HERO_SET_MAX_MONSTER_ON_LEVEL:
            const updatedmaxMosterOnLevel = state.hero.maxMosterOnLevel + action.payload;
            return getChnagedHeroState(state, 'maxMosterOnLevel', updatedmaxMosterOnLevel);
        case ControllerActions.HERO_MONSTER_DOWN_ON_CURRENT_LEVEL:
            const updatedMostersDownOnCurrentLevel = state.hero.mostersDownOnCurrentLevel + action.payload;
            return getChnagedMonsterDownOnCurrentLevel(state, updatedMostersDownOnCurrentLevel);
        case ControllerActions.HERO_WEAPON_LEVEL_UP:
            if (isThereEnoughGold(state, action.payload.price)) {
                return getChnagedHeroWithWeaponAndMinusPrice(state, action.payload, action.payload.price);
            }
            return state;
        case ControllerActions.HERO_STATS_CALCULATE:
            const updatedStats = getUpdatedStats(action.payload);
            return {
                ...state,
                heroStats: updatedStats,
                heroStatsVersion: state.heroStatsVersion + 1
            };
        default:
            return state;
    }
}

// -----------------------General--------------------------------
function getChnagedHeroState(state: HeroState, valueName: string, newValue: number) {
    return {
        ...state,
        hero: {
            ...state.hero,
            [valueName]: newValue
        }
    };
}
// -----------------------Hero--------------------------------
function getChnagedMonsterDownOnCurrentLevel(state: HeroState, updatedMostersDownOnCurrentLevel: number) {
    let updatedCurrentLevel = state.hero.currentLevel;
    if (updatedMostersDownOnCurrentLevel >= state.hero.maxMosterOnLevel) {
        updatedCurrentLevel++;
        updatedMostersDownOnCurrentLevel = 0;
    }
    return getChnagedHeroState(
        getChnagedHeroState(state, 'mostersDownOnCurrentLevel', updatedMostersDownOnCurrentLevel),
        'currentLevel',
        updatedCurrentLevel);
}
// -----------------------Weapon--------------------------------
function getChnagedHeroWithWeaponAndMinusPrice(state: HeroState, weapon: Weapon, price: number) {
    const updateWeapons = [...state.hero.weapons];
    const index = updateWeapons.findIndex(w => w.id === weapon.id);
    if (index >= 0) {
        updateWeapons[index] = weapon;
    } else {
        updateWeapons.push(weapon);
    }
    return {
        ...state,
        hero: {
            ...state.hero,
            gold: state.hero.gold - price,
            weapons: updateWeapons
        },
        weaponVersion: state.weaponVersion + 1,
    }
}

// function getUpdatedWeapon(id: number, level: number) {
//     //return StaticDataWeaponStore.Instance.getWeaponByIDandLevel(id, level);
// }
// -----------------------Gold--------------------------------
function isThereEnoughGold(state: HeroState, price: number): boolean {
    return state.hero.gold >= price ? true : false;
}

// TEST
function getUpdatedStats(heroItems: Item[]): HeroStats[] {
    const updatedHeroStats: HeroStats[] = getDefaultStatValues();
    if (heroItems) {
        heroItems.forEach(i => {
            i.itemEffects.forEach(e => {
                if (updatedHeroStats[e.effectType]) {
                    updatedHeroStats[e.effectType].value += e.value;
                }
            });
        });
    }


    // this.listData1.push('Fire: 9%');
    // this.listData1.push('Wind: 9%');
    // this.listData1.push('Water: 9%');
    // this.listData1.push('Earth: 9%');

    // this.listData2.push('Clitical chance: 9%');
    // this.listData2.push('DPS increase: 9%');
    // this.listData2.push('DPC increase: 9%');
    // this.listData2.push('Something: 9%');

    return updatedHeroStats;
}
