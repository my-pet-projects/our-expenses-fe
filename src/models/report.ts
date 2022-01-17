import { Category } from './category';
import { Expense } from './expense';

export enum Interval {
    Day = 'day',
    Month = 'month',
    Year = 'year'
}

export interface ReportDateRange {
    from: string;
    to: string;
}

export interface ReportFilter {
    dateRange: ReportDateRange;
    interval: Interval;
}

export interface Report {
    dateReports: DateExpensesReport[];
    grandTotal: GrandTotal;
}

export interface DateExpensesReport {
    date: string;
    categoryExpenses: CategoryExpenses[];
    grandTotal: GrandTotal;
}

export interface CategoryExpenses {
    category: Category;
    subCategories: CategoryExpenses[];
    expenses: Expense[];
    grandTotal: GrandTotal;
}

export interface GrandTotal {
    subTotals: TotalInfo[];
    total: Total;
}

export interface Total {
    currency: string;
    sum: string;
}

export interface TotalInfo {
    original: Total;
    converted: Total;
    rate: ExchangeRate;
}

export interface ExchangeRates {
    date: Date;
    currency: string;
    rates: Rate[];
}

export interface ExchangeRate {
    date: Date;
    baseCurrency: string;
    targetCurrency: string;
    rate: number;
}

export interface Rate {
    currency: string;
    price: number;
}
