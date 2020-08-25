import { ControllerActions } from '../controller/controller.actions';
import { Ratings } from '../../components/ratings/ratings.model';
import { appActions } from '../app-store';

export interface RatingsState {
    rating: Ratings;
    globalRatings: Ratings[];
    lastGlobalRatingsUpdate: Date;
}

const initialRatingsState: RatingsState = {
    rating: new Ratings(0), // 0 as a default ratings which will not be poster
    globalRatings: [],
    lastGlobalRatingsUpdate: null,
};

export function ratingsReducer(state = initialRatingsState, action: appActions) {
    switch (action.type) {
        case ControllerActions.RATINGS_LOAD: {
            return {
                ...state,
                rating: action.payload
            };
        }
        case ControllerActions.RATINGS_CHNAGED: {
            return getChnagedRatingsState(state, action.payload.valueName, action.payload.newValue);
        }
        case ControllerActions.RATINGS_GLOBAL_LOAD: {
            return {
                ...state,
                globalRatings: action.payload,
                lastGlobalRatingsUpdate: new Date()
            };
        }
        default: return state;
    }
}



// -----------------------General--------------------------------
function getChnagedRatingsState(state: RatingsState, valueName: string, newValue: number) {
    return {
        ...state,
        rating: {
            ...state.rating,
            [valueName]: newValue
        }
    };
}
