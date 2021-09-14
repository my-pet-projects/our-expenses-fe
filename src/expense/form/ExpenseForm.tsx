import { CloseOutlined } from '@ant-design/icons';
import { Alert, Button, Card, DatePicker, Form, Input, Select, TreeSelect } from 'antd';
import { useFormik } from 'formik';
import moment, { Moment } from 'moment';
import { KeyboardEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { useFocus } from 'src/common/hooks';
import { createExpense, fetchCategoriesCatalog } from 'src/expense/state/actions';
import { selectCategoriesCatalog, selectError, selectIsLoading } from 'src/expense/state/selectors';
import { Expense } from 'src/models';

import './ExpenseForm.scss';

interface ExpenseFormValues {
    categoryId?: string;
    categoryName?: string;
    price?: number;
    quantity?: number;
    comment?: string;
    currency?: string;
    date?: Moment;
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

const dateFormat = 'DD.MM.YYYY';

export const ExpenseForm = (): JSX.Element => {
    const categories = useSelector(selectCategoriesCatalog);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const dispatch = useDispatch();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [dateInputRef, setDateInputFocus] = useFocus<any>();
    const [categoryInputRef, setCategoryInputFocus] = useFocus();
    const [priceInputRef, setPriceInputFocus] = useFocus();
    const [quantityInputRef, setQuantityInputFocus] = useFocus();

    useEffect(() => {
        dispatch(fetchCategoriesCatalog());
        return (): void => {
            dispatch(fetchCategoriesCatalog());
        };
    }, [dispatch]);

    const formik = useFormik<ExpenseFormValues>({
        enableReinitialize: true,
        initialValues: {
            currency: 'EUR',
            quantity: 1
        },
        validateOnMount: true,
        onSubmit: async ({ categoryId, categoryName, price, quantity, currency, comment, date }: ExpenseFormValues) => {
            const dateObj = moment.utc(date).startOf('day').toDate();
            const categoryToSave = {
                categoryId: categoryId,
                categoryName: categoryName,
                comment: comment,
                price: price,
                quantity: quantity,
                currency: currency,
                date: dateObj
            } as Expense;

            try {
                await dispatch(createExpense(categoryToSave));
                formik.resetForm();
                formik.setFieldValue('date', date);
                setCategoryInputFocus();
            } catch (error) {
                formik.setStatus(error);
            }
            formik.setSubmitting(false);
        },
        validationSchema: Yup.object().shape({
            categoryId: Yup.string().required('Please select a category!'),
            price: Yup.string().required('Please input price!'),
            quantity: Yup.string().required('Please input quantity!'),
            date: Yup.string().nullable().required('Please select a date!')
        })
    });

    const handleCategoryChange = async (value: string, labelList: React.ReactNode[]): Promise<void> => {
        let name;
        if (labelList.length !== 0) {
            name = labelList[0]?.toString();
        }
        await formik.setFieldValue('categoryId', value, true);
        await formik.setFieldValue('categoryName', name);
        setPriceInputFocus();
    };

    const handleCategoryKeyDown = (event: KeyboardEvent): void => {
        const keyCode = event.key;
        if (keyCode === 'Enter') {
            event.preventDefault();
        }
    };

    const handleDateChange = async (value: Moment | null): Promise<void> => {
        await formik.setFieldValue('date', value);
        setCategoryInputFocus();
    };

    const handleCurrencyChange = (value: string): void => {
        formik.setFieldValue('currency', value);
    };

    const currencySelector = (
        <Form.Item name="currency" noStyle>
            <Select onChange={handleCurrencyChange}>
                <Select.Option value="RUB">RUB</Select.Option>
                <Select.Option value="EUR">EUR</Select.Option>
                <Select.Option value="HRK">HRK</Select.Option>
            </Select>
        </Form.Item>
    );

    return (
        <div className="expense-form">
            <Card title="New expense">
                <Form
                    {...layout}
                    initialValues={{ currency: 'EUR' }}
                    onFinish={formik.handleSubmit}
                    onReset={formik.handleReset}
                >
                    <Form.Item
                        label="Date"
                        help={formik.touched.date && formik.errors.date}
                        validateStatus={formik.touched.date && formik.errors.date ? 'error' : 'success'}
                    >
                        <DatePicker
                            ref={dateInputRef}
                            name="date"
                            value={formik.values.date}
                            format={dateFormat}
                            onChange={handleDateChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        help={formik.touched.categoryId && formik.errors.categoryId}
                        validateStatus={formik.touched.categoryId && formik.errors.categoryId ? 'error' : 'success'}
                    >
                        <TreeSelect
                            ref={categoryInputRef}
                            id="categoryId"
                            showSearch
                            style={{ width: '100%' }}
                            value={formik.values.categoryId}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Select category"
                            allowClear
                            treeDefaultExpandAll
                            treeNodeFilterProp={'title'}
                            treeData={categories}
                            loading={isLoading}
                            onInputKeyDown={handleCategoryKeyDown}
                            onChange={handleCategoryChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>

                    <Form.Item name="categoryName" noStyle>
                        <Input type="hidden" value={formik.values.categoryName} />
                    </Form.Item>

                    <Form.Item label="Price x Quantity" style={{ marginBottom: 0 }}>
                        <Form.Item
                            style={{ display: 'inline-block', width: '25%' }}
                            help={formik.touched.price && formik.errors.price}
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
                                addonAfter={<CloseOutlined />}
                            />
                        </Form.Item>

                        <Form.Item
                            style={{ display: 'inline-block', width: '25%', margin: '0 0 0 -1px' }}
                            help={formik.touched.quantity && formik.errors.quantity}
                            validateStatus={formik.touched.quantity && formik.errors.quantity ? 'error' : 'success'}
                        >
                            <Input
                                name="quantity"
                                ref={quantityInputRef}
                                placeholder="Quantity"
                                type="number"
                                autoComplete="off"
                                value={formik.values.quantity}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                addonAfter={currencySelector}
                            />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Comment">
                        <Input
                            name="comment"
                            placeholder="Comment"
                            type="text"
                            autoComplete="off"
                            value={formik.values.comment}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>

                    <Form.Item {...buttonItemLayout}>
                        <Button
                            htmlType="submit"
                            type="primary"
                            disabled={isLoading || formik.isValidating || !formik.isValid || !formik.dirty}
                        >
                            Submit
                        </Button>
                        <Button htmlType="reset" style={{ margin: '0 8px' }} disabled={!formik.dirty}>
                            Reset
                        </Button>
                    </Form.Item>
                </Form>

                {error && <Alert message={error.message} description={error.description} type="error" showIcon />}
            </Card>
        </div>
    );
};
