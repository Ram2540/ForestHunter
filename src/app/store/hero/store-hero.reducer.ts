import { Hero } from '../../classes/hero';
import * as StoreActions from './store.actiobs';
import { Weapon } from 'src/app/classes/weapon';


export interface HeroState {
    hero: Hero;
}
const initialHeroState: HeroState = {
    hero: new Hero()
};


export function heroReducer(state = initialHeroState, action: StoreActions.HeroActions) {
    switch (action.type) {
        case StoreActions.ADD_GOLD:
            const updatedGold = state.hero.gold + action.payload;
            return getChnagedHeroState(state, 'gold', updatedGold);
        case StoreActions.ADD_GOLD_BONUS:
            const updatedGoldBonus = state.hero.goldBonus + action.payload;
            return getChnagedHeroState(state, 'goldBonus', updatedGoldBonus);
        case StoreActions.ADD_DPS_MULTIPLIER:
            const updatedDPSMultiplier = state.hero.DPSMultiplier + action.payload;
            return getChnagedHeroState(state, 'DPSMultiplier', updatedDPSMultiplier);
        case StoreActions.ADD_LEVEL:
            const updatedlevel = state.hero.level + action.payload;
            return getChnagedHeroState(state, 'level', updatedlevel);
        case StoreActions.ADD_CURRENT_LEVEL:
            const updatedCurrentlevel = state.hero.currentLevel + action.payload;
            return getChnagedHeroState(state, 'currentLevel', updatedCurrentlevel);
        case StoreActions.SET_MAX_MONSTER_ON_LEVEL:
            const updatedmaxMosterOnLevel = state.hero.maxMosterOnLevel + action.payload;
            return getChnagedHeroState(state, 'maxMosterOnLevel', updatedmaxMosterOnLevel);
        case StoreActions.MONSTER_DOWN_ON_CURRENT_LEVEL:
            const updatedMostersDownOnCurrentLevel = state.hero.mostersDownOnCurrentLevel + action.payload;
            return getChnagedHeroState(state, 'mostersDownOnCurrentLevel', updatedMostersDownOnCurrentLevel);
        case StoreActions.WEAPON_LEVEL_UP:
            const updatedWeapon = action.payload;
            return getChnagedHeroForWeapon(state, updatedWeapon);
        default:
            return state;
    }
}

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
    const index = updateWeapons.findIndex(w => w.id === weapon.id)
    updateWeapons[index] = weapon;
    return {
        ...state,
        hero: {
            ...state.hero,
            weapons: updateWeapons
        }
    }
}
