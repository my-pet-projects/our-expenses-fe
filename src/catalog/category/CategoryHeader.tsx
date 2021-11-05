import { AppstoreOutlined, ArrowUpOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
    fetchCategory,
    showDeleteModal,
    showEditCategoryModal,
    showMoveCategoryModal
} from 'src/catalog/category/state/actions';
import { selectCategory, selectCategoryError, selectCategoryIsLoading } from 'src/catalog/category/state/selectors';
import { AppHeader, BreadcrumbData, SvgIcon } from 'src/common/components';
import { Category } from 'src/models';

export const CategoryHeader = (): JSX.Element => {
    const { id: categoryId } = useParams();
    const category = useSelector(selectCategory);
    const isLoading = useSelector(selectCategoryIsLoading);
    const error = useSelector(selectCategoryError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategory(categoryId));
    }, [categoryId, dispatch]);

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

    const prepareBreadcrumbsData = (): BreadcrumbData[] => {
        const breadcrumbs = [{ title: 'Categories catalog', url: '/categories' } as BreadcrumbData];
        if (!category) {
            return breadcrumbs;
        }

        (category.parents || [])
            .sort((a: Category, b: Category) => (a.level > b.level ? 1 : -1))
            .map((category: Category) =>
                breadcrumbs.push({
                    title: category.name,
                    url: `/categories/${category.id}`
                })
            );

        breadcrumbs.push({
            title: category.name,
            url: `/categories/${category.id}`
        });

        return breadcrumbs;
    };

    return (
        <>
            {category && (
                <AppHeader
                    title={category.name}
                    icon={category.icon ? <SvgIcon svgString={category.icon} /> : null}
                    breadcrumbs={prepareBreadcrumbsData()}
                    extra={[
                        <Button key="edit" onClick={handleShowEditModal} type="primary">
                            <EditOutlined />
                            Edit
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
                    isLoading={isLoading}
                    error={error}
                />
            )}
            {!category && (
                <AppHeader
                    title={'Categories catalog'}
                    icon={<AppstoreOutlined />}
                    breadcrumbs={prepareBreadcrumbsData()}
                />
            )}
        </>
    );
};
