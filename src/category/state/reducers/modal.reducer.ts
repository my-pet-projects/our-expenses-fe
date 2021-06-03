import { Reducer } from 'redux';

import { ModalAction } from 'src/category/state/actions';
import { ModalActionType } from 'src/category/state/constants';
import { ApplicationError, Category, CategoryModalType } from 'src/models';

export type ICategoryModalPayload = ICategoryPayload | ICategoryUsagesPayload | ICategoryMovePayload;

export interface ICategoryPayload {
    category: Category;
}

export interface ICategoryMovePayload {
    category: Category;
    allCategories: Category[];
}

export interface ICategoryUsagesPayload {
    category: Category;
    categories: Category[];
}

export interface ICategoryModalState {
    isOpen: boolean;
    isLoading: boolean;
    isProcessing: boolean;
    error?: ApplicationError;
    mode?: CategoryModalType;
    payload?: ICategoryModalPayload;
    status?: 'idle' | 'processing' | 'finished' | 'failed';
}

const initialModalState: ICategoryModalState = {
    isOpen: false,
    isLoading: false,
    isProcessing: false
};

export const modalReducer: Reducer<ICategoryModalState, ModalAction> = (
    state: ICategoryModalState = initialModalState,
    action: ModalAction
) => {
    switch (action.type) {
        case ModalActionType.SHOW:
            return {
                ...state,
                isOpen: true,
                isLoading: true,
                mode: action.payload.mode
            };
        case ModalActionType.INITIALIZE_DONE:
            return {
                ...state,
                isLoading: false,
                payload: action.payload.modalPayload,
                status: 'idle'
            };
        case ModalActionType.INITIALIZE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                status: 'failed'
            };
        case ModalActionType.HIDE:
            return initialModalState;
        case ModalActionType.PROCESSING_INIT:
            return {
                ...state,
                isProcessing: true,
                status: 'processing'
            };
        case ModalActionType.PROCESSING_DONE:
            return {
                ...state,
                isProcessing: false,
                status: 'finished'
            };
        case ModalActionType.PROCESSING_FAILED:
            return {
                ...state,
                isProcessing: false,
                status: 'failed',
                error: action.payload
            };
        default:
            return state;
    }
};
