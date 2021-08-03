import { Dispatch } from 'react';
import { AnyAction } from 'redux';

import { ExpenseActionType } from 'src/expense/state/constants';
import { ApplicationError, Category, Expense, NewExpenseResponse } from 'src/models';
import { notifyFailure, notifySuccess } from 'src/notify/state/actions';
import { AppThunkDispatch, AppThunkResult } from 'src/RootState';
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

const didCreateExpense = (): IExpenseCreateDone => ({
    type: ExpenseActionType.CREATE_DONE
});

const failedCreateExpense = (error: ApplicationError): IExpenseCreateFailed => ({
    type: ExpenseActionType.CREATE_FAILED,
    payload: error,
    error: true
});

export const createExpense = (expense: Expense): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
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
        dispatch(didCreateExpense());
        dispatch(notifySuccess('Expense added successfully!'));
    } catch (error) {
        const appError = new ApplicationError('Failed to add expense!', error);
        dispatch(failedCreateExpense(appError));
        dispatch(notifyFailure(appError));
        throw error;
    }
};

export const fetchCategoriesCatalog = () => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
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
