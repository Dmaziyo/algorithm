/**
 * link:https://leetcode.cn/problems/binary-tree-preorder-traversal/
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
function preorderTraversal(root: TreeNode | null): number[] {
    let results:number[] =[]
    let preOrder = (root)=>{
        if(!root)return;
        results.push(root.val)
        preOrder(root.left);
        preOrder(root.right);
    }
    preOrder(root);
    return results;
};