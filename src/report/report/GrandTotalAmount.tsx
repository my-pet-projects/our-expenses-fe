import { GrandTotal, TotalInfo } from 'src/models';

import { TotalAmount } from './TotalAmount';

type GrandTotalAmountProps = {
    grandTotal: GrandTotal;
    showConverted?: boolean;
};

export const GrandTotalAmount = ({ grandTotal, showConverted }: GrandTotalAmountProps): JSX.Element => (
    <>
        {grandTotal.subTotals &&
            grandTotal.subTotals.map((totalInfo: TotalInfo, totalKey: number) => (
                <TotalAmount key={totalKey} total={totalInfo.original} />
            ))}

        {showConverted && <TotalAmount total={grandTotal.total} />}
    </>
);
