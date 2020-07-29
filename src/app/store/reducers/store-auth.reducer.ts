import { INITIAL_STATE } from '@ngrx/store';
import { appActions } from '../app-store';
import { ControllerActions } from '../controller/controller.actions';
import { User } from 'src/app/auth/user.model';

export interface AuthState {
    user: User;
    isLoginedIn: boolean;
}

const initialState: AuthState = {
    user: null,
    isLoginedIn: false
}

export function userReducer(state = initialState, action: appActions): AuthState {
    switch(action.type) {
        case ControllerActions.USER_LOGIN: {
            return {
                ...state,
                user: action.payload,
                isLoginedIn: true
            };
        }
        case ControllerActions.USER_LOGOUT: {
            return {
                ...state,
                user: null,
                isLoginedIn: false
            }
        }
        default : return state;
    }
}