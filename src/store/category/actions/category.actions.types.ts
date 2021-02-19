import { ApplicationError, Category } from 'src/models';
import { CategoryActionType } from 'src/store/category/constants';

export interface IFetchCategoryInit {
    type: CategoryActionType.FETCH_INIT;
    isLoading: boolean;
}

export interface IFetchCategorySuccess {
    type: CategoryActionType.FETCH_SUCCESS;
    isLoading: boolean;
    category: Category;
}

export interface IFetchCategoryFail {
    type: CategoryActionType.FETCH_FAILED;
    error: ApplicationError;
}

export interface IShowCategoryForm {
    type: CategoryActionType.SHOW_FORM;
}

export interface IHideCategoryForm {
    type: CategoryActionType.HIDE_FORM;
}

export interface ICategoryProcessingInit {
    type: CategoryActionType.PROCESSING_INIT;
    isProcessing: boolean;
}

export interface ICategoryProcessingDone {
    type: CategoryActionType.PROCESSING_DONE;
    isProcessing: boolean;
}

export interface ICategoryProcessingFailed {
    type: CategoryActionType.PROCESSING_FAILED;
    isProcessing: boolean;
    error: ApplicationError;
}

export type CategoryAction =
    | IFetchCategoryInit
    | IFetchCategorySuccess
    | IFetchCategoryFail
    | IShowCategoryForm
    | IHideCategoryForm
    | ICategoryProcessingDone
    | ICategoryProcessingInit
    | ICategoryProcessingFailed;
