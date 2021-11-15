import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { IAuthState } from 'src/auth/state/reducers';
import { CategoriesAction } from 'src/catalog/category/state/actions';
import { ICategoriesState, ICategoryModalState, ICategoryState } from 'src/catalog/category/state/reducers';
import { IExpenseState } from 'src/expense/state/reducers';
import { INotifyState } from 'src/notify/state/reducers';
import { IReportState } from 'src/report/state/reducers';

export interface RootState {
    readonly categories: ICategoriesState;
    readonly selectedCategory: ICategoryState;
    readonly modalData: ICategoryModalState;
    readonly notification: INotifyState;
    readonly expense: IExpenseState;
    readonly report: IReportState;
    readonly authData: IAuthState;
}

export type RootActions = CategoriesAction; // | CommentsAction | etc.

type AppThunkExtraArg = undefined;
export type AppThunkResult<R> = ThunkAction<R, RootState, AppThunkExtraArg, Action>;
export type AppThunkDispatch = ThunkDispatch<RootState, AppThunkExtraArg, Action>;
