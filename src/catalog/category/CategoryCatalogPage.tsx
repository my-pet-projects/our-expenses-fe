import { CategoryHeader } from './header/CategoryHeader';
import { CategoryList } from './list/CategoryList';
import { CategoryFormModal, CategoryMoveModal, DeleteConfirmationModal } from './modals';

export const CategoriesPage = (): JSX.Element => (
    <>
        <CategoryHeader />
        <CategoryList />

        <DeleteConfirmationModal />
        <CategoryFormModal />
        <CategoryMoveModal />
    </>
);
