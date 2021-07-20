import { EditOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useFormik } from 'formik';
import { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import * as Yup from 'yup';

import { SvgIcon } from 'src/common/components';
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
    ({ category, onSave }: CategoryFormProps, ref: Ref<CategoryFormHandle>): JSX.Element => {
        const formRef = useRef(null);
        const [isIconValid, setIsIconValid] = useState(true);

        useEffect(() => {
            formik.validateForm();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isIconValid]);

        useImperativeHandle(ref, () => ({
            submit: (): void => {
                formik.submitForm();
            }
        }));

        const handleSave = (category: Category): void => {
            onSave(category);
        };

        const handleIconError = (): void => {
            setIsIconValid(false);
        };

        const handleIconLoad = (): void => {
            setIsIconValid(true);
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
                name: Yup.string().max(50, 'Category name is too long!').required('Please input category name!'),
                icon: Yup.string().test('svg-validation', 'SVG is not valid!', (value: string | undefined) => {
                    if (!value) {
                        return true;
                    }
                    return isIconValid;
                })
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

                    <Form.Item
                        label="Icon"
                        help={formik.errors.icon}
                        hasFeedback={!!formik.errors.icon}
                        validateStatus={formik.errors.icon ? 'error' : 'success'}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Icon path"
                            autoComplete="off"
                            name="icon"
                            value={formik.values.icon}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>

                    <Form.Item label="Icon preview" style={{ marginBottom: '0px' }}>
                        <SvgIcon svgString={formik.values.icon} onLoad={handleIconLoad} onError={handleIconError} />
                    </Form.Item>

                    <Form.Item label="Path">{formik.values.path}</Form.Item>
                    <Form.Item label="Level">{formik.values.level}</Form.Item>
                </Form>
            </>
        );
    }
);
