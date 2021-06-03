import { Category } from 'src/models';

interface CategoryUsagesProps {
    category: Category;
    categories: Category[];
}

export const CategoryUsages = (props: CategoryUsagesProps): JSX.Element => {
    const { category, categories } = props;

    // useEffect(() => {
    //     if (!category) {
    //         return;
    //     }
    //     dispatch(fetchCategoryUsages(category));
    // }, [category, dispatch]);

    // console.log('category usages component');
    // const sortedCategories = ([] as Category[])
    //     .concat(categories || [])
    //     .sort((a: Category, b: Category) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

    return (
        <div>
            <strong>{category.name}</strong> has following children:
            {JSON.stringify(categories)}
        </div>
    );
};
