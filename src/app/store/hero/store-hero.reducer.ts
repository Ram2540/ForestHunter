import { Hero } from '../../classes/hero';
import * as StoreHeroActions from './store-hero.actiobs';
import { Weapon } from 'src/app/classes/weapon';
import { StaticDataStore } from '../staticData/StaticDataStore';

export interface HeroState {
    hero: Hero;
}
const initialHeroState: HeroState = {
    hero: new Hero()
};


export function heroReducer(state = initialHeroState, action: StoreHeroActions.HeroActions) {
    switch (action.type) {
        case StoreHeroActions.LOAD_HERO:
            return {
                ...state,
                hero: action.payload
            }
        case StoreHeroActions.ADD_GOLD:
            const updatedGold = state.hero.gold + action.payload;
            return getChnagedHeroState(state, 'gold', updatedGold);
        case StoreHeroActions.ADD_GOLD_BONUS:
            const updatedGoldBonus = state.hero.goldBonus + action.payload;
            return getChnagedHeroState(state, 'goldBonus', updatedGoldBonus);
        case StoreHeroActions.ADD_DPS_MULTIPLIER:
            const updatedDPSMultiplier = state.hero.DPSMultiplier + action.payload;
            return getChnagedHeroState(state, 'DPSMultiplier', updatedDPSMultiplier);
        case StoreHeroActions.ADD_LEVEL:
            const updatedlevel = state.hero.level + action.payload;
            return getChnagedHeroState(state, 'level', updatedlevel);
        case StoreHeroActions.ADD_CURRENT_LEVEL:
            const updatedCurrentlevel = state.hero.currentLevel + action.payload;
            return getChnagedHeroState(state, 'currentLevel', updatedCurrentlevel);
        case StoreHeroActions.SET_MAX_MONSTER_ON_LEVEL:
            const updatedmaxMosterOnLevel = state.hero.maxMosterOnLevel + action.payload;
            return getChnagedHeroState(state, 'maxMosterOnLevel', updatedmaxMosterOnLevel);
        case StoreHeroActions.MONSTER_DOWN_ON_CURRENT_LEVEL:
            const updatedMostersDownOnCurrentLevel = state.hero.mostersDownOnCurrentLevel + action.payload;
            return getChnagedHeroState(state, 'mostersDownOnCurrentLevel', updatedMostersDownOnCurrentLevel);
        case StoreHeroActions.WEAPON_LEVEL_UP:
            if (isThereEnoughGold(state, action.payload.price)) {
                const updatedWeapon = getUpdatedWeapon(action.payload.id, action.payload.level + 1);
                return getChnagedHeroForWeapon(state, updatedWeapon);
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

function getChnagedHeroForWeapon(state: HeroState, weapon: Weapon) {
    const updateWeapons = [...state.hero.weapons];
    const index = updateWeapons.findIndex(w => w.id === weapon.id);
    updateWeapons[index] = weapon;
    return {
        ...state,
        hero: {
            ...state.hero,
            weapons: updateWeapons
        }
    }
}
// -----------------------Weapon--------------------------------
function getUpdatedWeapon(id: number, level: number) {
    return StaticDataStore.Instance.getWeaponByIDandLevel(id, level);
}
// -----------------------Gold--------------------------------
function isThereEnoughGold(state: HeroState, price: number): boolean {
    return state.hero.gold >= price ? true : false;
}
