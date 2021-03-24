import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import { Category } from 'src/models';

type CategoryHeaderBreadcrumbsProps = {
    currentCategory?: Category;
    parentCategories?: Category[];
};

export const CategoryHeaderBreadcrumbs = (props: CategoryHeaderBreadcrumbsProps): JSX.Element => {
    const { currentCategory, parentCategories } = props;

    const parentBreadcrumbItems = (parentCategories || [])
        .sort((a: Category, b: Category) => (a.level > b.level ? 1 : -1))
        .map((category: Category) => (
            <Breadcrumb.Item key={category.id}>
                <Link to={category.id}>{category.name}</Link>
            </Breadcrumb.Item>
        ));

    const currentBreadcrumbItem = currentCategory && (
        <Breadcrumb.Item key={currentCategory.id}>
            <Link to={currentCategory.id}>{currentCategory.name}</Link>
        </Breadcrumb.Item>
    );

    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/">
                <HomeOutlined />
            </Link>
        </Breadcrumb.Item>,
        <Breadcrumb.Item key="categories">
            <Link to="/categories">Categories catalog</Link>
        </Breadcrumb.Item>
    ]
        .concat(parentBreadcrumbItems)
        .concat(currentBreadcrumbItem || []);

    return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
};
