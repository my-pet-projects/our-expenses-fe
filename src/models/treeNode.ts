export interface TreeNode {
    key: string | number;
    value: string;
    title: string;
    children: TreeNode[];
    disabled?: boolean;
}
