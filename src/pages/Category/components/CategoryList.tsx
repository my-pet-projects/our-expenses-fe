import { Card, Col, Row } from 'antd';
import React from 'react';

import { Category } from 'src/models';

import { Icon } from './Icon';

import './CategoryList.scss';

type CategoryListProps = {
    categories: Category[];
    onSelect: (category: Category) => void;
};

export const CategoryList = (props: CategoryListProps): JSX.Element => {
    const { categories, onSelect } = props;

    const sortedCategories = ([] as Category[])
        .concat(categories || [])
        .sort((a: Category, b: Category) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

    return (
        <Row gutter={[16, 16]}>
            {sortedCategories.map((category: Category, categoryIndex: number) => (
                <Col key={categoryIndex} span={3}>
                    <Card
                        bordered={true}
                        className="category-card"
                        bodyStyle={{ height: '100%' }}
                        onClick={(): void => onSelect(category)}
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
                </Col>
            ))}
        </Row>
    );
};
