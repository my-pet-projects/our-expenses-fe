import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { Alert, Button, Modal } from 'antd';
import { ElementRef, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideCategoryForm, processCategorySave } from 'src/catalog/category/state/actions';
import {
    selectModalCategoryPayload,
    selectModalError,
    selectModalIsLoading,
    selectModalIsOpen,
    selectModalIsProcessing,
    selectModalMode
} from 'src/catalog/category/state/selectors';
import { Category } from 'src/models';

import { CategoryForm } from './CategoryForm';

type CategoryFormHandle = ElementRef<typeof CategoryForm>;

export const CategoryFormModal = (): JSX.Element => {
    const modalPayload = useSelector(selectModalCategoryPayload);
    const isOpen = useSelector(selectModalIsOpen);
    const isProcessing = useSelector(selectModalIsProcessing);
    const isLoading = useSelector(selectModalIsLoading);
    const mode = useSelector(selectModalMode);
    const error = useSelector(selectModalError);
    const dispatch = useDispatch();
    const formRef = useRef<CategoryFormHandle>(null);

    if (mode !== 'create' && mode !== 'edit') {
        return <></>;
    }

    const handleSaveCategory = (category: Category): void => {
        dispatch(processCategorySave(category));
    };

    const handleCancel = (): void => {
        dispatch(hideCategoryForm());
    };

    const handleSubmitForm = (): void => {
        formRef.current?.submit();
    };

    return (
        <>
            asd
            <Modal
                title={mode === 'create' ? 'Create a new category' : 'Edit category'}
                visible={isOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" icon={<StopOutlined />} onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={handleSubmitForm}
                        loading={isLoading || isProcessing}
                        disabled={isLoading || isProcessing || !!error}
                    >
                        Save
                    </Button>
                ]}
            >
                {modalPayload && !isLoading && (
                    <CategoryForm
                        isProcessing={isProcessing}
                        category={modalPayload.category}
                        submitForm={handleSubmitForm}
                        onSave={handleSaveCategory}
                        onCancel={handleCancel}
                        ref={formRef}
                    />
                )}

                {error && !isProcessing && (
                    <Alert message={error.message} description={error.description} type="error" showIcon />
                )}
            </Modal>
        </>
    );
};
