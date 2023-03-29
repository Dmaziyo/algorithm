/**
 * link:https://leetcode.cn/problems/binary-tree-inorder-traversal/
 */
/**
 * Definition for a binary tree node.
 */
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}
function inorderTraversal(root: TreeNode | null): number[] {
    let results:number[] = []
    let inOrder=(root:TreeNode|null)=>{
        if(!root)return;
        inOrder(root.left);
        results.push(root.val);
        inOrder(root.right);
    }
    inOrder(root);
    return results;
};