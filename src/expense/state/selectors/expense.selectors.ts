import { createSelector } from 'reselect';

import { IExpenseState } from 'src/expense/state/reducers';
import { Category, TreeNode } from 'src/models';
import { RootState } from 'src/RootState';

const selectExpenseState = (rootState: RootState): IExpenseState => rootState.expense;

export const selectExpense = createSelector(selectExpenseState, (state: IExpenseState) => state.expense);

export const selectIsLoading = createSelector(selectExpenseState, (state: IExpenseState) => state.isLoading);

export const selectError = createSelector(selectExpenseState, (state: IExpenseState) => state.error);

export const selectCategoriesCatalog = createSelector(selectExpenseState, (state: IExpenseState) => {
    const allCategories = state.categories.sort((a: Category, b: Category) => (a.path > b.path ? 1 : -1));

    const nodes = [] as TreeNode[];

    const currentParentHierarchy: Record<string, TreeNode> = {};

    for (let index = 0; index < allCategories.length; index++) {
        const category = allCategories[index];
        const currentNode = {
            key: category.id,
            value: category.id,
            title: category.name,
            children: []
        } as TreeNode;

        if (currentParentHierarchy[category.parentId]) {
            currentParentHierarchy[category.parentId].disabled = true;
            currentParentHierarchy[category.parentId].children.push(currentNode);
            currentParentHierarchy[category.id] = currentNode;
            continue;
        }

        currentParentHierarchy[category.id] = currentNode;
        nodes.push(currentNode);
    }

    return nodes;
});

export const selectRecentExpenses = createSelector(selectExpenseState, (state: IExpenseState) => state.recentlyAdded);
