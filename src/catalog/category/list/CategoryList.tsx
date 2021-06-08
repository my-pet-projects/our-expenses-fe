import { Alert, Card, Col, Row, Skeleton } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { fetchCancel, fetchCategories } from 'src/catalog/category/state/actions';
import {
    selectCategories,
    selectCategoriesError,
    selectCategoriesIsLoading
} from 'src/catalog/category/state/selectors';
import { Icon } from 'src/common/components';
import { Category } from 'src/models';

import './CategoryList.scss';

export const CategoryList = (): JSX.Element => {
    const history = useHistory();
    const { id: categoryId } = useParams<{ id: string }>();
    const categories = useSelector(selectCategories);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const error = useSelector(selectCategoriesError);
    const dispatch = useDispatch();

    const onCategorySelect = (category: Category): void => {
        history.push(`/categories/${category.id}`);
    };

    useEffect(() => {
        dispatch(fetchCategories(categoryId));
        return (): void => {
            dispatch(fetchCancel());
        };
    }, [dispatch, categoryId]);

    const sortedCategories = ([] as Category[])
        .concat(categories || [])
        .sort((a: Category, b: Category) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

    return (
        <div className="categories-wrap">
            <Skeleton loading={isLoading} active title={true} paragraph={{ rows: 20 }} />
            {!error && !isLoading && (
                <Row gutter={[16, 16]}>
                    {sortedCategories.map((category: Category, categoryIndex: number) => (
                        <Col key={categoryIndex} span={3}>
                            <div className="category-card-wrap">
                                <Card
                                    hoverable
                                    bordered={true}
                                    className="category-card"
                                    bodyStyle={{ height: '100%' }}
                                    onClick={(): void => onCategorySelect(category)}
                                >
                                    <div className="category-card-body">
                                        <div className="category-card-icon">
                                            <Icon name={category.icon} fill="gray" width="24" />
                                        </div>
                                        <div className="category-card-title">
                                            <div className="category-card-title-overflow">{category.name}</div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}

            {error && <Alert message={error.message} description={error.description} type="error" showIcon />}
        </div>
    );
};
