import { createSelector } from 'reselect';

import { RootState } from '../../app.store.types';
import { ICategoryState } from '../reducers';

const selectCategoryState = (rootState: RootState): ICategoryState => rootState.selectedCategory;

export const selectCategory = createSelector(selectCategoryState, (state: ICategoryState) => state.category);

export const selectCategoryIsLoading = createSelector(selectCategoryState, (state: ICategoryState) => state.isLoading);

export const selectCategoryError = createSelector(selectCategoryState, (state: ICategoryState) => state.error);
