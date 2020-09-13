import { INITIAL_STATE } from '@ngrx/store';
import { appActions } from '../app-store';
import { ControllerActions } from '../controller/controller.actions';
import { User } from 'src/app/auth/user.model';
import { UserDataInfo } from 'src/app/classes/userDataInfo';

export interface UserDataInfoState {
    userDataInfo: UserDataInfo;
}

const initialState: UserDataInfoState = {
    userDataInfo: new UserDataInfo('user')
}

export function userDataInfoStateReducer(state = initialState, action: appActions): UserDataInfoState {
    switch(action.type) {
        case ControllerActions.USER_DATA_INFO_CHANGE_NAME: {
            return {
                ...state,
                userDataInfo: {
                    ...state.userDataInfo,
                    userName: action.payload
                }
            };
        }
        case ControllerActions.USER_DATA_INFO_LOAD: {
            return {
                ...state,
                userDataInfo: {...action.payload,
                    lastTimeUserLogin: new Date().getTime(),
                    previousTimeUserLogin: state.userDataInfo.lastTimeUserLogin
                }
            };
        }
        case ControllerActions.USER_DATA_INFO_SET_LAST_DATE_LOGIN: {
            return {
                ...state,
                userDataInfo: {
                    ...state.userDataInfo,
                    lastTimeUserLogin: new Date().getTime()
                }
            }
        }
        default : return state;
    }
}