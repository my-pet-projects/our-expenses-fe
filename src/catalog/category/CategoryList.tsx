import { PlusOutlined } from '@ant-design/icons';
import { Alert, Button, Card, List } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchCancel, fetchCategories, showNewCategoryModal } from 'src/catalog/category/state/actions';
import {
    selectCategories,
    selectCategoriesError,
    selectCategoriesIsLoading,
    selectCategory
} from 'src/catalog/category/state/selectors';
import { SvgIcon } from 'src/common/components';
import { Category } from 'src/models';

import './CategoryList.scss';

export const CategoryList = (): JSX.Element => {
    const navigate = useNavigate();
    const { id: categoryId } = useParams();
    const rootCategory = useSelector(selectCategory);
    const categories = useSelector(selectCategories);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const error = useSelector(selectCategoriesError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories(categoryId));
        return (): void => {
            dispatch(fetchCancel());
        };
    }, [dispatch, categoryId]);

    const sortedCategories = ([] as Category[])
        .concat(categories || [])
        .sort((a: Category, b: Category) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

    const handleCategorySelect = (category: Category): void => {
        navigate(`/categories/${category.id}`);
    };

    const handleCategoryCreate = (): void => {
        dispatch(showNewCategoryModal(rootCategory));
    };

    return (
        <div className="category-list">
            {!error && (
                <List
                    rowKey="id"
                    grid={{
                        gutter: 16,
                        xs: 2,
                        sm: 4,
                        md: 6,
                        lg: 6,
                        xl: 8,
                        xxl: 8
                    }}
                    loading={isLoading}
                    dataSource={[{} as Category, ...sortedCategories]}
                    renderItem={(category: Category): JSX.Element => {
                        if (category && category.id) {
                            return (
                                <List.Item>
                                    <Card
                                        hoverable
                                        bordered={true}
                                        className="category-list__category-card"
                                        bodyStyle={{
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        onClick={(): void => handleCategorySelect(category)}
                                    >
                                        <Card.Meta
                                            avatar={<SvgIcon svgString={category.icon} />}
                                            title={category.name}
                                            className="category-list__category-card__meta"
                                        />
                                    </Card>
                                </List.Item>
                            );
                        }
                        return (
                            <List.Item>
                                <Button
                                    type="dashed"
                                    className="category-list__create-button"
                                    onClick={handleCategoryCreate}
                                >
                                    <PlusOutlined /> New category
                                </Button>
                            </List.Item>
                        );
                    }}
                />
            )}

            {error && <Alert message={error.message} description={error.description} type="error" showIcon />}
        </div>
    );
};
