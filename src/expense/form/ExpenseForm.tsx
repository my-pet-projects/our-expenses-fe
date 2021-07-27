import { Button, Card, Form, Input, Select, TreeSelect } from 'antd';
import { useFormik } from 'formik';
import { KeyboardEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { fetchCategoriesCatalog } from 'src/catalog/category/state/actions';
import { selectCategoriesHierarchy, selectCategoriesIsLoading } from 'src/catalog/category/state/selectors';
import { useFocus } from 'src/common/hooks';
import { createExpense } from 'src/expense/state/actions';
import { Expense } from 'src/models';

import './ExpenseForm.scss';

interface ExpenseFormValues {
    category?: string;
    price?: number;
    quantity?: number;
    comment?: string;
    currency?: string;
}

const layout = {
    labelCol: {
        xs: { span: 4 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 10 },
        sm: { span: 10 }
    }
};

const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 }
};

export const ExpenseForm = (): JSX.Element => {
    const categories = useSelector(selectCategoriesHierarchy);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const dispatch = useDispatch();

    const [priceInputRef, setPriceInputFocus] = useFocus();
    const [quantityInputRef, setQuantityInputRef] = useFocus();

    useEffect(() => {
        dispatch(fetchCategoriesCatalog());
        return (): void => {
            dispatch(fetchCategoriesCatalog());
        };
    }, [dispatch]);

    const formik = useFormik<ExpenseFormValues>({
        enableReinitialize: true,
        initialValues: {
            currency: 'EUR'
        },
        validateOnMount: true,
        onSubmit: async ({ category, price, quantity, currency, comment }: ExpenseFormValues) => {
            if (!quantity) {
                quantity = 1;
            }

            const categoryToSave = {
                category: category,
                comment: comment,
                price: price,
                quantity: quantity,
                currency: currency
            } as Expense;

            try {
                console.log('categoryToSave', categoryToSave);
                await dispatch(createExpense(categoryToSave));
                formik.resetForm();
            } catch (error) {
                formik.setStatus(error);
            }
            formik.setSubmitting(false);
            formik.resetForm();
            formik.validateForm();
        },
        validationSchema: Yup.object().shape({
            category: Yup.string().required('Please select a category!'),
            price: Yup.string().required('Please input price!')
        })
    });
    const onChange = (value: string): void => {
        formik.setFieldValue('category', value);
        setPriceInputFocus();
    };

    const onKeyDown = (event: KeyboardEvent): void => {
        const keyCode = event.key;
        if (keyCode === 'Enter') {
            event.preventDefault();
        }
    };

    const handleCurrencyChange = (value: string): void => {
        formik.setFieldValue('currency', value);
    };

    const selectCurrency = (
        <Select defaultValue={formik.values.currency} onChange={handleCurrencyChange}>
            <Select.Option value="RUB">RUB</Select.Option>
            <Select.Option value="EUR">EUR</Select.Option>
        </Select>
    );

    return (
        <div className="expense-form">
            <Card title="New expense">
                <Form {...layout} onFinish={formik.handleSubmit}>
                    <Form.Item
                        label="Category"
                        help={formik.touched.category && formik.errors.category}
                        hasFeedback={formik.touched.category && !!formik.errors.category}
                        validateStatus={formik.touched.category && formik.errors.category ? 'error' : 'success'}
                    >
                        <TreeSelect
                            showSearch
                            style={{ width: '100%' }}
                            value={formik.values.category}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Select category"
                            allowClear
                            treeDefaultExpandAll
                            onChange={onChange}
                            treeData={categories}
                            onInputKeyDown={onKeyDown}
                            onBlur={formik.handleBlur}
                            treeNodeFilterProp="title"
                        />
                    </Form.Item>

                    <Form.Item label="Price" style={{ marginBottom: 0 }}>
                        <Form.Item
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                            help={formik.touched.price && formik.errors.price}
                            hasFeedback={formik.touched.price && !!formik.errors.price}
                            validateStatus={formik.touched.price && formik.errors.price ? 'error' : 'success'}
                        >
                            <Input
                                ref={priceInputRef}
                                placeholder="Price"
                                autoComplete="off"
                                type="number"
                                name="price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                addonAfter={selectCurrency}
                            />
                        </Form.Item>
                        <Form.Item
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 0 0 16px' }}
                            help={formik.touched.quantity && formik.errors.quantity}
                            hasFeedback={formik.touched.quantity && !!formik.errors.quantity}
                            validateStatus={formik.touched.quantity && formik.errors.quantity ? 'error' : 'success'}
                        >
                            <Input
                                ref={quantityInputRef}
                                placeholder="Quantity"
                                type="number"
                                name="quantity"
                                value={formik.values.quantity}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Comment">
                        <Input
                            placeholder="Comment"
                            type="text"
                            name="comment"
                            value={formik.values.comment}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>

                    <Form.Item {...buttonItemLayout}>
                        <Button
                            htmlType="submit"
                            type="primary"
                            disabled={isLoading || formik.isValidating || !formik.isValid}
                        >
                            Submit
                        </Button>
                        <Button htmlType="button" style={{ margin: '0 8px' }}>
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
