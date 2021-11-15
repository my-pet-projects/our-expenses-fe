import { createSelector } from 'reselect';

import { IAuthState } from 'src/auth/state/reducers';
import { RootState } from 'src/RootState';

const selectAuthState = (rootState: RootState): IAuthState => rootState.authData;

export const selectAuthIsLoading = createSelector(selectAuthState, (state: IAuthState) => state.isLoading);

export const selectAuthError = createSelector(selectAuthState, (state: IAuthState) => state.error);

export const selectAuthData = createSelector(selectAuthState, (state: IAuthState) => state.authData);

export const selectIsLoggedIn = createSelector(selectAuthState, (state: IAuthState) => state.loggedIn);
