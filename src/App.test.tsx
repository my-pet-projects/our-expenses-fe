import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { $CombinedState, AnyAction, combineReducers, createStore, Store } from 'redux';

import App from './App';
import { categoriesReducer, categoryReducer, modalReducer } from './catalog/category/state/reducers';
import { expenseReducer } from './expense/state/reducers';
import { notifyReducer } from './notify/state/reducers';
import { reportReducer } from './report/state/reducers';
import { RootState } from './RootState';

describe('App component', () => {
    let store: Store<{ [$CombinedState]?: undefined } & RootState, AnyAction>;

    beforeEach(() => {
        store = createTestStore();
    });

    test('renders copyright text', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/random']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );
        const copyrightElement = getByText(/2021 Our Expenses/i);
        expect(copyrightElement).toBeInTheDocument();
    });

    const createTestStore = (): Store<{ [$CombinedState]?: undefined } & RootState, AnyAction> => {
        const store = createStore(
            combineReducers<RootState>({
                categories: categoriesReducer,
                selectedCategory: categoryReducer,
                notification: notifyReducer,
                modalData: modalReducer,
                expense: expenseReducer,
                report: reportReducer
            })
        );
        return store;
    };
});
