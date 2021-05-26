import {
    CategoryFormModal,
    CategoryHeader,
    CategoryList,
    CategoryMoveModal,
    DeleteConfirmationModal
} from './components';

export const CategoriesPage = (): JSX.Element => (
    <>
        <CategoryHeader />
        <CategoryList />

        <DeleteConfirmationModal />
        <CategoryFormModal />
        <CategoryMoveModal />
    </>
);
