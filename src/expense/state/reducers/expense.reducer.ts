import { Reducer } from 'redux';

import { ExpenseAction } from 'src/expense/state/actions';
import { ApplicationError, Expense } from 'src/models';

export interface IExpenseState {
    expense?: Expense;
    isLoading: boolean;
    error?: ApplicationError;
}

const initialExpenseState: IExpenseState = {
    isLoading: false
};

export const expenseReducer: Reducer<IExpenseState, ExpenseAction> = (
    state: IExpenseState = initialExpenseState,
    action: ExpenseAction
) => {
    switch (action.type) {
        default:
            return state;
    }
};
