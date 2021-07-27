import { createSelector } from 'reselect';

import { IExpenseState } from 'src/expense/state/reducers';
import { RootState } from 'src/RootState';

const selectExpenseState = (rootState: RootState): IExpenseState => rootState.expense;

export const selectExpense = createSelector(selectExpenseState, (state: IExpenseState) => state.expense);

export const selectExpenseIsLoading = createSelector(selectExpenseState, (state: IExpenseState) => state.isLoading);

export const selectExpenseError = createSelector(selectExpenseState, (state: IExpenseState) => state.error);
