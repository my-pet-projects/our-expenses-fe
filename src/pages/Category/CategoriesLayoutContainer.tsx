import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { Category } from 'src/models';

import CategoriesContainer from './CategoriesContainer';
import CategoryDetailsContainer from './CategoryDetailsContainer';

const CategoriesLayoutContainer = (): JSX.Element => {
    const history = useHistory();
    const { id: selectedCategoryId } = useParams<{ id: string }>();

    const onCategorySelect = (category: Category): void => {
        history.push(`/categories/${category.id}`);
    };

    const onCategoryCancel = (): void => {
        history.push('/categories');
    };

    return (
        <>
            <CategoryDetailsContainer onCancel={onCategoryCancel} onCategoryReset={onCategoryCancel} />
            <CategoriesContainer selectedCategoryId={selectedCategoryId} onCategorySelect={onCategorySelect} />
        </>
    );
};

const enhance = connect();
export default enhance(CategoriesLayoutContainer);
