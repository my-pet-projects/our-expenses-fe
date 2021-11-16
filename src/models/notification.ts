export interface SystemNotification {
    type: 'success' | 'error';
    message: string;
    details?: string;
}
