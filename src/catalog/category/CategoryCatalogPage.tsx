import { CategoryHeader } from './CategoryHeader';
import { CategoryList } from './CategoryList';
import { CategoryFormModal, CategoryMoveModal, DeleteConfirmationModal } from './modals';

export const CategoriesPage = (): JSX.Element => (
    <>
        <article>
            <CategoryHeader />
            <CategoryList />
        </article>

        <DeleteConfirmationModal />
        <CategoryFormModal />
        <CategoryMoveModal />
    </>
);
