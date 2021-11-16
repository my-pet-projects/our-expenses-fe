import { AuthActionType } from 'src/auth/state/constants';
import { ApplicationError, AuthData, LoginData } from 'src/models';
import { notifyFailure } from 'src/notify/state/actions';
import { AppThunkAction, AppThunkDispatch } from 'src/RootState';
import { IHttpRequestOptions, sendRequest } from 'src/services/http';

import { ILoginFail, ILoginInit, ILoginSuccess, ILogout } from './auth.actions.types';

const willLogin = (): ILoginInit => ({
    type: AuthActionType.LOGIN_INIT
});

const didLogin = (authData: AuthData): ILoginSuccess => ({
    type: AuthActionType.LOGIN_SUCCESS,
    payload: {
        authData: authData
    }
});

const failedToLogin = (error: ApplicationError): ILoginFail => ({
    type: AuthActionType.LOGIN_FAILED,
    payload: error,
    error: true
});

const didLogout = (): ILogout => ({
    type: AuthActionType.LOGOUT
});

export const login = (username: string, password: string): AppThunkAction =>
    async function (dispatch: AppThunkDispatch): Promise<void> {
        const options = {
            path: 'login',
            method: 'POST',
            payload: {
                username: username,
                password: password
            }
        } as IHttpRequestOptions<LoginData>;

        try {
            dispatch(willLogin());
            const response = await sendRequest<AuthData>(options);
            if (!response.data) {
                throw new Error('Unexpected response from the server.');
            }
            dispatch(didLogin(response.data));
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
            const appError = new ApplicationError('Failed to login!', error);
            dispatch(failedToLogin(appError));
            dispatch(notifyFailure(appError));
        }
    };

export const logout = (): AppThunkAction<Promise<void>> =>
    async function (dispatch: AppThunkDispatch): Promise<void> {
        localStorage.removeItem('user');
        dispatch(didLogout());
    };
