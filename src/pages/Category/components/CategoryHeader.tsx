import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Alert, Button, PageHeader, Skeleton } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Icon } from 'src/core/components/Icon';
import {
    fetchCategory,
    showDeleteModal,
    showEditCategoryModal,
    showNewCategoryModal
} from 'src/store/category/actions';
import { selectCategory } from 'src/store/category/selectors';
import { selectCategoryError, selectCategoryIsLoading } from 'src/store/category/selectors/category.selectors';

import { CategoryHeaderBreadcrumbs } from './CategoryHeaderBreadcrumbs';

import './CategoryHeader.scss';

export const CategoryHeader = (): JSX.Element => {
    const { id: categoryId } = useParams<{ id: string }>();
    const category = useSelector(selectCategory);
    const isLoading = useSelector(selectCategoryIsLoading);
    const error = useSelector(selectCategoryError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategory(categoryId));
    }, [categoryId, dispatch]);

    const handleShowCreateModal = (): void => {
        dispatch(showNewCategoryModal(category));
    };

    const handleShowEditModal = (): void => {
        if (!category) {
            return;
        }
        dispatch(showEditCategoryModal(category));
    };

    const handleShowDeleteModal = (): void => {
        if (!category) {
            return;
        }
        dispatch(showDeleteModal(category));
    };

    return (
        <>
            <div className="categories-title-wrap">
                <Skeleton loading={isLoading} active title={true} paragraph={{ rows: 2 }} />

                {!error && !isLoading && (
                    <>
                        <CategoryHeaderBreadcrumbs currentCategory={category} parentCategories={category?.parents} />
                        <PageHeader
                            title={category ? category.name : 'Category catalog'}
                            className="catalog-header"
                            extra={[
                                <Button
                                    key="edit"
                                    onClick={handleShowEditModal}
                                    type="primary"
                                    style={{ display: category ? 'unset' : 'none' }}
                                >
                                    <EditOutlined />
                                    Edit
                                </Button>,
                                <Button key="create" onClick={handleShowCreateModal}>
                                    <PlusOutlined />
                                    Create
                                </Button>,
                                <Button
                                    key="delete"
                                    onClick={handleShowDeleteModal}
                                    danger
                                    style={{ display: category ? 'unset' : 'none' }}
                                >
                                    <DeleteOutlined />
                                    Delete
                                </Button>
                            ]}
                            avatar={{
                                className: 'header-avatar',
                                icon: <Icon className="category-title-icon" name={'bread'} />
                            }}
                        ></PageHeader>
                    </>
                )}

                {error && <Alert message={error.message} description={error.description} type="error" showIcon />}
            </div>
        </>
    );
};
