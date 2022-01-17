import { Category } from './category';
import { TotalInfo } from './report';

export interface Expense {
    id: string;
    categoryId: string;
    categoryName: string;
    price: number;
    quantity: number;
    currency: string;
    comment: string;
    date: Date;
    category: Category;
    trip: string;
    totalInfo: TotalInfo;
}

export interface NewExpenseResponse {
    id: string;
}
