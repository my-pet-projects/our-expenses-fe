import { Dispatch } from 'react';
import { AnyAction } from 'redux';

import { Category } from 'src/models';
import { cancelRequest, IHttpRequestOptions, sendRequest } from 'src/services/http';
import { CategoriesActionType } from 'src/store/categories/constants';

import {
    ICategoryUpdate,
    IFetchCategoriesCancel,
    IFetchCategoriesInit,
    IFetchCategoriesSuccess
} from './categories.actions.types';

const willFetchCategories = (): IFetchCategoriesInit => ({
    type: CategoriesActionType.FETCH_INIT,
    isLoading: true
});

const canceledFetchCategories = (): IFetchCategoriesCancel => ({
    type: CategoriesActionType.FETCH_CANCEL,
    isLoading: false
});

const didFetchCategories = (categories: Category[]): IFetchCategoriesSuccess => ({
    type: CategoriesActionType.FETCH_SUCCESS,
    categories: categories,
    isLoading: false
});

const didUpdateCategory = (category: Category): ICategoryUpdate => ({
    type: CategoriesActionType.ITEM_UPDATE,
    category: category
});

export const updateCategory = (category: Category) => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
    await dispatch(didUpdateCategory(category));
};

export const fetchCancel = () => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
    await dispatch(canceledFetchCategories());
    cancelRequest();
};

export const fetchCategories = () => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
    const options = {
        path: 'categories',
        method: 'GET'
    } as IHttpRequestOptions;

    dispatch(willFetchCategories());
    try {
        const result = await sendRequest<Category[]>(options);
        dispatch(didFetchCategories(result.data!));
    } catch (error) {
        console.log('error', error);
    }
};

// race conditions
// https://medium.com/dailyjs/handling-race-conditions-with-redux-thunk-c348a7a5a839
// https://stackoverflow.com/questions/47302810/sequential-async-actions-in-redux-and-isfetching
