import { createBinaryTree } from "./utils";

/**
 * links:https://leetcode.cn/problems/validate-binary-search-tree/
 * TODO review
 */
function isValidBST(root: TreeNode | null): boolean {
    if(!root)return true;
    let maximum = Number.NEGATIVE_INFINITY;
    let inorder = (root: TreeNode | null):boolean =>{
        if(!root)return true
        let result1 =  inorder(root.left);
        if(root.val>maximum){
            maximum = root.val
        }
        else{
            return false;
        }
        let result2 = inorder(root.right);
        return result1&&result2;
    }
    return inorder(root);
};