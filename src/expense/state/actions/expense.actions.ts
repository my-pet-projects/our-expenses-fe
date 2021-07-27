import { ApplicationError, Expense } from 'src/models';
import { notifyFailure, notifySuccess } from 'src/notify/state/actions';
import { AppThunkDispatch, AppThunkResult } from 'src/RootState';
import { IHttpRequestOptions, sendRequest } from 'src/services/http';

import { ExpenseActionType } from '../constants';
import { IExpenseCreateDone, IExpenseCreateFailed, IExpenseCreateInit } from './expense.actions.types';

const willCreateExpense = (): IExpenseCreateInit => ({
    type: ExpenseActionType.CREATE_INIT
});

const didCreateExpense = (): IExpenseCreateDone => ({
    type: ExpenseActionType.CREATE_DONE
});

const failedCreateExpense = (error: ApplicationError): IExpenseCreateFailed => ({
    type: ExpenseActionType.CREATE_FAILED,
    payload: error,
    error: true
});

export const createExpense = (expense: Expense): AppThunkResult<Promise<void>> => async (
    dispatch: AppThunkDispatch
): Promise<void> => {
    const options = {
        path: 'expenses',
        method: 'POST',
        payload: expense
    } as IHttpRequestOptions<Expense>;

    try {
        dispatch(willCreateExpense());
        const newExpense = await sendRequest<string>(options);
        if (!newExpense.data) {
            // TODO: throw
            throw new Error('');
        }
        expense.id = newExpense.data;
        dispatch(didCreateExpense());
        dispatch(notifySuccess('Expense added successfully!'));
    } catch (error) {
        const appError = {
            message: 'Failed to add expense!',
            description: error.getFullMessage(),
            error: error
        } as ApplicationError;
        dispatch(failedCreateExpense(appError));
        dispatch(notifyFailure(appError));
        throw error;
    }
};
