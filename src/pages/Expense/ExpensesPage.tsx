import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface ExpensesListState {
    loading: boolean;
    error: boolean;
}
type ExpensesListProps = RouteComponentProps;

export class ExpensesListComponent extends React.Component<ExpensesListProps, ExpensesListState> {
    constructor(props: ExpensesListProps) {
        super(props);
        this.state = {
            loading: true,
            error: false
        };
    }
    public render(): JSX.Element {
        return <div>expenses here</div>;
    }
}
