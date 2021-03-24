import { DeleteOutlined, StopOutlined } from '@ant-design/icons';
import { Alert, Button, Modal, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Category } from 'src/models';
import { hideCategoryForm, processCategoryDelete } from 'src/store/category/actions';
import {
    selectModalCategoryUsagesPayload,
    selectModalError,
    selectModalIsLoading,
    selectModalIsOpen,
    selectModalIsProcessing,
    selectModalMode,
    selectModalStatus
} from 'src/store/category/selectors';

import { CategoryUsages } from './CategoryUsages';

export const DeleteConfirmationModal = (): JSX.Element => {
    const modalPayload = useSelector(selectModalCategoryUsagesPayload);
    const isOpen = useSelector(selectModalIsOpen);
    const isProcessing = useSelector(selectModalIsProcessing);
    const isLoading = useSelector(selectModalIsLoading);
    const mode = useSelector(selectModalMode);
    const status = useSelector(selectModalStatus);
    const error = useSelector(selectModalError);
    const dispatch = useDispatch();

    if (mode !== 'delete') {
        return <></>;
    }

    if (status === 'finished') {
        if (!modalPayload.category.parents) {
            return <Redirect to={'/categories'} />;
        }
        const nearestParent = modalPayload.category.parents.sort((a: Category, b: Category) =>
            a.level < b.level ? 1 : -1
        );

        if (nearestParent) {
            return <Redirect to={`/categories/${nearestParent[0].id}`} />;
        }
    }

    const handleDeleteCategory = async (): Promise<void> => {
        dispatch(processCategoryDelete(modalPayload.category));
    };

    const handleCancel = (): void => {
        dispatch(hideCategoryForm());
    };

    return (
        <>
            <Modal
                title="Delete category"
                visible={isOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" icon={<StopOutlined />} onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={handleDeleteCategory}
                        loading={isLoading || isProcessing}
                        disabled={isLoading || isProcessing || !!error}
                    >
                        Delete
                    </Button>
                ]}
            >
                <Spin tip="Looking for usages ..." style={{ width: '100%' }} spinning={isLoading} />

                {modalPayload && !error && !isLoading && (
                    <div>
                        Are you sure you want to delete <strong>{modalPayload.category.name}</strong> category?
                    </div>
                )}

                {modalPayload && !error && !isLoading && modalPayload.categories.length !== 0 && (
                    <CategoryUsages category={modalPayload.category} categories={modalPayload.categories} />
                )}

                {error && !isProcessing && (
                    <Alert message={error.message} description={error.description} type="error" showIcon />
                )}
            </Modal>
        </>
    );
};
