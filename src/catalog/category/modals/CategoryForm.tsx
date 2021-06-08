import { EditOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useFormik } from 'formik';
import { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import * as Yup from 'yup';

import { Icon } from 'src/common/components';
import { Category } from 'src/models';

import './CategoryForm.scss';

interface CategoryFormValues {
    id: string;
    name: string;
    icon: string;
    parentId: string;
    path: string;
    level: number;
}

type CategoryFormProps = {
    isProcessing: boolean;
    category: Category | null;
    submitForm: () => void;
    onSave: (category: Category) => void;
    onCancel: () => void;
};

const layout = {
    labelCol: {
        xs: { span: 5 },
        sm: { span: 5 }
    },
    wrapperCol: {
        xs: { span: 19 },
        sm: { span: 19 }
    }
};

type CategoryFormHandle = {
    submit: () => void;
};

export const CategoryForm = forwardRef(
    (props: CategoryFormProps, ref: Ref<CategoryFormHandle>): JSX.Element => {
        const { category, onSave } = props;

        const formRef = useRef(null);
        useImperativeHandle(ref, () => ({
            submit: (): void => {
                formik.submitForm();
            }
        }));

        const handleSave = (category: Category): void => {
            onSave(category);
        };

        const formik = useFormik<CategoryFormValues>({
            enableReinitialize: true,
            initialValues: {
                id: category?.id || '',
                name: category?.name || '',
                icon: category?.icon || '',
                parentId: category?.parentId || '',
                path: category?.path || '',
                level: category?.level || 0
            },
            onSubmit: ({ id, name, icon, parentId, path, level }: CategoryFormValues) => {
                const categoryToSave = {
                    id: id,
                    name: name,
                    icon: icon,
                    parentId: parentId,
                    path: path,
                    level: level,
                    parents: category?.parents
                } as Category;

                try {
                    handleSave(categoryToSave);
                } catch (error) {
                    formik.setStatus(error);
                }
                formik.setSubmitting(false);
            },
            validationSchema: Yup.object().shape({
                name: Yup.string().max(50, 'Too Long!').required('Please input category name!')
            })
        });

        return (
            <>
                <Form {...layout} ref={formRef} onFinish={formik.handleSubmit}>
                    <Form.Item name="id" noStyle>
                        <Input type="hidden" value={formik.values.id} />
                    </Form.Item>

                    <Form.Item name="parentId" noStyle>
                        <Input type="hidden" value={formik.values.parentId} />
                    </Form.Item>

                    <Form.Item name="path" noStyle>
                        <Input type="hidden" value={formik.values.path} />
                    </Form.Item>

                    <Form.Item name="level" noStyle>
                        <Input type="hidden" value={formik.values.level} />
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        help={formik.touched.name && formik.errors.name}
                        hasFeedback={formik.touched.name && !!formik.errors.name}
                        validateStatus={formik.touched.name && formik.errors.name ? 'error' : 'success'}
                    >
                        <Input
                            prefix={<EditOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Category name"
                            autoComplete="off"
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>

                    <Form.Item label="Icon" help={formik.touched.icon && formik.errors.icon}>
                        <Input
                            prefix={<EditOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Icon path"
                            autoComplete="off"
                            type="text"
                            name="icon"
                            value={formik.values.icon}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>

                    <Form.Item label="Icon preview" style={{ marginBottom: '0px' }}>
                        <Icon name={formik.values.icon} fill="gray" width="24" />
                    </Form.Item>

                    <Form.Item label="Path">{formik.values.path}</Form.Item>
                    <Form.Item label="Level">{formik.values.level}</Form.Item>
                </Form>
            </>
        );
    }
);
