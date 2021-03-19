import { Row } from 'antd';
import React from 'react';

import { Category } from 'src/models';

type CategoryUsagesProps = {
    categories: Category[];
    onSelect: (category: Category) => void;
};

export const CategoryUsages = (props: CategoryUsagesProps): JSX.Element => {
    const { categories, onSelect } = props;

    console.log('category usages component');

    const sortedCategories = ([] as Category[])
        .concat(categories || [])
        .sort((a: Category, b: Category) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

    return <Row gutter={[16, 16]}>{JSON.stringify(categories)}</Row>;
};
