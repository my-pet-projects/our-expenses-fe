import { AppstoreFilled, DeleteOutlined, EditOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, PageHeader } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { Category } from 'src/models';

import { Icon } from './Icon';

import './CategoryHeader.scss';

type CategoryHeaderProps = {
    category: Category | null;
    onCategoryEdit: (category: Category) => void;
    onCategoryDelete: (category: Category) => void;
    onCategoryCreate: (category?: Category) => void;
    onCategoryReset: () => void;
};

export const CategoryHeader = (props: CategoryHeaderProps): JSX.Element => {
    const { category, onCategoryEdit, onCategoryCreate, onCategoryDelete, onCategoryReset } = props;

    const parentCategories = ([] as Category[])
        .concat(category?.parents || [])
        .sort((a: Category, b: Category) => (a.level > b.level ? 1 : -1));

    const extraBreadcrumbItems = parentCategories.map((category: Category) => (
        <Breadcrumb.Item key={category.id}>
            <Link to={category.id}>{category.name}</Link>
        </Breadcrumb.Item>
    ));

    const currentBreadcrumbItems = category && (
        <Breadcrumb.Item key={category.id}>
            <Link to={category.id}>{category?.name}</Link>
        </Breadcrumb.Item>
    );

    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/">
                <HomeOutlined />
            </Link>
        </Breadcrumb.Item>,
        <Breadcrumb.Item key="categories">
            <Link to="/categories" onClick={onCategoryReset}>
                Categories catalog
            </Link>
        </Breadcrumb.Item>
    ]
        .concat(extraBreadcrumbItems)
        .concat(currentBreadcrumbItems || []);

    const renderCatalogHeader = (): JSX.Element => (
        <PageHeader
            title="Category catalog"
            className="catalog-header"
            extra={[
                <Button key="1" onClick={(): void => onCategoryCreate()}>
                    <PlusOutlined />
                    Create
                </Button>
            ]}
            avatar={{
                className: 'header-avatar',
                icon: <AppstoreFilled style={{ color: '#808080' }} />
            }}
        ></PageHeader>
    );

    const renderCategoryHeader = (category: Category): JSX.Element => (
        <PageHeader
            title={category.name}
            className="catalog-header"
            extra={[
                <Button key="1" onClick={(): void => onCategoryEdit(category)} type="primary">
                    <EditOutlined />
                    Edit
                </Button>,
                <Button key="2" onClick={(): void => onCategoryCreate(category)}>
                    <PlusOutlined />
                    Create
                </Button>,
                <Button key="3" onClick={(): void => onCategoryDelete(category)} danger>
                    <DeleteOutlined />
                    Delete
                </Button>
            ]}
            avatar={{
                className: 'header-avatar',
                icon: <Icon className="category-title-icon" name={'bread'} />
            }}
        ></PageHeader>
    );

    return (
        <>
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
            {category ? renderCategoryHeader(category) : renderCatalogHeader()}
        </>
    );
};
