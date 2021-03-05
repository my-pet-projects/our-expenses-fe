import { Reducer } from 'redux';

import { ApplicationError, Category } from 'src/models';
import { CategoryModalType } from 'src/pages/Category/components';
import { CategoryAction } from 'src/store/category/actions';
import { CategoryActionType } from 'src/store/category/constants';

export interface ICategoryModalState {
    isOpen: boolean;
    category: Category | null;
    error: ApplicationError | null;
    isProcessing: boolean;
    mode?: CategoryModalType;
}

export interface ICategoryState {
    category: Category | null;
    isLoading: boolean;
    error: ApplicationError | null;
    modalData: ICategoryModalState;
}

const initialCategoryState: ICategoryState = {
    category: null,
    isLoading: false,
    error: null,
    modalData: {
        isProcessing: false,
        isOpen: false,
        error: null,
        category: null
    }
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
        case CategoryActionType.SHOW_MODAL:
            return {
                ...state,
                error: null,
                modalData: {
                    ...state.modalData,
                    isOpen: true,
                    category: action.payload.category,
                    mode: action.payload.mode
                }
            };
        case CategoryActionType.HIDE_MODAL:
            return {
                ...state,
                error: null,
                modalData: {
                    isOpen: false,
                    category: null,
                    error: null,
                    isProcessing: false
                }
            };
        case CategoryActionType.PROCESSING_INIT:
            return {
                ...state,
                modalData: {
                    ...state.modalData,
                    isProcessing: true
                }
            };
        case CategoryActionType.PROCESSING_DONE:
            return {
                ...state,
                modalData: {
                    ...state.modalData,
                    isProcessing: false
                }
            };
        case CategoryActionType.PROCESSING_FAILED:
            return {
                ...state,
                modalData: {
                    ...state.modalData,
                    isProcessing: false,
                    error: action.payload
                }
            };
        case CategoryActionType.REFRESH:
            return {
                ...state,
                category: action.payload.category
            };
        default:
            return state;
    }
};
