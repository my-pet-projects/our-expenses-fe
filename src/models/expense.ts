export interface Expense {
    id: string;
    categoryId: string;
    categoryName: string;
    price: number;
    quantity: number;
    currency: string;
    comment: string;
    date: Date;
}

export interface NewExpenseResponse {
    id: string;
}
