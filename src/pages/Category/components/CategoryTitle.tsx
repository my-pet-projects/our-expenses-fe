import Title from 'antd/lib/typography/Title';
import React from 'react';

import { Category } from 'src/models';

import { Icon } from './Icon';

import './CategoryTitle.scss';

type CategoryTitleProps = {
    category: Category | null;
};

export const CategoryTitle = (props: CategoryTitleProps): JSX.Element => {
    const { category } = props;

    return (
        <>
            <div>
                <Title level={2} className="category-title">
                    <Icon className="category-title-icon" name={'bread'} />
                    {category?.name}
                </Title>
                {category?.path}
            </div>
        </>
    );
};
