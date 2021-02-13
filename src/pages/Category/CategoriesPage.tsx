/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { FunctionComponent } from 'react';

interface PropsFromState {
    //
}

interface PropsFromDispatch {
    //
}

type CategoriesPageProps = PropsFromState & PropsFromDispatch;

const CategoriesPage: FunctionComponent<CategoriesPageProps> = (props: CategoriesPageProps): JSX.Element => (
    <>categories page</>
);

export default CategoriesPage;
