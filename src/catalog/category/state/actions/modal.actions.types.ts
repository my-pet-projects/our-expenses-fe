import { ModalActionType } from 'src/catalog/category/state/constants';
import { ApplicationError, CategoryModalType } from 'src/models';

import { ICategoryModalPayload } from '../reducers';

export interface IShowCategoryForm {
    type: ModalActionType.SHOW;
    payload: {
        mode: CategoryModalType;
    };
}

export interface IModalInitializeDone {
    type: ModalActionType.INITIALIZE_DONE;
    payload: {
        modalPayload: ICategoryModalPayload;
    };
}

export interface IModalInitializeFailed {
    type: ModalActionType.INITIALIZE_FAILED;
    payload: ApplicationError;
    error: boolean;
}

export interface IHideCategoryForm {
    type: ModalActionType.HIDE;
}

export interface IModalProcessingInit {
    type: ModalActionType.PROCESSING_INIT;
}

export interface IModalProcessingDone {
    type: ModalActionType.PROCESSING_DONE;
}

export interface IModalProcessingFailed {
    type: ModalActionType.PROCESSING_FAILED;
    payload: ApplicationError;
    error: boolean;
}

export type ModalAction =
    | IShowCategoryForm
    | IModalInitializeDone
    | IModalInitializeFailed
    | IHideCategoryForm
    | IModalProcessingInit
    | IModalProcessingDone
    | IModalProcessingFailed;
