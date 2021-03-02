import { EditOutlined, SaveOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { FormikBag, FormikProps, withFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { Category } from 'src/models';

import './CategoryForm.scss';
import { Icon } from './Icon';

interface CategoryFormValues {
    id: string;
    name: string;
    icon: string;
    parent: string;
    path: string;
}

type CategoryFormProps = {
    isProcessing: boolean;
    category: Category | null;
    onCategorySave: (category: Category) => void;
    onCancel: () => void;
};

const layout = {
    labelCol: {
        xs: { span: 5 },
        sm: { span: 5 }
    },
    wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 }
    }
};

const tailLayout = {
    wrapperCol: {
        xs: {
            span: 12,
            offset: 5
        },
        sm: {
            span: 12,
            offset: 5
        }
    }
};

const CategoryFormComponent = (props: CategoryFormProps & FormikProps<CategoryFormValues>): JSX.Element => {
    const {
        isProcessing,
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        onCancel,
        isSubmitting
    } = props;

    return (
        <Form {...layout} className="category-form" onFinish={handleSubmit}>
            <Form.Item name="id" noStyle>
                <Input type="hidden" value={values.id} />
            </Form.Item>

            <Form.Item name="parent" noStyle>
                <Input type="hidden" value={values.parent} />
            </Form.Item>

            <Form.Item name="path" noStyle>
                <Input type="hidden" value={values.path} />
            </Form.Item>

            <Form.Item
                label="Name"
                help={touched.name && errors.name}
                hasFeedback={touched.name && !!errors.name}
                validateStatus={touched.name && errors.name ? 'error' : 'success'}
            >
                <Input
                    prefix={<EditOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Category name"
                    autoComplete="off"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Form.Item>

            <Form.Item
                label="Icon"
                help={touched.name && errors.name}
                hasFeedback={touched.name && !!errors.name}
                validateStatus={touched.name && errors.name ? 'error' : 'success'}
            >
                <Input
                    prefix={<EditOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Icon path"
                    autoComplete="off"
                    type="text"
                    name="icon"
                    value={values.icon}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Form.Item>

            <Form.Item label="Icon preview">
                <Icon name={values.icon} fill="gray" width="24" />
            </Form.Item>

            <Form.Item {...tailLayout} style={{ textAlign: 'right' }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: '10px' }}
                    icon={<SaveOutlined />}
                    disabled={isSubmitting || !!(errors.name && touched.name)}
                    loading={isProcessing}
                >
                    Update
                </Button>
                <Button
                    type="default"
                    icon={<StopOutlined />}
                    onClick={onCancel}
                    disabled={isSubmitting || isProcessing}
                >
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

const CategoryForm = withFormik<CategoryFormProps, CategoryFormValues>({
    enableReinitialize: true,
    mapPropsToValues: ({ category }: CategoryFormProps) => ({
        id: category?.id || '',
        name: category?.name || '',
        icon: category?.icon || '',
        parent: category?.parent || '',
        path: category?.path || ''
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string().max(50, 'Too Long!').required('Please input category name!')
    }),
    handleSubmit: async (
        { id, name, icon, parent, path }: CategoryFormValues,
        { props, setSubmitting }: FormikBag<CategoryFormProps, CategoryFormValues>
    ) => {
        const { onCategorySave: saveCategory } = props;
        const category = {
            id: id,
            name: name,
            icon: icon,
            parent: parent,
            path: path
        } as Category;

        await saveCategory(category);
        setSubmitting(false);
    }
})(CategoryFormComponent);

export default CategoryForm;
