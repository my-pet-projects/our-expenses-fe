import { Reducer } from 'redux';

import { ApplicationError, Category } from 'src/models';
import { CategoryAction } from 'src/store/category/actions';
import { CategoryActionType } from 'src/store/category/constants';

export interface ICategoryState {
    category?: Category;
    isLoading: boolean;
    error?: ApplicationError;
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
        // case CategoryActionType.PROCESSING_INIT:
        //     return {
        //         ...state,
        //         modalData: {
        //             ...state.modalData,
        //             isProcessing: true
        //         }
        //     };
        // case CategoryActionType.PROCESSING_DONE:
        //     return {
        //         ...state,
        //         modalData: {
        //             ...state.modalData,
        //             isProcessing: false
        //         }
        //     };
        // case CategoryActionType.PROCESSING_FAILED:
        //     return {
        //         ...state,
        //         modalData: {
        //             ...state.modalData,
        //             isProcessing: false,
        //             error: action.payload
        //         }
        //     };
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
