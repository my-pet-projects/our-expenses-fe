import { Alert, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ApplicationError, Category } from 'src/models';
import { RootState } from 'src/store';
import { fetchCancel, fetchCategories } from 'src/store/categories/actions';
import { saveCategory, selectCategory, showCategoryForm } from 'src/store/category/actions';
import { CategoryTitle } from './components';

interface PropsFromState {
    isLoading: boolean;
    isProcessing: boolean;
    category: Category | null;
    error: ApplicationError | null;
    isCategoryFormVisible: boolean;
}

interface PropsFromDispatch {
    fetchCategories: () => Promise<void>;
    fetchCancel: () => Promise<void>;
    selectCategory: (id: string) => Promise<void>;
    saveCategory: (category: Category) => Promise<void>;
    showCategoryForm: (isVisible: boolean) => Promise<void>;
}

interface CategoryDetailsProps {
    onCancel: () => void;
}

type CategoryDetailsContainerProps = PropsFromState & PropsFromDispatch & CategoryDetailsProps;

const CategoryDetailsContainer = (props: CategoryDetailsContainerProps): JSX.Element => {
    const { id: categoryId } = useParams<{ id: string }>();
    const { isLoading, isProcessing, category, error, selectCategory, saveCategory, onCancel } = props;

    useEffect(() => {
        if (categoryId) {
            selectCategory(categoryId);
        }
    }, [categoryId, selectCategory]);

    const handleSaveCategory = async (category: Category): Promise<void> => {
        await saveCategory(category);
    };

    return (
        <>
            <Skeleton loading={isLoading} active title={true} paragraph={{ rows: 2 }} />
            {!error && !isLoading && (
                <>
                    <CategoryTitle category={category} />
                </>
            )}

            {error && !isProcessing && (
                <Alert message={error.message} description={error.description} type="error" showIcon />
            )}

            {/* <Card
                size="default"
                title="Edit category"
                type="inner"
                bordered={true}
                extra={<Button type="link" block></Button>}
            >
                <Skeleton loading={isLoading} active title={true} paragraph={{ rows: 2 }} />
                {!error && !isLoading && (
                    <CategoryForm
                        isProcessing={isProcessing}
                        category={category}
                        onCancel={onCancel}
                        onCategorySave={handleSaveCategory}
                    />
                )}

                {error && !isProcessing && (
                    <Alert message={error.message} description={error.description} type="error" showIcon />
                )}
            </Card> */}
        </>
    );
};

const mapStateToProps = ({ selectedCategory: selectedCategoryState }: RootState): PropsFromState => ({
    isLoading: selectedCategoryState.isLoading,
    isProcessing: selectedCategoryState.isProcessing,
    error: selectedCategoryState.error,
    category: selectedCategoryState.category,
    isCategoryFormVisible: selectedCategoryState.isCategoryFormVisible
});

const mapDispatchToProps = {
    fetchCategories: fetchCategories,
    fetchCancel: fetchCancel,
    selectCategory: selectCategory,
    saveCategory: saveCategory,
    showCategoryForm: showCategoryForm
};

const enhance = connect(mapStateToProps, mapDispatchToProps);
export default enhance(CategoryDetailsContainer);
