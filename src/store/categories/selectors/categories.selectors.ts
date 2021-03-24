import { createSelector } from 'reselect';

import { RootState } from '../../app.store.types';
import { ICategoriesState } from '../reducers';

const selectCategoriesState = (rootState: RootState): ICategoriesState => rootState.categories;

export const selectCategories = createSelector(selectCategoriesState, (state: ICategoriesState) => state.categories);

export const selectCategoriesIsLoading = createSelector(
    selectCategoriesState,
    (state: ICategoriesState) => state.isLoading
);

export const selectCategoriesError = createSelector(selectCategoriesState, (state: ICategoriesState) => state.error);
