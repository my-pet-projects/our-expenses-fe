import { createSelector } from 'reselect';

import { RootState } from '../../app.store.types';
import { ICategoryModalState, ICategoryPayload, ICategoryUsagesPayload } from '../reducers';

const selectModalState = (rootState: RootState): ICategoryModalState => rootState.modalData;

export const selectModalPayload = createSelector(selectModalState, (state: ICategoryModalState) => state.payload);

export const selectModalCategoryUsagesPayload = createSelector(
    selectModalState,
    (state: ICategoryModalState) => state.payload as ICategoryUsagesPayload
);

export const selectModalCategoryPayload = createSelector(
    selectModalState,
    (state: ICategoryModalState) => state.payload as ICategoryPayload
);

export const selectModalIsProcessing = createSelector(
    selectModalState,
    (state: ICategoryModalState) => state.isProcessing
);

export const selectModalIsLoading = createSelector(selectModalState, (state: ICategoryModalState) => state.isLoading);

export const selectModalIsOpen = createSelector(selectModalState, (state: ICategoryModalState) => state.isOpen);

export const selectModalMode = createSelector(selectModalState, (state: ICategoryModalState) => state.mode);

export const selectModalStatus = createSelector(selectModalState, (state: ICategoryModalState) => state.status);

export const selectModalError = createSelector(selectModalState, (state: ICategoryModalState) => state.error);
