import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';

import { categoriesReducer, categoryReducer, modalReducer } from 'src/category/state/reducers';
import { notifyReducer } from 'src/notify/state/reducers';

import { RootActions, RootState } from './RootState';

const logger = createLogger({});

const rootReducer = combineReducers<RootState>({
    categories: categoriesReducer,
    selectedCategory: categoryReducer,
    notification: notifyReducer,
    modalData: modalReducer
});

const middlewares = [reduxThunk as ThunkMiddleware<RootState, RootActions>, logger];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
