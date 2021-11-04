import { ReactNode } from 'react';

import './Panel.scss';

type PanelProps = {
    children?: ReactNode;
};

export const Panel = ({ children }: PanelProps): JSX.Element => (
    <>
        <div className="panel__body">{children}</div>
    </>
);
