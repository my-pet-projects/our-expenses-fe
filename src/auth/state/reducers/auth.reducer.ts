import { Reducer } from 'redux';

import { AuthAction } from 'src/auth/state/actions';
import { AuthActionType } from 'src/auth/state/constants';
import { ApplicationError, AuthData } from 'src/models';

export interface IAuthState {
    loggedIn: boolean;
    authData?: AuthData | null;
    isLoading: boolean;
    error?: ApplicationError | null;
}

const localStorageItem = localStorage.getItem('user');

const initialLoginState: IAuthState = {
    isLoading: false,
    authData: localStorageItem ? JSON.parse(localStorageItem) : null,
    loggedIn: localStorageItem ? true : false
};

export const authReducer: Reducer<IAuthState, AuthAction> = (
    state: IAuthState = initialLoginState,
    action: AuthAction
) => {
    switch (action.type) {
        case AuthActionType.LOGIN_INIT:
            return {
                ...state,
                error: null,
                isLoading: true,
                loggedIn: false
            };
        case AuthActionType.LOGIN_SUCCESS:
            return {
                ...state,
                authData: action.payload.authData,
                loggedIn: true,
                isLoading: false
            };
        case AuthActionType.LOGIN_FAILED:
            return {
                ...state,
                error: action.payload,
                loggedIn: false,
                isLoading: false
            };
        case AuthActionType.LOGOUT:
            return {
                loggedIn: false,
                isLoading: false
            };
        default:
            return state;
    }
};
