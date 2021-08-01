export interface TreeNode {
    key: string;
    title: string;
    children: TreeNode[];
}

export interface TreeSelectNode {
    value: string;
    title: string;
    children: TreeSelectNode[];
}
