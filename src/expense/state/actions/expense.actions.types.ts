import { ExpenseActionType } from 'src/expense/state/constants';
import { ApplicationError } from 'src/models';

export interface IExpenseCreateInit {
    type: ExpenseActionType.CREATE_INIT;
}

export interface IExpenseCreateDone {
    type: ExpenseActionType.CREATE_DONE;
}

export interface IExpenseCreateFailed {
    type: ExpenseActionType.CREATE_FAILED;
    payload: ApplicationError;
    error: boolean;
}
export type ExpenseAction = IExpenseCreateInit | IExpenseCreateDone | IExpenseCreateFailed;
