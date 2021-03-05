import { Reducer } from 'redux';

import { ApplicationError, Category } from 'src/models';
import { CategoriesAction } from 'src/store/categories/actions';
import { CategoriesActionType } from 'src/store/categories/constants';

export interface ICategoriesState {
    categories: Category[];
    selectedCategoryId: string | null;
    isLoading: boolean;
    error?: ApplicationError;
}

const initialState: ICategoriesState = {
    categories: [],
    selectedCategoryId: null,
    isLoading: false
};

export const categoriesReducer: Reducer<ICategoriesState, CategoriesAction> = (
    state: ICategoriesState = initialState,
    action: CategoriesAction
) => {
    switch (action.type) {
        case CategoriesActionType.FETCH_INIT:
            return {
                ...state,
                isLoading: true
            };
        case CategoriesActionType.FETCH_CANCEL:
            return {
                ...state
            };
        case CategoriesActionType.FETCH_SUCCESS:
            return {
                ...state,
                categories: action.payload.categories,
                isLoading: false
            };
        case CategoriesActionType.FETCH_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        case CategoriesActionType.ITEM_UPDATE:
            const categories = state.categories.map((item: Category) => {
                if (item.id !== action.payload.category.id) {
                    return item;
                }

                return {
                    ...item,
                    ...action.payload.category
                };
            });

            return {
                ...state,
                categories: categories
            };
        case CategoriesActionType.ITEM_INSERT:
            const newArray = state.categories.slice();
            newArray.splice(0, 0, action.payload.category);
            return {
                ...state,
                categories: newArray
            };
        case CategoriesActionType.ITEM_REMOVE:
            // let newArray = array.slice();
            // newArray.splice(action.index, 1);
            // return newArray;
            return {
                ...state
            };
        default:
            return state;
    }
};
