import { PieTooltipProps, ResponsivePieCanvas } from '@nivo/pie';
import { BasicTooltip } from '@nivo/tooltip';
import { useEffect, useState } from 'react';

import { CategoryExpenses, TotalInfo } from 'src/models';

interface DateExpenseChartData {
    id: string;
    label: string;
    value: string;
    subTotals: TotalInfo[];
}

type DateExpensesPieChartProps = {
    categoryExpenses: CategoryExpenses[];
    currency: string;
};

export const DateExpensesPieChart = ({ categoryExpenses, currency }: DateExpensesPieChartProps): JSX.Element => {
    const [localData, setLocalData] = useState<DateExpenseChartData[]>([]);

    useEffect(() => {
        const chartData = categoryExpenses.map((catExp: CategoryExpenses) => ({
            id: catExp.category.name,
            label: catExp.category.name,
            value: catExp.grandTotal.total.sum,
            subTotals: catExp.grandTotal.subTotals
        }));
        setLocalData(chartData);
    }, [categoryExpenses]);

    return (
        <ResponsivePieCanvas
            data={localData}
            margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'paired' }}
            borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="#333333"
            valueFormat={(value): string => `${value} ${currency}`}
            tooltip={BarTooltip}
        />
    );
};

const BarTooltip: React.FunctionComponent<PieTooltipProps<DateExpenseChartData>> = ({
    datum
}: PieTooltipProps<DateExpenseChartData>) => {
    const data = datum.data as DateExpenseChartData;
    if (data.subTotals.length === 1) {
        return <BasicTooltip id={datum.id} value={datum.formattedValue} />;
    }
    const totals = data.subTotals
        .map((total: TotalInfo) => {
            const original = `${total.original.sum} ${total.original.currency}`;
            if (total.converted) {
                return `${original} (${total.converted.sum} ${total.converted.currency})`;
            }
            return original;
        })
        .join('\n');
    const tooltipValue = `${datum.formattedValue}\n${totals}`;
    return <BasicTooltip id={datum.id} value={tooltipValue} />;
};
