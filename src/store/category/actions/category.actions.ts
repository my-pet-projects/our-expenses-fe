import { ApplicationError, Category } from 'src/models';
import { IHttpRequestOptions, sendRequest } from 'src/services/http';
import { AppThunkDispatch, AppThunkResult } from 'src/store/app.store.types';
import { updateCategory } from 'src/store/categories/actions';
import { notifyFailure, notifySuccess } from 'src/store/notify/actions';

import { CategoryActionType } from '../constants';
import {
    ICategoryProcessingDone,
    ICategoryProcessingFailed,
    ICategoryProcessingInit,
    IFetchCategoryFail,
    IFetchCategoryInit,
    IFetchCategorySuccess,
    IHideCategoryForm,
    IShowCategoryForm
} from './category.actions.types';

export const willFetchCategory = (): IFetchCategoryInit => ({
    type: CategoryActionType.FETCH_INIT,
    isLoading: true
});

export const didFetchedCategory = (category: Category): IFetchCategorySuccess => ({
    type: CategoryActionType.FETCH_SUCCESS,
    category: category,
    isLoading: false
});

const failedToFetchCategory = (error: ApplicationError): IFetchCategoryFail => ({
    type: CategoryActionType.FETCH_FAILED,
    error: error
});

const didShowCategoryForm = (): IShowCategoryForm => ({
    type: CategoryActionType.SHOW_FORM
});

const didHideCategoryForm = (): IHideCategoryForm => ({
    type: CategoryActionType.HIDE_FORM
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

const failedProcessCategory = (error: ApplicationError): ICategoryProcessingFailed => ({
    type: CategoryActionType.PROCESSING_FAILED,
    isProcessing: false,
    error: error
});

export const showCategoryForm = (): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
    dispatch(didShowCategoryForm());
};

export const hideCategoryForm = (): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
    dispatch(didHideCategoryForm());
};

export const selectCategory = (id: string): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
    const options = {
        path: `categories/${id}`,
        method: 'GET'
    } as IHttpRequestOptions;

    try {
        // TODO: cancel only relevant requests
        //cancelRequest();

        await dispatch(willFetchCategory());
        const result = await sendRequest<Category>(options);

        // ensure that we got back category that was expected
        if (id === result?.data?.id) {
            dispatch(didFetchedCategory(result.data));
        }
    } catch (error) {
        const appError = {
            message: 'Failed to get category details!',
            description: error.getFullMessage(),
            error: error
        } as ApplicationError;
        await dispatch(notifyFailure(appError));
        await dispatch(failedToFetchCategory(appError));
    }
};

export const saveCategory = (category: Category): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
    const options = {
        path: `categories/${category.id}`,
        method: 'PUT',
        payload: category
    } as IHttpRequestOptions<Category>;

    await dispatch(willProcessCategory());

    try {
        await sendRequest<Category>(options);
        await dispatch(didProcessCategory());
        await dispatch(updateCategory(category));
        await dispatch(notifySuccess('Saved category successfully!'));
    } catch (error) {
        const appError = {
            message: 'Failed to save category!',
            description: error.getFullMessage(),
            error: error
        } as ApplicationError;
        await dispatch(failedProcessCategory(appError));
        await dispatch(notifyFailure(appError));
    }
};
