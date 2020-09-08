import { Hero } from '../../classes/hero';
import { Weapon } from 'src/app/classes/weapon';
import { StaticDataWeaponStore } from '../../databaseSharedData/StaticDataWeaponStore';
import { appActions } from '../app-store';
import { ControllerActions } from '../controller/controller.actions';

export interface HeroState {
    hero: Hero;
    weaponVersion: number; // this version means that something chnaged in weapon list
}
const initialHeroState: HeroState = {
    hero: new Hero(0),  // 0 as a default hero which will not be poster
    weaponVersion: 0
};

export function heroReducer(state = initialHeroState, action: appActions) {
    switch (action.type) {
        case ControllerActions.HERO_LOAD:
            return {
                ...state,
                hero: {
                    ...action.payload,
                    weapons: [...action.payload.weapons]
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
                const updatedWeapon = getUpdatedWeapon(action.payload.id, action.payload.level + 1);
                return getChnagedHeroWithWeaponAndMinusPrice(state, updatedWeapon, action.payload.price);
            }
            return state;
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
    updateWeapons[index] = weapon;
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

function getUpdatedWeapon(id: number, level: number) {
    return StaticDataWeaponStore.Instance.getWeaponByIDandLevel(id, level);
}
// -----------------------Gold--------------------------------
function isThereEnoughGold(state: HeroState, price: number): boolean {
    return state.hero.gold >= price ? true : false;
}
