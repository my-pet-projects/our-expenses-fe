import { Avatar, List } from 'antd';
import React from 'react';

import { Category } from 'src/models';

import './CategoryList.scss';

type CategoryListProps = {
    categories: Category[];
    selectedCategoryId: string;
    onSelect: (category: Category) => void;
};

export const CategoryList = (props: CategoryListProps): JSX.Element => {
    const { categories, selectedCategoryId, onSelect } = props;

    const sortedCategories = ([] as Category[])
        .concat(categories || [])
        .sort((a: Category, b: Category) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

    return (
        <List
            className="category-list"
            itemLayout="horizontal"
            dataSource={sortedCategories}
            renderItem={(category: Category): React.ReactNode => (
                <List.Item
                    className={category.id === selectedCategoryId ? 'active' : ''}
                    onClick={(): void => onSelect(category)}
                >
                    <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={category.name}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
            )}
        />
    );
};
