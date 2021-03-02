import { Divider } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { Category } from 'src/models';
import { RootState } from 'src/store';
import { hideCategoryForm, showCategoryForm } from 'src/store/category/actions';

import CategoriesContainer from './CategoriesContainer';
import CategoryDetailsContainer from './CategoryDetailsContainer';

interface PropsFromState {
    isCategoryFormVisible: boolean;
}

interface PropsFromDispatch {
    showCategoryForm: () => Promise<void>;
    hideCategoryForm: () => Promise<void>;
}

type CategoriesLayoutContainerProps = PropsFromState & PropsFromDispatch;

const CategoriesLayoutContainer = (props: CategoriesLayoutContainerProps): JSX.Element => {
    const history = useHistory();
    const { id: selectedCategoryId } = useParams<{ id: string }>();
    const { isCategoryFormVisible, showCategoryForm, hideCategoryForm } = props;

    useEffect(() => {
        if (selectedCategoryId && !isCategoryFormVisible) {
            showCategoryForm();
        }
        if (!selectedCategoryId && isCategoryFormVisible) {
            hideCategoryForm();
        }
    }, [selectedCategoryId, isCategoryFormVisible, showCategoryForm, hideCategoryForm]);

    const onCategorySelect = (category: Category): void => {
        history.push(`/categories/${category.id}`);
    };

    const onCategoryCancel = (): void => {
        history.push('/categories');
    };

    return (
        <>
            {selectedCategoryId && (
                <>
                    <CategoryDetailsContainer onCancel={onCategoryCancel} />
                    <Divider />
                </>
            )}
            <CategoriesContainer selectedCategoryId={selectedCategoryId} onCategorySelect={onCategorySelect} />
        </>
    );
};

const mapStateToProps = ({ selectedCategory: selectedCategoryState }: RootState): PropsFromState => ({
    isCategoryFormVisible: selectedCategoryState.isCategoryFormVisible
});

const mapDispatchToProps = {
    showCategoryForm: showCategoryForm,
    hideCategoryForm: hideCategoryForm
};

const enhance = connect(mapStateToProps, mapDispatchToProps);
export default enhance(CategoriesLayoutContainer);
