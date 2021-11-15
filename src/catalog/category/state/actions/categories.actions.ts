import { Dispatch } from 'react';
import { AnyAction } from 'redux';

import { CategoriesActionType } from 'src/catalog/category/state/constants';
import { ApplicationError, Category } from 'src/models';
import { notifyFailure } from 'src/notify/state/actions';
import { cancelRequest, IHttpRequestOptions, sendRequest } from 'src/services/http';

import {
    ICategoryInsert,
    IFetchCategoriesCancel,
    IFetchCategoriesFail,
    IFetchCategoriesInit,
    IFetchCategoriesSuccess
} from './categories.actions.types';

const willFetchCategories = (): IFetchCategoriesInit => ({
    type: CategoriesActionType.FETCH_INIT
});

const canceledFetchCategories = (): IFetchCategoriesCancel => ({
    type: CategoriesActionType.FETCH_CANCEL
});

const didFetchCategories = (categories: Category[]): IFetchCategoriesSuccess => ({
    type: CategoriesActionType.FETCH_SUCCESS,
    payload: {
        categories: categories
    }
});

const failedToFetchCategories = (error: ApplicationError): IFetchCategoriesFail => ({
    type: CategoriesActionType.FETCH_FAILED,
    payload: error,
    error: true
});

const addChildCategory = (category: Category): ICategoryInsert => ({
    type: CategoriesActionType.ITEM_INSERT,
    payload: {
        category: category
    }
});

export const addCategory = (category: Category) =>
    async function (dispatch: Dispatch<AnyAction>): Promise<void> {
        dispatch(addChildCategory(category));
    };

export const fetchCancel = () =>
    async function (dispatch: Dispatch<AnyAction>): Promise<void> {
        dispatch(canceledFetchCategories());
        cancelRequest();
    };

export const fetchCategories = (categoryId?: string) =>
    async function (dispatch: Dispatch<AnyAction>): Promise<void> {
        const options = {
            path: categoryId ? `categories?parentId=${categoryId}` : 'categories',
            method: 'GET'
        } as IHttpRequestOptions;

        await dispatch(willFetchCategories());
        try {
            const result = await sendRequest<Category[]>(options);
            await dispatch(didFetchCategories(result.data || []));
        } catch (error) {
            const appError = new ApplicationError('Failed to fetch categories!', error);
            dispatch(notifyFailure(appError));
            dispatch(failedToFetchCategories(appError));
        }
    };

// race conditions
// https://medium.com/dailyjs/handling-race-conditions-with-redux-thunk-c348a7a5a839
// https://stackoverflow.com/questions/47302810/sequential-async-actions-in-redux-and-isfetching
