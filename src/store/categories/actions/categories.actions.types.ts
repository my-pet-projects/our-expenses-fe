import { Category } from 'src/models';
import { CategoriesActionType } from 'src/store/categories/constants';
import { ICategoryProcessingDone } from 'src/store/category/actions';

export interface IFetchCategoriesInit {
    type: CategoriesActionType.FETCH_INIT;
    isLoading: boolean;
}

export interface IFetchCategoriesSuccess {
    type: CategoriesActionType.FETCH_SUCCESS;
    isLoading: boolean;
    categories: Category[];
}

export interface IFetchCategoriesCancel {
    type: CategoriesActionType.FETCH_CANCEL;
    isLoading: boolean;
}

export interface IFetchCategoriesFail {
    type: CategoriesActionType.FETCH_FAILED;
    isLoading: boolean;
}

export interface ICategoryUpdate {
    type: CategoriesActionType.ITEM_UPDATE;
    category: Category;
}

export interface ICategoryInsert {
    type: CategoriesActionType.ITEM_INSERT;
    category: Category;
}

export interface ICategoryRemove {
    type: CategoriesActionType.ITEM_REMOVE;
    category: Category;
}

export type CategoriesAction =
    | IFetchCategoriesInit
    | IFetchCategoriesSuccess
    | IFetchCategoriesCancel
    | IFetchCategoriesFail
    | ICategoryUpdate
    | ICategoryInsert
    | ICategoryRemove;
