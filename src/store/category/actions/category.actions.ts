import { ApplicationError, Category } from 'src/models';
import { CategoryModalType } from 'src/pages/Category/components';
import { IHttpRequestOptions, sendRequest } from 'src/services/http';
import { AppThunkDispatch, AppThunkResult } from 'src/store/app.store.types';
import { addCategory } from 'src/store/categories/actions';
import { notifyFailure, notifySuccess } from 'src/store/notify/actions';

import { CategoryActionType } from '../constants';
import {
    ICategoryProcessingDone,
    ICategoryProcessingFailed,
    ICategoryProcessingInit,
    ICategoryUpdateDone,
    IFetchCategoryFail,
    IFetchCategoryInit,
    IFetchCategorySuccess,
    IHideCategoryForm,
    IShowCategoryForm
} from './category.actions.types';

export const willFetchCategory = (): IFetchCategoryInit => ({
    type: CategoryActionType.FETCH_INIT
});

export const didFetchedCategory = (category: Category): IFetchCategorySuccess => ({
    type: CategoryActionType.FETCH_SUCCESS,
    payload: {
        category: category
    }
});

const failedToFetchCategory = (error: ApplicationError): IFetchCategoryFail => ({
    type: CategoryActionType.FETCH_FAILED,
    payload: error,
    error: true
});

const didShowCategoryModal = (category: Category, mode: CategoryModalType): IShowCategoryForm => ({
    type: CategoryActionType.SHOW_MODAL,
    payload: {
        category: category,
        mode: mode
    }
});

const hideCategoryModal = (): IHideCategoryForm => ({
    type: CategoryActionType.HIDE_MODAL
});

// export const fetchCancel = () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState): Promise<void> => {
//     await dispatch(GetFetchCancel());
//     cancelRequest();
// };

const willProcessCategory = (): ICategoryProcessingInit => ({
    type: CategoryActionType.PROCESSING_INIT
});

const didProcessCategory = (): ICategoryProcessingDone => ({
    type: CategoryActionType.PROCESSING_DONE
});

const failedProcessCategory = (error: ApplicationError): ICategoryProcessingFailed => ({
    type: CategoryActionType.PROCESSING_FAILED,
    payload: error,
    error: true
});

const refreshCategory = (category: Category): ICategoryUpdateDone => ({
    type: CategoryActionType.REFRESH,
    payload: {
        category: category
    }
});

export const showCategoryForm = (category: Category, mode: CategoryModalType): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
    let payload = category;
    if (mode === CategoryModalType.Create) {
        payload = {
            id: '',
            name: '',
            icon: '',
            path: category.path,
            parentId: category.id
        } as Category;
    }
    dispatch(didShowCategoryModal(payload, mode));
};

export const hideCategoryForm = (): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
    dispatch(hideCategoryModal());
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
    if (category.id) {
        await dispatch(updateCategory(category));
    } else {
        await dispatch(createCategory(category));
    }
};

const createCategory = (category: Category): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
    const options = {
        path: 'categories',
        method: 'POST',
        payload: category
    } as IHttpRequestOptions<Category>;

    await dispatch(willProcessCategory());

    try {
        const newCategory = await sendRequest<Category>(options);
        if (!newCategory.data) {
            // TODO: throw
            throw new Error('');
        }
        await dispatch(didProcessCategory());
        await dispatch(addCategory(newCategory.data));
        await dispatch(notifySuccess('Category created successfully!'));
        await dispatch(hideCategoryForm());
    } catch (error) {
        const appError = {
            message: 'Failed to create category!',
            description: error.getFullMessage(),
            error: error
        } as ApplicationError;
        await dispatch(failedProcessCategory(appError));
        await dispatch(notifyFailure(appError));
        throw error;
    }
};

const updateCategory = (category: Category): AppThunkResult<Promise<void>> => async (
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
        await dispatch(refreshCategory(category));
        await dispatch(notifySuccess('Category updated successfully!'));
        await dispatch(hideCategoryForm());
    } catch (error) {
        const appError = {
            message: 'Failed to update category!',
            description: error.getFullMessage(),
            error: error
        } as ApplicationError;
        await dispatch(failedProcessCategory(appError));
        await dispatch(notifyFailure(appError));
    }
};
