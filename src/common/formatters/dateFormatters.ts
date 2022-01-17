import moment from 'moment';

const dayFormat = 'DD.MM.YYYY';
const monthFormat = 'MMMM YYYY';

export const dateDayFormat = (date: string | Date): string => moment.utc(date).format(dayFormat);
export const dateMonthFormat = (date: string): string => moment(date).format(monthFormat);
