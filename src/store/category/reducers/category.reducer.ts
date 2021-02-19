import { Reducer } from 'redux';

import { ApplicationError, Category } from 'src/models';
import { CategoryAction } from 'src/store/category/actions';
import { CategoryActionType } from 'src/store/category/constants';

export interface ICategoryState {
    category: Category | null;
    isLoading: boolean;
    isProcessing: boolean;
    error: ApplicationError | null;
    isCategoryFormVisible: boolean;
}

const initialCategoryState: ICategoryState = {
    category: null,
    isLoading: false,
    isProcessing: false,
    isCategoryFormVisible: false,
    error: null
};

export const categoryReducer: Reducer<ICategoryState, CategoryAction> = (
    state: ICategoryState = initialCategoryState,
    action: CategoryAction
) => {
    switch (action.type) {
        case CategoryActionType.FETCH_INIT:
            return {
                ...state,
                isLoading: true
            };
        case CategoryActionType.FETCH_SUCCESS:
            return {
                ...state,
                category: action.category,
                isLoading: false
            };
        case CategoryActionType.FETCH_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
                isProcessing: false
            };
        case CategoryActionType.SHOW_FORM:
            return {
                ...state,
                isCategoryFormVisible: true,
                error: null
            };
        case CategoryActionType.HIDE_FORM:
            return {
                ...state,
                isCategoryFormVisible: false,
                error: null
            };
        case CategoryActionType.PROCESSING_INIT:
            return {
                ...state,
                isProcessing: true
            };
        case CategoryActionType.PROCESSING_DONE:
            return {
                ...state,
                isProcessing: false
            };
        case CategoryActionType.PROCESSING_FAILED:
            return {
                ...state,
                isProcessing: false,
                error: action.error
            };
        default:
            return state;
    }
};
