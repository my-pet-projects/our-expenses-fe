import { Category } from './category';
import { Expense } from './expense';

export interface ReportDateRange {
    from: Date;
    to: Date;
}
export interface Report {
    byDate: ByDateReport[];
}

export interface ByDateReport {
    date: string;
    byCategory: ByCategoryEntity[];
}

export interface ByCategoryEntity {
    category: Category;
    expenses: Expense[];
}
