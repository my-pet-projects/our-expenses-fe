import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { NotifyAction } from './notify/actions';

import { INotifyState } from './notify/reducers';

export interface RootState {
    readonly notification: INotifyState;
}

export type RootActions = NotifyAction;

type AppThunkExtraArg = undefined;
export type AppThunkResult<R> = ThunkAction<R, RootState, AppThunkExtraArg, Action>;
export type AppThunkDispatch = ThunkDispatch<RootState, AppThunkExtraArg, Action>;
