export const formatMoney = (amount: string, currency: string): string => `${parseFloat(amount).toFixed(2)} ${currency}`;
