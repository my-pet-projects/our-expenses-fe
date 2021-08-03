import { ExpenseActionType } from 'src/expense/state/constants';
import { ApplicationError, Category } from 'src/models';

export interface IExpenseCreateInit {
    type: ExpenseActionType.CREATE_INIT;
}

export interface IExpenseCreateDone {
    type: ExpenseActionType.CREATE_DONE;
}

export interface IExpenseCreateFailed {
    type: ExpenseActionType.CREATE_FAILED;
    payload: ApplicationError;
    error: boolean;
}
export interface IFetchCategoriesInit {
    type: ExpenseActionType.CATEGORIES_FETCH_INIT;
}

export interface IFetchCategoriesSuccess {
    type: ExpenseActionType.CATEGORIES_FETCH_SUCCESS;
    payload: {
        categories: Category[];
    };
}

export interface IFetchCategoriesFail {
    type: ExpenseActionType.CATEGORIES_FETCH_FAILED;
    payload: ApplicationError;
    error: boolean;
}

export type ExpenseAction =
    | IFetchCategoriesInit
    | IFetchCategoriesSuccess
    | IFetchCategoriesFail
    | IExpenseCreateInit
    | IExpenseCreateDone
    | IExpenseCreateFailed;
