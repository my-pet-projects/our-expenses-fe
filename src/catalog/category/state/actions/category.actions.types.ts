import { CategoryActionType } from 'src/catalog/category/state/constants';
import { ApplicationError, Category } from 'src/models';

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

export interface ICategoryCreateInit {
    type: CategoryActionType.CREATE_INIT;
}

export interface ICategoryCreateDone {
    type: CategoryActionType.CREATE_DONE;
}

export interface ICategoryCreateFailed {
    type: CategoryActionType.CREATE_FAILED;
    payload: ApplicationError;
    error: boolean;
}

export interface ICategoryUpdateInit {
    type: CategoryActionType.UPDATE_INIT;
}

export interface ICategoryUpdateDone {
    type: CategoryActionType.UPDATE_DONE;
}

export interface ICategoryUpdateFailed {
    type: CategoryActionType.UPDATE_FAILED;
    payload: ApplicationError;
    error: boolean;
}

export interface ICategoryDeleteInit {
    type: CategoryActionType.DELETE_INIT;
}

export interface ICategoryDeleteDone {
    type: CategoryActionType.DELETE_DONE;
}

export interface ICategoryDeleteFailed {
    type: CategoryActionType.DELETE_FAILED;
    payload: ApplicationError;
    error: boolean;
}

export interface ICategoryMoveInit {
    type: CategoryActionType.MOVE_INIT;
}

export interface ICategoryMoveDone {
    type: CategoryActionType.MOVE_DONE;
}

export interface ICategoryMoveFailed {
    type: CategoryActionType.MOVE_FAILED;
    payload: ApplicationError;
    error: boolean;
}

export interface ICategoryUsagesInit {
    type: CategoryActionType.USAGES_INIT;
}

export interface ICategoryUsagesDone {
    type: CategoryActionType.USAGES_DONE;
    payload: {
        categories: Category[];
    };
}

export interface ICategoryUsagesFailed {
    type: CategoryActionType.USAGES_FAILED;
    payload: ApplicationError;
    error: boolean;
}

export interface ICategoryRefresh {
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
    | ICategoryCreateInit
    | ICategoryCreateDone
    | ICategoryCreateFailed
    | ICategoryUpdateInit
    | ICategoryUpdateDone
    | ICategoryUpdateFailed
    | ICategoryDeleteInit
    | ICategoryDeleteDone
    | ICategoryDeleteFailed
    | ICategoryUsagesInit
    | ICategoryUsagesDone
    | ICategoryUsagesFailed
    | ICategoryRefresh
    | ICategoryReset;
