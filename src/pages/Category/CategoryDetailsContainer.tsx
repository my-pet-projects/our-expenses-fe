import { Alert, Modal, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ApplicationError, Category } from 'src/models';
import { RootState } from 'src/store';
import { fetchCancel, fetchCategories } from 'src/store/categories/actions';
import { hideCategoryForm, saveCategory, selectCategory, showCategoryForm } from 'src/store/category/actions';
import { ICategoryModalState } from 'src/store/category/reducers';

import { CategoryForm, CategoryHeader, CategoryModalType, CategoryUsages } from './components';

import './CategoryDetailsContainer.scss';

const { confirm } = Modal;

interface PropsFromState {
    isLoading: boolean;
    category: Category | null;
    error: ApplicationError | null;
    modalData: ICategoryModalState;
}

interface PropsFromDispatch {
    fetchCategories: () => Promise<void>;
    fetchCancel: () => Promise<void>;
    selectCategory: (id: string) => Promise<void>;
    saveCategory: (category: Category) => Promise<void>;
    showCategoryForm: (category: Category | null, mode: CategoryModalType) => Promise<void>;
    hideCategoryForm: () => Promise<void>;
}

interface CategoryDetailsProps {
    onCancel: () => void;
    onCategoryReset: () => void;
}

type CategoryDetailsContainerProps = PropsFromState & PropsFromDispatch & CategoryDetailsProps;

const CategoryDetailsContainer = (props: CategoryDetailsContainerProps): JSX.Element => {
    const { id: categoryId } = useParams<{ id: string }>();
    const {
        isLoading,
        category,
        error,
        selectCategory,
        saveCategory,
        showCategoryForm,
        hideCategoryForm,
        modalData,
        onCategoryReset
    } = props;

    useEffect(() => {
        selectCategory(categoryId);
    }, [categoryId, selectCategory]);

    const handleSaveCategory = async (category: Category): Promise<void> => {
        await saveCategory(category);
    };

    const showCreateModal = (): void => {
        showCategoryForm(category, CategoryModalType.Create);
    };

    const showEditModal = (): void => {
        if (!category) {
            return;
        }
        showCategoryForm(category, CategoryModalType.Edit);
    };

    const showDeleteModal = (): void => {
        confirm({
            title: 'Are you sure delete this task?',
            // icon: <ExclamationCircleOutlined />,
            content: <CategoryUsages categories={[]} onSelect={showCreateModal} />,
            okText: 'Yes',
            okType: 'danger',
            okButtonProps: {
                disabled: true
            },
            cancelText: 'No',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    };

    const handleCancel = (): void => {
        hideCategoryForm();
    };

    return (
        <>
            <div className="categories-title-wrap">
                <Skeleton loading={isLoading} active title={true} paragraph={{ rows: 2 }}>
                    {!error && (
                        <>
                            <CategoryHeader
                                category={category}
                                onCategoryCreate={showCreateModal}
                                onCategoryEdit={showEditModal}
                                onCategoryDelete={showDeleteModal}
                                onCategoryReset={onCategoryReset}
                            />
                        </>
                    )}

                    <Modal
                        title={modalData.mode === CategoryModalType.Create ? 'Create a new category' : 'Edit category'}
                        visible={modalData.isOpen}
                        onCancel={handleCancel}
                        footer={<></>}
                    >
                        <CategoryForm
                            isProcessing={modalData.isProcessing}
                            category={modalData.category}
                            onCancel={handleCancel}
                            onSave={handleSaveCategory}
                        />
                        {modalData.error && !modalData.isProcessing && (
                            <Alert
                                message={modalData.error.message}
                                description={modalData.error.description}
                                type="error"
                                showIcon
                            />
                        )}
                    </Modal>
                </Skeleton>

                <Modal>
                    <CategoryUsages
                        categories={[]}
                        onSelect={(): void => {
                            console.log('asd');
                        }}
                    />
                </Modal>

                {error && <Alert message={error.message} description={error.description} type="error" showIcon />}
            </div>
        </>
    );
};

const mapStateToProps = ({ selectedCategory: selectedCategoryState }: RootState): PropsFromState => ({
    isLoading: selectedCategoryState.isLoading,
    error: selectedCategoryState.error,
    category: selectedCategoryState.category,
    modalData: selectedCategoryState.modalData
});

const mapDispatchToProps = {
    fetchCategories: fetchCategories,
    fetchCancel: fetchCancel,
    selectCategory: selectCategory,
    saveCategory: saveCategory,
    showCategoryForm: showCategoryForm,
    hideCategoryForm: hideCategoryForm
};

const enhance = connect(mapStateToProps, mapDispatchToProps);
export default enhance(CategoryDetailsContainer);
