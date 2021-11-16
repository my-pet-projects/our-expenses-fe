import { ExpenseActionType } from 'src/expense/state/constants';
import { ApplicationError, Category, Expense, NewExpenseResponse } from 'src/models';
import { notifyFailure, notifySuccess } from 'src/notify/state/actions';
import { AppThunkAction, AppThunkDispatch } from 'src/RootState';
import { IHttpRequestOptions, sendRequest } from 'src/services/http';

import {
    IExpenseCreateDone,
    IExpenseCreateFailed,
    IExpenseCreateInit,
    IFetchCategoriesFail,
    IFetchCategoriesInit,
    IFetchCategoriesSuccess
} from './expense.actions.types';

const willFetchCategories = (): IFetchCategoriesInit => ({
    type: ExpenseActionType.CATEGORIES_FETCH_INIT
});

const didFetchCategories = (categories: Category[]): IFetchCategoriesSuccess => ({
    type: ExpenseActionType.CATEGORIES_FETCH_SUCCESS,
    payload: {
        categories: categories
    }
});

const failedToFetchCategories = (error: ApplicationError): IFetchCategoriesFail => ({
    type: ExpenseActionType.CATEGORIES_FETCH_FAILED,
    payload: error,
    error: true
});

const willCreateExpense = (): IExpenseCreateInit => ({
    type: ExpenseActionType.CREATE_INIT
});

const didCreateExpense = (expense: Expense): IExpenseCreateDone => ({
    type: ExpenseActionType.CREATE_DONE,
    payload: {
        expense: expense
    }
});

const failedCreateExpense = (error: ApplicationError): IExpenseCreateFailed => ({
    type: ExpenseActionType.CREATE_FAILED,
    payload: error,
    error: true
});

export const createExpense = (expense: Expense): AppThunkAction<Promise<void>> =>
    async function (dispatch: AppThunkDispatch): Promise<void> {
        const options = {
            path: 'expenses',
            method: 'POST',
            payload: expense
        } as IHttpRequestOptions<Expense>;

        try {
            dispatch(willCreateExpense());
            const response = await sendRequest<NewExpenseResponse>(options);
            if (!response.data || !response.data.id) {
                throw new Error('Unexpected response from the server.');
            }
            expense.id = response.data.id;
            dispatch(didCreateExpense(expense));
            dispatch(notifySuccess('Expense added successfully!'));
        } catch (error) {
            const appError = new ApplicationError('Failed to add expense!', error);
            dispatch(failedCreateExpense(appError));
            dispatch(notifyFailure(appError));
            throw error;
        }
    };

export const fetchCategoriesCatalog = () =>
    async function (dispatch: AppThunkDispatch): Promise<void> {
        const options = {
            path: 'categories?all=true',
            method: 'GET'
        } as IHttpRequestOptions;

        dispatch(willFetchCategories());
        try {
            const response = await sendRequest<Category[]>(options);
            dispatch(didFetchCategories(response.data || []));
        } catch (error) {
            const appError = new ApplicationError('Failed to fetch categories catalog!', error);
            dispatch(notifyFailure(appError));
            dispatch(failedToFetchCategories(appError));
        }
    };
