import { ReactNode } from 'react';

import './AppPanel.scss';

type AppPanelProps = {
    children?: ReactNode;
};

export const AppPanel = ({ children }: AppPanelProps): JSX.Element => <div className="app-page">{children}</div>;
