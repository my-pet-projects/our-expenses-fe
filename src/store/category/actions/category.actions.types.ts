import { ApplicationError, Category } from 'src/models';
import { CategoryModalType } from 'src/pages/Category/components';
import { CategoryActionType } from 'src/store/category/constants';

export interface IFetchCategoryInit {
    type: CategoryActionType.FETCH_INIT;
}

export interface IFetchCategorySuccess {
    type: CategoryActionType.FETCH_SUCCESS;
    payload: {
        category: Category;
    };
}

export interface IFetchCategoryFail {
    type: CategoryActionType.FETCH_FAILED;
    payload: ApplicationError;
    error: boolean;
}

export interface IShowCategoryForm {
    type: CategoryActionType.SHOW_MODAL;
    payload: {
        category: Category | null;
        mode: CategoryModalType;
    };
}

export interface IHideCategoryForm {
    type: CategoryActionType.HIDE_MODAL;
}

export interface ICategoryProcessingInit {
    type: CategoryActionType.PROCESSING_INIT;
}

export interface ICategoryProcessingDone {
    type: CategoryActionType.PROCESSING_DONE;
}

export interface ICategoryProcessingFailed {
    type: CategoryActionType.PROCESSING_FAILED;
    payload: ApplicationError;
    error: boolean;
}

export interface ICategoryUpdateDone {
    type: CategoryActionType.REFRESH;
    payload: {
        category: Category;
    };
}
export interface ICategoryReset {
    type: CategoryActionType.RESET;
}

export type CategoryAction =
    | IFetchCategoryInit
    | IFetchCategorySuccess
    | IFetchCategoryFail
    | IShowCategoryForm
    | IHideCategoryForm
    | ICategoryProcessingDone
    | ICategoryProcessingInit
    | ICategoryProcessingFailed
    | ICategoryUpdateDone
    | ICategoryReset;
