import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { CategoriesAction } from './categories/actions';
import { ICategoriesState } from './categories/reducers';
import { ICategoryState } from './category/reducers';
import { INotifyState } from './notify/reducers';

export interface RootState {
    readonly categories: ICategoriesState;
    readonly selectedCategory: ICategoryState;
    readonly notification: INotifyState;
}

export type RootActions = CategoriesAction; // | CommentsAction | etc.

type AppThunkExtraArg = undefined;
export type AppThunkResult<R> = ThunkAction<R, RootState, AppThunkExtraArg, Action>;
export type AppThunkDispatch = ThunkDispatch<RootState, AppThunkExtraArg, Action>;
