import { Divider, Typography } from 'antd';

import { GrandTotal, TotalInfo } from 'src/models';

import { TotalAmount } from './TotalAmount';

import './ReportTotalAmount.scss';

type ReportTotalAmountProps = {
    grandTotal: GrandTotal;
    showConverted?: boolean;
};

export const ReportTotalAmount = ({ grandTotal, showConverted }: ReportTotalAmountProps): JSX.Element => (
    <>
        {grandTotal.subTotals && grandTotal.subTotals.length > 1 && (
            <Typography.Text className="report-total-amount__totals" strong>
                {grandTotal.subTotals.map((totalInfo: TotalInfo, totalKey: number) => (
                    <TotalAmount key={totalKey} total={totalInfo.original} />
                ))}
            </Typography.Text>
        )}

        {showConverted && (
            <Typography.Text className="report-total-amount__totals" strong>
                <Divider style={{ margin: 0 }} />
                <TotalAmount total={grandTotal.total} />
            </Typography.Text>
        )}
    </>
);
