import { Total } from 'src/models';

type TotalAmountProps = {
    total: Total;
};

export const TotalAmount = ({ total }: TotalAmountProps): JSX.Element => (
    <span>
        {total.sum} {total.currency}
    </span>
);
