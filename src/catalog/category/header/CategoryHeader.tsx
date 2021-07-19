import { ArrowUpOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Alert, Button, PageHeader, Skeleton } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
    fetchCategory,
    showDeleteModal,
    showEditCategoryModal,
    showMoveCategoryModal,
    showNewCategoryModal
} from 'src/catalog/category/state/actions';
import { selectCategory, selectCategoryError, selectCategoryIsLoading } from 'src/catalog/category/state/selectors';
import { SvgIcon } from 'src/common/components';

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

    const handleShowMoveModal = (): void => {
        if (!category) {
            return;
        }
        dispatch(showMoveCategoryModal(category));
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
                        {category && (
                            <PageHeader
                                title={category.name}
                                className="catalog-header"
                                extra={[
                                    <Button key="edit" onClick={handleShowEditModal} type="primary">
                                        <EditOutlined />
                                        Edit
                                    </Button>,
                                    <Button key="create" onClick={handleShowCreateModal}>
                                        <PlusOutlined />
                                        Create
                                    </Button>,
                                    <Button key="move" onClick={handleShowMoveModal}>
                                        <ArrowUpOutlined />
                                        Move
                                    </Button>,
                                    <Button key="delete" onClick={handleShowDeleteModal} danger>
                                        <DeleteOutlined />
                                        Delete
                                    </Button>
                                ]}
                                avatar={{
                                    className: 'header-avatar',
                                    icon: <SvgIcon className="category-title-icon" svgString={'bread'} />
                                }}
                            ></PageHeader>
                        )}

                        {!category && (
                            <PageHeader
                                title={'Category catalog'}
                                className="catalog-header"
                                extra={[
                                    <Button key="create" onClick={handleShowCreateModal}>
                                        <PlusOutlined />
                                        Create
                                    </Button>
                                ]}
                            ></PageHeader>
                        )}
                    </>
                )}

                {error && <Alert message={error.message} description={error.description} type="error" showIcon />}
            </div>
        </>
    );
};
