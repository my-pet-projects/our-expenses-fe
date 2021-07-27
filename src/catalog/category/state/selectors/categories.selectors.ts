import { createSelector } from 'reselect';

import { Category, TreeNode } from 'src/models';
import { RootState } from 'src/RootState';

import { ICategoriesState } from '../reducers';

const selectCategoriesState = (rootState: RootState): ICategoriesState => rootState.categories;

export const selectCategories = createSelector(selectCategoriesState, (state: ICategoriesState) => state.categories);

export const selectCategoriesIsLoading = createSelector(
    selectCategoriesState,
    (state: ICategoriesState) => state.isLoading
);

export const selectCategoriesError = createSelector(selectCategoriesState, (state: ICategoriesState) => state.error);

export const selectCategoriesHierarchy = createSelector(selectCategoriesState, (state: ICategoriesState) => {
    const allCategories = state.categories.sort((a: Category, b: Category) => (a.path > b.path ? 1 : -1));

    const nodes = [] as TreeNode[];

    const currentParentHierarchy: Record<string, TreeNode> = {};

    for (let index = 0; index < allCategories.length; index++) {
        const category = allCategories[index];
        const currentNode = {
            value: category.id,
            title: category.name,
            children: []
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any;

        if (currentParentHierarchy[category.parentId]) {
            currentParentHierarchy[category.parentId].children.push(currentNode);
            currentParentHierarchy[category.id] = currentNode;
            continue;
        }

        currentParentHierarchy[category.id] = currentNode;
        nodes.push(currentNode);
    }

    const rootNode = {
        value: 'root',
        title: 'Catalog',
        children: nodes
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    return [rootNode];
});
