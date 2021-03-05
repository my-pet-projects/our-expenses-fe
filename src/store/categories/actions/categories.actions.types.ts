import { ApplicationError, Category } from 'src/models';
import { CategoriesActionType } from 'src/store/categories/constants';

export interface IFetchCategoriesInit {
    type: CategoriesActionType.FETCH_INIT;
}

export interface IFetchCategoriesSuccess {
    type: CategoriesActionType.FETCH_SUCCESS;
    payload: {
        categories: Category[];
    };
}

export interface IFetchCategoriesCancel {
    type: CategoriesActionType.FETCH_CANCEL;
}

export interface IFetchCategoriesFail {
    type: CategoriesActionType.FETCH_FAILED;
    payload: ApplicationError;
    error: boolean;
}

export interface ICategoryUpdate {
    type: CategoriesActionType.ITEM_UPDATE;
    payload: {
        category: Category;
    };
}

export interface ICategoryInsert {
    type: CategoriesActionType.ITEM_INSERT;
    payload: {
        category: Category;
    };
}

export interface ICategoryRemove {
    type: CategoriesActionType.ITEM_REMOVE;
    payload: {
        category: Category;
    };
}

export type CategoriesAction =
    | IFetchCategoriesInit
    | IFetchCategoriesSuccess
    | IFetchCategoriesCancel
    | IFetchCategoriesFail
    | ICategoryUpdate
    | ICategoryInsert
    | ICategoryRemove;
