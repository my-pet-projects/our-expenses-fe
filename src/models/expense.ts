import { Category } from './category';

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
}

export interface NewExpenseResponse {
    id: string;
}
