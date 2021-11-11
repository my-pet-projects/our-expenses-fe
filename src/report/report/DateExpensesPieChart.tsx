import { ResponsivePieCanvas } from '@nivo/pie';
import { useEffect, useState } from 'react';

import { CategoryExpenses } from 'src/models';

interface DateExpenseChartData {
    id: string;
    label: string;
    value: string;
}

type DateExpensesPieChartProps = {
    categoryExpenses: CategoryExpenses[];
};

export const DateExpensesPieChart = ({ categoryExpenses }: DateExpensesPieChartProps): JSX.Element => {
    const [localData, setLocalData] = useState<DateExpenseChartData[]>([]);

    useEffect(() => {
        const chartData = categoryExpenses.map((catExp: CategoryExpenses) => ({
            id: catExp.category.name,
            label: catExp.category.name,
            value: catExp.total.sum
        }));
        setLocalData(chartData);
    }, [categoryExpenses]);

    return (
        <>
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
                legends={[
                    {
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 140,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 60,
                        itemHeight: 14,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 14,
                        symbolShape: 'circle'
                    }
                ]}
            />
        </>
    );
};
