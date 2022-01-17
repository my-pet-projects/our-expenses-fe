import { formatMoney } from 'src/common/formatters';
import { Total } from 'src/models';

type TotalAmountProps = {
    total: Total;
};

export const TotalAmount = ({ total }: TotalAmountProps): JSX.Element => (
    <span>{formatMoney(total.sum, total.currency)}</span>
);
