import { Divider } from 'antd';

import { GrandTotal, Total } from 'src/models';

import { TotalAmount } from './TotalAmount';

type GrandTotalAmountProps = {
    grandTotal: GrandTotal;
};

export const GrandTotalAmount = ({ grandTotal }: GrandTotalAmountProps): JSX.Element => (
    <>
        {grandTotal &&
            grandTotal.totals.map((total: Total, totalKey: number) => (
                <>
                    <TotalAmount key={totalKey} total={total} />
                    <Divider type="vertical" />
                </>
            ))}
    </>
);
