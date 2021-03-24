import { CategoryFormModal, CategoryHeader, CategoryList, DeleteConfirmationModal } from './components';

export const CategoriesPage = (): JSX.Element => (
    <>
        <CategoryHeader />
        <CategoryList />

        <DeleteConfirmationModal />
        <CategoryFormModal />
    </>
);
