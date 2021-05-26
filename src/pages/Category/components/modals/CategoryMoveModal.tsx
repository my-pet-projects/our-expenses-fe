import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { Alert, Button, Modal, Spin, Tree } from 'antd';
import { DataNode, EventDataNode } from 'antd/lib/tree';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { hideCategoryForm, processCategoryMove } from 'src/store/category/actions';
import {
    selectAllCategories,
    selectModalCategoryMovePayload,
    selectModalError,
    selectModalIsLoading,
    selectModalIsOpen,
    selectModalIsProcessing,
    selectModalMode,
    selectModalStatus
} from 'src/store/category/selectors';

type AntdTreeSelectInfo = {
    event: 'select';
    selected: boolean;
    node: EventDataNode;
    selectedNodes: DataNode[];
    nativeEvent: MouseEvent;
};

export const CategoryMoveModal = (): JSX.Element => {
    const history = useHistory();
    const [selectedNode, setSelectedNode] = useState<DataNode | null>(null);
    const modalPayload = useSelector(selectModalCategoryMovePayload);
    const allCategories = useSelector(selectAllCategories);
    const isOpen = useSelector(selectModalIsOpen);
    const isProcessing = useSelector(selectModalIsProcessing);
    const isLoading = useSelector(selectModalIsLoading);
    const mode = useSelector(selectModalMode);
    const status = useSelector(selectModalStatus);
    const error = useSelector(selectModalError);
    const dispatch = useDispatch();

    if (mode !== 'move') {
        return <></>;
    }

    if (status === 'finished') {
        // do a force reload
        history.push('/');
        setTimeout(() => history.push(`/categories/${modalPayload.category.id}`));
        dispatch(hideCategoryForm());
        return <></>;
    }

    const handleMoveCategory = async (): Promise<void> => {
        if (!selectedNode) {
            return;
        }
        const destinationId = selectedNode.key as string;
        dispatch(processCategoryMove(modalPayload.category, destinationId));
        setSelectedNode(null);
    };

    const handleCancel = (): void => {
        dispatch(hideCategoryForm());
        setSelectedNode(null);
    };

    const onSelect = (selectedKeys: React.Key[], info: AntdTreeSelectInfo): void => {
        if (!selectedKeys || selectedKeys.length === 0) {
            setSelectedNode(null);
            return;
        }

        const selectedNode = info.selectedNodes[0];
        if (selectedNode.key === modalPayload.category.id) {
            setSelectedNode(null);
            return;
        }
        setSelectedNode(selectedNode);
    };

    return (
        <Modal
            title="Move category"
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
                    onClick={handleMoveCategory}
                    loading={isLoading || isProcessing}
                    disabled={isLoading || isProcessing || !!error || !selectedNode}
                >
                    Move
                </Button>
            ]}
        >
            <Spin tip="Fetching categories tree ..." style={{ width: '100%' }} spinning={isLoading} />

            {modalPayload && !error && !isLoading && (
                <div>
                    <h4>Please choose destination category</h4>

                    <Tree
                        height={350}
                        style={{ width: '100%' }}
                        showLine={true}
                        showIcon={false}
                        defaultExpandedKeys={[modalPayload.category.id]}
                        defaultSelectedKeys={[modalPayload.category.id]}
                        treeData={allCategories}
                        onSelect={onSelect}
                    />

                    {selectedNode && (
                        <div>
                            Move category under <strong>{selectedNode.title}</strong>?
                        </div>
                    )}
                </div>
            )}
            {error && !isProcessing && (
                <Alert message={error.message} description={error.description} type="error" showIcon />
            )}
        </Modal>
    );
};
