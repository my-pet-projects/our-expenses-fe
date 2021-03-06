import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { authReducer } from 'src/auth/state/reducers';
import { categoriesReducer, categoryReducer, modalReducer } from 'src/catalog/category/state/reducers';
import { expenseReducer } from 'src/expense/state/reducers';
import { notifyReducer } from 'src/notify/state/reducers';
import { reportReducer } from 'src/report/state/reducers';

import { RootState } from './RootState';

const logger = createLogger({});

const rootReducer = combineReducers<RootState>({
    categories: categoriesReducer,
    selectedCategory: categoryReducer,
    notification: notifyReducer,
    modalData: modalReducer,
    expense: expenseReducer,
    report: reportReducer,
    authData: authReducer
});

const middlewares = [thunkMiddleware, logger];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
