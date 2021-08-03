import { Reducer } from 'redux';

import { ExpenseAction } from 'src/expense/state/actions';
import { ExpenseActionType } from 'src/expense/state/constants';
import { ApplicationError, Category, Expense } from 'src/models';

export interface IExpenseState {
    expense?: Expense;
    categories: Category[];
    isLoading: boolean;
    error?: ApplicationError;
}

const initialExpenseState: IExpenseState = {
    isLoading: false,
    categories: []
};

export const expenseReducer: Reducer<IExpenseState, ExpenseAction> = (
    state: IExpenseState = initialExpenseState,
    action: ExpenseAction
) => {
    switch (action.type) {
        case ExpenseActionType.CATEGORIES_FETCH_INIT:
            return {
                ...state,
                isLoading: true
            };
        case ExpenseActionType.CATEGORIES_FETCH_SUCCESS:
            return {
                ...state,
                categories: action.payload.categories,
                isLoading: false
            };
        case ExpenseActionType.CATEGORIES_FETCH_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        case ExpenseActionType.CREATE_INIT:
            return {
                ...state,
                isLoading: true
            };
        case ExpenseActionType.CREATE_DONE:
            return {
                ...state,
                isLoading: false
            };
        case ExpenseActionType.CREATE_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        default:
            return state;
    }
};
