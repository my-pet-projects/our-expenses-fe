import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { IAuthState } from 'src/auth/state/reducers';
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

type AppThunkExtraArg = unknown;

export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, AppThunkExtraArg, AnyAction>;
export type AppThunkDispatch = ThunkDispatch<RootState, AppThunkExtraArg, AnyAction>;
