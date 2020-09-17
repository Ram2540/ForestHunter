import { Weapon } from 'src/app/classes/weapon';
import { WeapondDatabaseData } from 'src/app/databaseSharedData/weaponsData';
import { appActions } from '../app-store';
import { ControllerActions } from '../controller/controller.actions';

export interface WeaponState {
    weaponDatabaseList: WeapondDatabaseData[];
    nextWeaponsList: Weapon[];
}
const initialWeaponState: WeaponState = {
    weaponDatabaseList: [],
    nextWeaponsList: [],
};

export function weaponReducer(state = initialWeaponState, action: appActions): WeaponState {
    switch (action.type) {
        case ControllerActions.WEAPON_LOAD_FRON_DB_BY_ID:
            const updatedWeaponList: WeapondDatabaseData[] = [...state.weaponDatabaseList];
            const index = updatedWeaponList.findIndex( (w) => w.id === action.payload.id);
            if (index >= 0) {
                // remove old version
                updatedWeaponList.splice(index, 1);
            }
            const weaponDB = action.payload as WeapondDatabaseData;
            updatedWeaponList.push(weaponDB);
            return {
                ...state,
                weaponDatabaseList: updatedWeaponList,
                nextWeaponsList: getNextWeaponsList(updatedWeaponList)
            };
        case ControllerActions.WEAPON_LOAD_ALL_COLLECTIONS:
            const newWeaponDatabaseList: WeapondDatabaseData[] = [...action.payload];
            return {
                ...state,
                weaponDatabaseList: newWeaponDatabaseList,
                nextWeaponsList: getNextWeaponsList(newWeaponDatabaseList)
            };
            case ControllerActions.WEAPON_NEXT_ASSIGNS_TO_BUY:
                return {
                    ...state,
                    nextWeaponsList: getNextWeaponsList(state.weaponDatabaseList)
                };
        default:
            return state;
    }
}

function getNextWeaponsList(weaponsDB: WeapondDatabaseData[]): Weapon[]{
    const level = 1;
    const weaponsList: Weapon[] = [];
    weaponsDB.forEach(w => {
        const weapon = new Weapon(w.id,
            level,
            w.damageList[level],
            w.priceList[level],
            w.attackFrequencyList[level],
            w.element,
            w.availability,
            w.UrlImg,
            w.adaptationRation
          );
        weaponsList.push(weapon)
    });
    return weaponsList;
}

