import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';

import { RootActions, RootState } from './app.store.types';
import { notifyReducer } from './notify/reducers';

const logger = createLogger({});

const rootReducer = combineReducers<RootState>({
    notification: notifyReducer
});

const middlewares = [reduxThunk as ThunkMiddleware<RootState, RootActions>, logger];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
