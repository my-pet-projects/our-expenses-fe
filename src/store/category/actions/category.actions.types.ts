import { Category } from 'src/models';
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

export interface IShowCategoryForm {
    type: CategoryActionType.SHOW_FORM;
    isCategoryFormVisible: boolean;
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
    error: Error;
}

export type CategoryAction =
    | IFetchCategoryInit
    | IFetchCategorySuccess
    | IShowCategoryForm
    | ICategoryProcessingDone
    | ICategoryProcessingInit
    | ICategoryProcessingFailed;
