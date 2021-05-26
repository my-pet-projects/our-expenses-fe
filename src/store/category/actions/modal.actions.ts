import { ApplicationError, Category, CategoryModalType } from 'src/models';
import { IHttpRequestOptions, sendRequest } from 'src/services/http';
import { AppThunkDispatch, AppThunkResult, RootState } from 'src/store/app.store.types';
import { notifyFailure } from 'src/store/notify/actions';

import { ModalActionType } from '../constants';
import { ICategoryModalPayload } from '../reducers';
import { deleteCategory, moveCategory, saveCategory } from './category.actions';
import {
    IHideCategoryForm,
    IModalInitializeDone,
    IModalInitializeFailed,
    IModalProcessingDone,
    IModalProcessingFailed,
    IModalProcessingInit,
    IShowCategoryForm
} from './modal.actions.types';

const didShowCategoryModal = (category: Category, mode: CategoryModalType): IShowCategoryForm => ({
    type: ModalActionType.SHOW,
    payload: {
        mode: mode
    }
});

const didInitializeModal = (modalPayload: ICategoryModalPayload): IModalInitializeDone => ({
    type: ModalActionType.INITIALIZE_DONE,
    payload: {
        modalPayload: modalPayload
    }
});

const failedToInitializeModal = (error: ApplicationError): IModalInitializeFailed => ({
    type: ModalActionType.INITIALIZE_FAILED,
    payload: error,
    error: true
});

const hideCategoryModal = (): IHideCategoryForm => ({
    type: ModalActionType.HIDE
});

const willProcessModal = (): IModalProcessingInit => ({
    type: ModalActionType.PROCESSING_INIT
});

const didProcessModal = (): IModalProcessingDone => ({
    type: ModalActionType.PROCESSING_DONE
});

const failedProcessModal = (error: ApplicationError): IModalProcessingFailed => ({
    type: ModalActionType.PROCESSING_FAILED,
    payload: error,
    error: true
});

export const showCategoryForm = (category: Category, mode: CategoryModalType): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
    let payload = category;
    if (mode === 'create') {
        payload = {
            id: '',
            name: '',
            icon: '',
            path: category ? category.path : '',
            parentId: category ? category.id : '',
            level: category ? category.level : 1
        } as Category;
    }
    // dispatch(didShowCategoryModal(payload!, mode, { category: payload }));
};

export const showNewCategoryModal = (category?: Category): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
    const childCategory = {
        id: '',
        name: '',
        icon: '',
        path: category ? category.path : '',
        parentId: category ? category.id : '',
        level: category ? category.level + 1 : 1
    } as Category;

    dispatch(didShowCategoryModal(childCategory, 'create'));

    const modalPayload = {
        category: childCategory
    } as ICategoryModalPayload;
    dispatch(didInitializeModal(modalPayload));

    // dispatch(didShowCategoryModal(payload!, mode, { category: payload }));
};
export const showEditCategoryModal = (category: Category): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
    dispatch(didShowCategoryModal(category, 'edit'));
    const modalPayload = {
        category: category
    } as ICategoryModalPayload;
    dispatch(didInitializeModal(modalPayload));

    // dispatch(didShowCategoryModal(payload!, mode, { category: payload }));
};

export const showMoveCategoryModal = (category: Category): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
    dispatch(didShowCategoryModal(category, 'move'));
    const options = {
        path: 'categories?all=true',
        method: 'GET'
    } as IHttpRequestOptions<Category[]>;
    const result = await sendRequest<Category[]>(options);

    const modalPayload = {
        category: category,
        allCategories: result.data
    } as ICategoryModalPayload;
    dispatch(didInitializeModal(modalPayload));

    // dispatch(didShowCategoryModal(payload!, mode, { category: payload }));
};

export const showDeleteModal = (category: Category): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch,
    getState: () => RootState
): Promise<void> => {
    const options = {
        path: `categories/${category.id}/usages`,
        method: 'GET'
    } as IHttpRequestOptions<Category>;

    dispatch(didShowCategoryModal(category, 'delete'));

    try {
        const result = await sendRequest<Category[]>(options);
        const modalPayload = {
            category: category,
            categories: result.data
        } as ICategoryModalPayload;
        dispatch(didInitializeModal(modalPayload));
    } catch (error) {
        const appError = {
            message: 'Failed to fetch category usages!',
            description: error.getFullMessage(),
            error: error
        } as ApplicationError;
        dispatch(failedToInitializeModal(appError));
        dispatch(notifyFailure(appError));
    }
};

export const hideCategoryForm = (): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
    dispatch(hideCategoryModal());
};

export const processCategorySave = (payload: Category): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
    try {
        dispatch(willProcessModal());
        dispatch(saveCategory(payload));
        dispatch(didProcessModal());
        dispatch(hideCategoryModal());
    } catch (error) {
        const appError = {
            message: 'Failed to process category!',
            description: error.getFullMessage(),
            error: error
        } as ApplicationError;
        dispatch(failedProcessModal(appError));
    }
};

export const processCategoryMove = (payload: Category, categoryId: string): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
    try {
        await dispatch(willProcessModal());
        await dispatch(moveCategory(payload, categoryId));
        await dispatch(didProcessModal());
        await dispatch(hideCategoryModal());
    } catch (error) {
        const appError = {
            message: 'Failed to process category move!',
            description: error.getFullMessage(),
            error: error
        } as ApplicationError;
        dispatch(failedProcessModal(appError));
    }
};

export const processCategoryDelete = (payload: Category): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
    try {
        await dispatch(willProcessModal());
        await dispatch(deleteCategory(payload));
        await dispatch(didProcessModal());
        await dispatch(hideCategoryModal());
    } catch (error) {
        const appError = {
            message: 'Failed to process category!',
            description: error.getFullMessage(),
            error: error
        } as ApplicationError;
        await dispatch(failedProcessModal(appError));
    }
};
