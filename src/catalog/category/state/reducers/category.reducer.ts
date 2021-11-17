import { Reducer } from 'redux';

import { CategoryAction } from 'src/catalog/category/state/actions';
import { CategoryActionType } from 'src/catalog/category/state/constants';
import { ApplicationError, Category } from 'src/models';

export interface ICategoryState {
    category?: Category;
    isLoading: boolean;
    error?: ApplicationError | null;
}

const initialCategoryState: ICategoryState = {
    isLoading: false
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
                category: action.payload.category,
                isLoading: false
            };
        case CategoryActionType.FETCH_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
                isProcessing: false
            };
        case CategoryActionType.REFRESH:
            return {
                ...state,
                category: action.payload.category
            };
        case CategoryActionType.RESET:
            return initialCategoryState;
        default:
            return state;
    }
};
