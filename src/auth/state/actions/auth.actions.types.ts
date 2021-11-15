import { AuthActionType } from 'src/auth/state/constants';
import { ApplicationError, AuthData } from 'src/models';

export interface ILoginInit {
    type: AuthActionType.LOGIN_INIT;
}

export interface ILoginSuccess {
    type: AuthActionType.LOGIN_SUCCESS;
    payload: {
        authData: AuthData;
    };
}

export interface ILoginFail {
    type: AuthActionType.LOGIN_FAILED;
    payload: ApplicationError;
    error: boolean;
}

export interface ILogout {
    type: AuthActionType.LOGOUT;
}

export type AuthAction = ILoginInit | ILoginSuccess | ILoginFail | ILogout;
