import { addCategory } from 'src/catalog/category/state/actions';
import { ApplicationError, Category } from 'src/models';
import { notifyFailure, notifySuccess } from 'src/notify/state/actions';
import { AppThunkDispatch, AppThunkResult } from 'src/RootState';
import { IHttpRequestOptions, sendRequest } from 'src/services/http';

import { CategoryActionType } from '../constants';
import {
    ICategoryCreateDone,
    ICategoryCreateFailed,
    ICategoryCreateInit,
    ICategoryDeleteDone,
    ICategoryDeleteFailed,
    ICategoryDeleteInit,
    ICategoryMoveDone,
    ICategoryMoveFailed,
    ICategoryMoveInit,
    ICategoryRefresh,
    ICategoryReset,
    ICategoryUpdateDone,
    ICategoryUpdateFailed,
    ICategoryUpdateInit,
    ICategoryUsagesDone,
    ICategoryUsagesFailed,
    ICategoryUsagesInit,
    IFetchCategoryFail,
    IFetchCategoryInit,
    IFetchCategorySuccess
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

const resetSelectedCategory = (): ICategoryReset => ({
    type: CategoryActionType.RESET
});

// export const fetchCancel = () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState): Promise<void> => {
//     dispatch(GetFetchCancel());
//     cancelRequest();
// };

const willCreateCategory = (): ICategoryCreateInit => ({
    type: CategoryActionType.CREATE_INIT
});

const didCreateCategory = (): ICategoryCreateDone => ({
    type: CategoryActionType.CREATE_DONE
});

const failedCreateCategory = (error: ApplicationError): ICategoryCreateFailed => ({
    type: CategoryActionType.CREATE_FAILED,
    payload: error,
    error: true
});

const willUpdateCategory = (): ICategoryUpdateInit => ({
    type: CategoryActionType.UPDATE_INIT
});

const didUpdateCategory = (): ICategoryUpdateDone => ({
    type: CategoryActionType.UPDATE_DONE
});

const failedUpdateCategory = (error: ApplicationError): ICategoryUpdateFailed => ({
    type: CategoryActionType.UPDATE_FAILED,
    payload: error,
    error: true
});

const willDeleteCategory = (): ICategoryDeleteInit => ({
    type: CategoryActionType.DELETE_INIT
});

const didDeleteCategory = (): ICategoryDeleteDone => ({
    type: CategoryActionType.DELETE_DONE
});

const failedDeleteCategory = (error: ApplicationError): ICategoryDeleteFailed => ({
    type: CategoryActionType.DELETE_FAILED,
    payload: error,
    error: true
});

const willMoveCategory = (): ICategoryMoveInit => ({
    type: CategoryActionType.MOVE_INIT
});

const didMoveCategory = (): ICategoryMoveDone => ({
    type: CategoryActionType.MOVE_DONE
});

const failedMoveCategory = (error: ApplicationError): ICategoryMoveFailed => ({
    type: CategoryActionType.MOVE_FAILED,
    payload: error,
    error: true
});

const willFetchCategoryUsages = (): ICategoryUsagesInit => ({
    type: CategoryActionType.USAGES_INIT
});

const didFetchCategoryUsages = (categories: Category[]): ICategoryUsagesDone => ({
    type: CategoryActionType.USAGES_DONE,
    payload: {
        categories: categories
    }
});

const failedFetchCategoryUsages = (error: ApplicationError): ICategoryUsagesFailed => ({
    type: CategoryActionType.USAGES_FAILED,
    payload: error,
    error: true
});

const refreshCategory = (category: Category): ICategoryRefresh => ({
    type: CategoryActionType.REFRESH,
    payload: {
        category: category
    }
});

export const fetchCategory = (id?: string): AppThunkResult<Promise<void>> =>
    async function (dispatch: AppThunkDispatch): Promise<void> {
        if (!id) {
            dispatch(resetSelectedCategory());
            return;
        }

        const options = {
            path: `categories/${id}`,
            method: 'GET'
        } as IHttpRequestOptions;

        try {
            // TODO: cancel only relevant requests
            //cancelRequest();
            dispatch(willFetchCategory());
            const result = await sendRequest<Category>(options);

            // ensure that we got back category that was expected
            if (id === result?.data?.id) {
                dispatch(didFetchedCategory(result.data));
            }
        } catch (error) {
            const appError = new ApplicationError('Failed to get category details!', error);
            dispatch(notifyFailure(appError));
            dispatch(failedToFetchCategory(appError));
        }
    };

export const saveCategory = (category: Category): AppThunkResult<Promise<void>> =>
    async function (dispatch: AppThunkDispatch): Promise<void> {
        if (category.id) {
            dispatch(updateCategory(category));
        } else {
            dispatch(createCategory(category));
        }
    };

const createCategory = (category: Category): AppThunkResult<Promise<void>> =>
    async function (dispatch: AppThunkDispatch): Promise<void> {
        const options = {
            path: 'categories',
            method: 'POST',
            payload: category
        } as IHttpRequestOptions<Category>;

        try {
            dispatch(willCreateCategory());
            const newCategory = await sendRequest<string>(options);
            if (!newCategory.data) {
                // TODO: throw
                throw new Error('');
            }
            category.id = newCategory.data;
            dispatch(didCreateCategory());
            dispatch(addCategory(category));
            dispatch(notifySuccess('Category created successfully!'));
            // dispatch(hideCategoryForm());
        } catch (error) {
            const appError = new ApplicationError('Failed to create category!', error);
            dispatch(failedCreateCategory(appError));
            dispatch(notifyFailure(appError));
            throw error;
        }
    };

const updateCategory = (category: Category): AppThunkResult<Promise<void>> =>
    async function (dispatch: AppThunkDispatch): Promise<void> {
        const options = {
            path: `categories/${category.id}`,
            method: 'PUT',
            payload: category
        } as IHttpRequestOptions<Category>;

        dispatch(willUpdateCategory());

        try {
            await sendRequest<Category>(options);
            dispatch(didUpdateCategory());
            dispatch(refreshCategory(category));
            dispatch(notifySuccess('Category updated successfully!'));
            // dispatch(hideCategoryForm());
        } catch (error) {
            const appError = new ApplicationError('Failed to update category!', error);
            dispatch(failedUpdateCategory(appError));
            dispatch(notifyFailure(appError));
            throw error;
        }
    };

export const deleteCategory = (category: Category): AppThunkResult<Promise<void>> =>
    async function (dispatch: AppThunkDispatch): Promise<void> {
        const options = {
            path: `categories/${category.id}`,
            method: 'DELETE'
        } as IHttpRequestOptions<Category>;
        dispatch(willDeleteCategory());

        try {
            const result = await sendRequest<number>(options);
            await dispatch(didDeleteCategory());
            await dispatch(notifySuccess(`Category deleted successfully! Total deleted items: ${result.data}`));
        } catch (error) {
            const appError = new ApplicationError('Failed to delete category!', error);
            dispatch(failedDeleteCategory(appError));
            dispatch(notifyFailure(appError));
            throw error;
        }
    };

export const moveCategory = (category: Category, categoryId: string): AppThunkResult<Promise<void>> =>
    async function (dispatch: AppThunkDispatch): Promise<void> {
        const options = {
            path: `categories/${category.id}/move?destinationId=${categoryId ? categoryId : 'root'}`,
            method: 'PUT',
            payload: {
                category: category,
                destination: categoryId
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as IHttpRequestOptions<any>;

        await dispatch(willMoveCategory());

        try {
            await sendRequest<Category>(options);
            await dispatch(didMoveCategory());
            await dispatch(notifySuccess('Category moved successfully!'));
        } catch (error) {
            const appError = new ApplicationError('Failed to move category!', error);
            await dispatch(failedMoveCategory(appError));
            await dispatch(notifyFailure(appError));
            throw error;
        }
    };

export const fetchCategoryUsages = (category: Category): AppThunkResult<Promise<void>> =>
    async function (dispatch: AppThunkDispatch): Promise<void> {
        const options = {
            path: `categories/${category.id}/usages`,
            method: 'GET'
        } as IHttpRequestOptions<Category>;

        dispatch(willFetchCategoryUsages());

        try {
            const result = await sendRequest<Category[]>(options);
            dispatch(didFetchCategoryUsages(result.data || []));
        } catch (error) {
            const appError = new ApplicationError('Failed to fetch category usages!', error);
            dispatch(failedFetchCategoryUsages(appError));
            dispatch(notifyFailure(appError));
            throw error;
        }
    };
