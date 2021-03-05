import { Alert, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { ApplicationError, Category } from 'src/models';
import { RootState } from 'src/store';
import { fetchCancel, fetchCategories } from 'src/store/categories/actions';

import { CategoryList } from './components';

interface PropsFromState {
    isLoading: boolean;
    categories: Category[];
    error?: ApplicationError;
}

interface PropsFromDispatch {
    fetchCategories: (categoryId?: string) => Promise<void>;
    fetchCancel: () => Promise<void>;
}

interface CategoriesProps {
    selectedCategoryId: string;
    onCategorySelect: (category: Category) => void;
}

type CategoriesContainerProps = PropsFromState & PropsFromDispatch & CategoriesProps;

const CategoriesContainer = (props: CategoriesContainerProps): JSX.Element => {
    const { categories, selectedCategoryId, isLoading, error, fetchCategories, fetchCancel, onCategorySelect } = props;

    useEffect(() => {
        fetchCategories(selectedCategoryId);
        return (): void => {
            fetchCancel();
        };
    }, [fetchCancel, fetchCategories, selectedCategoryId]);

    return (
        <>
            <Skeleton loading={isLoading} active title={true} paragraph={{ rows: 20 }} />
            {!error && !isLoading && <CategoryList categories={categories} onSelect={onCategorySelect} />}
            {error && <Alert message={error.message} description={error.description} type="error" showIcon />}
        </>
    );
};

const mapStateToProps = ({ categories: categoriesState }: RootState): PropsFromState => ({
    isLoading: categoriesState.isLoading,
    error: categoriesState.error,
    categories: categoriesState.categories
});

const mapDispatchToProps = {
    fetchCategories: fetchCategories,
    fetchCancel: fetchCancel
};

const enhance = connect(mapStateToProps, mapDispatchToProps);
export default enhance(CategoriesContainer);
