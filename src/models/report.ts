import { Category } from './category';
import { Expense } from './expense';

export interface ReportDateRange {
    from: Date;
    to: Date;
}

export interface Report {
    dateReports: DateExpensesReport[];
    total: Total;
}

export interface DateExpensesReport {
    date: string;
    categoryExpenses: CategoryExpenses[];
    total: Total;
}

export interface CategoryExpenses {
    category: Category;
    subCategories: CategoryExpenses[];
    expenses: Expense[];
    total: Total;
}

export interface Total {
    currency: string;
    debug: string;
    sum: string;
}
