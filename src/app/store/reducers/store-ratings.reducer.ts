import { ControllerActions } from '../controller/controller.actions';
import { Ratings } from 'src/app/classes/ratings';
import { appActions } from '../app-store';

export interface RatingsState {
    ratings: Ratings;
}

const initialRatingsState: RatingsState = {
    ratings: new Ratings(0), // 0 as a default ratings which will not be poster
};

export function ratingsReducer(state = initialRatingsState, action: appActions){
    switch(action.type) {
        case ControllerActions.RATINGS_LOAD: {
            return {
                ...state,
                ratings: action.payload
            }
        }
        case ControllerActions.RATINGS_CHNAGED: {
            return getChnagedRatingsState(state, action.payload.valueName, action.payload.newValue);
        }
        default : return state;
    }
}



// -----------------------General--------------------------------
function getChnagedRatingsState(state: RatingsState, valueName: string, newValue: number) {
    return {
        ...state,
        ratings: {
            ...state.ratings,
            [valueName]: newValue
        }
    };
}