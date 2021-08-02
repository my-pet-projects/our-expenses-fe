import { createSelector } from 'reselect';

import { Category, TreeNode } from 'src/models';
import { RootState } from 'src/RootState';

import { ICategoryModalState, ICategoryMovePayload, ICategoryPayload, ICategoryUsagesPayload } from '../reducers';

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

export const selectModalCategoryMovePayload = createSelector(
    selectModalState,
    (state: ICategoryModalState) => state.payload as ICategoryMovePayload
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

export const selectAllCategories = createSelector(selectModalState, (state: ICategoryModalState) => {
    const payload = state.payload as ICategoryMovePayload;

    if (!payload || !payload.allCategories) {
        return [];
    }
    const allCategories = payload.allCategories.sort((a: Category, b: Category) => (a.path > b.path ? 1 : -1));

    const nodes = [] as TreeNode[];

    const currentParentHierarchy: Record<string, TreeNode> = {};

    for (let index = 0; index < allCategories.length; index++) {
        const category = allCategories[index];
        const currentNode = {
            key: category.id,
            value: category.name,
            title: category.name,
            children: []
        } as TreeNode;

        if (currentParentHierarchy[category.parentId]) {
            currentParentHierarchy[category.parentId].children.push(currentNode);
            currentParentHierarchy[category.id] = currentNode;
            continue;
        }

        currentParentHierarchy[category.id] = currentNode;
        nodes.push(currentNode);
    }

    const rootNode = {
        key: 'root',
        value: 'Catalog',
        title: 'Catalog',
        children: nodes
    } as TreeNode;

    return [rootNode];
});
