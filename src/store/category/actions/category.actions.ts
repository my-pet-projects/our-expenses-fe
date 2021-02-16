import { Dispatch } from 'react';
import { AnyAction } from 'redux';

import { Category, SystemNotification } from 'src/models';
import { cancelRequest, IHttpRequestOptions, sendRequest } from 'src/services/http';
import { AppThunkDispatch, AppThunkResult, RootState } from 'src/store/app.store.types';
import { IFetchCategoriesInit, updateCategory } from 'src/store/categories/actions';
import { CategoriesActionType } from 'src/store/categories/constants';
import { notifyFailure, notifySuccess } from 'src/store/notify/actions';

import { CategoryActionType } from '../constants';
import {
    ICategoryProcessingDone,
    ICategoryProcessingFailed,
    ICategoryProcessingInit,
    IFetchCategoryInit,
    IFetchCategorySuccess,
    IShowCategoryForm
} from './category.actions.types';

export const willFetchCategory = (id: string): IFetchCategoryInit => ({
    type: CategoryActionType.FETCH_INIT,
    isLoading: true
});

export const didFetchedCategory = (category: Category): IFetchCategorySuccess => ({
    type: CategoryActionType.FETCH_SUCCESS,
    category: category,
    isLoading: false
});

const didShowCategoryForm = (isVisible: boolean): IShowCategoryForm => ({
    type: CategoryActionType.SHOW_FORM,
    isCategoryFormVisible: isVisible
});
// export const fetchCancel = () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState): Promise<void> => {
//     await dispatch(GetFetchCancel());
//     cancelRequest();
// };

const willProcessCategory = (): ICategoryProcessingInit => ({
    type: CategoryActionType.PROCESSING_INIT,
    isProcessing: true
});

const didProcessCategory = (): ICategoryProcessingDone => ({
    type: CategoryActionType.PROCESSING_DONE,
    isProcessing: false
});

const failedProcessCategory = (error: Error): ICategoryProcessingFailed => ({
    type: CategoryActionType.PROCESSING_FAILED,
    isProcessing: false,
    error: error
});

export const showCategoryForm = (isVisible: boolean): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch,
    getState: () => RootState
): Promise<void> => {
    dispatch(didShowCategoryForm(isVisible));
};

export const hideCategoryForm = (): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch,
    getState: () => RootState
): Promise<void> => {
    dispatch(didShowCategoryForm(false));
};

export const selectCategory = (id: string): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch,
    getState: () => RootState
): Promise<void> => {
    console.log('selectcategory1');
    const options = {
        path: `categories/${id}`,
        method: 'GET'
    } as IHttpRequestOptions;

    console.log('fetch category');

    dispatch(didShowCategoryForm(true));
    try {
        // TODO: cancel only relevant requests
        //cancelRequest();
        dispatch(willFetchCategory('1'));
        const result = await sendRequest<Category>(options);

        console.log('check', id, result.data?.id);

        // ensure that we got back category that was expected
        if (id === result?.data?.id) {
            dispatch(didFetchedCategory(result.data!));
        }
    } catch (error) {
        console.log('error', error);
    }
};

export const saveCategory = (category: Category): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch,
    getState: () => RootState
): Promise<void> => {
    console.log('save category', category);
    const options = {
        path: `categories/${category.id}`,
        method: 'PUT',
        payload: category
    } as IHttpRequestOptions<Category>;

    dispatch(willProcessCategory());

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await new Promise((r: any) => setTimeout(r, 2000));

        const result = await sendRequest<Category>(options);
        dispatch(didProcessCategory());
        dispatch(updateCategory(category));
        dispatch(notifySuccess('Saved category successfully!'));
        dispatch(notifyFailure('Failed to save category!', 'details here'));
        console.log('result', result);
    } catch (error) {
        console.log('failed to save', error);
        dispatch(failedProcessCategory(error));
        dispatch(notifyFailure('Failed to save category!'));
    }
};
